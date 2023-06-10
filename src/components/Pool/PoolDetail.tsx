import { XMarkIcon } from "@heroicons/react/24/solid";
type Props = {
  handleClose: () => void;
  poolId?: string;
};

const PoolDetail: React.FC<Props> = ({ handleClose, poolId }) => {
  return (
    <div className="p-6 lg:p-8 bg-[#171923]/90 rounded-lg space-y-4 lg:space-y-6 h-full">
      <div className="flex items-center justify-between text-2xl font-bold">
        <div className="text-white">Pool Detail</div>
        <XMarkIcon className="cursor-pointer w-7 h-7" onClick={handleClose} color="white" />
      </div>
    </div>
  );
};

export default PoolDetail;
