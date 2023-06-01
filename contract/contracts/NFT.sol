// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTContract is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    Counters.Counter private _realEstateIdCounter;

    struct RealEstate {
        uint256 id;
        string name;
        string uri;
        uint256 basePrice;
        uint256 basePower;
        uint256 apy;
        address owner;
        uint256 numberOfFraction;
        address paymentToken;
        uint256 fractionMinted;
    }

    mapping(uint256 => RealEstate) public realEstates;

    // token name
    mapping(uint256 => string) public _names;

    // token uri
    mapping(uint256 => string) public _tokenURIs;

    // token realEstate id
    mapping(uint256 => uint256) public _realEstateIds;

    // token market price
    mapping(uint256 => uint256) public _tokenPowers;

    string private _baseURIextended;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    /////// EVENT
    event RealEstateUpdated(
        uint256 id,
        string name,
        string uri,
        uint256 basePrice,
        uint256 basePower,
        address owner,
        uint256 numberOfFraction,
        address paymentToken
    );
    event TokenMinted(
        uint256 tokenId,
        address recipient,
        string tokenURI,
        string name,
        uint256 realEstateId
    );

    ////// FUNCTION

    // BaseURI
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseURIextended = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function createRealEstate(
        string memory name,
        string memory uri,
        uint256 basePrice,
        uint256 basePower,
        uint256 apy,
        uint256 numberOfFraction,
        address paymentToken
    ) public onlyOwner returns (uint256) {
        // check paymentToken is ERC20
        require(
            IERC20(paymentToken).totalSupply() > 0,
            "paymentToken is not ERC20"
        );

        _realEstateIdCounter.increment();
        uint256 newId = _realEstateIdCounter.current();
        realEstates[newId] = RealEstate(
            newId,
            name,
            uri,
            basePrice,
            basePower,
            apy,
            msg.sender,
            numberOfFraction,
            paymentToken,
            0
        );
        _emitRealEstateUpdated(realEstates[newId]);
        return newId;
    }

    function getAllRealEstates() public view returns (RealEstate[] memory) {
        RealEstate[] memory _realEstates = new RealEstate[](
            _realEstateIdCounter.current()
        );
        for (uint256 i = 1; i <= _realEstateIdCounter.current(); i++) {
            _realEstates[i - 1] = realEstates[i];
        }
        return _realEstates;
    }

    function getRealEstate(
        uint256 realEstateId
    ) public view returns (RealEstate memory) {
        require(realEstates[realEstateId].id != 0, "RealEstate does not exist");
        return realEstates[realEstateId];
    }

    // Mint NFT
    function mintNFT(
        address recipient,
        string memory tokenURI,
        string memory name,
        uint256 realEstateId
    ) public returns (uint256) {
        RealEstate storage _realEstate = realEstates[realEstateId];

        // check realEstateId is valid
        require(_realEstate.id != 0, "RealEstate does not exist");

        require(
            _realEstate.fractionMinted < _realEstate.numberOfFraction,
            "RealEstate is sold out"
        );

        _tokenIdCounter.increment();
        uint256 newItemId = _tokenIdCounter.current();
        _mint(recipient, newItemId);
        _realEstate.fractionMinted += 1;
        _names[newItemId] = name;
        _realEstateIds[newItemId] = realEstateId;
        _tokenURIs[newItemId] = tokenURI;
        _tokenPowers[newItemId] = _realEstate.basePower;
        _emitTokenMinted(newItemId);
        return newItemId;
    }

    // user must pay with paymentToken in realEstate and amount must be equal to realEstate.basePrice
    function payAndMintNFT(uint256 realEstateId) public returns (uint256) {
        RealEstate storage _realEstate = realEstates[realEstateId];

        // check realEstateId is valid
        require(_realEstate.id != 0, "RealEstate does not exist");

        require(
            _realEstate.fractionMinted < _realEstate.numberOfFraction,
            "RealEstate is sold out"
        );

        // check user has enough paymentToken
        require(
            IERC20(_realEstate.paymentToken).balanceOf(msg.sender) >=
                _realEstate.basePrice,
            "Not enough paymentToken"
        );

        // transfer paymentToken from user to realEstate owner
        IERC20(_realEstate.paymentToken).transferFrom(
            msg.sender,
            _realEstate.owner,
            _realEstate.basePrice
        );

        _tokenIdCounter.increment();
        uint256 newItemId = _tokenIdCounter.current();
        _mint(msg.sender, newItemId);
        _realEstate.fractionMinted += 1;
        _names[newItemId] = _realEstate.name;
        _realEstateIds[newItemId] = realEstateId;
        _tokenURIs[newItemId] = _realEstate.uri;
        _tokenPowers[newItemId] = _realEstate.basePower;
        _emitTokenMinted(newItemId);
        return newItemId;
    }

    function getTokenById(
        uint256 tokenId
    )
        public
        view
        returns (
            string memory name,
            string memory tokenURI,
            uint256 realEstateId,
            address owner,
            uint256 power
        )
    {
        require(_exists(tokenId), "nft not exists");
        owner = _ownerOf(tokenId);
        name = _names[tokenId];
        tokenURI = _tokenURIs[tokenId];
        realEstateId = _realEstateIds[tokenId];
        power = _tokenPowers[tokenId];
    }

    function _emitRealEstateUpdated(RealEstate memory _realEstate) internal {
        emit RealEstateUpdated(
            _realEstate.id,
            _realEstate.name,
            _realEstate.uri,
            _realEstate.basePrice,
            _realEstate.basePower,
            _realEstate.owner,
            _realEstate.numberOfFraction,
            _realEstate.paymentToken
        );
    }

    function _emitTokenMinted(uint256 _tokenId) internal {
        emit TokenMinted(
            _tokenId,
            ownerOf(_tokenId),
            _tokenURIs[_tokenId],
            _names[_tokenId],
            _realEstateIds[_tokenId]
        );
    }
}
