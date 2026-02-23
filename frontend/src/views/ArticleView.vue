<script lang="ts" setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import ArticleDetails from '@/components/ArticleDetails.vue'
import CommentsList from '@/components/CommentsList.vue'
import CommentsForm from '@/components/CommentsForm.vue'
import ArticleDetailsForm from '@/components/ArticleDetailsForm.vue'
import { onBeforeMount, ref } from 'vue'
import { useArticleStore } from '@/stores/article'
import { useUserStore } from '@/stores/user'

const props = defineProps<{ id: string }>()
const notFound = ref<boolean>(false)

const userStore = useUserStore()
const articleStore = useArticleStore()

onBeforeMount(async () => {
  try {
    const repsonse = await articleStore.fetchArticle(props.id)
    if (repsonse.error) {
      notFound.value = true
    }
  } catch (e) {
    if (e instanceof Error) {
      notFound.value = true
      console.error(e.message)
    }
  }
})
</script>
<template>
  <NotFoundView v-if="notFound" />
  <LayoutContainer class="mt-4">
    <ArticleDetailsForm v-if="articleStore.isEditMode" />
    <ArticleDetails v-else />
    <div
      v-if="
        !articleStore.isEditMode &&
        ((articleStore.article?.comments?.length ?? 0) > 0 ||
          userStore.isAuthorized)
      "
    >
      <h2 class="mb-4 text-2xl font-bold">Комментарии</h2>
      <CommentsList v-if="(articleStore.article?.comments?.length ?? 0) > 0" />
      <CommentsForm v-if="userStore.isAuthorized" />
    </div>
  </LayoutContainer>
</template>
