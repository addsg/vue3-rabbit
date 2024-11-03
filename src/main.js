import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/styles/common.scss'
import { useIntersectionObserver } from '@vueuse/core'

import { lazyPlugin } from './directives'
const app = createApp(App)
//引入全局组件插件
import { componentPlugin } from './components'

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')