module.exports = {
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
      },
      colors: {
        'gray-900': '#111827',
        'blue-900': '#1e3a8a',
        'gradient-start': '#111827',
        'gradient-end': '#1e3a8a',
        
      },
      animation: {
        'gradient': 'gradient-flow 20s ease infinite',
      },
      keyframes: {
        'gradient-flow': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}