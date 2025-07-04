import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    token: null as string | null,
    user: {
      name: '',
      email: ''
    },
    loading: false,
    error: null as string | null
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && !!state.token,
    currentUser: (state) => state.user
  },

  actions: {
    
    async initAuth() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      
      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
        this.isAuthenticated = await this.refreshToken()
        console.log("initAuth", this.isAuthenticated)
      }
    },

    async login(credentials: { email: string; password: string }) {
      this.loading = true
      this.error = null

      try {
        const response = await api.login(credentials)

        if (!response.token || !response.user) {
            throw new Error('Resposta inválida do servidor')
        }

        this.token = response.token
        this.user = response.user
        this.isAuthenticated = true

        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))

        return response
        
      } catch ({ data }: any) {
        this.error = data?.error?.message || 'Erro ao fazer login. Verifique suas credenciais.'
        this.isAuthenticated = false
        this.token = null
        this.user = { name: '', email: '' }
        
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        throw data
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.isAuthenticated = false
      this.token = null
      this.user = { name: '', email: '' }
      this.error = null

      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    async refreshToken() {
      const oldToken = this.token
      const { email, name } = this.user

      if (!oldToken || !email || !name) {
        this.logout()
        return false
      }

      try {
        const response = await api.verifyToken({
          token: oldToken,
          email,
          name
        })

        if (response.token && response.user) {
          this.token = response.token
          this.user = response.user
          this.isAuthenticated = true

          localStorage.setItem('token', response.token)
          localStorage.setItem('user', JSON.stringify(response.user))
         
          return true
        } 
  
        this.logout()
        return false
        
      } catch (error) {
        this.logout()
        return false
      }
    },

    clearError() {
      this.error = null
    }
  }
}) 