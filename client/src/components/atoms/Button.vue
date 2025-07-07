<template>
  <v-btn 
    :block="block"
    :color="color" 
    :class="buttonClass"
    :type="type"
    :loading="loading"
    @click="$emit('click', $event)"
  >
    <slot />
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    block: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    buttonClass: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'button'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
})
</script> 