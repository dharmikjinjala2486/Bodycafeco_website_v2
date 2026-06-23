/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Global color foundation
        bg: {
          pure: '#FFFFFF',
          soft: '#FAFAF8',
          subtle: '#F7F7F5',
        },
        text: {
          dark: '#111111',
          body: '#222222',
          secondary: '#555555',
          muted: '#888888',
        },
        border: {
          light: '#EAEAEA',
          subtle: '#E5E5E5',
        },
        // Product specific accent colors
        brand: {
          creatine: '#005F73',    // Deep Teal
          vitamind3: '#1A365D',   // Deep Indigo
          omega3: '#8D99AE',      // Soft Blue Grey
          magnesium: '#959595',   // Cool Grey
          psyllium: '#C2A690',    // Warm Sand
          ltheanine: '#556B2F',   // Olive Green
          iron: '#C05621',        // Burnt Orange
          saffron: '#FFAA00',     // Golden Yellow
          berberine: '#8C5333',   // Brown
          beetroot: '#A61C3C',    // Deep Red
          myoinositol: '#B09FCA', // Soft Lavender
        }
      },
      fontFamily: {
        sans: ['Aileron', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        logo: ['LEMON MILK', 'Montserrat', 'Syne', 'sans-serif'],
      },
      letterSpacing: {
        superwide: '0.25em',
        editorial: '0.05em',
      },
      spacing: {
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.625' }],
        'lg': ['1.125rem', { lineHeight: '1.625' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.25' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.15' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
      },
      screens: {
        'xs': '320px',
        'sm': '375px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1440px',
        '2xl': '1920px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'blur-reveal': 'blurReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blurReveal: {
          '0%': { filter: 'blur(10px)', opacity: '0' },
          '100%': { filter: 'blur(0px)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
