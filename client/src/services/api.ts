import router from '@/router'
import axiosInstance from './axios'


type verifyTokenResponse = {
  code: number,
  message: string,
  data: {
    auth: boolean,
    token: string,
    user: { name: string, email: string }
  }
}


axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = window.localStorage.getItem('token')
    if (token && config.url !== 'auth/login') {
      config.headers.Authorization = token
    }
    return config
  },
  (err: any) => Promise.reject(err)
)

axiosInstance.interceptors.response.use(
  (response: any) => response.data,
  (err: any) => {
    const { response } = err
    if (response && response.status === 401) {
      router.push({ name: 'login' })
    }
    return Promise.reject(response?.data?.error || err)
  }
)

const api = {
  async get(url: string, params?: any) {
    try {
      const response = await axiosInstance.get(url, { params })
      return response
    } catch (error: any) {
        return Promise.reject(error.response?.data || error)
      }
  },
  async post(url: string, body?: any) {
    try {
      const response = await axiosInstance.post(url, body)
      return response
    } catch (error: any) {
      return Promise.reject(error.response?.data || error)
    }
  },
  async put(url: string, body?: any) {
    try {
      const response = await axiosInstance.put(url, body)
      return response
    } catch (error: any) {
      return Promise.reject(error.response?.data || error)
    }
  },
  async delete(url: string) {
    try {
      const response = await axiosInstance.delete(url)
      return response
    } catch (error: any) {
      return Promise.reject(error.response?.data || error)
    }
  },
  async login(body: any): Promise<{ token: string; user: { name: string; email: string } }> {
    try {
      const response = await axiosInstance.post('auth/login', body)
      return response.data
    } catch (error: any) {
      return Promise.reject(error.response?.data || error)
    }
  },
  async verifyToken(credentials: {
    token: string;
    email: string;
    name: string;
  }) {
    try {
      const { data }: verifyTokenResponse = await axiosInstance.post('auth/refresh-token', credentials)
      return data
    } catch (error: any) {
      return Promise.reject(error.response?.data || error)
    }
  }
}


export default api