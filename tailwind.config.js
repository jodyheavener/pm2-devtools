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
      white: '#fff',

      'light-grey': {
        300: '#E0E0E2',
        500: '#B9B9BA',
      },

      'dark-grey': {
        500: '#3D3D3D',
        600: '#38383D',
        700: '#232327',
        990: '#0C0C0D',
      },
    },
  },
  variants: {
    backgroundColor: ['dark'],
    borderColor: ['dark'],
    textColor: ['dark'],
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
