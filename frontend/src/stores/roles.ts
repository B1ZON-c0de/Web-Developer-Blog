import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useRolesStore = defineStore('roles', () => {
  const roles = ref()

  const fetchRoles = async () => {
    try {
      const resp = await fetch('/api/users/roles')
      if (!resp.ok) {
        throw new Error('Ошибка загрузки ролей')
      }
      const data = await resp.json()
      return data
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }
  return { roles, fetchRoles }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRolesStore, import.meta.hot))
}
