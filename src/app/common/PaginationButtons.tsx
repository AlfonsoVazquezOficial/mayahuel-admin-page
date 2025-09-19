"use client"

import type React from "react"

interface PaginationButtonsProps {
  onBack: () => void
  onNext: () => void
  disableBack?: boolean
  disableNext?: boolean
  isLoading?: boolean
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  onBack,
  onNext,
  disableBack = false,
  disableNext = false,
  isLoading = false,
}) => {
  return (
    <div className="flex items-center justify-center gap-3 mt-8 select-none">
      {/* Botón Anterior */}
      <button
        onClick={onBack}
        disabled={disableBack || isLoading}
        className={`
          group relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm
          transition-all duration-200 ease-in-out transform
          ${
            disableBack || isLoading
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r bg-blue-900 text-white hover:blue-700  hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 shadow-md dark:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-800 cursor-pointer"
          }
        `}
        aria-label="Página anterior"
      >
        {/* Icono de flecha izquierda */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            !disableBack && !isLoading ? "group-hover:-translate-x-0.5" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Anterior</span>

        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-xl">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </button>

      {/* Separador visual */}
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={onNext}
        disabled={disableNext || isLoading}
        className={`
          group relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm
          transition-all duration-200 ease-in-out transform
          ${
            disableNext || isLoading
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r bg-blue-900 text-white hover:blue-700  hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 shadow-md dark:bg-gray-600 dark:hover:bg-gray-300 dark:hover:text-gray-800 cursor-pointer"
          }
        `}
        aria-label="Página siguiente"
      >
        <span>Siguiente</span>
        {/* Icono de flecha derecha */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            !disableNext && !isLoading ? "group-hover:translate-x-0.5" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>

        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-500 bg-opacity-80 rounded-xl">
            <div className="w-4 h-4 border-2 border-blue-200 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
      </button>
    </div>
  )
}

export default PaginationButtons
