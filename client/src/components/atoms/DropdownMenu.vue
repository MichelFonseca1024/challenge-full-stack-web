<template>
  <v-menu :close-on-content-click="closeOnContentClick">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        :color="color"
        :variant="variant"
        :class="buttonClass"
        @click="$emit('click', $event)"
      >
        <slot name="activator" />
        <v-icon :icon="icon" class="ml-1" />
      </v-btn>
    </template>
    
    <v-list>
      <slot name="content" />
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownMenu',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    variant: {
      type: String,
      default: 'text'
    },
    buttonClass: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'mdi-chevron-down'
    },
    closeOnContentClick: {
      type: Boolean,
      default: true
    }
  },
  emits: ['click']
})
</script> 