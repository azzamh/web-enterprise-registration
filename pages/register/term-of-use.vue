<template>
  <div class="container">
    <div class="bg-white p-6 rounded-lg max-w-3xl mx-auto max-h-[80vh]">
    <!-- Header -->
    <h1 class="text-2xl font-bold text-center">{{ t('term-of-use.title') }}</h1>
    <p class="text-blue-500 text-center mt-1">{{ t('term-of-use.subtitle') }}: {{ data.effectiveDate }}</p>

    <!-- Content -->
    <div class="mt-4 text-md ">
      <div class="overflow-y-scroll max-h-[50vh] content-scroll" ref="contentScroll" @scroll="checkScrollPosition">
        {{ data.content }}
      </div>
    </div>

    <!-- Checkbox -->
    <div class="flex align-center justify-between items-center mt-4 mb-3 text-sm text-subtle">
      <div class="flex items-center justify-center">
        <p-checkbox class="w-4 h-4 border-solid rounded" v-model="accepted" />
        <p-text for="terms" class="ml-2">{{ t('term-of-use.agree') }}</p-text>
      </div>
      <p-text class="italic" v-if="!scrolledToBottom">{{ t('term-of-use.need-to-scroll') }}</p-text>
      <!-- <p-text class="italic text-green-600" v-else>Ready to proceed</p-text> -->
    </div>

    <!-- Buttons -->
    <div class="flex mt-4 gap-12 justify-end">
      <button variant="ghost">
        {{ t('cancel') }}
      </button>
      <p-button
        version="primary"
        color="danger"
        class="px-4 py-2 rounded-lg text-white w-44"
        :class="isRegisterEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'"
        :disabled="!isRegisterEnabled"
      >
        {{ t('register') }}
      </p-button>
    </div>
  </div>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { reactive, ref, computed } from 'vue'
const { t } = useI18n()

const accepted = ref(false)
const scrolledToBottom = ref(false)
const contentScroll = ref<HTMLElement | null>(null)

// Computed property to determine if register button should be enabled
const isRegisterEnabled = computed(() => {
  return accepted.value && scrolledToBottom.value
})

// Check if user has scrolled to the bottom
const checkScrollPosition = () => {
  if (!contentScroll.value) return
  
  const { scrollTop, scrollHeight, clientHeight } = contentScroll.value
  // Consider scrolled to bottom when within 5px of the bottom
  scrolledToBottom.value = (scrollHeight - scrollTop - clientHeight) < 5
}

interface TermData {
  effectiveDate: string
  content: string
}

const data = reactive<TermData>({
  effectiveDate: 'October 18, 2024',
  content: `Welcome to Privy! Thank you for your interest in using Privy Platform. Privy provides various types of services, therefore some additional terms and conditions may apply when the User uses the Privy Service. By creating a Privy Account and/or using Privy Platform, the User acknowledges that they have read, understood, and agreed to these terms of use (“Terms of Use”).
These Terms of Use may be changed or updated either partially or wholly from time to time without prior notification to the User and will take effect from the time uploaded on the Site and/or at the time the User agrees to this Terms of Use. We recommend that User check the Site for any changes to these Terms of Use from time to time.
By continuing to access or use the Privy Service, the User is deemed to agree to changes to these Terms of Use. If the User does not agree to the changes on the Terms of Use, the User can contact Privy to terminate the Privy Account.
These Terms of Use contain an agreement between Privy and the User. Please read these Terms of Use carefully!
DefinitionEach word that starts with a capital letter has the following meaning:
"Admin" refers to the definition set out in the Enterprise Service Terms of Use.
"Appstore" is an application distribution platform for iOSApple operation system developed and managed by the multinational technology company Apple Inc.
"Electronic Certificate" means a certificate issued and/or provided by Privy that is electronic in nature and contains an Electronic Signature and identity indicates a legal subject or party in an Electronic Transaction.
"Electronic Document" means any Electronic Information, including but not limited to Electronic Contracts, created, forwarded, sent, received, or stored in analog, digital, electromagnetic, optical, or the like, which can be seen, displayed, and/or heard through a computer or electronic system, including but not limited to writings, sounds, images, maps, designs, photographs or the like, letters, signs, numbers, access codes, symbols or perforations that have meaning or can be understood by a person capable of understanding it.
"Electronic Information" means one or a set of electronic data, including but not limited to writing, sound, images, maps, designs, photographs, Electronic Data Interchange (EDI), electronic mail (e-mail), telegram, telex, telecopy, or the like processed letters, signs, numbers, access codes, symbols, or perforations that have meaning or can be understood by those who can understand them.
"Electronic Seal" is electronic data embedded, associated or related to Electronic Information and/or Documents that guarantees the origin, integrity and integrity of Electronic Information and/or Electronic Documents used by Business Entities created with Privy Services.`
})

</script>
<style lang="postcss" scoped>
.container{
  @apply flex flex-row justify-center items-center;
  height: calc(100vh - 14rem);
}

/* Custom scrollbar styling */
.content-scroll {
  /* For WebKit (Chrome, Safari, etc.) */
  &::-webkit-scrollbar {
    width: 8px;
    background-color: transparent;
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(193, 193, 193, 0.5);
    border-radius: 10px;
  }
  
  &:hover::-webkit-scrollbar,
  &:active::-webkit-scrollbar,
  &:focus::-webkit-scrollbar {
    opacity: 1;
  }

  &:hover::-webkit-scrollbar-thumb,
  &:active::-webkit-scrollbar-thumb,
  &:focus::-webkit-scrollbar-thumb {
    background-color: rgba(193, 193, 193, 0.8);
  }

  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  
  &:hover, &:active, &:focus {
    scrollbar-color: rgba(193, 193, 193, 0.8) transparent;
  }
}
</style>