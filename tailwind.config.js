/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6A00',
          accent: '#FF8C1A',
          dark: '#0B0B0B',
          card: '#141414',
          textSec: '#A1A1A1',
          lightBg: '#F5F5F7',
          lightCard: '#FFFFFF',
          lightBorder: '#E5E7EB',
        }
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(255, 106, 0, 0.3)',
        'glow-strong': '0 0 25px rgba(255, 106, 0, 0.6)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 10px rgba(255, 106, 0, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(255, 106, 0, 0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
