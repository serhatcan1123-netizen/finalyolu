/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        surface: '#111118',
        card: '#1A1A24',
        border: '#2A2A3A',
        primary: '#C9A84C',
        secondary: '#E63946',
        'text-primary': '#F0F0F5',
        'text-secondary': '#8A8A9A',
        success: '#2ECC71',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'count-up': 'count-up 0.5s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'flip': 'flip 0.6s ease-in-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(230, 57, 70, 0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(230, 57, 70, 0.8)' },
        },
        'count-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'flip': {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(-90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
      },
      boxShadow: {
        'gold': '0 0 20px rgba(201, 168, 76, 0.3)',
        'gold-lg': '0 0 40px rgba(201, 168, 76, 0.4)',
        'red': '0 0 20px rgba(230, 57, 70, 0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
