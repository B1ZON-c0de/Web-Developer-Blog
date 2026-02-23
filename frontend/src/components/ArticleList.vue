<script lang="ts" setup>
import { useArticlesStore } from '../stores/articles'
import { onBeforeMount } from 'vue'
import ArticleItem from './ArticleItem.vue'

const articlesStore = useArticlesStore()

onBeforeMount(() => {
  articlesStore.fetchArticles()
})
</script>

<template>
  <section class="my-8">
    <h2 class="sr-only">Последние статьи</h2>
    <div v-if="articlesStore.isLoading" class="loading">
      <span>Загрузка статей...</span>
    </div>
    <div v-else-if="articlesStore.error" class="error">
      {{ articlesStore.error }}
    </div>
    <div v-else-if="articlesStore.articles.length === 0">
      Статьи не найдены
    </div>
    <ul v-else class="grid grid-cols-3 gap-8">
      <li
        v-for="article in articlesStore.articles"
        :key="article.id"
      >
        <ArticleItem :article="article" />
      </li>
    </ul>
  </section>
</template>
