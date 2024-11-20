/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out',
        'slide-in': 'slideIn 1.2s ease-out',
        'slide-up': 'slideUp 1.5s ease-out',
        'float-x': 'floatX 6s ease-in-out infinite',
        'float-y': 'floatY 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateX(-50px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        floatX: {
          '0%, 100%': { transform: 'translateX(20px)' },
          '50%': { transform: 'translateX(-20px)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(20px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      colors: {
        navy: {
          800: '#1b254b',
          900: '#111c44',
        },
        yellow: {
          300: '#fef08a',
          400: '#fde047',
        },
        red: {
          500: '#f87171',
        },
      },
    },
  },
  plugins: [],
};
