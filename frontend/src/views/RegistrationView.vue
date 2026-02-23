<script setup lang="ts">
import ButtonBase from '@/components/base/ButtonBase.vue'
import InputErrorBase from '@/components/base/InputErrorBase.vue'
import InputBase from '@/components/base/InputBase.vue'
import LabelBase from '@/components/base/LabelBase.vue'
import MessageBoxBase from '@/components/base/MessageBoxBase.vue'
import { registerSchema } from '@/schema'
import { Form, type SubmissionHandler } from 'vee-validate'
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const errorMessage = ref('')

const handleSubmit: SubmissionHandler = async (formData) => {
  errorMessage.value = ''
  try {
    const data = await userStore.register(formData.login, formData.password)
    if (data === undefined || data.error) {
      throw new Error(data?.error || 'Произошла ошибка при регистрации')
    } else {
      userStore.user = data.user
      router.push('/')
    }
  } catch (e) {
    if (e instanceof Error) {
      errorMessage.value = e.message
    }
  }
}
</script>
<template>
  <div class="py-8">
    <h1 class="my-4 text-center text-2xl font-bold">Регистрация</h1>
    <Form
      class="mx-auto max-w-sm rounded-md bg-white p-6 shadow-md"
      :validation-schema="registerSchema"
      @submit="handleSubmit"
    >
      <div class="mb-4">
        <LabelBase for="login"> Логин </LabelBase>
        <InputBase name="login" type="text" id="login" />
        <InputErrorBase name="login" />
      </div>
      <div class="mb-4">
        <LabelBase for="password"> Пароль </LabelBase>
        <InputBase name="password" type="password" id="password" />
        <InputErrorBase name="password" />
      </div>
      <div class="mb-4">
        <LabelBase for="confirmPassword"> Подтверждение пароля </LabelBase>
        <InputBase
          type="password"
          name="confirmPassword"
          id="confirmPassword"
        />
        <InputErrorBase name="confirmPassword" />
      </div>
      <ButtonBase type="submit" class="w-full"> Зарегистрироваться </ButtonBase>
      <MessageBoxBase type="error">{{ errorMessage }}</MessageBoxBase>
    </Form>
  </div>
</template>
