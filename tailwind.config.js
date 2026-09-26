/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#050507",
          card: "#0d0e15",
          accent: "#00f0ff",
          green: "#00ff9d",
          yellow: "#e2f952",
          gray: "#8f96a3",
          border: "rgba(255, 255, 255, 0.08)",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Orbitron', 'Space Grotesk', 'sans-serif'],
        tech: ['Rajdhani', 'Quantico', 'monospace'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at 50% 30%, rgba(0, 240, 255, 0.12) 0%, rgba(5, 5, 7, 0) 70%)',
        'card-glow': 'radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.06) 0%, transparent 60%)',
        'cyan-glow': 'radial-gradient(circle, rgba(0,240,255,0.2) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 240, 255, 0.25)',
        'glow-green': '0 0 25px rgba(0, 255, 157, 0.25)',
        'glow-gold': '0 0 25px rgba(226, 249, 82, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
