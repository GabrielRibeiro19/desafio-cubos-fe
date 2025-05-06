import { ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "secondary";
  text: string | ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
}

const getButtonClasses = (
  variant: "primary" | "secondary",
  disabled: boolean,
) => {
  if (disabled) {
    return variant === "primary"
      ? "bg-light-disabled dark:bg-dark-disabled cursor-not-allowed"
      : "bg-[#EBEAF814] dark:bg-dark-secondary cursor-not-allowed";
  }

  return variant === "primary"
    ? "bg-light-primary dark:bg-dark-primary hover:bg-light-primaryHover dark:hover:bg-dark-primaryHover focus:bg-light-primaryFocus dark:focus:bg-dark-primaryFocus cursor-pointer"
    : "bg-light-secondary dark:bg-dark-secondary hover:bg-light-secondaryHover dark:hover:bg-dark-secondaryHover focus:bg-light-secondaryFocus dark:focus:bg-dark-secondaryFocus cursor-pointer";
};

export function Button({
  type = "button",
  disabled = false,
  variant = "primary",
  text,
  className = "",
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const buttonClasses = getButtonClasses(variant, disabled);

  return (
    <button
      className={`py-3 px-5 rounded-[2px] text-black dark:text-dark-text font-medium transition-all duration-200 focus:outline-none ${buttonClasses} ${className} transition-theme`}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {text}
    </button>
  );
}
