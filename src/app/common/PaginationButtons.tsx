import React from "react";

interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  onBack: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalPages,
  onBack,
  onNext,
  onPageChange,
  isLoading = false,
}) => {
  const generatePageNumbers = () => {
    const pages: (number | "...")[] = [];
    const delta = 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const left = Math.max(2, currentPage - delta);
      const right = Math.min(totalPages - 1, currentPage + delta);

      pages.push(1);
      if (left > 2) pages.push("...");

      for (let i = left; i <= right; i++) {
        pages.push(i);
      }

      if (right < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const baseButton =
    "px-3 py-1 text-sm font-medium border rounded-md transition-colors bg-brand-e dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-brand-c dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-e dark:focus:ring-gray-600 cursor-pointer";
  const activeStyles = "bg-brand-e text-white dark:bg-blue-500";
  const defaultStyles =
    "bg-brand-c text-gray-100 dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700";
  const disabledStyles =
    "bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-1 mt-6 select-none">
      {/* Botón Anterior */}
      <button
        onClick={onBack}
        disabled={currentPage === 1 || isLoading}
        className={`${baseButton} ${
          currentPage === 1 || isLoading ? disabledStyles : defaultStyles
        }`}
      >
        Anterior
      </button>

      {/* Números de página */}
      {generatePageNumbers().map((item, index) =>
        item === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-gray-400 dark:text-gray-500 text-sm"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            disabled={isLoading}
            className={`${baseButton} ${
              item === currentPage ? activeStyles : defaultStyles
            }`}
          >
            {item}
          </button>
        )
      )}

      {/* Botón Siguiente */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages || isLoading}
        className={`${baseButton} ${
          currentPage === totalPages || isLoading
            ? disabledStyles
            : defaultStyles
        }`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default PaginationButtons;
