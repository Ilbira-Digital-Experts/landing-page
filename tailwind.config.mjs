/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#FFFFFF',
          secondary: '#F7F9FC',
          card: '#FFFFFF',
          elevated: '#EFF2F7',
        },
        accent: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          dim: 'rgba(37,99,235,0.08)',
        },
        border: {
          DEFAULT: '#E2E6EE',
          subtle: '#EDF0F5',
          bright: '#C8CFDB',
        },
        text: {
          primary: '#0D1117',
          secondary: '#52617A',
          muted: '#8E99AB',
        },
        success: '#059669',
        warning: '#D97706',
        danger: '#DC2626',
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
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
