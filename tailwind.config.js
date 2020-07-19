const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: {
    content: ['./source/**/*.tsx', './source/**/*.html'],
    whitelist: [],
  },
  theme: {
    fontFamily: {
      sans: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
      ],
      mono: [
        'SFMono-Regular',
        'Consolas',
        'Liberation Mono',
        'Menlo',
        'Courier',
        'monospace',
      ],
    },
    colors: {
      transparent: 'transparent',

      black: '#000',
      white: '#fff',

      'light-grey': {
        300: '#E0E0E2',
        500: '#B9B9BA',
      },

      'dark-grey': {
        200: '#4E4E51',
        500: '#3D3D3D',
        600: '#38383D',
        700: '#232327',
        990: '#0C0C0D',
      },

      blue: {
        300: '#61BAFF',
        500: '#005CE7',
        700: '#054096', // accent
      },

      green: {
        700: '#008787', // accent
        800: '#005E5E', // accent
      },

      purple: {
        700: '#722291', // accent
      },

      violet: {
        700: '#592ACB', // accent
      },

      rose: {
        600: '#AF174A', // accent
      },

      'pale-orange': {
        600: '#B95D3E', // accent
      },

      'deep-green': {
        600: '#3E8A38', // accent
      },
    },
  },
  variants: {
    backgroundColor: ['dark', 'hover', 'focus', 'active'],
    backgroundOpacity: ['hover', 'focus', 'active'],
    borderColor: ['dark'],
    textColor: ['dark'],
    placeholderColor: ['dark'],
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant('dark', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.theme-dark .${e(`dark${separator}${className}`)}`;
        });
      });
    }),
  ],
};
