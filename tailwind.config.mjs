/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7B1FA2", // Deep purple
        secondary: "#D32F2F", // Bold red
        accent: "#0288D1", // Vibrant blue
        highlight: "#FF5722", // Bright orange
        dark: "#212121", // Charcoal black
        light: "#F5F5F5", // Soft white
        neutral: "#B0BEC5", // Soft gray-blue
        mystical: "#8E24AA", // Magenta purple
        citrus: "#FF9800", // Tangerine
        emerald: "#43A047", // Fresh green
        sky: "#00BCD4", // Sky blue
        dawn: "#FFEB3B", // Soft yellow
        twilight: "#9C27B0", // Dark purple
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
      },
      boxShadow: {
        'glow': '0 4px 10px rgba(0, 0, 0, 0.1), 0 4px 20px rgba(0, 0, 0, 0.2)',
        'neon': '0 0 10px 2px #0288D1, 0 0 30px 5px #0288D1',
        '3xl': '0px 35px 60px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 50%)',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, #0288D1, #D32F2F)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.9)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out',
        bounceIn: 'bounceIn 1s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
