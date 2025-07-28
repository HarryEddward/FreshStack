
import { type Config } from "tailwindcss";
export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    borderColor: ({ theme }) => ({
      DEFAULT: theme('colors.gray.100'), // Establece border-gray-100 como el color por defecto
      ...theme('colors'), // Mantiene los otros colores disponibles (border-red-500, etc.)
    }),
    extend: {
      fontFamily: {
        'fleur': ['"Fleur De Leah"', 'cursive'],
        'dancing': ['"Dancing Script"', 'cursive'],
        'sacred_bridge': ['Sacred Bridge', 'sans-serif'],
        'dh_pegita': ['Dh Pegita', 'sans-serif'],
        'charlie_brown': ['Charlie Brown', 'sans-serif'],
      },
      keyframes: {
        'scroll-infinite': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'rotate-vibrate': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(3.5deg)' },
          '50%': { transform: 'rotate(-3.5deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        walk: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(1100%)' },
        },
        leg: {
          '0%': { transform: 'rotate(20deg)' },
          '100%': { transform: 'rotate(-20deg)' },
        },
        arm: {
          '0%': { transform: 'rotate(-20deg)' },
          '100%': { transform: 'rotate(20deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        
      },
      animation: {
        'scroll-infinite': 'scroll-infinite 40s linear infinite',
        'rotate-vibrate': 'rotate-vibrate 0.2s linear infinite',
        fadeIn: 'fadeIn 0.2s ease-in forwards',
        fadeOut: 'fadeOut 0.5s ease-in forwards',
        'walk-cycle': 'walk 8s linear infinite',
        'leg-left': 'leg 0.6s ease-in-out infinite alternate',
        'leg-right': 'leg 0.6s ease-in-out infinite alternate-reverse',
        'arm-left': 'arm 0.6s ease-in-out infinite alternate',
        'arm-right': 'arm 0.6s ease-in-out infinite alternate-reverse',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
      },
    }
  }
} satisfies Config;
