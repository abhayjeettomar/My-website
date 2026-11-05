import { DesignPromptItem, TargetAIBuilder } from '../types/catalog';

export interface RemixConfig {
  brandName: string;
  tagline: string;
  accentHex: string;
  customVideoUrl: string;
  targetBuilder: TargetAIBuilder;
}

export function compileRemixedPrompt(item: DesignPromptItem, remix: RemixConfig): string {
  const builderHeaderMap: Record<TargetAIBuilder, string> = {
    'antigravity': `# GOOGLE ANTIGRAVITY IDE (agy) — SINGLE-SHOT EXECUTION SPEC\n# Target Design: ${item.title} (${item.badge})\n# Agent Directive: Scaffold, implement all components with zero placeholders, run npm run build, and verify in the Antigravity browser preview at 1440x900 and 390x844.`,
    'claude-code': `# CLAUDE CODE — AWARD-LEVEL CINEMATIC LANDING PAGE SPEC\n# Target Design: ${item.title}\n# Execute full build + Playwright look-and-fix verification loop.`,
    'cursor': `# CURSOR COMPOSER — MULTI-FILE REACT + TAILWIND + FRAMER MOTION SPEC\n# Target Design: ${item.title}`,
    'lovable': `# LOVABLE.DEV — PIXEL-FAITHFUL FULL-SCREEN MOTION PROMPT\n# Target Design: ${item.title}`,
    'bolt': `# BOLT.NEW — VITE + REACT + TYPESCRIPT + TAILWIND + FRAMER MOTION PROMPT\n# Target Design: ${item.title}`,
    'v0': `# V0.DEV — NEXT.JS / REACT MOTION COMPONENT SPECIFICATION\n# Target Design: ${item.title}`,
  };

  let promptBody = item.fullPrompt;

  // Apply brand & asset overrides if changed by the user
  if (remix.brandName.trim() && remix.brandName !== item.defaultBrand.name) {
    promptBody = promptBody.replaceAll(item.defaultBrand.name, remix.brandName.trim());
  }
  if (remix.tagline.trim() && remix.tagline !== item.defaultBrand.tagline) {
    promptBody = promptBody.replaceAll(item.defaultBrand.tagline, remix.tagline.trim());
  }
  if (remix.accentHex.trim() && remix.accentHex !== item.tokens.accentHex) {
    promptBody = promptBody.replaceAll(item.tokens.accentHex, remix.accentHex.trim());
  }
  if (remix.customVideoUrl.trim() && item.videoUrl) {
    promptBody = promptBody.replaceAll(item.videoUrl, remix.customVideoUrl.trim());
  }

  const remixOverrideBlock = `
---
## BRAND & DESIGN TOKEN OVERRIDES
- **Brand Name**: \`${remix.brandName || item.defaultBrand.name}\`
- **Primary Headline / Tagline**: \`${remix.tagline || item.defaultBrand.tagline}\`
- **Primary Canvas Background**: \`${item.tokens.bgHex}\`
- **Primary Accent Color**: \`${remix.accentHex || item.tokens.accentHex}\`
- **Heading Font**: \`${item.tokens.headingFont}\`
- **Body Font**: \`${item.tokens.bodyFont}\`
- **Hero Video Asset**: \`${remix.customVideoUrl || item.videoUrl || 'Procedural WebGL / Canvas Shader'}\`
- **Required Techniques**: ${item.techniques.join(' · ')}
`;

  return `${builderHeaderMap[remix.targetBuilder]}\n${remixOverrideBlock}\n---\n${promptBody}`;
}

