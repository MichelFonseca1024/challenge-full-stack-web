import axios from 'axios'
import { inject } from 'vue'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosInstance


export const axiosKey = Symbol('axios')

export const axiosPlugin = {
  install(app: any) {
    app.provide(axiosKey, axiosInstance)
  }
}

export function useAxios() {
  const axios = inject(axiosKey)
  if (!axios) {
    throw new Error('Axios instance not provided!')
  }
  return axios
} 