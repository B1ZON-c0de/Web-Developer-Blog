import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/userTypes'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])

  const fetchUsers = async () => {
    try {
      const resp = await fetch('/api/users')
      if (!resp.ok) {
        throw new Error('Ошибка загрузки пользователей')
      }
      const data = await resp.json()
      return data
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }

  const deleteUser = async (id: string) => {
    try {
      const resp = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      })
      if (!resp.ok) {
        throw new Error('Ошибка удаления пользователя')
      }
      const data = await resp.json()
      return data
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }

  const updateUser = async (id: string, userRole: number | null) => {
    try {
      const resp = await fetch(`/api/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roleId: userRole,
        }),
      })
      if (!resp.ok) {
        throw new Error('Ошибка обновления пользователя')
      }
      const data = await resp.json()
      return data
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message)
      }
    }
  }

  return {
    users,
    fetchUsers,
    deleteUser,
    updateUser,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}
