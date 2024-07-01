import React, { useState, useEffect } from "react";

const Warning = ({ message, storageKey }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const warningShown = localStorage.getItem(storageKey);
    if (!warningShown) {
      setIsVisible(true);
    }
  }, [storageKey]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, "true");
  };

  if (!isVisible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-0 left-0 right-0 z-50 p-3 sm:p-4 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 shadow-md"
      id={storageKey}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex items-center mb-2 sm:mb-0">
          <svg
            aria-hidden="true"
            className="w-5 h-5 sm:w-6 sm:h-6 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="font-medium text-sm sm:text-base">{message}</span>
        </div>
        <button
          onClick={handleDismiss}
          className="text-yellow-800 dark:text-yellow-100 hover:text-yellow-900 dark:hover:text-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 rounded"
          aria-label="Dismiss warning"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
};

export default Warning;