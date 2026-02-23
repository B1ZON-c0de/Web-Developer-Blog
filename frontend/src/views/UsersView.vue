<script lang="ts" setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useUsersStore } from '@/stores/users'
import { onBeforeMount, ref } from 'vue'
import MessageBoxBase from '@/components/base/MessageBoxBase.vue'
import { formatDate } from '@/utils/formatDate'
import { useRolesStore } from '@/stores/roles'
import type { User } from '@/types/userTypes'

const usersStore = useUsersStore()
const rolesStore = useRolesStore()
const users = ref<User[]>([])
const error = ref('')
const userMessage = ref<Record<string, string>>({})
const userMessageType = ref<Record<string, string>>({})

const handleUserDelete = async (id: string) => {
  const response = await usersStore.deleteUser(id)
  if (response.error) {
    console.error(response.error)
    error.value = response.error
  } else {
    usersStore.users = usersStore.users.filter((user) => user.id !== id)
    users.value = users.value.filter((user) => user.id !== id)
  }
}

const handleUserUpdate = async (user: User) => {
  const storedUser = usersStore.users.find((u) => u.id === user.id)

  if (user.roleId === storedUser?.roleId) {
    return
  }

  const response = await usersStore.updateUser(user.id, user.roleId)
  if (response.error) {
    console.error(response.error)
    error.value = response.error
    if (storedUser) user.roleId = storedUser.roleId
  } else {
    userMessage.value[user.id] = 'Пользователь обновлен'
    userMessageType.value[user.id] = 'success'
    if (storedUser) storedUser.roleId = user.roleId
    setTimeout(() => {
      userMessage.value[user.id] = ''
      userMessageType.value[user.id] = ''
    }, 3000)
  }
}

onBeforeMount(() => {
  Promise.all([rolesStore.fetchRoles(), usersStore.fetchUsers()]).then(
    ([rolesResponse, usersResponse]) => {
      if (rolesResponse.error || usersResponse.error) {
        console.error(rolesResponse.error || usersResponse.error)
        error.value = 'Ошибка загрузки данных'
      } else {
        rolesStore.roles = rolesResponse.data
        usersStore.users = JSON.parse(JSON.stringify(usersResponse.data))
        users.value = JSON.parse(JSON.stringify(usersResponse.data))
      }
    },
  )
})
</script>

<template>
  <LayoutContainer>
    <h1 class="my-8 text-center text-3xl font-bold">Пользователи</h1>

    <div class="mb-10 rounded-md bg-white p-8 shadow-md">
      <MessageBoxBase type="error" v-if="error">{{ error }}</MessageBoxBase>
      <table class="min-w-full" v-if="users.length > 0">
        <thead>
          <tr>
            <th>Логин</th>
            <th>Дата регистрации</th>
            <th>Роль</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="py-4 text-center">{{ user.login }}</td>
            <td class="py-4 text-center">
              {{
                formatDate(user.registeredAt || '', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })
              }}
            </td>
            <td class="py-4 text-center">
              <form
                class="relative flex gap-2"
                @submit.prevent="handleUserUpdate(user)"
              >
                <select
                  v-model="user.roleId"
                  :name="`user-${user.id}-role`"
                  class="w-full rounded-md border border-gray-400 px-3 py-2"
                >
                  <option
                    v-for="role in rolesStore.roles"
                    :key="`${user.id}-${role.name}`"
                    :value="role.id"
                  >
                    {{ role.name }}
                  </option>
                </select>
                <button type="submit" class="icon-btn">
                  <FontAwesomeIcon :icon="faSave" />
                </button>
                <MessageBoxBase
                  class="absolute left-full"
                  :type="userMessageType[user.id]"
                  v-if="userMessage[user.id]"
                  >{{ userMessage[user.id] }}</MessageBoxBase
                >
              </form>
            </td>
            <td class="py-4 text-right">
              <button
                type="button"
                @click="handleUserDelete(user.id)"
                class="cursor-pointer text-red-500 transition-colors duration-300 hover:text-red-700"
              >
                <FontAwesomeIcon :icon="faTrash" />
                Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </LayoutContainer>
</template>
