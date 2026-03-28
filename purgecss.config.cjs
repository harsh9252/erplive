module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
    './public/assets/js/**/*.js'
  ],
  css: [
    './public/assets/css/style.css',
    './public/assets/css/bootstrap.min.css',
    './public/assets/css/animate.css',
    './public/assets/css/dataTables.bootstrap5.min.css',
    './public/assets/css/feather.css',
    './public/assets/css/iconsax.css',
    './public/assets/css/owl.carousel.min.css',
    './public/assets/css/plyr.css',
    './public/assets/css/vendor.min.css'
  ],
  output: './public/assets/css/',
  safelist: {
    standard: [
      /^active$/,
      /^show$/,
      /^fade$/,
      /^modal-backdrop$/,
      /^modal-open$/,
      /^collapsing$/,
      /^dropdown-menu-end$/,
      /^dropdown-menu-start$/
    ],
    deep: [/^select2/, /^datepicker/],
    greedy: [/tooltip/, /popover/]
  },
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
}
