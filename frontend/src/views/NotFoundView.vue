<script lang="ts" setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
</script>
<template>
  <LayoutContainer
    class="flex h-[calc(100vh-64px)] flex-col items-center justify-center"
  >
    <h1 class="text-5xl">404</h1>
    <p class="text-xl">Страница не найдена</p>
    <RouterLink to="/" class="active-link">На главную</RouterLink>
  </LayoutContainer>
</template>
