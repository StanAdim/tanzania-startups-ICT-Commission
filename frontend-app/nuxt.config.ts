export default defineNuxtConfig({
  devtools: { enabled: true },

  modules:
      ["@nuxtjs/tailwindcss", '@pinia/nuxt', '@element-plus/nuxt', 'nuxt-aos'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' , name: 'fade' },
    layoutTransition: { name: 'layout', mode: 'out-in' ,    name: 'bounce',},
    head: {
      title: 'Tanzania Startups - ICT Commission', // Set the default title for your application
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'pragma', content: 'no-cache' },
        { 'http-equiv': 'cache-control', content: 'no-cache' },
        { 'http-equiv': 'expires', content: '0' },
        { content: 'telephone=no', name: 'format-detection' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap'
        }
      ],
    },
    pageTransition: {
      name: 'fade',
      mode: 'out-in' // default
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in' // default
    },
  },

  runtimeConfig:{
    public:{
      appName:  'Tanzania Startups',
      instName:  'ICT Commission',
      apiBaseUlr: process.env.API_URL ,
      baseUrl: process.env.BASE_URL,
    }
  },

  css:[
    "~/assets/css/app.css",
    "~/assets/fontawesome/css/fontawesome.min.css",
    "~/assets/fontawesome/css/solid.min.css",
    "~/assets/fontawesome/css/brands.min.css",
  ],
  compatibilityDate: '2025-02-06',
  aos: {
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 400, // values from 0 to 3000, with step 50ms
    duration: 800, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: true, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  },
})