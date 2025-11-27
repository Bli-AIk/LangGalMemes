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
    name: 'Bun-chan',
    tagline: 'Fast as Lightning!',
    description: 'The speedy all-in-one runtime. She bakes dependencies in milliseconds.',
    imageUrl: '/logos/Bun/BunLogoShadowed.png',
    color: '#fbf0df' // Creamy bun color
  },
  {
    id: 2,
    name: 'Neovim-sensei',
    tagline: 'Hyperextensible Vim',
    description: 'Efficient, modal, and modernized. Once you meet her, you can never quit (literally).',
    imageUrl: '/logos/Neovim/NeovimShadowed.png',
    color: '#57a143' // Green
  },
  {
    id: 3,
    name: 'Docker-whale',
    tagline: 'Build, Ship, Run',
    description: 'Carries your entire world on her back. Loves containers and isolation.',
    imageUrl: '/logos/Docker/DockerLogoShadowed.png',
    color: '#2496ed' // Docker Blue
  },
  {
    id: 4,
    name: 'Godot-robo',
    tagline: 'Waiting for 4.0...', 
    description: 'Open source game engine royalty. Lightweight but surprisingly powerful.',
    imageUrl: '/logos/GodotEngine/GodotLogoShadowed.png',
    color: '#478cbf' // Godot Blue
  },
  {
    id: 5,
    name: 'VSCode-maid',
    tagline: 'Editor for Everyone',
    description: 'Versatile and customizable. Has an extension for absolutely everything you need.',
    imageUrl: '/logos/VSCode/VSCodeLogoShadowed.png',
    color: '#007acc' // VSCode Blue
  },
  {
    id: 6,
    name: 'Kubernetes-hime',
    tagline: 'Orchestration Queen',
    description: 'Controls the fleet. Complex to understand, but impossible to scale without.',
    imageUrl: '/logos/Kubernetes/KubernetesLogoShadowed.png',
    color: '#326ce5' // K8s Blue
  },
  {
    id: 7,
    name: 'Elysia-angel',
    tagline: 'Ergonomic Framework',
    description: 'Fast, type-safe, and heavenly. Bun-chan\'s best friend.',
    imageUrl: '/logos/ElysiaJS/ElysiaLogoShadowed.png',
    color: '#ff3e83' // Pinkish
  },
  {
    id: 8,
    name: 'ImHex-witch',
    tagline: 'Hex Editor Extraordinaire',
    description: 'Sees the matrix directly. For when you need to reverse engineer reality.',
    imageUrl: '/logos/ImHex/ImHexLogoShadowed.png',
    color: '#626467' // Grey
  }
];