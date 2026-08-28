import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Point Tailwind's built-in white/black tokens at the CSS variables
      // defined in :root (src/index.css). Every existing bg-white,
      // text-black, border-black/20, etc. class in the codebase already
      // uses these token names, so this is the one place that needs to
      // change to re-theme the whole site.
      colors: {
        white: "rgb(var(--color-white-rgb) / <alpha-value>)",
        black: "rgb(var(--color-black-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: [
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      letterSpacing: {
        widest2: "0.15em",
      },
    },
  },
  plugins: [
    // Mobile/touch browsers simulate `:hover` on tap, which can leave
    // hover-only styles (scale, color, opacity changes, etc.) "stuck" on
    // until the user taps elsewhere. Redefining `hover:`/`group-hover:` to
    // only apply on devices that truly support hovering (a mouse/trackpad)
    // makes every `hover:` and `group-hover:` class in the codebase behave
    // correctly on mobile without touching each usage individually.
    plugin(function ({ addVariant }) {
      addVariant("hover", "@media (hover: hover) and (pointer: fine) { &:hover }");
      addVariant(
        "group-hover",
        "@media (hover: hover) and (pointer: fine) { :merge(.group):hover & }"
      );
    }),
  ],
};
