<script lang="ts" setup>
const { currentPage, totalPages, onPageChange } = defineProps<{
  currentPage: number
  totalPages: number
  onPageChange: ({ page }: { page: number }) => void
}>()

const goToPage = (page: number) => {
  onPageChange({ page })
}
</script>

<template>
  <ul class="my-12 flex items-center justify-center gap-4">
    <li>
      <button
        @click="goToPage(1)"
        :disabled="currentPage === 1"
        :class="currentPage === 1 ? 'disabled-link' : 'active-link'"
      >
        В начало
      </button>
    </li>
    <li>
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        :class="currentPage === 1 ? 'disabled-link' : 'active-link'"
      >
        Предыдущая
      </button>
    </li>
    <li>
      {{ currentPage }}
    </li>
    <li>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        :class="currentPage === totalPages ? 'disabled-link' : 'active-link'"
      >
        Следующая
      </button>
    </li>
    <li>
      <button
        @click="goToPage(totalPages)"
        :disabled="currentPage === totalPages"
        :class="currentPage === totalPages ? 'disabled-link' : 'active-link'"
      >
        В конец
      </button>
    </li>
  </ul>
</template>
