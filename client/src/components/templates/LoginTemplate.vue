<template>
  <v-container class="pa-0" fluid style="height: 100vh; width: 100vw;">
    <v-row class="fill-height" align="center" justify="center">
      <v-col cols="12" md="6" lg="4">
        <LoginSection />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LoginSection } from '@/components/organisms'

export default defineComponent({
  name: 'LoginTemplate',
  components: {
    LoginSection
  }
})
</script>
