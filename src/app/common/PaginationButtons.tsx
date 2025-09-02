import React from "react";

interface PaginationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  disableBack?: boolean;
  disableNext?: boolean;
  isLoading?: boolean;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  onBack,
  onNext,
  disableBack = false,
  disableNext = false,
  isLoading = false,
}) => {
  const baseButton =
    "px-3 py-1 text-sm font-medium border rounded-md transition-colors bg-brand-e dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-brand-c dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-e dark:focus:ring-gray-600 cursor-pointer";
  const defaultStyles =
    "bg-brand-c text-gray-100 dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700";
  const disabledStyles =
    "bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-2 mt-6 select-none">
      {/* Botón Anterior */}
      <button
        onClick={onBack}
        disabled={disableBack || isLoading}
        className={`${baseButton} ${
          disableBack || isLoading ? disabledStyles : defaultStyles
        }`}
      >
        Anterior
      </button>

      {/* Botón Siguiente */}
      <button
        onClick={onNext}
        disabled={disableNext || isLoading}
        className={`${baseButton} ${
          disableNext || isLoading ? disabledStyles : defaultStyles
        }`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default PaginationButtons;
