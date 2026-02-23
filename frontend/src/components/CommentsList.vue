<script lang="ts" setup>
import { faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useArticleStore } from '@/stores/article'
import { formatDate } from '@/utils/formatDate'
import { useUserStore } from '@/stores/user'
import { useModalStore } from '@/stores/modal'
import { ref } from 'vue'
import MessageBoxBase from './base/MessageBoxBase.vue'

const errorMessage = ref<string>('')

const articleStore = useArticleStore()
const userStore = useUserStore()
const modalStore = useModalStore()

const handleDeleteComment = (id: string) => {
  errorMessage.value = ''
  modalStore.openModal('Удалить комментарий?', async () => {
    const response = await articleStore.deleteComment(id)
    if (response.error) {
      errorMessage.value = response.error
    }
  })
}
</script>

<template>
  <ul>
    <li
      v-for="comment in articleStore.article?.comments ?? []"
      :key="comment.id"
      class="mb-4 rounded-md bg-white p-4 shadow-md"
    >
      <div class="mb-2 flex justify-between">
        <p><FontAwesomeIcon :icon="faUser" />&nbsp; {{ comment.author }}</p>
        <button
          v-if="userStore.isAdmin"
          @click="handleDeleteComment(comment.id)"
          class="cursor-pointer text-red-500 transition-colors duration-300 hover:text-red-700"
        >
          <FontAwesomeIcon :icon="faTrash" />
          &nbsp; Удалить
        </button>
      </div>
      <p class="mb-2 text-sm text-gray-500">
        <time :datetime="comment.publishedAt">{{
          formatDate(comment.publishedAt)
        }}</time>
      </p>
      <div>{{ comment.content }}</div>
    </li>
  </ul>
  <MessageBoxBase v-if="errorMessage" :message="errorMessage" type="error" />
</template>
