<template>
  <v-form @submit="handleSubmit">
    <v-row dense>
      <v-col cols="12">
        <InputField
          v-model="email"
          label="E-mail *"
          type="email"
          required
          :error-messages="emailError"
          autocomplete="email"
        />
      </v-col>
      <v-col cols="12">
        <InputField
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          label="Senha *"
          required
          :error-messages="passwordError"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          autocomplete="current-password"
          @click-append-inner="showPassword = !showPassword"
        />
      </v-col>
      <v-col cols="12" v-if="loginError">
        <v-alert type="error" variant="outlined">
          {{ loginError }}
        </v-alert>
      </v-col>
    </v-row>
    
    <v-row class="mt-4 d-flex justify-center" dense>
      <v-col cols="12" md="6">
        <Button 
          block 
          color="primary" 
          button-class="text-white" 
          type="submit"
          :loading="loading"
        >
          ENTRAR
        </Button>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import { storeToRefs } from 'pinia'
import { InputField, Button } from '@/components/atoms'

export default defineComponent({
  name: 'LoginForm',
  components: {
    InputField,
    Button
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const { loading, error: loginError } = storeToRefs(authStore)
    
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

    const handleSubmit = async (event: Event) => {
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

    return {
      email,
      password,
      showPassword,
      loading,
      emailError,
      passwordError,
      loginError,
      handleSubmit,
    }
  }
})
</script> 