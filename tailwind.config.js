/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#050508',
        titanium: '#0B0D13',
        crimson: '#E82127',
        'visor-gold': '#D4AF37',
        'thruster-cyan': '#38BDF8',
      },
      fontFamily: {
        light: ['Helvetica Neue Light', 'Helvetica Neue', 'Inter', 'sans-serif'],
        display: ['HelveticaNowDisplay-Medium', 'Inter', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
