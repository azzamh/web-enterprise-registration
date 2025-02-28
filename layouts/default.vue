<template>
  <div class="min-h-screen flex flex-col">
    <header class="pt-1 pb-4 fixed top-0 left-0 right-0 z-10 bg-default">
      <p-navbar>
        <p-navbar-nav align="center">
          <img src="~/assets/images/logo-privy.svg" alt="Nuxt Logo" class="h-8" />          
        </p-navbar-nav>
      </p-navbar>
    </header>

    <div class="flex-1 overflow-y-auto mt-[72px]">
      <main class="mx-auto p-4 min-h-[calc(100vh-72px-56px)]">
        <slot />
      </main>

      <footer class="flex justify-center items-center text-center p-4 gap-4">
        <p-dropdown icon @change="changeLocale">
          <template #button-content>
            <pi-internet-16 class="mr-2"/>
            <span>{{ t('current-lang') }}</span>
          </template>
          <template #activator="{ open, isOpen }">
            <div class="flex items-center gap-2 cursor-pointer" @click="open">
              <pi-internet-16 class="mr-2"/>
              <span>{{ t('current-lang') }}</span>
              <pi-chevron-down-20 v-if="!isOpen"/>
              <pi-chevron-up-20 v-else/>
            </div>  
          </template>
          
          <template
            v-for="item in locales"
            :key="item.code">
            <p-dropdown-item @click="changeLocale(item.code)">
              <span class="flex items-center justify-between">
                <span>{{ item.name }}</span>
                <IconCheckmark
                  v-if="locale === item.code"
                  class="text-success dark:text-dark-success" />
              </span>
            </p-dropdown-item>
          </template>
        </p-dropdown>
        ©{{  new Date().getFullYear()}}
      </footer>
    </div>
  </div>
</template>

<script setup>

const {
  t,
  locale,
  locales,
  setLocale,
} = useI18n({ useScope: 'global' })

// Function to change the locale/language
function changeLocale(localeCode) {
  console.log('changeLocale', localeCode)
  setLocale(localeCode)
  
  // Optionally store the chosen locale in localStorage to persist across sessions
  localStorage.setItem('userLocale', localeCode)
}

// Check for saved locale on component mount
onMounted(() => {
  const savedLocale = localStorage.getItem('userLocale')
  if (savedLocale && locales.value.some(l => l.code === savedLocale)) {
    setLocale(savedLocale)
  }
})

</script>


<style lang="postcss">
.input__form {
  @apply border-default;
}
.checkbox__icon {
  @apply border-default;
}
</style>