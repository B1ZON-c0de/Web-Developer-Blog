<script lang="ts" setup>
import type { Article } from '@/types/articleTypes'
import { formatDate } from '@/utils/formatDate'
import {
  faCalendar,
  faComment,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
defineProps<{ article: Article }>()
</script>
<template>
  <article>
    <RouterLink
      :to="`/posts/${article.id}`"
      class="link-article"
    >
      <div class="mb-4">
        <img
          class="h-48 w-full object-cover"
          :src="article.imageUrl"
          alt="Random image"
        />
      </div>
      <div>
        <h3 class="mb-2 text-xl">
          {{ article.title }}
        </h3>
      </div>
      <div
        class="mt-auto flex items-center justify-between"
      >
        <p>
          <time datetime="">
            <FontAwesomeIcon :icon="faCalendar" />
            {{ formatDate(article.publishedAt) }}
          </time>
        </p>
        <p>
          <FontAwesomeIcon :icon="faComment" />
          {{ article.comments.length }}
          <span class="sr-only">Комментарии</span>
        </p>
      </div>
    </RouterLink>
  </article>
</template>
