<script setup lang="ts">
import { ref } from "vue";

const isMobile = ref(
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
);
</script>

<template>
  <slot v-if="isMobile" />

  <div class="flex flex-col min-h-screen items-center px-[14px] bg-[#FAF6FF]" v-else>
    <div class="w-600">
      <slot />
    </div>
  </div>
</template>
