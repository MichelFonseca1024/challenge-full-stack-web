<template>
  <v-btn 
    :block="block"
    :color="color" 
    :variant="variant"
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
  name: 'ButtonComponent',
  props: {
    block: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    variant: {
      type: String,
      default: 'flat'
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