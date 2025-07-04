<template>
  <v-container class=" pa-0" fluid style="height: 100vh; width: 100vw;">
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-8" elevation="0">
          <div class="text-center mb-6">
            <h1 class="font-weight-bold mb-1 text-primary" style="font-size: 2.2rem">Edtech</h1>
          </div>
          <h2 class="text-h5 text-center mb-8 text-dark">Fazer Login</h2>
          
          <v-form @submit="handleLogin">
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="E-mail *"
                  type="email"
                  color="primary"
                  variant="outlined"
                  required
                  :error-messages="emailError"
                  autocomplete="email"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  label="Senha *"
                  color="primary"
                  variant="outlined"
                  required
                  :error-messages="passwordError"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword"
                  autocomplete="current-password"
                />
              </v-col>
              <v-col cols="12" v-if="loginError">
                <v-alert type="error" variant="outlined">
                  {{ loginError }}
                </v-alert>
              </v-col>
            </v-row>
            
            <v-row class="mt-4" dense>
              <v-col cols="12" md="6">
                <v-btn
                  block
                  variant="outlined"
                  color="primary"
                  style="border-width: 2px"
                  class="text-primary"
                  @click="goBack"
                >CANCELAR</v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn 
                  block 
                  color="primary" 
                  class="text-white" 
                  type="submit"
                  :loading="loading"
                >ENTRAR</v-btn>
              </v-col>
            </v-row>
          </v-form>
          
          <div class="text-center mt-4">
            <a href="#" class="text-primary" style="text-decoration: underline; font-weight: 600">
              Esqueceu sua senha?
            </a>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'LoginTemplate',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const { loading, error: authError } = storeToRefs(authStore)
    
    const email = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const emailError = ref('')
    const passwordError = ref('')

    const validateForm = () => {
      emailError.value = ''
      passwordError.value = ''
      authStore.clearError()
      
      let isValid = true

      if (!email.value) {
        emailError.value = 'E-mail é obrigatório'
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        emailError.value = 'E-mail deve ter um formato válido'
        isValid = false
      }

      if (!password.value) {
        passwordError.value = 'Senha é obrigatória'
        isValid = false
      }

      return isValid
    }

    const handleLogin = async (event: Event) => {
      event.preventDefault()
      if (!validateForm()) return

      try {
        await authStore.login({
          email: email.value,
          password: password.value
        })

        router.push('/dashboard')
        
      } catch (error) {
        console.error('Erro no login:', error)
      }
    }

    const goBack = () => {
      router.push('/')
    }

    return {
      email,
      password,
      showPassword,
      loading,
      emailError,
      passwordError,
      loginError: authError,
      handleLogin,
      goBack
    }
  }
})
</script>
