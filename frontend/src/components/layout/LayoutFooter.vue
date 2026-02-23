<script setup lang="ts">
import { onBeforeMount } from 'vue'
import LayoutContainer from './LayoutContainer.vue'
import { useWeather } from '@/composables/useWeather'

const year = new Date().getFullYear()

const {
  city,
  temp,
  condition,
  isLoading,
  error,
  getWeatherFromIp,
} = useWeather()

onBeforeMount(() => {
  getWeatherFromIp()
})
</script>

<template>
  <LayoutContainer>
    <div class="flex items-center justify-between py-8">
      <div>
        <p>Блог веб-разработчика</p>
        <p>
          <a
            href="mailto:web@developer.ru"
            class="hover:underline"
          >
            web@developer.ru
          </a>
        </p>
      </div>
      <div v-if="isLoading" class="text-right">
        Загрузка...
      </div>
      <div v-else-if="error" class="text-right">
        {{ error }}
      </div>
      <div v-else class="text-right">
        <p>
          {{ city }}
          <time :datetime="String(year)">{{ year }}</time>
        </p>
        <p>Погода: {{ condition }}, {{ temp }}°C</p>
      </div>
    </div>
  </LayoutContainer>
</template>
