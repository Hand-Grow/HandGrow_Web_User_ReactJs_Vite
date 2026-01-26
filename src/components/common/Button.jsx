import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Button = ({ children, onClick, style }) => {
  const { theme } = useTheme();
  
  const baseStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: theme === 'light' ? '#007bff' : '#1a73e8',
    color: '#fff',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    ...style
  };

  return (
    <button style={baseStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
