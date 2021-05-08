// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

module.exports = {
  purge: {
    content: ["./src/**/*.{tsx,ts,html}"],
  },
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Helvetica",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
      ],
      mono: [
        "SFMono-Regular",
        "Consolas",
        "Liberation Mono",
        "Menlo",
        "Courier",
        "monospace",
      ],
    },
    colors: {
      transparent: "transparent",

      black: "#000",
      white: "#fff",

      "light-grey": {
        100: "#F9F9FA",
        200: "#f0f0f0",
        300: "#E0E0E2",
        400: "#E2E7ED",
        500: "#B9B9BA",
        550: "#B1B1B3"
      },

      "dark-grey": {
        200: "#4E4E51",
        500: "#3D3D3D",
        600: "#38383D",
        670: "#27272C",
        700: "#232327",
        800: "#1C1C1F",
        990: "#0C0C0D",
      },

      blue: {
        300: "#61BAFF",
        400: "#169DFB",
        500: "#005CE7",
        700: "#054096", // accent
      },

      red: {
        500: "#EA000E", // light-error-icon
        700: "#B30000", // light-error-text
      },

      "pale-red": {
        50: "#FFF1F5", // light-error-bg
        100: "#FFD3DB", // light-error-border
        200: "#FFAED3", // dark-error-text
        800: "#7C3A4C", // dark-error-border
        900: "#502D36", // dark-error-bg
      },

      green: {
        400: "#59E10F", // dark-error-icon
        500: "#1FC400", // dark-error-icon
        700: "#008787", // accent
        800: "#005E5E", // accent
      },

      purple: {
        700: "#722291", // accent
      },

      violet: {
        700: "#592ACB", // accent
      },

      rose: {
        500: "#FF0668", // dark-error-icon
        600: "#AF174A", // accent
      },

      "pale-orange": {
        600: "#B95D3E", // accent
      },

      "deep-green": {
        50: "#DBFFD2", // light-error-bg
        200: "#B4E79B", // dark-error-text
        300: "#AAF9B3", // light-error-border
        600: "#3E8A38", // accent
        700: "#097600", // light-error-text
        800: "#2F5727", // dark-error-border
        900: "#293C1B", // dark-error-bg
      },

      yellow: {
        500: "#DCB700", // dark-error-icon
        600: "#C49B00", // light-error-icon
      },

      "pale-yellow": {
        50: "#FFFCD2", // light-error-bg
        100: "#F6E990", // light-error-border
        200: "#FFE298", // dark-error-text
        600: "#765000", // light-error-text
        700: "#565727", // dark-error-border
        800: "#44381B", // dark-error-bg
      },
    },
    extend: {
      flex: {
        2: "2",
        "30px": "0 0 30px",
      },
    },
  },
  variants: {
    backgroundColor: ["dark", "hover", "focus", "active"],
    backgroundOpacity: ["dark", "hover", "focus", "active"],
    borderWidth: ["dark"],
    borderColor: ["dark"],
    textColor: ["dark"],
    placeholderColor: ["dark"],
    textOpacity: ["dark", "responsive", "hover", "focus", "active"],
  },
  plugins: [],
};
