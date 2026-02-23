<script lang="ts" setup>
import { useArticleStore } from '@/stores/article'
import { formatDate } from '@/utils/formatDate'
import {
  faCalendar,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useUserStore } from '@/stores/user'
import { useModalStore } from '@/stores/modal'
import { useRouter } from 'vue-router'

const articleStore = useArticleStore()
const userStore = useUserStore()
const modalStore = useModalStore()
const router = useRouter()

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
  <div class="mb-8 rounded-md bg-white p-8 shadow-md">
    <div class="mb-5">
      <img
        :src="articleStore.article.imageUrl"
        alt=""
        class="h-72 w-full rounded-md object-cover"
      />
    </div>
    <p class="mb-4 text-gray-500">
      <FontAwesomeIcon :icon="faCalendar" />
      <time :datetime="articleStore.article.publishedAt">{{
        formatDate(String(articleStore.article.publishedAt), {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      }}</time>
    </p>
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-3xl">{{ articleStore.article.title }}</h1>
      <div class="flex gap-4 text-xl" v-if="userStore.isAdmin">
        <button
          @click="articleStore.toggleEditMode"
          aria-label="Редактировать"
          class="icon-hover cursor-pointer"
        >
          <FontAwesomeIcon :icon="faPenToSquare" />
        </button>
        <button
          @click="handleDeleteArticle"
          aria-label="Удалить"
          class="icon-hover cursor-pointer hover:text-red-500"
        >
          <FontAwesomeIcon :icon="faTrash" />
        </button>
      </div>
    </div>
    <div class="whitespace-pre-wrap">
      {{ articleStore.article.content }}
    </div>
  </div>
</template>
