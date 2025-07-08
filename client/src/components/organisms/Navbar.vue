<template>
 <v-container>
    <v-app-bar elevation="1" color="white" class="px-7">
        <v-app-bar-title>
        <LogoType />
        </v-app-bar-title>
        
        <v-spacer />
        
        <ProfileDropdown />
    </v-app-bar>

    <aside>
      <SideMenu />
    </aside>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ProfileDropdown, SideMenu } from '@/components/molecules'
import { LogoType } from '@/components/atoms'

export default defineComponent({
  name: 'NavbarComponent',
  components: {
    ProfileDropdown,
    LogoType,
    SideMenu
  }
})
</script> 