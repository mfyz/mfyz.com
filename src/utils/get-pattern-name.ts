const PATTERNS = ["cone", "cube", "triangle", "wave"];

export function getPatternName(slug: string): string {
  // Create a simple hash from the slug
  const hash = slug.split("").reduce((acc: number, char: string) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  // Use the absolute value of hash to ensure positive number
  const index = Math.abs(hash) % PATTERNS.length;

  return PATTERNS[index];
}
