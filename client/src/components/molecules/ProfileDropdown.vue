<template>
  <DropdownMenu 
    variant="outlined" 
    color="primary"
    :close-on-content-click="false"
  >
    <template #activator>
      <v-avatar size="32" class="mr-2">
        <v-icon>mdi-account</v-icon>
      </v-avatar>
       {{ currentUser.name }}
    </template>
    
    <template #content>
      <v-list-item>
        <v-list-item-title class="text-subtitle-2 text-secondary font-weight-bold">
          {{ currentUser.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ currentUser.email }}
        </v-list-item-subtitle>
      </v-list-item>
      
      <v-divider />
      
      <v-list-item 
        @click="handleLogout"
        class="text-red"
      >
        <template #prepend>
          <v-icon color="red">mdi-logout</v-icon>
        </template>
        <v-list-item-title>Sair</v-list-item-title>
      </v-list-item>
    </template>
  </DropdownMenu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'
import { storeToRefs } from 'pinia'
import { DropdownMenu } from '@/components/atoms'

export default defineComponent({
  name: 'ProfileDropdown',
  components: {
    DropdownMenu
  },
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