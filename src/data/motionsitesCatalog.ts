import { DesignPromptItem, AnimatedBackgroundAsset, AcademyLesson, PromptCategory } from '../types/catalog';

export const ALL_CATEGORIES: PromptCategory[] = [
  'All',
  'Recent',
  '3D Website',
  'Hero',
  'Landing Page',
  'SaaS',
  'AI',
  'Interactive',
  'Portfolio',
  'Agency',
  'Sections',
  'Apps',
  '3D',
  'Creative',
  'Fintech',
  'Ecommerce',
  'Travel',
  'Wellness',
];

export const VERBATIM_DE_HELPERS_PROMPT = `Create a hero section with a fixed navbar and a sticky background video using React + TypeScript + Vite + Tailwind CSS + Framer Motion + lucide-react.
---
## SETUP
Font: In index.html <head>, load this stylesheet:
https://db.onlinewebfonts.com/c/0e6de1ec911a2e267ff136bbdd384a44?family=Helvetica+Neue+Light
Set the page title to DE</HELPERS - Outsourced Development Team.
Global CSS (index.css):
- Reset: * { margin: 0; padding: 0; box-sizing: border-box; }
- html { scroll-behavior: smooth; }
- body: font-family 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, sans-serif; background #000; color #fff; enable antialiased font smoothing (both webkit and moz).
- ::selection: background rgba(168, 85, 247, 0.4), color #fff.
---
## LIQUID GLASS CSS (class .liquid-glass)
.liquid-glass {
  background: linear-gradient(165deg, rgba(255,255,255,0.005) 0%, rgba(255,255,255,0.002) 40%, rgba(255,255,255,0.001) 100%);
  backdrop-filter: blur(18px) saturate(1.4) brightness(1.05);
  -webkit-backdrop-filter: blur(18px) saturate(1.4) brightness(1.05);
  border: none;
  box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.15);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.5px;
  background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.025) 15%, rgba(255,255,255,0.005) 40%, rgba(255,255,255,0.005) 60%, rgba(255,255,255,0.025) 85%, rgba(255,255,255,0.06) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
.liquid-glass::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.01) 0%, transparent 50%), radial-gradient(ellipse at center, transparent 55%, rgba(255,255,255,0.005) 80%, rgba(255,255,255,0.01) 100%);
  pointer-events: none;
}
---
## PAGE STRUCTURE
The outermost wrapper is <div className="relative" style={{ backgroundColor: '#0A061A' }}>.
### BACKGROUND VIDEO (sticky, scrolls behind content)
Wrap in <div className="relative z-0">. Inside, place a <div className="sticky top-0 h-screen w-full overflow-hidden"> containing:
- A <video> tag: autoPlay muted loop playsInline, class w-full h-full object-cover, with this exact src URL:
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260721_194026_53c6f9fd-f0d7-4d7d-be62-cdd53b253fb3.mp4
- An absolute overlay div covering the bottom 40% (inset-x-0 bottom-0 h-[40%] pointer-events-none) with inline style background: linear-gradient(to bottom, transparent, #0A061A).
After the sticky div, place a <div className="relative z-10 -mt-[100vh]"> containing the Nav and HeroContent (content scrolls over the video).
---
## NAV (fixed, z-50)
Fixed top navigation bar: fixed top-0 left-0 right-0 z-50, flex between, padding px-6 sm:px-8 md:px-12 py-5 md:py-6.
Logo (left): text-white font-light text-lg tracking-wide. Text is DE</ (using &lt;/) followed by <span className="font-normal">HELPERS</span>.
Desktop links (right, hidden md:flex, gap-2): Items: "About", "Our cases", "Services", "Prices". Active item ("About") gets border border-white/60 text-white. Others: text-white/70 hover:text-white. All: text-sm px-4 py-2 rounded-full transition-all duration-300.
After links: white pill button "Hire us" (bg-white text-black text-sm font-medium px-5 py-2 rounded-full hover:bg-white/90 ml-4).
---
## HERO CONTENT
Section: px-6 sm:px-8 md:px-12 pt-24 md:pt-32 pb-20 md:pb-40.
Inside: max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start.
Left column:
- <h1> with line breaks: "Outsourced / development / team" (use <br/>). Classes: text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight.
- Subtitle <p>: "Built off-site. Feels in-house." Classes: text-white/50 text-sm mt-6 font-light.
Right column (flex flex-col items-start md:items-end gap-4):
- Avatar row: flex -space-x-2 mb-2. Four <img> tags, each w-8 h-8 rounded-full border-2 border-black/50 object-cover:
  - https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100
  - https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100
  - https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100
  - https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100
- Testimonial card: max-w-sm w-full rounded-2xl liquid-glass p-5. Inside: <p className="text-white/90 text-sm font-light leading-relaxed"> with text: "Working with this team felt like unlocking a cheat code. I sent them a Figma + a wild idea, and a week later I had a working prototype with pixel-perfect animations. Fully remote, yet fully in sync."`;

export const VERBATIM_MAINFRAME_PROMPT = `Build a full-screen hero landing page for a creative agency called "Mainframe" using React, TypeScript, Vite, and Tailwind CSS. Here is every detail:
---
## FONTS
Load two fonts in index.html via these stylesheet links:
- Heading: https://db.onlinewebfonts.com/c/5ac3fe7c6abd2f62067f266d89671492?family=HelveticaNowDisplay-Medium
- Body: https://db.onlinewebfonts.com/c/1aa3377e489837a26d019bba501e779d?family=HelveticaNowDisplayW01-Rg
In index.css, define CSS variables:
:root {
  --font-heading: 'HelveticaNowDisplay-Medium', 'Helvetica Neue', Arial, sans-serif;
  --font-body: 'HelveticaNowDisplayW01-Rg', 'Helvetica Neue', Arial, sans-serif;
}
body { font-family: var(--font-body); }
---
## BACKGROUND VIDEO (mouse-scrub controlled)
- A full-screen <video> element is position: fixed; inset: 0; z-index: 0; object-fit: cover; object-position: 70% center;.
- Video source URL:
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4
- The video is muted, playsInline, preload="auto". It does NOT autoplay.
- The video scrubs forward/backward based on horizontal mouse movement. Use a mousemove event listener on window. Track prevX, compute delta = currentX - prevX, convert to a time offset: (delta / window.innerWidth) * SENSITIVITY * video.duration where SENSITIVITY = 0.8. Clamp targetTime between 0 and video.duration. Use video.currentTime to seek, and an onSeeked handler to queue the next seek if targetTime has moved, preventing seek-flooding.
---
## NAVBAR (fixed, z-index: 10)
- Fixed to top, full width. Padding: px-5 sm:px-8 py-4 sm:py-5. Flex row, justify-between, items-center.
- Logo (left): Flex row with gap-3. Text "Mainframe(R)" at text-[21px] sm:text-[26px], tracking-tight, white, using var(--font-heading). Beside it, a decorative asterisk character ✳ at text-[25px] sm:text-[30px], white.
- Desktop nav links (center, hidden below md): Flex row, text-[23px], white. Links: "Labs", "Studio", "Openings", "Shop" separated by commas rendered as ", ".
- Desktop CTA (right, hidden below md): An anchor "Get in touch" at text-[23px], white, underline underline-offset-2.
---
## HERO SECTION (z-index: 1)
- Full h-screen, flex column. On mobile: justify-end pb-12. On md: justify-center pb-0. Horizontal padding: px-5 sm:px-8 md:px-10.
- Content container: max-w-xl, relative z-10.
1. Blurred intro label:
   - Font size: clamp(18px, 4vw, 26px), line-height: 1.3, color: #fff, filter: blur(4px).
   - Line 1: "Hey there, meet A.R.I.A,"
   - Line 2: "Mainframe's Adaptive Response Interface Agent"
2. Typewriter text:
   - Text: "Glad you stopped in. Good taste tends to find us. Now, what are we building?"
   - Custom useTypewriter hook: speed 38ms per character, startDelay 600ms.
   - Blinking cursor: inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] with CSS blink animation.
3. Action pill buttons:
   - 4 white pill buttons: "Pitch us an idea", "Come work here", "Send a brief hello", "See how we operate".
   - 1 outline pill button: "Reach us: hello@mainframe.co" with inline SVG copy icon that copies to clipboard.`;

export const VERBATIM_NOVAAI_SCROLL_PROMPT = `# Exact recreation prompt — NovaAI landing page
Recreate this page **pixel-faithfully**. Stack: React + TypeScript + Vite + Tailwind CSS + lucide-react. Do not invent alternate copy, layout, fonts, colors, or effects.
---
## Page identity
- **Title:** NOVA_AI — Today AI Aligns With Bold Dreams
- **Brand:** lowercase novaai with a Lucide Hexagon icon (size 24, strokeWidth 1.5) to the left
- **Overall feel:** dark cinematic AI marketing site; full-viewport scroll-scrubbed video background; white typography with drop shadows; frosted glass UI chips; sparse editorial layout.
---
## Assets (use these exact URLs)
**Hero scroll video (CloudFront — required):**
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4
**Portrait (“Talk with Mitha”) — exact URL:**
https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85
Display as h-24 w-20 (96×80px), rounded-lg, object-cover.
---
## Global structure
relative root
  ScrollVideo (fixed inset-0 z-0, pointer-events-none)
  relative z-10 wrapper
  Navbar (fixed top)
  main
    SectionOne (min-h-screen / 100svh)
    spacer div h-[80vh] (aria-hidden) ← critical for scroll video length
    SectionTwo (min-h-screen / 100svh)
---
## Scroll-scrubbed video background (exact behavior)
Fixed full-bleed layer z-0, bg #0a0a0a, overflow-hidden, pointer-events-none.
Scroll mapping:
- progress = scrollY / (scrollHeight - innerHeight), clamped 0–1
- Smooth with lerp: smoothed += (target - smoothed) * 0.12 each requestAnimationFrame
- Extract up to 90 frames (or duration * 12, min 24) into an ImageBitmap cache or seek video.currentTime = smoothed * (duration - 0.05).
---
## Section One — Hero
Top row:
- Left service list (font-mono text-xs uppercase tracking-[0.15em]):
  / AI AUTOMATION
  / AI INTEGRATION
  / AI AGENT DEVELOPMENT
- Right intro: "We design automation that brings clarity, precision, and efficiency to the way your company operates."
Bottom row:
- Left badge: "We Automate 100+ Businesses" + H1: "Clear. Precise. Automated." (text-5xl sm:text-6xl lg:text-7xl)
- Right glass contact card: Mitha portrait + "Talk with Mitha" + "Co-founder of NovaAI" + "Book 15-mins call" white pill button.
---
## Section Two — Capability
Top row: "Insight On Demand" badge + "Our AI doesn't just respond — it interprets, sharpens, and delivers the signal you need."
Bottom row:
- Left H2: "Learn to see brilliantly." + dual CTAs ("Run the demo", "Free consultation")
- Right frosted capability panel (3 rows):
  01 Real-time vision — Reads context as it happens and surfaces what matters before you ask.
  02 Layered insight — Moves from rough outline to sharp output without losing the thread.
  03 Adaptive speed — Learns your cadence and tightens every pass as you work.`;

export const DESIGN_PROMPTS_CATALOG: DesignPromptItem[] = [
  {
    id: 'liquid-glass-agency-dehelpers',
    title: 'Liquid Glass Agency',
    subtitle: 'Sticky ambient loop video with refractive .liquid-glass cards & Helvetica Neue Light typography',
    badge: 'Landing Page',
    categories: ['All', 'Recent', 'Landing Page', 'Hero', 'Agency'],
    navSection: ['explore', 'sections'],
    isFreeSample: true,
    isFeatured: true,
    isNewDrop: true,
    likes: 1420,
    copiesCount: '18.4k',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260721_194026_53c6f9fd-f0d7-4d7d-be62-cdd53b253fb3.mp4',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_080403_214a9ac1-5b38-455c-96bf-111f05313264.png&w=1280&q=85',
    shaderType: 'liquid-video',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide'],
    techniques: ['Sticky Video Loop', 'Liquid Glass Shader', 'Mask-Composite Border', 'Staggered Mobile Overlay'],
    tokens: {
      bgHex: '#0A061A',
      surfaceHex: 'rgba(255,255,255,0.03)',
      accentHex: '#A855F7',
      headingFont: 'Helvetica Neue Light',
      bodyFont: 'Helvetica Neue Light',
    },
    defaultBrand: {
      name: 'DE</HELPERS',
      tagline: 'Outsourced development team. Built off-site. Feels in-house.',
      ctaPrimary: 'Hire us',
      ctaSecondary: 'Our cases',
    },
    fullPrompt: VERBATIM_DE_HELPERS_PROMPT,
  },
  {
    id: '3d-character-studio-mainframe',
    title: '3D Character Studio',
    subtitle: 'Horizontal cursor-scrubbed 3D character video with blurred intro label & custom typewriter hook',
    badge: '3D',
    categories: ['All', 'Recent', '3D', '3D Website', 'Interactive', 'Agency'],
    navSection: ['explore', '3d-websites'],
    isFreeSample: true,
    isFeatured: true,
    isNewDrop: true,
    likes: 1890,
    copiesCount: '24.1k',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd2ol7oe51mr4n9.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F44eba8ce-fc5f-4fb4-bc19-de013c1d7404.png&w=1920&q=85',
    shaderType: 'cursor-scrub',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5 Video Scrub'],
    techniques: ['Mouse-Scrubbed Video', 'Seek-Flood Prevention', 'Custom Typewriter Hook', 'One-Click Clipboard Pill'],
    tokens: {
      bgHex: '#08080C',
      surfaceHex: 'rgba(255,255,255,0.08)',
      accentHex: '#FFFFFF',
      headingFont: 'HelveticaNowDisplay-Medium',
      bodyFont: 'HelveticaNowDisplayW01-Rg',
    },
    defaultBrand: {
      name: 'Mainframe(R)',
      tagline: 'Glad you stopped in. Good taste tends to find us. Now, what are we building?',
      ctaPrimary: 'Pitch us an idea',
      ctaSecondary: 'See how we operate',
    },
    fullPrompt: VERBATIM_MAINFRAME_PROMPT,
  },
  {
    id: 'nova-ai-scroll-operations',
    title: 'Intelligent Operations (NovaAI)',
    subtitle: 'Scroll-scrubbed 90-frame 3D cable & neural sphere video with frosted capability panels',
    badge: 'AI',
    categories: ['All', 'Recent', 'AI', 'SaaS', '3D Website', 'Interactive'],
    navSection: ['explore', '3d-websites'],
    isFreeSample: true,
    isFeatured: true,
    likes: 1650,
    copiesCount: '19.7k',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261013_171627_ee7ad704-e8fd-4204-bde6-b3fe87cb3d2b.png&w=1280&q=85',
    shaderType: 'scroll-canvas',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Canvas ImageBitmap', 'Lucide'],
    techniques: ['90-Frame Scroll Cache', 'Lerp 0.12 Smoothing', 'IntersectionObserver Reveal', 'Left-Accent Glass Badges'],
    tokens: {
      bgHex: '#0A0A0A',
      surfaceHex: 'rgba(255,255,255,0.12)',
      accentHex: '#F59E0B',
      headingFont: 'Inter',
      bodyFont: 'Inter',
    },
    defaultBrand: {
      name: 'novaai',
      tagline: 'Clear. Precise. Automated.',
      ctaPrimary: 'Run the demo',
      ctaSecondary: 'Book 15-mins call',
    },
    fullPrompt: VERBATIM_NOVAAI_SCROLL_PROMPT,
  },
  {
    id: 'synaptic-forge-3d',
    title: 'SynapticForge',
    subtitle: 'Interactive 3D neural lattice with mouse-reactive transmission shaders & telemetry HUD',
    badge: 'Interactive',
    categories: ['All', '3D Website', '3D', 'Interactive', 'AI', 'Technology'],
    navSection: ['explore', '3d-websites'],
    isFreeSample: false,
    isNewDrop: true,
    likes: 980,
    copiesCount: '11.2k',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261013_171627_ee7ad704-e8fd-4204-bde6-b3fe87cb3d2b.png&w=1280&q=85',
    shaderType: 'synaptic-3d',
    techStack: ['React', 'Three.js', 'React Three Fiber', 'Tailwind CSS', 'Framer Motion'],
    techniques: ['WebGL Particle Lattice', 'Cursor Lerp Tilt', 'Word-by-Word Blur Reveal', 'Monospace Telemetry Grid'],
    tokens: {
      bgHex: '#05050B',
      surfaceHex: 'rgba(99,102,241,0.08)',
      accentHex: '#818CF8',
      headingFont: 'Inter',
      bodyFont: 'JetBrains Mono',
    },
    defaultBrand: {
      name: 'SynapticForge',
      tagline: 'Autonomous neural infrastructure for real-time spatial computing.',
      ctaPrimary: 'Deploy Cluster',
      ctaSecondary: 'Inspect Benchmarks',
    },
    fullPrompt: `Build the SynapticForge 3D interactive landing page using React + TypeScript + Tailwind CSS + Framer Motion + HTML5 Canvas / Three.js.
---
## VISUAL DIRECTION & TOKENS
- Background: #05050B with a full-viewport interactive 3D node-and-synapse particle network rendered at 60fps.
- Accent palette: Indigo #818CF8, Violet #A855F7, and crisp 1px rgba(255,255,255,0.12) HUD grid lines.
- Top HUD Bar: Fixed z-50 liquid-glass bar displaying live FPS counter, cursor coordinates (X/Y), and pill links ("Nodes", "Topology", "Benchmarks", "Docs").
- Hero Layout: Split 12-column grid with staggered word-by-word blur headline ("Autonomous Neural Infrastructure at Sub-Millisecond Scale") and a floating .liquid-glass telemetry card with live sparkline bars.`,
  },
  {
    id: 'velorah-focus-section',
    title: 'Velorah Focus',
    subtitle: 'Bento spotlight section with radial cursor border tracking & kinetic metric counters',
    badge: 'Sections',
    categories: ['All', 'Sections', 'SaaS', 'Interactive'],
    navSection: ['explore', 'sections'],
    isFreeSample: false,
    likes: 845,
    copiesCount: '9.8k',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_080403_214a9ac1-5b38-455c-96bf-111f05313264.png&w=1280&q=85',
    shaderType: 'velorah-bento',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    techniques: ['Radial Cursor Spotlight', 'Bento Asymmetric Grid', 'Spring Counter', 'Liquid Glass Pills'],
    tokens: {
      bgHex: '#090614',
      surfaceHex: 'rgba(255,255,255,0.03)',
      accentHex: '#C084FC',
      headingFont: 'Inter',
      bodyFont: 'Inter',
    },
    defaultBrand: {
      name: 'Velorah',
      tagline: 'Engineered to convert, impress, and command attention.',
      ctaPrimary: 'Start Free Trial',
      ctaSecondary: 'View Components',
    },
    fullPrompt: `Create the Velorah Focus Bento Section using React + TypeScript + Tailwind CSS + Framer Motion.
---
## BENTO ARCHITECTURE
- 6-card asymmetric bento grid (grid-cols-1 md:grid-cols-12 gap-5 max-w-7xl mx-auto).
- Every card applies .liquid-glass and tracks mouse coordinates via onMouseMove to set CSS variables --mouse-x and --mouse-y for a 420px radial purple spotlight glow along the 1.5px border mask.
- Includes an interactive toggle switch, animated SVG throughput wave, and staggered Framer Motion entrance transitions.`,
  },
  {
    id: 'loops-virtual-3d-store',
    title: 'Loops Virtual Store',
    subtitle: 'Spatial 3D e-commerce showcase with interactive product orbit & glassmorphic bag drawer',
    badge: '3D Store',
    categories: ['All', '3D Website', '3D', 'Ecommerce', 'Interactive'],
    navSection: ['explore', '3d-websites'],
    isFreeSample: false,
    likes: 1120,
    copiesCount: '13.5k',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260731_002124_4930e8c2-c16c-4746-a7e4-fb7cfd9cceca.png&w=1280&q=85',
    shaderType: 'prism-halo',
    techStack: ['React', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
    techniques: ['3D Product Turntable', 'Glassmorphic Cart Drawer', 'Colorway Shader Switcher', 'Magnetic Buy CTA'],
    tokens: {
      bgHex: '#0B0914',
      surfaceHex: 'rgba(255,255,255,0.04)',
      accentHex: '#38BDF8',
      headingFont: 'HelveticaNowDisplay-Medium',
      bodyFont: 'Inter',
    },
    defaultBrand: {
      name: 'LOOPS®',
      tagline: 'Spatial audio hardware sculpted from anodized titanium and acoustic glass.',
      ctaPrimary: 'Reserve Edition 01 — $349',
      ctaSecondary: 'Explore 360° Spec',
    },
    fullPrompt: `Build the Loops Virtual 3D Store hero and spatial product customizer using React + TypeScript + Tailwind CSS + Framer Motion.
---
## FEATURES
- Interactive 360-degree product stage with colorway switcher pills (Obsidian Titanium, Lunar Silver, Ultraviolet Glass).
- Floating .liquid-glass specification badges anchored to product hotspots with SVG leader lines.
- Slide-over glassmorphic bag drawer with spring quantity transitions.`,
  },
  {
    id: 'particle-brain-scroll-3d',
    title: 'Particle Brain',
    subtitle: 'Scroll-driven 3D point-cloud morphogenesis with bloom post-processing & editorial captions',
    badge: 'Scroll-Driven 3D',
    categories: ['All', '3D', '3D Website', 'AI', 'Interactive'],
    navSection: ['explore', '3d-websites', 'backgrounds'],
    isFreeSample: false,
    likes: 1340,
    copiesCount: '15.9k',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261013_171627_ee7ad704-e8fd-4204-bde6-b3fe87cb3d2b.png&w=1280&q=85',
    shaderType: 'jellyfish-particle',
    techStack: ['React', 'WebGL Canvas', 'Tailwind CSS', 'Framer Motion'],
    techniques: ['Point-Cloud Morphing', 'Scroll-Linked Camera Orbit', 'Editorial Serif Accents'],
    tokens: {
      bgHex: '#040309',
      surfaceHex: 'rgba(255,255,255,0.03)',
      accentHex: '#F472B6',
      headingFont: 'Instrument Serif',
      bodyFont: 'Inter',
    },
    defaultBrand: {
      name: 'CORTEX.LAB',
      tagline: 'Where biological intuition converges with foundation model weights.',
      ctaPrimary: 'Read Research Note',
      ctaSecondary: 'Launch Visualizer',
    },
    fullPrompt: `Build the Particle Brain scroll-driven 3D showcase using React + TypeScript + Tailwind CSS + HTML5 Canvas point-cloud projection.
---
## ARCHITECTURE
- Render 2,400 Fibonacci-sphere particles in 3D space that morph between a chaotic nebula, a cortical hemisphere, and a geometric torus as the user scrolls or moves their cursor.
- Overlay sparse editorial typography in Instrument Serif Italic and Inter Light with .liquid-glass citation pills.`,
  },
  {
    id: 'halvoy-nordic-cabin',
    title: 'Halvøy Nordic Cabin Site',
    subtitle: 'Atmospheric travel scrollytelling with mist parallax, coordinate compass & booking bar',
    badge: 'Travel',
    categories: ['All', 'Travel', 'Landing Page', 'Interactive', 'Wellness'],
    navSection: ['explore'],
    isFreeSample: false,
    likes: 790,
    copiesCount: '8.4k',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85',
    shaderType: 'nordic-mist',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    techniques: ['Atmospheric Fog Layer', 'Floating Booking Bar', 'GPS Coordinate Ticker', 'Smooth Image Reveal'],
    tokens: {
      bgHex: '#0B1114',
      surfaceHex: 'rgba(255,255,255,0.05)',
      accentHex: '#34D399',
      headingFont: 'Instrument Serif',
      bodyFont: 'Inter',
    },
    defaultBrand: {
      name: 'HALVØY ARCHIPELAGO',
      tagline: '68°14′N 14°33′E — Off-grid architectural cabins carved into the Norwegian Sea.',
      ctaPrimary: 'Check Seasonal Availability',
      ctaSecondary: 'Explore the Cabins',
    },
    fullPrompt: `Build the Halvøy Nordic Cabin architectural travel website using React + TypeScript + Tailwind CSS + Framer Motion.
---
## LAYOUT
- Full-bleed atmospheric fjord backdrop with animated mist gradient layers and live GPS coordinate ticker (68°14'N 14°33'E).
- Bottom-docked .liquid-glass reservation bar with Check-In, Check-Out, Guests selector, and instant nightly rate calculation.`,
  },
  {
    id: 'halo-prism-3d',
    title: 'Halo Prism',
    subtitle: 'Chromatic dispersion glass ring with spectral caustics & word-by-word blur hero',
    badge: '3D',
    categories: ['All', '3D', '3D Website', 'Hero', 'Creative'],
    navSection: ['explore', '3d-websites', 'backgrounds'],
    isFreeSample: false,
    likes: 1210,
    copiesCount: '14.2k',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260721_194026_53c6f9fd-f0d7-4d7d-be62-cdd53b253fb3.mp4',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_080403_214a9ac1-5b38-455c-96bf-111f05313264.png&w=1280&q=85',
    shaderType: 'prism-halo',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    techniques: ['Spectral Conic Caustics', 'Word-by-Word Blur Headline', 'Liquid Glass Pill Nav'],
    tokens: {
      bgHex: '#070412',
      surfaceHex: 'rgba(255,255,255,0.03)',
      accentHex: '#EC4899',
      headingFont: 'Helvetica Neue Light',
      bodyFont: 'Inter',
    },
    defaultBrand: {
      name: 'PRISM.OS',
      tagline: 'Light-speed creative workflows rendered in real time.',
      ctaPrimary: 'Download macOS Beta',
      ctaSecondary: 'Watch Film (01:42)',
    },
    fullPrompt: `Build the Halo Prism 3D hero section with spectral conic caustics, .liquid-glass navigation, and staggered word-by-word blur reveal typography.`,
  },
  {
    id: 'stellarmind-ai-hero',
    title: 'StellarMind Hero',
    subtitle: 'Next-gen AI product hero with interactive command bar, token stream & orbital rings',
    badge: 'AI Product',
    categories: ['All', 'AI', 'SaaS', 'Hero', 'Technology'],
    navSection: ['explore', 'sections'],
    isFreeSample: false,
    likes: 930,
    copiesCount: '11.6k',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261013_171627_ee7ad704-e8fd-4204-bde6-b3fe87cb3d2b.png&w=1280&q=85',
    shaderType: 'synaptic-3d',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    techniques: ['Interactive Prompt Input', 'Orbital Horizon Glow', 'Live Token Latency Badge'],
    tokens: {
      bgHex: '#080517',
      surfaceHex: 'rgba(168,85,247,0.06)',
      accentHex: '#A855F7',
      headingFont: 'Inter',
      bodyFont: 'Inter',
    },
    defaultBrand: {
      name: 'StellarMind',
      tagline: 'Ask once. Orchestrate every agent across your stack.',
      ctaPrimary: 'Start Building Free',
      ctaSecondary: 'Read API Docs',
    },
    fullPrompt: `Build the StellarMind AI Product Hero with an interactive live prompt bar, orbital horizon glow, and .liquid-glass agent execution cards.`,
  },
  {
    id: 'finsmith-motion-fintech',
    title: 'FinSmith',
    subtitle: 'Institutional treasury motion design with real-time yield curves & metallic glass cards',
    badge: 'Fintech',
    categories: ['All', 'Fintech', 'SaaS', 'Landing Page'],
    navSection: ['explore', 'apps'],
    isFreeSample: false,
    likes: 760,
    copiesCount: '7.9k',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260731_002124_4930e8c2-c16c-4746-a7e4-fb7cfd9cceca.png&w=1280&q=85',
    shaderType: 'golden-portal',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    techniques: ['Animated SVG Yield Curve', 'Metallic Specular Cards', 'Currency Ticker'],
    tokens: {
      bgHex: '#07090E',
      surfaceHex: 'rgba(255,255,255,0.03)',
      accentHex: '#FBBF24',
      headingFont: 'Helvetica Neue Light',
      bodyFont: 'JetBrains Mono',
    },
    defaultBrand: {
      name: 'FinSmith Treasury',
      tagline: 'Automated multi-currency liquidity and T-Bill yield orchestration.',
      ctaPrimary: 'Open Corporate Account',
      ctaSecondary: 'Calculate Yield',
    },
    fullPrompt: `Build the FinSmith Fintech landing page with an interactive yield curve visualizer, .liquid-glass balance cards, and real-time APY calculator.`,
  },
  {
    id: 'orvante-creative-agency',
    title: 'Orvante Agency',
    subtitle: 'Editorial luxury design studio with hover ink reveal reels & horizontal case study ribbon',
    badge: 'Agency',
    categories: ['All', 'Agency', 'Portfolio', 'Creative', 'Landing Page'],
    navSection: ['explore'],
    isFreeSample: false,
    likes: 880,
    copiesCount: '10.3k',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_080403_214a9ac1-5b38-455c-96bf-111f05313264.png&w=1280&q=85',
    shaderType: 'liquid-video',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    techniques: ['Video Ribbon Marquee', 'Hover Ink Mask Reveal', 'Editorial Serif Typography'],
    tokens: {
      bgHex: '#09080C',
      surfaceHex: 'rgba(255,255,255,0.04)',
      accentHex: '#E879F9',
      headingFont: 'Instrument Serif',
      bodyFont: 'Inter',
    },
    defaultBrand: {
      name: 'ORVANTE®',
      tagline: 'We craft category-defining digital flagships for ambitious founders.',
      ctaPrimary: 'Book Discovery Call',
      ctaSecondary: 'Selected Works (14)',
    },
    fullPrompt: `Build the Orvante Agency editorial portfolio with a kinetic video ribbon, hover ink-reveal project cards, and .liquid-glass navigation.`,
  },
  {
    id: 'halftone-faq-section',
    title: 'Halftone FAQ & Pricing',
    subtitle: 'Interactive accordion and 3-tier liquid-glass pricing matrix with billing toggle',
    badge: 'Sections',
    categories: ['All', 'Sections', 'SaaS'],
    navSection: ['explore', 'sections'],
    isFreeSample: false,
    likes: 690,
    copiesCount: '8.1k',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260731_002124_4930e8c2-c16c-4746-a7e4-fb7cfd9cceca.png&w=1280&q=85',
    shaderType: 'cyber-grid',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    techniques: ['Halftone Dot Pattern', 'Spring Accordion', 'Animated Price Counter'],
    tokens: {
      bgHex: '#0A061A',
      surfaceHex: 'rgba(255,255,255,0.03)',
      accentHex: '#A855F7',
      headingFont: 'Inter',
      bodyFont: 'Inter',
    },
    defaultBrand: {
      name: 'Halftone UI',
      tagline: 'Drop-in conversion sections with tactile motion physics.',
      ctaPrimary: 'Get Unlimited Access',
      ctaSecondary: 'Compare Plans',
    },
    fullPrompt: `Build the Halftone FAQ & Pricing section with radial dot-matrix background, spring-animated accordions, and .liquid-glass tier cards.`,
  },
  {
    id: 'jellyfish-scroll-interactive',
    title: 'Jellyfish Scroll',
    subtitle: 'Bioluminescent deep-sea scrollytelling with procedural tentacle waves & depth meter',
    badge: 'Interactive',
    categories: ['All', 'Interactive', '3D', 'Creative'],
    navSection: ['explore', '3d-websites', 'backgrounds'],
    isFreeSample: false,
    likes: 1150,
    copiesCount: '12.7k',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261013_171627_ee7ad704-e8fd-4204-bde6-b3fe87cb3d2b.png&w=1280&q=85',
    shaderType: 'jellyfish-particle',
    techStack: ['React', 'HTML5 Canvas', 'Tailwind CSS', 'Framer Motion'],
    techniques: ['Bioluminescent Sine Waves', 'Vertical Depth Altimeter', 'Glassmorphic Specimen Cards'],
    tokens: {
      bgHex: '#030712',
      surfaceHex: 'rgba(56,189,248,0.06)',
      accentHex: '#38BDF8',
      headingFont: 'Instrument Serif',
      bodyFont: 'JetBrains Mono',
    },
    defaultBrand: {
      name: 'ABYSSAL.BIO',
      tagline: 'Exploring bioluminescent neural signaling at 3,800 meters depth.',
      ctaPrimary: 'Enter Expedition',
      ctaSecondary: 'Specimen Catalog',
    },
    fullPrompt: `Build the Jellyfish Scroll interactive scrollytelling experience with procedural bioluminescent sine-wave filaments and a live depth altimeter.`,
  },
  {
    id: 'modern-hr-ai-dashboard-app',
    title: 'AI Assistant & HR Command App',
    subtitle: 'Full-screen glassmorphic web application shell with command palette, agent stream & charts',
    badge: 'AI App',
    categories: ['All', 'Apps', 'AI', 'SaaS'],
    navSection: ['explore', 'apps'],
    isFreeSample: false,
    isNewDrop: true,
    likes: 820,
    copiesCount: '9.4k',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260731_002124_4930e8c2-c16c-4746-a7e4-fb7cfd9cceca.png&w=1280&q=85',
    shaderType: 'velorah-bento',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide'],
    techniques: ['App Sidebar Shell', 'Real-Time Agent Stream', 'Interactive KPI Cards'],
    tokens: {
      bgHex: '#080614',
      surfaceHex: 'rgba(255,255,255,0.04)',
      accentHex: '#818CF8',
      headingFont: 'Inter',
      bodyFont: 'Inter',
    },
    defaultBrand: {
      name: 'PulseOS App',
      tagline: 'Autonomous workforce intelligence and real-time sprint telemetry.',
      ctaPrimary: 'Launch Workspace',
      ctaSecondary: 'Invite Team',
    },
    fullPrompt: `Build the PulseOS AI Assistant & HR Dashboard App with a collapsible .liquid-glass sidebar, live agent activity feed, and interactive telemetry charts.`,
  },
  {
    id: 'freight-scroll-hero',
    title: 'Freight Scroll Hero',
    subtitle: 'Global logistics command center with animated route arcs, vessel telemetry & glass manifest',
    badge: 'Logistics',
    categories: ['All', 'Hero', 'Landing Page', 'Technology', 'Interactive'],
    navSection: ['explore', 'sections'],
    isFreeSample: false,
    likes: 740,
    copiesCount: '7.2k',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd2ol7oe51mr4n9.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F44eba8ce-fc5f-4fb4-bc19-de013c1d7404.png&w=1920&q=85',
    shaderType: 'cyber-grid',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    techniques: ['SVG Bezier Route Arcs', 'Live Container Telemetry', 'Split Glass Manifest'],
    tokens: {
      bgHex: '#060A10',
      surfaceHex: 'rgba(255,255,255,0.04)',
      accentHex: '#2DD4BF',
      headingFont: 'HelveticaNowDisplay-Medium',
      bodyFont: 'JetBrains Mono',
    },
    defaultBrand: {
      name: 'CARGOX GLOBAL',
      tagline: 'Autonomous cross-border freight routing with zero blind spots.',
      ctaPrimary: 'Track Shipment',
      ctaSecondary: 'Request Quote',
    },
    fullPrompt: `Build the Freight Scroll Hero with animated SVG global route arcs, monospace container telemetry badges, and .liquid-glass manifest cards.`,
  },
];

export const ANIMATED_BACKGROUNDS_CATALOG: AnimatedBackgroundAsset[] = [
  {
    id: 'bg-obsidian-silk',
    title: 'Obsidian Violet Silk Waves',
    styleTag: 'Liquid Glass Hero Loop',
    resolution: '1920×1080 (60fps)',
    duration: '00:12 Seamless Loop',
    fps: '60 FPS',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260721_194026_53c6f9fd-f0d7-4d7d-be62-cdd53b253fb3.mp4',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_080403_214a9ac1-5b38-455c-96bf-111f05313264.png&w=1280&q=85',
    accentColor: '#A855F7',
    promptSnippet: `<div className="sticky top-0 h-screen w-full overflow-hidden">\n  <video autoPlay muted loop playsInline className="w-full h-full object-cover" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260721_194026_53c6f9fd-f0d7-4d7d-be62-cdd53b253fb3.mp4" />\n  <div className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #0A061A)' }} />\n</div>`,
  },
  {
    id: 'bg-retrofuturist-character',
    title: 'A.R.I.A. Retrofuturist Studio',
    styleTag: 'Mouse-Scrubbed 3D Video',
    resolution: '1920×1080',
    duration: '00:05 Scrubbable',
    fps: '60 FPS',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd2ol7oe51mr4n9.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F44eba8ce-fc5f-4fb4-bc19-de013c1d7404.png&w=1920&q=85',
    accentColor: '#38BDF8',
    promptSnippet: `<video ref={videoRef} muted playsInline preload="auto" className="fixed inset-0 w-full h-full object-cover object-[70%_center] z-0" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4" />`,
  },
  {
    id: 'bg-neural-cables-sphere',
    title: 'Neural Gold Cables & Cortical Sphere',
    styleTag: 'Scroll-Scrubbed 3D Sequence',
    resolution: '1920×1080',
    duration: '90-Frame Scroll Sequence',
    fps: '60 FPS',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261013_171627_ee7ad704-e8fd-4204-bde6-b3fe87cb3d2b.png&w=1280&q=85',
    accentColor: '#F59E0B',
    promptSnippet: `// Scroll-mapped video background with 0.12 lerp smoothing\nconst progress = Math.min(1, Math.max(0, window.scrollY / (document.body.scrollHeight - window.innerHeight)));\nsmoothed += (progress - smoothed) * 0.12;\nvideo.currentTime = smoothed * (video.duration - 0.05);`,
  },
  {
    id: 'bg-prism-dispersion',
    title: 'Prism Glass Ring & Spectral Dispersion',
    styleTag: 'Procedural Glass Caustics',
    resolution: '1920×1080 (60fps)',
    duration: '00:15 Seamless Loop',
    fps: '60 FPS',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260721_194026_53c6f9fd-f0d7-4d7d-be62-cdd53b253fb3.mp4',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_080403_214a9ac1-5b38-455c-96bf-111f05313264.png&w=1280&q=85',
    accentColor: '#EC4899',
    promptSnippet: `<div className="fixed inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.15),transparent_70%)]" />`,
  },
  {
    id: 'bg-deep-bioluminescence',
    title: 'Deep Abyss Bioluminescent Filaments',
    styleTag: 'Procedural Sine Wave Mesh',
    resolution: '1920×1080',
    duration: 'Procedural Shader Loop',
    fps: '60 FPS',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261013_171627_ee7ad704-e8fd-4204-bde6-b3fe87cb3d2b.png&w=1280&q=85',
    accentColor: '#38BDF8',
    promptSnippet: `<canvas id="bioluminescence-stage" className="fixed inset-0 pointer-events-none z-0" />`,
  },
  {
    id: 'bg-cyber-freight-arcs',
    title: 'Cybernetic Telemetry & Route Arcs',
    styleTag: 'SVG Vector Motion Flow',
    resolution: '1920×1080',
    duration: '00:08 Scrubbable',
    fps: '60 FPS',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4',
    posterUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd2ol7oe51mr4n9.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F44eba8ce-fc5f-4fb4-bc19-de013c1d7404.png&w=1920&q=85',
    accentColor: '#2DD4BF',
    promptSnippet: `<svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"><path d="M 100 200 Q 400 50 800 300" stroke="#2DD4BF" strokeWidth="1.5" fill="none" strokeDasharray="6 6" /></svg>`,
  },
];

export const ACADEMY_LESSONS: AcademyLesson[] = [
  {
    id: 'lesson-1-liquid-glass',
    slug: 'build-animated-website-with-motionsites',
    title: 'How to Build an Animated Website with AI and MotionSites',
    duration: '08:15',
    level: 'Beginner',
    summary: 'Create a premium React website featuring a fixed responsive navbar, a sticky background video, refractive liquid-glass effects, and Framer Motion animations.',
    thumbnailUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261102_080403_214a9ac1-5b38-455c-96bf-111f05313264.png&w=1280&q=85',
    associatedPromptId: 'liquid-glass-agency-dehelpers',
    keyTakeaways: [
      'Use a sticky top-0 h-screen video wrapper paired with a relative z-10 -mt-[100vh] foreground container so content glides seamlessly over the video.',
      'Combine backdrop-filter: blur(18px) saturate(1.4) with a ::before mask-composite: exclude gradient border for authentic refractive liquid glass.',
      'Let the AI builder generate the complete first version before prompting incremental brand customizations.',
    ],
    steps: [
      {
        stepNumber: 1,
        heading: '1. Choose a MotionSites Design',
        body: 'Select a design with the typography, layout, animations, and overall style you want—including a fixed responsive navbar, sticky background video, and liquid-glass effects.',
      },
      {
        stepNumber: 2,
        heading: '2. Copy and Paste the Full Prompt',
        body: 'Click Copy Full Prompt and paste it directly into Google Antigravity IDE, Claude Code, Cursor, Bolt, or Lovable.',
        codeSnippet: VERBATIM_DE_HELPERS_PROMPT.slice(0, 680) + '\n...',
      },
      {
        stepNumber: 3,
        heading: '3. Customize for Your Brand',
        body: 'Prompt your AI agent: "Keep the current layout, typography, colors, animations, and responsive behavior. Rewrite the website for my business and add services, case studies, FAQs, and a final call to action."',
      },
    ],
  },
  {
    id: 'lesson-2-cursor-tracking',
    slug: 'cursor-tracking-website-with-motionsites',
    title: 'Build a Cursor-Tracking Website in Minutes with MotionSites AI',
    duration: '06:40',
    level: 'Intermediate',
    summary: 'Build an interactive 3D Character Studio hero where the background video scrubs smoothly forward and backward in response to horizontal mouse movement.',
    thumbnailUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd2ol7oe51mr4n9.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F44eba8ce-fc5f-4fb4-bc19-de013c1d7404.png&w=1920&q=85',
    associatedPromptId: '3d-character-studio-mainframe',
    keyTakeaways: [
      'Bind window mousemove deltas to video.currentTime using (delta / window.innerWidth) * 0.8 * video.duration.',
      'Prevent video seek-flooding by queuing updates inside an onSeeked event listener.',
      'Pair a blurred intro label (filter: blur(4px)) with a 38ms/char typewriter hook for high-fashion agency polish.',
    ],
    steps: [
      {
        stepNumber: 1,
        heading: '1. Prepare Two Character Keyframes',
        body: 'Create Version 1 (character looking at the camera, 16:9) and Version 2 (character looking to the side) and animate a 4-second transition.',
      },
      {
        stepNumber: 2,
        heading: '2. Copy the 3D Character Studio Prompt',
        body: 'Copy the exact Mainframe retrofuturist specification with built-in mouse-scrubbing and seek-flood protection.',
        codeSnippet: VERBATIM_MAINFRAME_PROMPT.slice(0, 680) + '\n...',
      },
      {
        stepNumber: 3,
        heading: '3. Deploy and Connect Interactions',
        body: 'Ensure the video has preload="auto" and wire the interactive action pills to navigate to discovery or copy direct contact details.',
      },
    ],
  },
  {
    id: 'lesson-3-scroll-animated',
    slug: 'build-scroll-animated-website-with-ai',
    title: 'How to Build a Scroll-Animated 3D Website With AI',
    duration: '10:20',
    level: 'Advanced',
    summary: 'Connect a 90-frame 3D video sequence to the visitor’s scroll position with 0.12 requestAnimationFrame lerp smoothing and frosted glass capability cards.',
    thumbnailUrl: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20261013_171627_ee7ad704-e8fd-4204-bde6-b3fe87cb3d2b.png&w=1280&q=85',
    associatedPromptId: 'nova-ai-scroll-operations',
    keyTakeaways: [
      'Insert an 80vh spacer div between full-viewport sections so the scroll-scrubbed video has generous travel distance.',
      'Smooth scroll progress using smoothed += (target - smoothed) * 0.12 inside requestAnimationFrame.',
      'Never cover a scroll-animated 3D video with opaque backgrounds—use bg-white/10 backdrop-blur-md glass panels.',
    ],
    steps: [
      {
        stepNumber: 1,
        heading: '1. Configure the Scroll-Scrubbed Video Layer',
        body: 'Mount a fixed inset-0 z-0 video/canvas layer that maps scrollY / (scrollHeight - innerHeight) to the video timeline.',
      },
      {
        stepNumber: 2,
        heading: '2. Copy the NovaAI Pixel-Faithful Prompt',
        body: 'Paste the full NovaAI specification into Antigravity IDE and test across desktop and mobile viewports.',
        codeSnippet: VERBATIM_NOVAAI_SCROLL_PROMPT.slice(0, 680) + '\n...',
      },
      {
        stepNumber: 3,
        heading: '3. Implement Lerp Loop',
        body: 'Implement a requestAnimationFrame lerp loop with factor 0.12 so high-velocity trackpad scrolling remains silky smooth.',
      },
    ],
  },
];

