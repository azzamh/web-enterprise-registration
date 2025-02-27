<template>
  <div class="flex w-full h-full select-none h-screen w-screen items-center justify-center">
    <div class="flex flex-col items-center m-auto">
      <img
        :src="errorAsset.illustration"
        :alt="errorAsset.illustrationAlt"
        width="300"
        height="300"
        class="mb-7">
      <div class="max-w-[468px] space-y-4 text-center">
        <p-heading
          element="h4"
          weight="medium">
          {{ t(`error.${errorCode}.page-title`) }}
        </p-heading>
        <p-text
          v-p-md.inline="t(`error.${errorCode}.page-description`)"
          variant="body"
          element="p"
          class="text-subtle dark:text-dark-subtle [&_a]:underline" />
        <p-button
          v-if="!isOnline"
          color="primary"
          class="!font-normal"
          @click.stop="onReloadPage">
          {{ t('error.no-connection.try-again') }}
        </p-button>
        <p-button
          v-else-if="errorCode === 403"
          color="primary"
          class="!font-normal"
          @click.stop="$emit('back:safearea')">
          {{ t('error.403.back') }}
        </p-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AccessDenied from '../../../assets/images/access-denied.svg'
import PageNotFound from '../../../assets/images/page-not-found.svg'
import NoConnection from '../../../assets/images/no-connection.svg'
import InternalServerError from '../../../assets/images/internal-server-error.svg'
import { useNetwork } from '@vueuse/core'
import { vPMd } from '@privyid/persona/directive'

const props = defineProps({
  error: {
    type   : Object,
    default: () => {},
  },
})

defineEmits(['back:safearea'])

const { t }        = useI18n({ useScope: 'global' })
const { isOnline } = useNetwork()

const errorCode = computed(() => {
  const statusCode = props.error?.statusCode

  if (!isOnline.value)
    return 'no-connection'

  return statusCode < 500 ? statusCode : 500
})

const errorAsset = computed(() => {
  if (!isOnline.value) {
    return {
      illustration   : NoConnection,
      illustrationAlt: 'No Internet Connection',
    }
  }

  if (errorCode.value === 403) {
    return {
      illustration   : AccessDenied,
      illustrationAlt: 'Access Denied',
    }
  }

  if (errorCode.value === 404) {
    return {
      illustration   : PageNotFound,
      illustrationAlt: 'Page not found',
    }
  }

  if (errorCode.value >= 500) {
    return {
      illustration   : InternalServerError,
      illustrationAlt: 'It’s not you, it’s us',
    }
  }

  return {
    illustration   : InternalServerError,
    illustrationAlt: 'It’s not you, it’s us',
  }
})

function onReloadPage () {
  if (typeof location === 'undefined')
    return

  location.reload()
}

onMounted(() => {
  console.error(props.error?.statusCode, props.error?.message)
  console.error(props.error?.stack)
})
</script>

<i18n lang="yaml">
  en:
    error:
      403:
        page-title: Access denied
        page-description: You don’t have the permission to access this page. Contact your administrator for further information or try another account.
        back: Back
      404:
        page-title: Page not found
        page-description: "We cannot find the page that you’re looking for. Make sure you type the page address correctly. If problem persists, contact us at [helpdesk{'@'}privy.id](mailto:helpdesk{'@'}privy.id)"
      500:
        page-title: It’s not you, it’s us
        page-description: "There is an error happened and we are working to fix it. If you need our assistance, contact us at [helpdesk{'@'}privy.id](mailto:helpdesk{'@'}privy.id)"
      no-connection:
        page-title: No connection
        page-description: Check your mobile data or Wi-Fi connection and try again
        try-again: Try again
  id:
    error:
      403:
        page-title: Akses ditolak
        page-description: Anda tidak memiliki izin untuk mengakses halaman ini. Hubungi administrator Anda untuk informasi lebih lanjut atau gunakan akun lainnya.
        back: Kembali
      404:
        page-title: Halaman tidak ditemukan
        page-description: "Kami tidak dapat menemukan halaman yang Anda cari. Pastikan Anda mengetik alamat halaman dengan benar. Jika masalah berlanjut, hubungi kami di [helpdesk{'@'}privy.id](mailto:helpdesk{'@'}privy.id)"
      500:
        page-title: Masalah pada kami, bukan Anda
        page-description: "Telah terjadi kesalahan dan kami sedang memperbaikinya. Jika Anda membutuhkan bantuan, hubungi kami di [helpdesk{'@'}privy.id](mailto:helpdesk{'@'}privy.id)"
      no-connection:
        page-title: Tidak ada koneksi
        page-description: Periksa koneksi Wi-Fi atau data seluler Anda dan coba lagi
        try-again: Coba lagi
</i18n>
