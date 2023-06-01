// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./NFT.sol";

contract NFTStaking {
    IERC20 public immutable rewardsToken;
    address public nftContract;
    address public owner;

    // Pool struct
    struct Pool {
        // Duration of rewards to be paid out (in seconds)
        uint duration;
        // Timestamp of when the rewards finish
        uint finishAt;
        // Minimum of last updated time and reward finish time
        uint updatedAt;
        // Reward to be paid out per second
        uint rewardRate;
        // Sum of (reward rate * dt * 1e18 / total supply)
        uint rewardPerTokenStored;
        // User address => rewardPerTokenStored
        mapping(address => uint) userRewardPerTokenPaid;
        // User address => rewards to be claimed
        mapping(address => uint) rewards;
        mapping(uint256 => address) oldOwner;
        // Total staked
        uint totalSupply;
        // User address => staked amount
        mapping(address => uint) balanceOf;
        uint256 realEstateId;
        // Pool Balance
        uint256 poolBalance;
    }

    Pool[] public pools;

    event nftStaked(
        uint256 tokenId,
        address user,
        uint256 tokenPower,
        uint256 userBalance,
        uint256 totalSupply
    );
    event withdrawed(uint256 tokenId, address user, uint256 index);

    constructor(address _rewardsToken, address _nftContract) {
        owner = msg.sender;
        rewardsToken = IERC20(_rewardsToken);
        nftContract = _nftContract;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not authorized");
        _;
    }

    modifier updateReward(uint _index, address _account) {
        pools[_index].rewardPerTokenStored = rewardPerToken(_index);
        pools[_index].updatedAt = lastTimeRewardApplicable(_index);

        if (_account != address(0)) {
            pools[_index].rewards[_account] = earned(_account, _index);
            pools[_index].userRewardPerTokenPaid[_account] = pools[_index]
                .rewardPerTokenStored;
        }

        _;
    }

    function lastTimeRewardApplicable(uint _index) public view returns (uint) {
        // Code
        if (block.timestamp <= pools[_index].finishAt) {
            return (block.timestamp);
        } else {
            return pools[_index].finishAt;
        }
    }

    function rewardPerToken(uint _index) public view returns (uint) {
        // Code
        if (pools[_index].totalSupply == 0) {
            return pools[_index].rewardPerTokenStored;
        }
        uint time = lastTimeRewardApplicable(_index);
        return
            pools[_index].rewardPerTokenStored +
            (pools[_index].rewardRate *
                (time - pools[_index].updatedAt) *
                1e18) /
            pools[_index].totalSupply;
    }

    function stake(
        uint256 tokenId_,
        uint _index
    ) external updateReward(_index, msg.sender) {
        // Code
        require(
            nftcontract(nftContract).ownerOf(tokenId_) == msg.sender,
            "sender is not owner of token"
        );
        require(
            nftcontract(nftContract).getApproved(tokenId_) == address(this) ||
                nftcontract(nftContract).isApprovedForAll(
                    msg.sender,
                    address(this)
                ),
            "The contract is unauthorized to manage this token"
        );
        require(
            nftcontract(nftContract).getrealEstateId(tokenId_) ==
                pools[_index].realEstateId,
            "realEstate Id is not match"
        );
        uint256 tokenPower = nftcontract(nftContract).getPower(tokenId_);
        require(tokenPower > 0, "token power must be greater than 0");
        nftcontract(nftContract).transferFrom(
            msg.sender,
            address(this),
            tokenId_
        );
        pools[_index].balanceOf[msg.sender] =
            pools[_index].balanceOf[msg.sender] +
            tokenPower;
        pools[_index].totalSupply = pools[_index].totalSupply + tokenPower;
        pools[_index].oldOwner[tokenId_] = msg.sender;
        emit nftStaked(
            tokenId_,
            msg.sender,
            tokenPower,
            pools[_index].balanceOf[msg.sender],
            pools[_index].totalSupply
        );
    }

    function withdraw(
        uint256 tokenId_,
        uint _index
    ) external updateReward(_index, msg.sender) {
        // Code
        require(
            pools[_index].oldOwner[tokenId_] == msg.sender,
            "not the old owner"
        );
        uint256 tokenPower = nftcontract(nftContract).getPower(tokenId_);
        pools[_index].balanceOf[msg.sender] -= tokenPower;
        pools[_index].totalSupply -= tokenPower;
        nftcontract(nftContract).transferFrom(
            address(this),
            msg.sender,
            tokenId_
        );
        emit withdrawed(tokenId_, msg.sender, _index);
    }

    function earned(address _account, uint _index) public view returns (uint) {
        // Code
        return
            ((pools[_index].balanceOf[_account] *
                (rewardPerToken(_index) -
                    pools[_index].userRewardPerTokenPaid[_account])) / 1e18) +
            pools[_index].rewards[_account];
    }

    function getReward(uint _index) external updateReward(_index, msg.sender) {
        // Code
        uint reward = pools[_index].rewards[msg.sender];
        if (reward > 0) {
            pools[_index].rewards[msg.sender] = 0;
            rewardsToken.transfer(msg.sender, reward);
            pools[_index].poolBalance -= reward;
        }
    }

    function setRewardsDuration(uint _duration, uint _index) external {
        // Code
        require(
            nftcontract(nftContract).getrealEstateOwner(
                pools[_index].realEstateId
            ) == msg.sender,
            "not realEstate owner"
        );
        require(
            block.timestamp > pools[_index].finishAt,
            "previous reward duration not finished"
        );
        pools[_index].duration = _duration;
    }

    function notifyRewardAmount(
        uint _amount,
        uint _index
    ) external updateReward(_index, address(0)) {
        require(
            nftcontract(nftContract).getrealEstateOwner(
                pools[_index].realEstateId
            ) == msg.sender,
            "not realEstate owner"
        );
        // Code
        if (block.timestamp >= pools[_index].finishAt) {
            pools[_index].rewardRate = _amount / pools[_index].duration;
        } else {
            pools[_index].rewardRate =
                (_amount +
                    pools[_index].rewardRate *
                    (pools[_index].finishAt - block.timestamp)) /
                pools[_index].duration;
        }
        require(
            pools[_index].rewardRate > 0,
            "Reward rate must greater than zero"
        );
        require(
            pools[_index].rewardRate * pools[_index].duration <=
                pools[_index].poolBalance,
            "Reward amount > balance"
        );
        pools[_index].updatedAt = block.timestamp;
        pools[_index].finishAt = block.timestamp + pools[_index].duration;
    }

    function _min(uint x, uint y) private pure returns (uint) {
        return x <= y ? x : y;
    }

    function getPower(uint256 _tokenId) public view returns (uint256) {
        return (nftcontract(nftContract).getPower(_tokenId));
    }

    function createPool(uint _realEstateId) external {
        Pool storage newPool = pools.push();
        newPool.realEstateId = _realEstateId;
    }

    function deposit(uint _amount, uint _index) external payable {
        require(_amount > 0, "amount must greater than zero");
        rewardsToken.transferFrom(msg.sender, address(this), _amount);
        pools[_index].poolBalance += _amount;
    }

    function getPoolIdByrealEstateId(
        uint256 realEstateId
    ) public view returns (bool check, uint256 poolId) {
        for (uint256 i = 0; i < pools.length; i++) {
            if (pools[i].realEstateId == realEstateId) {
                return (true, i);
            }
        }
        return (false, 0);
    }

    function getUserTotalPowerStaked(
        address _userAddress,
        uint _index
    ) public view returns (uint256) {
        return (pools[_index].balanceOf[_userAddress]);
    }

    function getUserTotalEarned(
        address _userAddress,
        uint _index
    ) public view returns (uint256) {
        return (pools[_index].rewards[_userAddress]);
    }
}
