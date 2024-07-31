import App from './App.vue'
import router from '@/router'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { setupAppHeight } from './utils/elements'
import { createBounceFixer } from '@varlet/bounce-fixer'
import dayjs from 'dayjs'
import { StyleProvider } from '@varlet/ui';

import '@/styles/common.less'
import '@varlet/touch-emulator'
import 'virtual:uno.css'
import 'virtual-icons'

setupAppHeight()
createBounceFixer().enable()
const app = createApp(App)

app.config.globalProperties.$dayjs = dayjs

app.use(router).use(createPinia()).mount('#app')

StyleProvider({
    "--snackbar-background":"rgba(0,0,0,0.64)",
    "--snackbar-info-background": "#33BFF2",
    "--snackbar-warning-background": "#FF9F00",
    "--snackbar-success-background": "#33D0A5",
    "--snackbar-error-background": "#F44336",
    "--snackbar-color":"#fff",
    // "--color-body":"#F8F8F8",
    "--tabs-indicator-inner-size":"24px",
    "--tab-padding":"16px",
    "--color-body":"#f9f6f4",
    "--dialog-message-padding:":"0",
    "--ripple-color":'transparent'
  });