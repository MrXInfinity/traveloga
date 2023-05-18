module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Rubik: ['Rubik', 'sans'],
        openSans: ['Open Sans', 'sans'],
      },
      screens: {
        xl: '1440px',
      },
      keyframes: {
        scrollXS: {
          '100%': { transform: 'translateX(-98%)' },
        },
        scrollSM: {
          '100%': { transform: 'translateX(-90%)' },
        },
        scrollMD: {
          '100%': { transform: 'translateX(-80%)' },
        },
        scrollLG: {
          '100%': { transform: 'translateX(-70%)' },
        },
        scrollXL: {
          '100%': { transform: 'translateX(-60%)' },
        },
      },
      animation: {
        scrollInfiniteXS: 'scrollXS 20s linear infinite',
        scrollInfiniteSM: 'scrollSM 20s linear infinite',
        scrollInfiniteMD: 'scrollMD 20s linear infinite',
        scrollInfiniteLG: 'scrollLG 20s linear infinite',
        scrollInfiniteXL: 'scrollXL 20s linear infinite',
      },
    },
  },
  plugins: [],
};
