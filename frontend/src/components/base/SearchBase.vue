<script lang="ts" setup>
import { debouncedSearch } from '@/utils/debouncedSearch'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, watch } from 'vue'
import ButtonBase from './ButtonBase.vue'
interface Props {
  onSearch: ({ search, page }: { search: string; page?: number }) => void
}

const searchQuery = ref<string>('')

const { onSearch } = defineProps<Props>()

const debouncedHandler = debouncedSearch(onSearch, 2000)

const handlerSearch = () => {
  onSearch({ search: searchQuery.value })
}

watch(searchQuery, (newQuery) => {
  debouncedHandler({ search: newQuery })
})
</script>

<template>
  <form @submit.prevent="handlerSearch" class="relative mt-12">
    <input
      class="form-input w-full pr-20"
      type="text"
      placeholder="Поиск по блогу"
      v-model="searchQuery"
    />
    <ButtonBase type="submit" class="absolute top-0 right-0 bottom-0">
      <FontAwesomeIcon :icon="faSearch" />
    </ButtonBase>
  </form>
</template>
