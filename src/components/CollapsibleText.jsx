import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CollapsibleText = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200 last:border-none">
      <button
        className="flex w-full items-start gap-3 py-4 text-left"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <svg
          className={`mt-1.5 h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-90' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 4.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="text-xl font-medium">{title}</h3>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pl-8 pb-8">
          {children}
        </div>
      </div>
    </div>
  );
};

CollapsibleText.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CollapsibleText;