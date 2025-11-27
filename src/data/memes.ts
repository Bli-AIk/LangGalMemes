export interface Meme {
  id: number;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  color: string;
  emojis?: string[]; // Optional list of emoji paths
}

// Helper to generate emoji paths
const getRustEmojis = () => {
  const emojis = [];
  for (let i = 1; i <= 29; i++) {
    // Adding a query param to force cache busting for potentially stuck images
    emojis.push(`/characters/rust_tan/emojis/emoji_${i}.png?v=2`);
  }
  return emojis;
};

export const memes: Meme[] = [
  {
    id: 1,
    name: 'Rust-chan',
    tagline: 'Huh? Segfault again? Pathetic. ♡',
    description: 'A smug, correcting brat who loves to point out your sloppy memory management. "Still using C++? Pfft. I guess I have to protect you from yourself, you clumsy developer."',
    imageUrl: '/characters/rust_tan/cover.png',
    color: '#dea584', // Rust orange-ish
    emojis: getRustEmojis()
  },
  {
    id: 2,
    name: 'Unity-chan',
    tagline: 'Otori Kohaku',
    description: 'The energetic poster girl of Unity Engine. Ready to bring your games to life with high-performance rendering and C# scripts!',
    imageUrl: '/characters/otori_kohaku/cover.png',
    color: '#222c37', // Unity dark/grey
    emojis: [] // No emojis yet
  }
];