<script setup lang="ts">
import { Field } from 'vee-validate'
interface Props {
  name?: string
}
const props = defineProps<Props>()
</script>

<template>
  <Field :name="props.name || ''" class="form-input"> </Field>
</template>
