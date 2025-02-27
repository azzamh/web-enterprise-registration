<template>
  <p-contextual-bar
    v-if="model"
    :title="title"
    fixed
    @close="onClose"
    @show="onEnter">
    <template #icon>
      <pi-megaphone-24 />
    </template>
    <template #title>
      <p-subheading weight="medium">
        {{ title }}
      </p-subheading>
    </template>
    <template #message>
      <div v-p-md.inline="description" />
      <div
        v-if="$slots.ilustration"
        class="contextual-bar__ilustration">
        <slot name="ilustration" />
      </div>
    </template>
    <template #action>
      <p-button
        v-if="action"
        :size="isMobile ? 'sm' : 'md'"
        color="primary"
        @click="onLearnMore">
        {{ actionText }}
      </p-button>
    </template>
  </p-contextual-bar>
</template>

<script lang="ts" setup>
import { vPMd } from '@privyid/persona/directive'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

interface Props {
  title: string,
  description: string,
  action?: boolean,
  actionText?: string,
  actionLink?: string,
  cookieName: string,
}

const props = defineProps<Props>()

const isShowing   = useCookie<boolean>(props.cookieName)
const model       = ref(false)
const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile    = breakpoints.smaller('md')

onMounted(() => {
  model.value = isShowing.value === undefined
    ? true
    : (isShowing.value)
})

function onClose () {
  model.value     = false
  isShowing.value = false

  document.body.style.removeProperty('margin-top')
  document.body.style.removeProperty('--p-contextual-bar-height')
  document.body.classList.remove('contextual-bar__body--fixed-active')
}

function onLearnMore () {
  if (props.actionLink)
    window.open(props.actionLink, '_blank')
}

async function onEnter () {
  await nextTick()
  document.body.style.removeProperty('margin-top')
}
</script>
<style lang="postcss">
.contextual-bar {
  &__wrapper {
    @apply px-0;
  }

  &__wrapper--with-message {
    @apply flex-col md:flex-row items-start space-y-1 md:space-y-0 relative;
  }

  &__action {
    @apply md:space-gap-0;
  }

  &__content {
    @apply md:pl-0 pl-8;
  }

  &__icon {
    @apply absolute md:relative md:translate-x-0 -translate-x-1 top-1 md:top-auto;
  }

  &__body--fixed-active {
    .sidepanel.sidepanel--right {
      @apply mt-[90px]
    }
  }

  &:has(&__ilustration) {
    .contextual-bar__content {
      @apply pr-0 sm:pr-20;
    }
  }

  &__ilustration {
    @apply absolute right-0 md:-top-4 -top-1 hidden sm:block;
  }
}
</style>
