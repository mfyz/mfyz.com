import React from 'react';

// ----------------
// HEADING COMPONENTS
// ----------------
// Maintaining Georgia font for headings as required
export const h1 = (props) => (
  <h1 
    className="font-secondary font-normal text-4xl md:text-5xl mt-8 mb-6 text-slate-800 dark:text-gray-100" 
    {...props} 
  />
);

export const h2 = (props) => (
  <h2 
    className="font-secondary font-normal text-3xl md:text-4xl mt-12 mb-4 text-slate-800 dark:text-gray-100" 
    {...props} 
  />
);

export const h3 = (props) => (
  <h3 
    className="font-secondary font-normal text-2xl md:text-3xl mt-8 mb-4 text-slate-800 dark:text-gray-100" 
    {...props} 
  />
);

export const h4 = (props) => (
  <h4 
    className="font-secondary font-normal text-xl md:text-2xl mt-6 mb-3 text-slate-800 dark:text-gray-100" 
    {...props} 
  />
);

export const h5 = (props) => (
  <h5 
    className="font-secondary font-normal text-lg md:text-xl mt-6 mb-3 text-slate-800 dark:text-gray-100" 
    {...props} 
  />
);

export const h6 = (props) => (
  <h6 
    className="font-secondary font-normal text-base md:text-lg mt-6 mb-3 text-slate-800 dark:text-gray-100" 
    {...props} 
  />
);

// ----------------
// TEXT COMPONENTS
// ----------------
export const p = (props) => (
  <p 
    className="text-base leading-7 my-6 text-slate-700 dark:text-gray-300" 
    {...props} 
  />
);

export const a = (props) => (
  <a 
    className="text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-200" 
    target={props.href?.startsWith('http') ? '_blank' : undefined}
    rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    {...props} 
  />
);

export const strong = (props) => (
  <strong 
    className="font-semibold text-slate-900 dark:text-white" 
    {...props} 
  />
);

export const em = (props) => (
  <em 
    className="italic text-slate-800 dark:text-gray-200" 
    {...props} 
  />
);

// ----------------
// LIST COMPONENTS
// ----------------
export const ul = (props) => (
  <ul 
    className="list-disc pl-8 my-6 text-slate-700 dark:text-gray-300 space-y-2" 
    {...props} 
  />
);

export const ol = (props) => (
  <ol 
    className="list-decimal pl-8 my-6 text-slate-700 dark:text-gray-300 space-y-2" 
    {...props} 
  />
);

export const li = (props) => (
  <li 
    className="pl-2" 
    {...props} 
  />
);

// ----------------
// BLOCKQUOTE COMPONENT
// ----------------
export const blockquote = (props) => (
  <blockquote 
    className="border-l-4 border-slate-300 dark:border-slate-700 pl-4 my-6 italic text-slate-700 dark:text-gray-400" 
    {...props} 
  />
);

// ----------------
// TABLE COMPONENTS
// ----------------
export const table = (props) => (
  <div className="overflow-x-auto my-8">
    <table 
      className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-800" 
      {...props} 
    />
  </div>
);

export const th = (props) => (
  <th 
    className="bg-slate-100 dark:bg-slate-800 px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-gray-100" 
    {...props} 
  />
);

export const td = (props) => (
  <td 
    className="px-4 py-3 text-sm border-t border-slate-200 dark:border-slate-700 text-slate-700 dark:text-gray-300" 
    {...props} 
  />
);

export const tr = (props) => (
  <tr 
    className="even:bg-slate-50 dark:even:bg-slate-800/30" 
    {...props} 
  />
);

// ----------------
// CODE COMPONENTS
// ----------------
export const pre = (props) => (
  <pre 
    className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto my-6 text-sm" 
    {...props} 
  />
);

export const code = (props) => {
  // Check if this is an inline code block (no className/language) or a standalone block
  const isInline = !props.className;
  
  return isInline 
    ? <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800 dark:text-slate-200" {...props} />
    : <code className="block text-sm font-mono text-slate-800 dark:text-slate-200" {...props} />;
};

// ----------------
// HORIZONTAL RULE
// ----------------
export const hr = (props) => (
  <hr 
    className="my-8 border-t border-slate-200 dark:border-slate-700" 
    {...props} 
  />
);

// ----------------
// IMAGE COMPONENT
// ----------------
export const img = (props) => (
  <img 
    className="rounded-lg mx-auto my-6 max-w-full h-auto hover:scale-105 transition-transform duration-300" 
    alt={props.alt || 'Image'}
    loading="lazy"
    {...props} 
  />
);
