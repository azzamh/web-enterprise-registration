// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@privyid/persona'
  ],
  css    : ['~/assets/css/tailwind.css'], 
  postcss: {
    plugins: {
      'postcss-hexrgba'       : {}, 
      'tailwindcss/nesting'   : {}, 
      'tailwindcss'           : {}, 
      'postcss-lighten-darken': {}, 
      'autoprefixer'          : {}, 
    },
  },
})
