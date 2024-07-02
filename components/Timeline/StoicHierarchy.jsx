import React from 'react';
import Philosopher from './Philosopher';
import philosophersData from './philosophers.json';

const StoicHierarchy = () => {
  return (
    <div className="px-4 py-8 overflow-x-auto bg-white dark:bg-gray-900">
      <ul className="relative">
        {philosophersData.map((philosopher, index) => (
          <Philosopher key={index} {...philosopher} />
        ))}
      </ul>
    </div>
  );
};

export default StoicHierarchy;