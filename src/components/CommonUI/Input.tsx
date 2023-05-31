type Props = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<Props> = ({ className, onChange, label, value, id, name, ...rest }) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-white font-semibold text-[15px]">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-[#FFFFFF] bg-opacity-[3%] text-white placeholder:text-[#808080] rounded-[10px] px-6 py-3 lg:py-4 mt-2"
        {...rest}
      />
    </div>
  );
};

export default Input;
