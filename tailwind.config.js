/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Tailwind will scan all your React files
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#A7E7A7',   // Light green for backgrounds or accents
          default: '#4CAF50',  // Default primary green for buttons, links, highlights
          dark: '#2B8C3F',     // Darker green for borders or active states
        },
        secondary: {
          light: '#D6F5D6',    // Light secondary color for subtle background sections
          default: '#6BD76B',  // Secondary green for secondary buttons, text
          dark: '#397D39',     // Dark secondary green for footer or card sections
        },
        background: {
          light: '#F9F9F9',    // Lightest background color (a very subtle light gray)
          default: '#E5E5E5',  // Slightly darker background for container sections
        },
        text: {
          default: '#2B3A42',  // Dark text color for readability
          muted: '#5A6D7E',    // Darker muted text color for subtexts or less important info
        },
        accent: {
          default: '#FFAB00',  // Accent color for highlights, notifications, etc.
          light: '#FFD731',    // Lighter shade for hover or active states
          dark: '#E68900',     // Darker shade for focus states or active buttons
        },
        error: {
          light: '#F8D7DA',    // Light error color for subtle backgrounds or indicators
          default: '#FF4D4D',  // Default red for primary error messages, buttons, etc.
          dark: '#C92A2A',     // Darker red for error borders or active error states
        },
      }
      
,      
      screens: {
        xs: "360px", // Custom breakpoint for extra small screens
        sm: "640px", // Small screen (default)
        md: "768px", // Medium screen (tablet)
        lg: "1024px", // Large screen (laptop)
        xl: "1280px", // Extra large screen (desktop)
        "2xl": "1536px", // Larger desktop screens
      },
      fontFamily: {
        sans: [
          "Inter var", // Main font
          "ui-sans-serif", // Fallback font
          "system-ui", 
          "sans-serif", 
          "Apple Color Emoji", 
          "Segoe UI Emoji", 
          "Segoe UI Symbol", 
          "Noto Color Emoji", // Emoji font fallback
        ],
      },
    },
  },
  plugins: [],
}
