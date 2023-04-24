/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./frontend/index.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'border-blue-950',
    'border-teal-800',
    'border-green-600',
    'border-yellow-400',
    'border-orange-500',
    'border-red-600',
    'bg-blue-950',
    'bg-teal-800',
    'bg-green-600',
    'bg-yellow-400',
    'bg-orange-500',
    'bg-red-600',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

