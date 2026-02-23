<script lang="ts" setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { useUserStore } from '@/stores/user'
import {
  faCode,
  faBackward,
  faFile,
  faUsers,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const handleLogout = async () => {
  const response = await userStore.logout()

  if (!response.error && route.meta.requiresAdmin) {
    router.push('/login')
  }
}
</script>

<template>
  <LayoutContainer>
    <div class="flex items-center justify-between py-4">
      <div>
        <RouterLink
          to="/"
          class="group transition-colors duration-300 hover:text-blue-500"
        >
          <FontAwesomeIcon
            :icon="faCode"
            class="mr-2 transition-all duration-300 group-hover:scale-115"
          />
          Блог веб-разработчика
        </RouterLink>
      </div>
      <div>
        <p>Веб-технологии</p>
        <p>Написание кода</p>
        <p>Разбор ошибок</p>
      </div>
      <div class="text-right">
        <div class="mb-2">
          <RouterLink
            v-if="!userStore.isAuthorized"
            to="/login"
            class="btn-login"
            aria-label="Войти"
            >Войти</RouterLink
          >
          <div v-else>
            <span>{{ userStore.user.login }}</span>
            &nbsp; | &nbsp;
            <button @click="handleLogout">
              <FontAwesomeIcon
                :icon="faRightFromBracket"
                class="icon-hover cursor-pointer"
              />
            </button>
          </div>
        </div>
        <p>
          <a href="#" @click.prevent="$router.go(-1)">
            <FontAwesomeIcon :icon="faBackward" class="icon-hover" />
          </a>
          &nbsp;
          <RouterLink
            v-if="userStore.isAuthorized && userStore.isAdmin"
            to="/posts"
            aria-label="Написать статью"
          >
            <FontAwesomeIcon :icon="faFile" class="icon-hover" />
          </RouterLink>
          &nbsp;
          <RouterLink
            v-if="userStore.isAuthorized && userStore.isAdmin"
            to="/users"
            aria-label="Пользователи"
          >
            <FontAwesomeIcon :icon="faUsers" class="icon-hover" />
          </RouterLink>
        </p>
      </div>
    </div>
  </LayoutContainer>
</template>
