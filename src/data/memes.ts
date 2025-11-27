import yaml from 'js-yaml';

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

// Interfaces for the YAML structure (slightly different from runtime structure)
interface YamlEmojiPack {
  name: string;
  path: string;
  pattern: string;
  range?: [number, number];
  list?: number[];
}

interface YamlMeme extends Omit<Meme, 'emojiPacks'> {
  emojiPacks: YamlEmojiPack[];
}

export const loadMemes = async (): Promise<Meme[]> => {
  try {
    // Adjust the path if your base URL is different
    const response = await fetch('/LangGalMemes/characters/characters.yaml');
    if (!response.ok) {
      throw new Error(`Failed to load config: ${response.statusText}`);
    }
    const yamlText = await response.text();
    const rawData = yaml.load(yamlText) as YamlMeme[];

    return rawData.map(transformMeme);
  } catch (error) {
    console.error('Error loading memes:', error);
    return [];
  }
};

const transformMeme = (yamlMeme: YamlMeme): Meme => {
  const emojiPacks: EmojiPack[] = yamlMeme.emojiPacks.map(pack => {
    const items: string[] = [];
    
    if (pack.range) {
      const [start, end] = pack.range;
      for (let i = start; i <= end; i++) {
        items.push(`${pack.path}/${pack.pattern.replace('{i}', i.toString())}`);
      }
    } else if (pack.list) {
      for (const i of pack.list) {
        items.push(`${pack.path}/${pack.pattern.replace('{i}', i.toString())}`);
      }
    }

    return {
      name: pack.name,
      items
    };
  });

  return {
    ...yamlMeme,
    emojiPacks
  };
};

// Keep an empty initial array for type safety if imported directly, 
// though components should switch to using loadMemes()
export const memes: Meme[] = [];

