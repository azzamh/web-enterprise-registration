<template>
  <NuxtLayout>
    <Contextual
      v-if="showMaintenance"
      :title="t('contextual.maintenance.title')"
      :description="t('contextual.maintenance.description')"
      cookie-name="maintenance/downtime">
      <template #ilustration>
        <PilServerErrorDotLarge />
      </template>
    </Contextual>
    <NuxtPage />
     <!-- <TermOfUse/> -->
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const config    = useRuntimeConfig()
const route     = useRoute()
const { t } = useI18n()

const layoutsWithMaintenance = new Set([
  'default',
  'setting',
  'blank',
  'blog',
])

const showMaintenance = computed(() => {
  if (config.public.featMaintenanceDowntime)
    return layoutsWithMaintenance.has((route.meta.layout ?? 'default') as string)

  return false
})

</script>