/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#0A061A',
        void: '#05030D',
        accent: {
          purple: '#A855F7',
          indigo: '#6366F1',
        },
      },
      fontFamily: {
        sans: [
          'Helvetica Neue Light',
          'Helvetica Neue',
          'Inter',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        display: ['HelveticaNowDisplay-Medium', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

