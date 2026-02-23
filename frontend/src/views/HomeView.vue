<script setup lang="ts">
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import SearchBase from '../components/base/SearchBase.vue'
import ArticleList from '../components/ArticleList.vue'
import { useArticlesStore } from '@/stores/articles'
import PaginationBase from '@/components/base/PaginationBase.vue'

const articlesStore = useArticlesStore()
</script>
<template>
  <LayoutContainer>
    <SearchBase :on-search="articlesStore.fetchArticles" />
    <ArticleList />
    <PaginationBase
      v-if="articlesStore.totalPages > 1"
      :current-page="articlesStore.currentPage"
      :total-pages="articlesStore.totalPages"
      :on-page-change="articlesStore.fetchArticles"
    />
  </LayoutContainer>
</template>
