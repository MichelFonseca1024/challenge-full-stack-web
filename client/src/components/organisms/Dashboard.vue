<template>
  <v-container class="pa-8">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-8 mb-6" elevation="2">
          <div class="text-center">
            <v-avatar size="80" color="primary" class="mb-4">
              <v-icon size="40" color="white">mdi-account-circle</v-icon>
            </v-avatar>
            
            <h1 class="text-h4 font-weight-bold text-primary mb-2">
              Bem-vindo(a), {{ currentUser.name }}!
            </h1>
            
            <p class="text-h6 text-grey-darken-1 mb-4">
              É um prazer tê-lo(a) de volta ao Edtech
            </p>
            
            <v-chip color="success" variant="outlined" size="large">
              <v-icon start>mdi-check-circle</v-icon>
              Acesso autorizado
            </v-chip>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'DashboardComponent',
  setup() {
    const authStore = useAuthStore()
    const { currentUser } = storeToRefs(authStore)    

    return {
      currentUser
    }
  }
})
</script>