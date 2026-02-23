import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const message = ref<string>('Вы уверены?')
  const isVisible = ref<boolean>(false)
  const callback = ref<() => void | null>()

  const openModal = (newMessage: string, newCallback: () => void) => {
    callback.value = newCallback
    message.value = newMessage
    isVisible.value = true
  }

  const closeModal = () => {
    isVisible.value = false
  }

  const confirmModal = () => {
    callback.value?.()
    closeModal()
  }

  return { message, isVisible, openModal, closeModal, confirmModal }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot))
}
