/**
 * postcss.config.js
 */

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require("tailwindcss")({ config: "./config/tailwind.config.js"}),
    require("autoprefixer"),
  ]
}
