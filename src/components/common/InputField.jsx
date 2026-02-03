import React from 'react';

const InputField = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  leftIcon,
  rightIcon,
  onRightIconClick,
  inputProps = {},
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full ${
            leftIcon ? 'pl-10' : 'pl-4'
          } ${rightIcon ? 'pr-10' : 'pr-4'} py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition`}
          {...inputProps}
        />

        {rightIcon && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
