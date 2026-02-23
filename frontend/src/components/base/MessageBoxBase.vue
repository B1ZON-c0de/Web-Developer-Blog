<script lang="ts" setup>
import { toRefs } from 'vue'

const props = defineProps<{
  type?: string
}>()
const { type } = toRefs(props)

const getClass = () => {
  switch (type.value) {
    case 'success':
      return 'success'
    case 'error':
      return 'error'
    case 'warning':
      return 'warning'
    case 'info':
      return 'info'
    default:
      return ''
  }
}
</script>

<template>
  <div :class="getClass()" class="py-2">
    <slot></slot>
  </div>
</template>
