export interface EmojiPack {
  name: string;
  items: string[];
}

export interface Meme {
  id: number;
  name: string;
  techName: string;
  tags: string[];
  tagline: string;
  description: string;
  imageUrl: string;
  color: string;
  emojiPacks: EmojiPack[];
  credits: {
    source: string;
    url?: string;
    copyright?: string;
  };
}

// Helper to generate emoji paths
const getRustEmojis = () => {
  const emojis = [];
  for (let i = 1; i <= 29; i++) {
    emojis.push(`/characters/rust_tan/emojis/emoji_${i}.png?v=2`);
  }
  return emojis;
};

const getUnitySeries0 = () => {
  const emojis = [];
  for (let i = 1; i <= 24; i++) {
    emojis.push(`/characters/otori_kohaku/series_0/emoji_${i}.png`);
  }
  return emojis;
};

const getUnitySeries1 = () => {
  const emojis = [];
  // Available files: 1-15, 21-24
  const indices = [
    ...Array.from({ length: 15 }, (_, i) => i + 1),
    21, 22, 23, 24
  ];
  
  for (const i of indices) {
    emojis.push(`/characters/otori_kohaku/series_1/emoji_${i}.png`);
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
    color: '#dea584',
    emojiPacks: [
      {
        name: 'Standard Pack',
        items: getRustEmojis()
      }
    ],
    credits: {
      source: 'Design inspired by u/re_error (r/ProgrammerAnimemes)',
      url: 'https://www.reddit.com/r/ProgrammerAnimemes/comments/1garqij/oc_rusttan_inktober_day_22/',
      copyright: 'Character Concept: Community / AI Gen: Nano Banana Pro'
    }
  },
  {
    id: 2,
    name: 'Otori Kohaku',
    techName: 'Unity',
    tags: ['Engine', 'Game Dev'],
    tagline: "Assets loaded! Let's build your dream world together! ☆",
    description: `The energetic poster girl of Unity Engine. She loves korokke and game dev! "C# scripting is super easy, I'll show you how!"`,
    imageUrl: '/characters/otori_kohaku/cover.png',
    color: '#222c37',
    emojiPacks: [
      {
        name: 'Series 0: Core',
        items: getUnitySeries0()
      },
      {
        name: 'Series 1: Mental State',
        items: getUnitySeries1()
      }
    ],
    credits: {
      source: 'Unity Technologies Japan',
      url: 'https://unity-chan.com/',
      copyright: '© Unity Technologies Japan / Unity-chan is a trademark of Unity Technologies.'
    }
  }
];
