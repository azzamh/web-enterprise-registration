// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
    '@privyid/nhp',
    '@privyid/nuapi',
    '@privyid/nuauth',
    '@pinia/nuxt',
    '@privyid/persona',
    '@privyid/persona',
    '@privyid/persona-icon',
    '@privyid/persona-ilustration'
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
  i18n: {
    vueI18n              : './i18n.config.ts',
    strategy             : 'no_prefix',
    detectBrowserLanguage: false,
    locales              : [
      {
        code : 'en',
        files: ['en.yaml'],
        name : 'English',
      },
      {
        code : 'id',
        files: ['id.yaml'],
        name : 'Indonesia',
      },
    ],
    defaultLocale: 'en',
    lazy         : true,
    langDir      : 'locales',
    compilation  : { strictMessage: false },
  },
  runtimeConfig:{
    public:{
      featMaintenanceDowntime           : false,
    }
  }
})
