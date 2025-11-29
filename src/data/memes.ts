import yaml from 'js-yaml';

export interface EmojiItem {
  transparent: string;
  white_bg: string;
}

export interface EmojiPack {
  name: string;
  items: EmojiItem[];
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

export const loadMemes = async (locale: string = 'en'): Promise<Meme[]> => {
  try {
    // Adjust filename based on locale
    // We assume 'characters.yaml' is the default (English) and 'characters_zh.yaml' is for Chinese
    const filename = locale.toLowerCase().startsWith('zh') ? 'characters_zh.yaml' : 'characters.yaml';
    
    const response = await fetch(`/LangGalMemes/characters/${filename}`);
    if (!response.ok) {
      // Fallback to default if localized file not found (e.g. if only zh is missing)
      if (filename !== 'characters.yaml') {
        console.warn(`Failed to load ${filename}, falling back to default.`);
        return loadMemes('en');
      }
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
    const items: EmojiItem[] = [];
    
    if (pack.range) {
      const [start, end] = pack.range;
      for (let i = start; i <= end; i++) {
        items.push({
          transparent: `${pack.path}/transparent/${pack.pattern.replace('{i}', i.toString())}`,
          white_bg: `${pack.path}/white_bg/${pack.pattern.replace('{i}', i.toString())}`
        });
      }
    } else if (pack.list) {
      for (const i of pack.list) {
        items.push({
          transparent: `${pack.path}/transparent/${pack.pattern.replace('{i}', i.toString())}`,
          white_bg: `${pack.path}/white_bg/${pack.pattern.replace('{i}', i.toString())}`
        });
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

