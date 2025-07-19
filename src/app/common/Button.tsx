import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  color?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  color = "primary",
  disabled = false,
  className = "",
  type = "button",
  size = "medium",
}) => {
  // Estilos base comunes a todos los botones
  const baseStyles =
    "rounded-lg cursor-pointer font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  // Colores según el tipo
  let colorStyles = "";
  if (color === "primary") {
    colorStyles =
      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:ring-blue-500";
  } else if (color === "secondary") {
    colorStyles =
      "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 focus:ring-gray-500";
  } else if (color === "danger") {
    colorStyles =
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 focus:ring-red-500";
  }

  // Tamaños
  let sizeStyles = "";
  if (size === "small") {
    sizeStyles = "px-3 py-1 text-sm";
  } else if (size === "medium") {
    sizeStyles = "px-4 py-2 text-base";
  } else if (size === "large") {
    sizeStyles = "px-6 py-3 text-lg";
  }

  const fullClassName = `${baseStyles} ${colorStyles} ${sizeStyles} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={fullClassName}
    >
      {children}
    </button>
  );
};

export default Button;
