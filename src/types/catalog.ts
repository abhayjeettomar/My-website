export type NavigationTab =
  | 'explore'
  | '3d-websites'
  | 'sections'
  | 'apps'
  | 'backgrounds'
  | 'mcp'
  | 'academy'
  | 'unlimited';

export type PromptCategory =
  | 'All'
  | 'Recent'
  | 'Apps'
  | 'Sections'
  | 'Hero'
  | 'Landing Page'
  | 'SaaS'
  | '3D'
  | '3D Website'
  | 'Creative'
  | 'Portfolio'
  | 'Agency'
  | 'AI'
  | 'Travel'
  | 'Interactive'
  | 'Fintech'
  | 'Technology'
  | 'Wellness'
  | 'Ecommerce';

export type TargetAIBuilder =
  | 'antigravity'
  | 'claude-code'
  | 'cursor'
  | 'lovable'
  | 'bolt'
  | 'v0';

export type VisualPreviewShader =
  | 'liquid-video'
  | 'cursor-scrub'
  | 'scroll-canvas'
  | 'synaptic-3d'
  | 'prism-halo'
  | 'jellyfish-particle'
  | 'velorah-bento'
  | 'nordic-mist'
  | 'cyber-grid'
  | 'golden-portal';

export interface DesignPromptItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  categories: PromptCategory[];
  navSection: ('explore' | '3d-websites' | 'sections' | 'apps' | 'backgrounds')[];
  isFreeSample: boolean;
  isFeatured?: boolean;
  isNewDrop?: boolean;
  likes: number;
  copiesCount: string;
  videoUrl?: string;
  posterUrl: string;
  shaderType: VisualPreviewShader;
  techStack: string[];
  techniques: string[];
  tokens: {
    bgHex: string;
    surfaceHex: string;
    accentHex: string;
    headingFont: string;
    bodyFont: string;
  };
  defaultBrand: {
    name: string;
    tagline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  fullPrompt: string;
}

export interface AnimatedBackgroundAsset {
  id: string;
  title: string;
  styleTag: string;
  resolution: string;
  duration: string;
  fps: string;
  videoUrl: string;
  posterUrl: string;
  accentColor: string;
  promptSnippet: string;
}

export interface AcademyLesson {
  id: string;
  slug: string;
  title: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  thumbnailUrl: string;
  keyTakeaways: string[];
  steps: {
    stepNumber: number;
    heading: string;
    body: string;
    codeSnippet?: string;
  }[];
  associatedPromptId: string;
}

