<script lang="ts" setup>
import { useArticleStore } from '@/stores/article'
import type { Article } from '@/types/articleTypes'
import {
  faArrowRotateBack,
  faFloppyDisk,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
import { useModalStore } from '@/stores/modal'
import { useRouter } from 'vue-router'
import InputBase from './base/InputBase.vue'

const modalStore = useModalStore()
const articleStore = useArticleStore()
const router = useRouter()
const editArticle = ref<Partial<Article>>({ ...articleStore.article })

const handleArticleEdit = async () => {
  try {
    const response = await articleStore.updateArticle({
      title: editArticle.value.title,
      content: editArticle.value.content,
      imageUrl: editArticle.value.imageUrl,
    })
    if (response === 'success') {
      articleStore.toggleEditMode()
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
    }
  }
}
const handleDeleteArticle = () => {
  modalStore.openModal('Удалить статью?', async () => {
    const response = await articleStore.deleteArticle(
      String(articleStore.article.id),
    )
    if (!response.error) {
      router.push({ name: 'Home' })
    }
  })
}
</script>

<template>
  <form
    @submit.prevent="handleArticleEdit"
    class="mb-8 rounded-md bg-white p-8 shadow-md"
  >
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-3xl">Редктировать статью</h1>
      <div class="flex gap-4 text-xl">
        <button
          type="button"
          @click="articleStore.toggleEditMode"
          aria-label="Отменить изменения"
          class="icon-hover cursor-pointer"
        >
          <FontAwesomeIcon :icon="faArrowRotateBack" />
        </button>
        <button
          type="submit"
          aria-label="Сохранить"
          class="icon-hover cursor-pointer"
        >
          <FontAwesomeIcon :icon="faFloppyDisk" />
        </button>
        <button
          @click="handleDeleteArticle"
          type="button"
          aria-label="Удалить"
          class="icon-hover cursor-pointer hover:text-red-500"
        >
          <FontAwesomeIcon :icon="faTrash" />
        </button>
      </div>
    </div>
    <p class="mb-4">
      <InputBase
        name="imageUrl"
        type="text"
        v-model="editArticle.imageUrl"
        placeholder="URL изображения"
      />
    </p>
    <p class="mb-4">
      <InputBase
        name="title"
        type="text"
        v-model="editArticle.title"
        placeholder="Название статьи"
      />
    </p>
    <p class="mb-4">
      <InputBase
        name="content"
        as="textarea"
        rows="10"
        v-model="editArticle.content"
        placeholder="Контент статьи"
      />
    </p>
  </form>
</template>
