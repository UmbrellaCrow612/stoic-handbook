import React from 'react';

const Philosopher = ({ name, children }) => {
  return (
    <li className="relative pl-8 pb-4">
      <div className="flex items-center">
        <span className="absolute left-0 top-0 h-full w-px bg-gray-300 dark:bg-gray-700"></span>
        <div className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700">
          <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>
        </div>
        <span className="ml-4 text-sm font-medium text-gray-900 dark:text-gray-100">{name}</span>
      </div>
      {children.length > 0 && (
        <ul className="mt-2">
          {children.map((child, index) => (
            <Philosopher key={index} {...child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Philosopher;