<template>
<p-modal
    v-model="model"
    centered
    size="">
    <div class="block mb-3 text-center text-xl">
        {{ t('contact-us-modal.title') }}
    </div>
    <p-text class="block mt-5 mb-3 text-subtle text-left">
    {{ t('contact-us-modal.subtitle') }}:
    </p-text>
    <div class="bg-gray-10 px-3 py-3 rounded-xs mb-3 flex flex-row items-center justify-between cursor-pointer">
        <p-text class="block text-subtle text-left p-0 flex flex-row gap-2 items-center">
            <pi-whatsapp-20 class="text-subtle"/>
        {{ t('contact-us-modal.whatsapp') }}
        </p-text>
        <pi-new-page-20 class="text-subtle"/>
    </div>
    <div class="bg-gray-10 px-3 py-3 rounded-xs mb-3 flex flex-row items-center justify-between cursor-pointer">
        <p-text class="block text-subtle text-left p-0 flex flex-row gap-2 items-center">
            <pi-chat-20 class="text-subtle"/>
        {{ t('contact-us-modal.live-chat') }}
        </p-text>
        <pi-new-page-20 class="text-subtle"/>
    </div>
    <div class="bg-gray-10 px-3 py-3 rounded-xs mb-3 flex flex-row items-center justify-between cursor-pointer">
        <p-text class="block text-subtle text-left p-0 flex flex-row gap-2 items-center">
            <pi-email-20 class="text-subtle"/>
        {{ t('contact-us-modal.email') }}
        </p-text>
        <pi-new-page-20 class="text-subtle"/>
    </div>

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
/* :deep(.modal__content .modal__dismiss) {
    @apply bg-gray-100 opacity-40 p-0.5 rounded-xs !important;
    @apply text-default !important;
    color: white !important;
    top: 0.5rem;
    right: 1rem;
} */
</style>