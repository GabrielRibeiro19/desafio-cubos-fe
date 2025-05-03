import { ReactNode } from "react";

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  text: string | ReactNode;
  className?: string; // Adicione esta linha
}

const getButtonClasses = (variant: 'primary' | 'secondary', disabled: boolean) => {
  if (disabled) {
    return variant === 'primary'
      ? 'bg-[#6F6D78] cursor-not-allowed'
      : 'bg-[#EBEAF814] cursor-not-allowed';
  }

  return variant === 'primary'
    ? 'bg-[#8E4EC6] cursor-pointer hover:bg-[#9A5CD0] focus:bg-[#8457AA]'
    : 'bg-[#B744F714] cursor-pointer hover:bg-[#C150FF2E] focus:bg-[#B412F90A]';
};

export function Button({
  type = 'button',
  disabled = false,
  variant = 'primary',
  text,
  className = "", // Adicione aqui também
}: ButtonProps) {
  const buttonClasses = getButtonClasses(variant, disabled);

  return (
    <button
      className={`py-3 px-5 rounded-[2px] text-white font-medium transition-all duration-200 focus:outline-none ${buttonClasses} ${className}`}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
