<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate'
interface Props {
  name?: string
}
const props = defineProps<Props>()
</script>

<template>
  <ErrorMessage :name="props.name || ''" class="error"></ErrorMessage>
</template>
