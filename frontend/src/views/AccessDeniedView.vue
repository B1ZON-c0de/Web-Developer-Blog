<script lang="ts" setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { RouterLink } from 'vue-router'
</script>
<template>
  <LayoutContainer
    class="flex h-[calc(100vh-64px)] flex-col items-center justify-center"
  >
    <h1 class="text-5xl">Доступ запрещен</h1>
    <p class="text-xl">У вас нет доступа к этой странице</p>
    <RouterLink to="/" class="active-link">На главную</RouterLink>
  </LayoutContainer>
</template>
