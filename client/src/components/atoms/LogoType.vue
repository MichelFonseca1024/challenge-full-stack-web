<template>
  <img 
    src="@/assets/images/logo.png" 
    :alt="alt" 
    :width="width" 
    :height="height" 
    class="logo" 
    style="object-fit: contain;"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LogoType',
  props: {
    width: {
      type: String,
      default: '150px'
    },
    height: {
      type: String,
      default: '40px'
    },
    alt: {
      type: String,
      default: 'Logo'
    }
  }
})
</script>