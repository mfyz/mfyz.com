import { visit } from 'unist-util-visit';

/**
 * Remark plugin to replace text emoticons with emojis
 * This runs during build time (SSR), not client-side
 * @returns {import('unified').Transformer}
 */
export function remarkEmoticons() {
  const emoticons = {
    ':)': '😊',
    ':D': '😁',
    ';)': '😉',
    ':(': '😢',
    ':P': '😛',
  };
  
  return (tree) => {
    visit(tree, 'text', (node) => {
      let value = node.value;
      let modified = false;
      
      // Replace emoticons with emojis
      Object.entries(emoticons).forEach(([emoticon, emoji]) => {
        // Escape special regex characters in the emoticon for safe replacement
        const escapedEmoticon = emoticon.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
        const regex = new RegExp(escapedEmoticon, 'g');
        
        if (regex.test(value)) {
          value = value.replace(regex, emoji);
          modified = true;
        }
      });
      
      if (modified) {
        node.value = value;
      }
    });
  };
}
