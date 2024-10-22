/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Ajustar el path para que Tailwind escanee archivos HTML y TS
  ],
  theme: {
    extend: {
      colors: {
        CheeseColorPrimary: '#ff3d12',
        CheeseColorSecondary: '#ff5a40',
      },
    },
  },
  plugins: [],
}

