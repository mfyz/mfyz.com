import React from "react";

const Tags = ({ list, className = "" }) => {
  // Check if we need to use light tags on dark background
  const isLightTags = className.includes("tags-light");
  
  return (
    <div className={`flex w-full flex-wrap gap-2 ${className}`}>
      {list.map(tag => (
        <span className={isLightTags ? "tag-light" : "tag"} key={tag}>
          # {tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
