/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { opacity: 0, transform: 'translateX(70%)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { opacity: 1, transform: 'translateX(0)' },
          '100%': { opacity: 0, transform: 'translateX(100%)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(70%)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: 1, transform: 'translateY(0)' },
          '100%': {
            opacity: 0,
            transform: 'translateY(70%)',
            display: 'none',
          },
        },
        moveRight: {
          '0%': { marginRight: '42px' },
          '100%': { marginRight: '2px' },
        },
        moveLeft: {
          '0%': { width: 0, height: '68px' },
          '100%': { width: '68px', height: '68px' },
        },
        moveUp: {
          '0%': { height: 'auto' },
          '100%': { height: 0 },
        },
        moveDown: {
          '0%': { marginBottom: 0 },
          '100%': { marginBottom: 'auto' },
        },
      },
      animation: {
        slideIn: 'slideIn .25s ease-in-out forwards var(--delay, 0)',
        slideOut: 'slideOut .25s ease-in-out forwards var(--delay, 0)',
        slideUp: 'slideUp .25s ease-in-out forwards var(--delay, 0)',
        slideDown: 'slideDown .25s ease-in-out forwards var(--delay, 0)',
        moveRight: 'moveRight .25s ease-in-out',
        moveLeft: 'moveLeft .25s ease-in-out',
        moveUp: 'moveUp .25s ease-in-out',
        moveDown: 'moveDown .25s ease-in-out forwards var(--delay, 0)',
      },
    },
    colors: {
      primary: '#2F80ED',
      lightPrimary: '#E9F3FF',
      warning: '#F8B76B',
      darkWarning: '#E5A443',
      lightWarning: '#FCEED3',
      darkSuccess: '#43B78D',
      lightSuccess: '#D2F2EA',
      danger: '#EB5757',
      info: '#8785FF',
      darkInfo: '#9B51E0',
      lightInfo: '#EEDCFF',
      secondary: '#828282',
      darkSecondary: '#4F4F4F',
      lightSecondary: '#E0E0E0',
      transparent: 'transparent',
      white: '#fff',
    },
  },
  plugins: [],
};
