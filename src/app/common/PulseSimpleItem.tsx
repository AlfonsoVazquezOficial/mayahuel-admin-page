import React from 'react';

const PulseSimpleItem = () => {
  return (
    <div className="bg-gray-300 dark:bg-gray-500 p-4 rounded-xl shadow-lg animate-pulse space-y-4">
      <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-md" />
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />
      <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-md" />
    </div>
  );
};

export default PulseSimpleItem;
