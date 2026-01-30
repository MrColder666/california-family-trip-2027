/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '24px',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      colors: {
        california: '#FF5722',
        ink: '#000000',
        dark: '#333333',
        grey: '#9E9E9E',
        light: '#EEEEEE',
        success: '#2E7D32',
        error: '#D32F2F',
        info: '#0288D1',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'Roboto Mono', 'monospace'],
      },
      fontSize: {
        display: ['72px', { lineHeight: '1.1', fontWeight: '700' }],
        h1: ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        h3: ['24px', { lineHeight: '1.3', fontWeight: '700' }],
        body: ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        small: ['12px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '48px',
        xxl: '64px',
        section: '96px',
      },
      borderRadius: {
        none: '0px',
      },
      boxShadow: {
        none: 'none',
      },
      maxWidth: {
        grid: '1200px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}