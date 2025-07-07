<template>
  <v-text-field
    :model-value="modelValue"
    :label="label"
    :type="type"
    :color="color"
    :variant="variant"
    :required="required"
    :error-messages="errorMessages"
    :autocomplete="autocomplete"
    :append-inner-icon="appendInnerIcon"
    @update:model-value="$emit('update:modelValue', $event)"
    @click:append-inner="$emit('clickAppendInner')"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputField',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    color: {
      type: String,
      default: 'primary'
    },
    variant: {
      type: String,
      default: 'outlined'
    },
    required: {
      type: Boolean,
      default: false
    },
    errorMessages: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: ''
    },
    appendInnerIcon: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'clickAppendInner']
})
</script> 