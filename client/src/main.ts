import './assets/css/main.css'
import 'normalize.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'


// @ts-ignore
import vueTheMask from 'vue-the-mask'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import light from './assets/vuetify/lightTheme'

const vuetify = createVuetify({
    theme: {
        defaultTheme: 'light',
        themes: {
            light,
        }
    },
    components,
    directives,
  })

const app = createApp(App)
const pinia = createPinia()

app.use(vuetify)
app.use(pinia)
app.use(vueTheMask)


app.mount('#app')
