import React from 'react';

interface TiltButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const TiltButton: React.FC<TiltButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button
      className={`relative inline-flex items-center justify-center bg-transparent border-none cursor-pointer text-white font-bold uppercase transition-all duration-200 p-3 ${disabled ? 'cursor-default' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="block relative transition-transform duration-200 ease-in-out">{label}</span>
      <span className="absolute inset-0 bg-white z-[-1] transition-all duration-200" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%)' }}></span>
      <span className="absolute inset-0 bg-white z-[-2] transition-all duration-200" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%)' }}></span>
    </button>
  );
};

export default TiltButton;
