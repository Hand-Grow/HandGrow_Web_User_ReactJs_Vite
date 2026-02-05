import { InputHTMLAttributes, ReactNode } from 'react';
import { Input } from '../ui/input';

interface InputFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onChangeValue?: (value: string) => void;
}

const InputField = ({
  label,
  leftIcon,
  rightIcon,
  onChangeValue,
  ...props
}: InputFieldProps) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </span>
        )}

        <Input
          {...props}
          onChange={(e) => onChangeValue?.(e.target.value)}
          className={`${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}`}
        />

        {rightIcon && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
