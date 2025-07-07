<template>
  <v-card class="pa-8" elevation="0">
    <LoginHeader />
    <LoginForm />
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LoginHeader, LoginForm } from '@/components/molecules'

export default defineComponent({
  name: 'LoginSection',
  components: {
    LoginHeader,
    LoginForm
  }
})
</script> 