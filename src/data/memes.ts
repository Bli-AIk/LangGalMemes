export interface Meme {
  id: number;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  color: string; // Hex color for accents
}

export const memes: Meme[] = [
  {
    id: 1,
    name: 'Rust-chan',
    tagline: 'Memory Safety First!',
    description: 'Always checking your borrow checker. Strict but caring.',
    imageUrl: 'https://placehold.co/400x500/dea584/1e293b?text=Rust-chan&font=roboto',
    color: '#dea584'
  },
  {
    id: 2,
    name: 'Python-neesan',
    tagline: 'Import Gravity',
    description: 'Elegant, readable, and loves snakes. Maybe too dynamic?',
    imageUrl: 'https://placehold.co/400x500/3776ab/ffe873?text=Python-neesan&font=roboto',
    color: '#3776ab'
  },
  {
    id: 3,
    name: 'JS-imouto',
    tagline: 'I run everywhere!',
    description: 'Energetic and chaotic. Sometimes undefined, but always there.',
    imageUrl: 'https://placehold.co/400x500/f7df1e/000000?text=JS-imouto&font=roboto',
    color: '#f7df1e'
  },
  {
    id: 4,
    name: 'C++-sensei',
    tagline: 'With great power...', 
    description: 'Complex, powerful, and historically rich. Don\'t make her angry (segfault).',
    imageUrl: 'https://placehold.co/400x500/00599c/ffffff?text=C%2B%2B-sensei&font=roboto',
    color: '#00599c'
  },
  {
    id: 5,
    name: 'Go-gopher',
    tagline: 'Simple & Fast',
    description: 'Google\'s favorite. Loves simplicity and concurrency.',
    imageUrl: 'https://placehold.co/400x500/00add8/000000?text=Go-gopher&font=roboto',
    color: '#00add8'
  },
  {
    id: 6,
    name: 'TypeScript-sama',
    tagline: 'Strictly Typed',
    description: 'JS-imouto\'s disciplined older sister. Brings order to chaos.',
    imageUrl: 'https://placehold.co/400x500/3178c6/ffffff?text=TS-sama&font=roboto',
    color: '#3178c6'
  },
  {
    id: 7,
    name: 'Java-obasan',
    tagline: 'Write Once, Run Anywhere',
    description: 'Corporate, reliable, and loves coffee. A bit verbose.',
    imageUrl: 'https://placehold.co/400x500/b07219/ffffff?text=Java-obasan&font=roboto',
    color: '#b07219'
  },
  {
    id: 8,
    name: 'Swift-idol',
    tagline: 'Fast & Modern',
    description: 'Apple\'s star. Trendy, safe, and fast.',
    imageUrl: 'https://placehold.co/400x500/f05138/ffffff?text=Swift-idol&font=roboto',
    color: '#f05138'
  }
];
