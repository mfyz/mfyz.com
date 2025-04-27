import React from 'react';
import PropTypes from 'prop-types';

const Note = ({ children }) => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg flex gap-2 items-start text-sm">
      <span className="text-lg">ℹ️</span>
      <div>{children}</div>
    </div>
  );
};

Note.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Note;