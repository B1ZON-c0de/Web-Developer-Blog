<script setup lang="ts">
import LayoutHeader from './components/layout/LayoutHeader.vue'
import LayoutFooter from './components/layout/LayoutFooter.vue'
import ModalBase from './components/base/ModaBase.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from './stores/user'
import { computed } from 'vue'
import AccessDeniedView from './views/AccessDeniedView.vue'

const route = useRoute()
const userStore = useUserStore()

const canAccess = computed(() => {
  const requiresAdmin = route.meta.requiresAdmin
  if (requiresAdmin && !userStore.isAdmin) {
    return false
  } else {
    return true
  }
})
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-gray-100">
    <header class="fixed top-0 right-0 left-0 z-10 bg-white shadow-md">
      <LayoutHeader />
    </header>
    <main class="mt-26 flex-1">
      <RouterView v-if="canAccess" />
      <AccessDeniedView v-else />
    </main>
    <footer class="bg-white">
      <LayoutFooter />
    </footer>
    <ModalBase />
  </div>
</template>

<style scoped></style>
