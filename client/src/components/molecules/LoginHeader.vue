<template>
  <div class="text-center mb-6">
    <LogoType />
  </div>
  <h2 class="text-h5 text-center mb-8 text-secondary">Fazer Login</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LogoType } from '@/components/atoms'

export default defineComponent({
  name: 'LoginHeader',
  components: {
    LogoType
  }
})
</script> 