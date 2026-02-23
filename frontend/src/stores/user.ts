import type { User } from '@/types/userTypes'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'
import ROLES from '@/constants/roles'

const initialStateUser: User = {
  id: '',
  login: '',
  roleId: null,
  createdAt: '',
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User>(initialStateUser)

  const isAuthorized = computed(() => !!user.value.id)
  const isAdmin = computed(
    () => user.value.id && user.value.roleId === ROLES.ADMIN,
  )
  const isModerator = computed(
    () => user.value.id && user.value.roleId === ROLES.MODERATOR,
  )

  const register = async (login: string, password: string) => {
    try {
      const resp = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      })
      if (!resp.ok) {
        throw new Error('Ошибка регистрации')
      }
      const data = await resp.json()
      if (!data.error) {
        user.value = data.user
      }
      return data
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
    }
  }
  const login = async (login: string, password: string) => {
    try {
      const resp = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      })
      if (!resp.ok) {
        throw new Error('Ошибка авторизации')
      }
      const data = await resp.json()
      return data
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
    }
  }
  const logout = async () => {
    try {
      const resp = await fetch('/api/logout', {
        method: 'POST',
      })
      if (!resp.ok) {
        throw new Error('Ошибка выхода')
      }
      const data = await resp.json()
      if (!data.error) {
        user.value = initialStateUser
      }

      return data
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
    }
  }
  return {
    user,
    register,
    login,
    logout,
    isAuthorized,
    isAdmin,
    isModerator,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
