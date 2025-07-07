import './assets/css/main.css'
import 'normalize.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createPinia } from 'pinia'
import { axiosPlugin } from './services/axios'


import VueSweetalert2 from 'vue-sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/dist/sweetalert2.min.css';

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

declare global {
	interface Window {
		toast: any
	}
}

window.toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 4000,
	timerProgressBar: true,
	didOpen: toast => {
		toast.addEventListener('mouseenter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
})


const app = createApp(App)
const pinia = createPinia()

app.use(VueSweetalert2)
app.use(router)
app.use(vuetify)
app.use(pinia)
app.use(axiosPlugin)
app.use(vueTheMask)


app.mount('#app')
