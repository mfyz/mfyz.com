import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const CollapsibleText = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // Handle hydration issues by ensuring component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  // If not mounted yet, show a simplified version to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="border-b border-gray-200 last:border-none">
        <div className="flex w-full items-center gap-3 py-4 text-left">
          <svg
            className="h-4 w-4 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 4.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">{title}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200 last:border-none">
      <button
        className="flex w-full items-center gap-3 py-4 text-left"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        type="button"
      >
        <svg
          className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-90' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.293 4.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">{title}</span>
      </button>
      <div 
        ref={contentRef}
        style={{ display: isOpen ? 'block' : 'none' }}
        className="overflow-hidden"
      >
        <div className="pl-7 pb-6">
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