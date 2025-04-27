const BACKGROUND_COLORS = [
  '#87CEEB', // Sky Blue
  '#FFB6C1', // Light Pink
  '#98FB98', // Pale Green
  '#DDA0DD', // Plum
  '#F0E68C', // Khaki
];

export function getBackgroundColor(slug: string): string {
  // Create a simple hash from the slug
  const hash = slug.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  // Use the absolute value of hash to ensure positive number
  const index = Math.abs(hash) % BACKGROUND_COLORS.length;
  
  return BACKGROUND_COLORS[index];
}
