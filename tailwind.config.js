/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  safelist: [
    { pattern: /(bg|text|border)-(indigo|emerald|cyan|orange)-(400|500|600)/ },
    { pattern: /(bg|border)-(indigo|emerald|cyan|orange)-500\/(5|10|15|20|25|30|40|50)/ },
    { pattern: /shadow-(indigo|emerald|cyan|orange)-(500|600)\/(10|15|20)/ },
  ],
  plugins: [],
}
