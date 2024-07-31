<script setup >
import { useDark } from './use'

useDark()
Snackbar('Snackbar 2');
</script>


<template>
  <app-mobile-detector>
    <div class="bg-[#FAF6FF]">
      <Suspense>
        <router-view />
      </Suspense>
    </div>
  </app-mobile-detector>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.one {
  text-overflow: ellipsis;
  overflow-wrap: break-word;
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
}
.two {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

/* input::placeholder {
  font-weight: 600 !important;
  font-size: 14px !important;
  color: #a42733 !important;
}
input {
  font-weight: 600 !important;
  font-size: 16px !important;
  color: #a42733 !important;
  caret-color: #ffa6a8;
} */
.var-snackbar__content {
  display: flex;
  align-items: center;
  justify-content: center;
}
.var-snackbar__icon:empty {
  display: none;
}
/* IOS微信、UC浏览器阻止字体大小调整 */
body {
  -webkit-text-size-adjust: none !important;
}
body {
  -webkit-text-size-adjust: 100% !important;
}
</style>