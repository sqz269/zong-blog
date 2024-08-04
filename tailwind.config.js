/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./src/templates/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '55rem', // Change this value to your desired max-width
          },
        },
      }),
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake", "retro"],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}
