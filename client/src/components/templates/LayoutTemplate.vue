<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container class="pa-8" fluid>
        <router-view />
        <!-- rota: /students e subrota: /new e /update -->
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Navbar } from '@/components/organisms'

export default defineComponent({
  name: 'LayoutTemplate',
  components: {
    Navbar
  }
})
</script>
