import type { Article } from '@/types/articleTypes'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

interface FetchArticlesArgs {
  search?: string
  page?: number
}

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref<Article[]>([])
  const currentPage = ref<number>(1)
  const totalPages = ref<number>(1)
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)
  const searchQuery = ref<string>('')

  const fetchArticles = async (args: FetchArticlesArgs = {}) => {
    const { search = '', page = 1 } = args
    searchQuery.value = search
    currentPage.value = page
    isLoading.value = true
    try {
      const response = await fetch(
        `/api/posts?search=${searchQuery.value}&limit=9&page=${page}`,
      )
      if (!response.ok) {
        throw new Error('Не удалось загрузить статьи')
      }
      const { data } = await response.json()
      articles.value = data.posts
      totalPages.value = data.lastPage
    } catch (e) {
      isLoading.value = false
      if (e instanceof Error) {
        error.value = e?.message
        console.log(e?.message)
      }
    } finally {
      isLoading.value = false
    }
  }
  return {
    articles,
    currentPage,
    totalPages,
    fetchArticles,
    error,
    isLoading,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot))
}
