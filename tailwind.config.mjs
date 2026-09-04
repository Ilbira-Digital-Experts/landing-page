/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#FFFFFF',
          secondary: '#F7F5F1',
          card: '#FFFFFF',
          elevated: '#F1EEE8',
        },
        accent: {
          DEFAULT: '#EA4E1C',
          hover: '#CC3F12',
          dim: 'rgba(234,78,28,0.08)',
        },
        border: {
          DEFAULT: '#E7E2D9',
          subtle: '#F0ECE4',
          bright: '#D6CFC1',
        },
        text: {
          primary: '#1C1917',
          secondary: '#57534E',
          muted: '#A29C93',
        },
        success: '#059669',
        warning: '#D97706',
        danger: '#DC2626',
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['SF Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
