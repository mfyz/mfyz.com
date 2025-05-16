import React from "react";

const Tags = ({ list, className = "" }) => {
  return (
    <div className={`flex w-full flex-wrap gap-2 ${className}`}>
      {list.map(tag => (
        <span className="tag" key={tag}>
          # {tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
