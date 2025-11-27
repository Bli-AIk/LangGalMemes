export interface Meme {
  id: number;
  name: string; // Character Name (e.g., Rust-tan)
  techName: string; // Technology Name (e.g., Rust)
  tags: string[]; // Categories for filtering
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
    emojis.push(`/characters/rust_tan/emojis/emoji_${i}.png?v=2`);
  }
  return emojis;
};

export const memes: Meme[] = [
  {
    id: 1,
    name: 'Rust-tan',
    techName: 'Rust',
    tags: ['Language', 'Systems'],
    tagline: 'Huh? Segfault again? Pathetic. ♡',
    description: `A smug, correcting brat who loves to point out your sloppy memory management. "Still using C++? Pfft. I guess I have to protect you from yourself, you clumsy developer."`,
    imageUrl: '/characters/rust_tan/cover.png',
    color: '#dea584', // Rust orange-ish
    emojis: getRustEmojis()
  },
  {
    id: 2,
    name: 'Otori Kohaku',
    techName: 'Unity',
    tags: ['Engine', 'Game Dev'],
    tagline: "Assets loaded! Let's build your dream world together! ☆",
    description: `The energetic poster girl of Unity Engine. She loves korokke and game dev! "C# scripting is super easy, I'll show you how!"`,
    imageUrl: '/characters/otori_kohaku/cover.png',
    color: '#222c37', // Unity dark/grey
    emojis: [] // No emojis yet
  }
];