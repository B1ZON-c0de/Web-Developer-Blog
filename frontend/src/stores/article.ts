import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import type { Article, Comment } from '../types/articleTypes'

export const useArticleStore = defineStore('article', () => {
  const article = ref<Partial<Article>>({})
  const isEditMode = ref<boolean>(false)

  const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value
  }

  const updateArticle = async ({
    title,
    content,
    imageUrl,
  }: Partial<Article>) => {
    try {
      const response = await fetch(`/api/posts/${article.value.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title || article.value.title,
          content: content || article.value.content,
          imageUrl: imageUrl || article.value.imageUrl,
        }),
      })
      if (!response.ok) {
        throw new Error('Не удалось обновить статью')
      }
      const data = await response.json()
      if (data.error) {
        console.error(data.error)
      } else {
        article.value = data.data
      }
      return 'success'
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }

  const fetchArticle = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`)
      if (!response.ok) {
        throw new Error('Не удалось получить данные поста')
      }
      const data = await response.json()
      if (data.error) {
        console.error(data.error)
      }
      article.value = data.data
      return data
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }
  const deleteArticle = async (id: string) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Не удалось удалить статью')
      }
      const data = await response.json()
      if (data.error) {
        console.error(data.error)
      }
      return data
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }
  const addComment = async (comment: string) => {
    try {
      const response = await fetch(`/api/posts/${article.value.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
        }),
      })
      if (!response.ok) {
        throw new Error('Не удалось добавить комментарий')
      }
      const data = await response.json()
      if (!data.error) {
        if (article.value?.comments) article.value.comments.push(data.data)
      }
      return data
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }
  const deleteComment = async (id: string) => {
    try {
      const response = await fetch(
        `/api/posts/${article.value.id}/comments/${id}`,
        {
          method: 'DELETE',
        },
      )
      if (!response.ok) {
        throw new Error('Не удалось удалить комментарий')
      }
      const data = await response.json()
      if (data.error) {
        console.error(data.error)
      } else {
        article.value.comments = article.value.comments?.filter(
          (comment: Comment) => comment.id !== id,
        )
      }
      return data
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }
  const addArticle = async ({ title, content, imageUrl }: Partial<Article>) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          imageUrl,
        }),
      })
      if (!response.ok) {
        throw new Error('Не удалось добавить статью')
      }
      const data = await response.json()
      if (data.error) {
        console.error(data.error)
      }
      return data
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }
  return {
    article,
    fetchArticle,
    isEditMode,
    toggleEditMode,
    updateArticle,
    deleteArticle,
    addComment,
    deleteComment,
    addArticle,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArticleStore, import.meta.hot))
}
