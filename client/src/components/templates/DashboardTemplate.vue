<template>
  <v-container class="pa-0" fluid style="height: 100vh; width: 100vw;">
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12">
        <v-card class="pa-8" elevation="0">
          <div class="text-center mb-6">
            <h1 class="font-weight-bold mb-1 text-primary" style="font-size: 2.2rem">Dashboard</h1>
          </div>
          
          <div class="text-center mb-4">
            <p class="text-dark">
              Bem-vindo(a), <strong>{{ currentUser.name }}</strong>!
            </p>
            <p class="text-dark">
              Email: {{ currentUser.email }}
            </p>
          </div>
          
          <div class="text-center">
            <v-btn 
              color="primary" 
              variant="outlined"
              @click="handleLogout"
            >
              SAIR
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'DashboardTemplate',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const { currentUser } = storeToRefs(authStore)

    const handleLogout = () => {
      authStore.logout()
      router.push('/login')
    }

    return {
      currentUser,
      handleLogout
    }
  }
})
</script>
