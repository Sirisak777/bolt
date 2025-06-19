/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ['Pacifico', 'cursive'],
        sarabun: ['Sarabun', 'sans-serif'],
        cookie: ['Cookie', 'cursive'],
        prompt: ['Prompt', 'sans-serif'],
        mali: ['Mali', 'sans-serif'],
        anuphan: ['Anuphan', 'sans-serif'],
        
      },
    },
  },
  plugins: [],
};
