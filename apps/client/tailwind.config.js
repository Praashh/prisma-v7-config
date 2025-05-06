/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
      'radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontFamily: {
        neogothis: ['NeoGothis', 'sans-serif'],
        grotesk: ['PowerGrotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}