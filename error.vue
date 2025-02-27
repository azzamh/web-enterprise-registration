<template>
  <pages-error @back:safearea="backToSafeArea" />
</template>

<script setup lang="ts">
import { hideOverlay, showOverlay } from '@privyid/persona/core'
import { joinURL } from 'ufo'

async function backToSafeArea () {
  showOverlay()

  const baseURL = useRuntimeConfig().app.baseURL
  await navigateTo(joinURL(window.location.origin, baseURL, '/register/form-1'), { open: { target: '_self' } })

  hideOverlay()
}
</script>
