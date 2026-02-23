<script lang="ts" setup>
import ButtonBase from '@/components/base/ButtonBase.vue'
import InputBase from '@/components/base/InputBase.vue'
import InputErrorBase from '@/components/base/InputErrorBase.vue'
import LabelBase from '@/components/base/LabelBase.vue'
import MessageBoxBase from '@/components/base/MessageBoxBase.vue'
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { articleSchema } from '@/schema'
import { useArticleStore } from '@/stores/article'
import { Form, type SubmissionHandler } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const errorMessage = ref<string>('')

const router = useRouter()
const articleStore = useArticleStore()

const handleSubmit: SubmissionHandler = async (values) => {
  errorMessage.value = ''
  const response = await articleStore.addArticle(values)
  if (response.error) {
    errorMessage.value = response.error
  } else {
    router.push(`/posts/${response.data.id}`)
  }
}
</script>

<template>
  <LayoutContainer class="py-8">
    <h1 class="my-4 text-center text-2xl font-bold">Новая статья</h1>
    <Form
      class="mx-auto rounded-md bg-white p-6 shadow-md"
      :validation-schema="articleSchema"
      @submit="handleSubmit"
    >
      <div class="mb-4">
        <LabelBase for="imageUrl">URL изображения</LabelBase>
        <InputBase name="imageUrl" type="text" id="imageUrl" />
        <InputErrorBase name="imageUrl" />
      </div>
      <div class="mb-4">
        <LabelBase for="title">Название</LabelBase>
        <InputBase name="title" type="text" id="title" />
        <InputErrorBase name="title" />
      </div>
      <div class="mb-4">
        <LabelBase for="content">Содержимое</LabelBase>
        <InputBase
          as="textarea"
          name="content"
          class="resize-none"
          rows="15"
          id="content"
        />
        <InputErrorBase name="content" />
      </div>
      <ButtonBase type="submit" class="mb-4 w-full">Создать</ButtonBase>
      <MessageBoxBase type="error" :message="errorMessage">
        {{ errorMessage }}
      </MessageBoxBase>
    </Form>
  </LayoutContainer>
</template>
