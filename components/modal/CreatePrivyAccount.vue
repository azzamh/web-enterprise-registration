<template>
<p-modal
    v-model="model"
    centered
    size="sm">
    <div class="block mb-3 text-center text-xl">
        {{ t('create-privy-modal.title') }}
    </div>
    <p-text class="block mb-3 text-subtle text-center">
    {{ t('create-privy-modal.scan-qr') }}
    </p-text>
    <img
        src="~/assets/images/register-privy-qr.svg"
        alt="QR Code"
        class="block mx-auto mb-3"
    />
    <p-text class="block mb-3 text-subtle text-center">
        {{ t('create-privy-modal.download-app') }}:
    </p-text>
    <div class="flex justify-center gap-3">
        <a
        href="https://play.google.com/store/apps/details?id=com.privygate.privyid&hl=id"
        target="_blank"
        class="block mb-3 text-center">
        <img
            src="~/assets/images/android-store.svg"
            alt="Google Play"
            class="block mx-auto  h-[35px]"
        />
        </a>
        <a
        href="https://apps.apple.com/id/app/privy-digital-signature/id1218828609"
        target="_blank"
        class="block mb-3 text-center">
        <img
            src="~/assets/images/ios-store.svg"
            alt="App Store"
            class="block mx-auto h-[35px]"
        />
        </a>
    </div>

    <div class="flex flex-row mt-3">
        <div class=" border-t border-gray-20 w-full">
        </div>
        <p-text class="block mb-2 text-subtle text-center mt-[-0.7rem] mx-6">
            {{ t('create-privy-modal.or') }}
        </p-text>
        <div class="border-t border-gray-20 w-full">
        </div>
    </div>
    <template #footer="{  }">
        <p-button
        class="w-full"
        @click="registerViaWeb">
        {{ t('create-privy-modal.register') }}
        </p-button>
    </template>
</p-modal>
</template>
  
<script setup lang="ts">
import { getMessage } from '@privyid/nuapi/core'
import { toast, useVModel } from '@privyid/persona/core'


interface Props {
modelValue: boolean,
}

const props = defineProps<Props>()

const { t }              = useI18n({ useScope: 'global' })

const model          = useVModel(props)

function registerViaWeb(){
    window.open('https://super-app.privy.id/', '_blank')
}
</script>

<style scoped lang="postcss">
:deep(.modal__content .modal__dismiss) {
    @apply bg-gray-100 opacity-40 p-0.5 rounded-xs !important;
    @apply text-default !important;
    color: white !important;
    top: 0.5rem;
    right: 1rem;
}
</style>