const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Spinnaker"', '"Rubik"', ...defaultTheme.fontFamily.serif,],
      },
      screens: {
        "xl": "1440px"
      }
      /*keyframes: {
        openModal: {
          "0%": {opacity: 0, transform: scaleY(0.5)},
          "100%": {opacity: 1, transform: scaleY(1)}
        },
        closeModal: {
          "0%": {opacity: 1, transform: scaleY(1)},
          "100%": {opacity: 0, transform: scaleY(0.5)}
        }
      },
      animation: {
        "openingModal": "",
        "closingModal": ""
      }*/
    },
  },
  plugins: [],
}
