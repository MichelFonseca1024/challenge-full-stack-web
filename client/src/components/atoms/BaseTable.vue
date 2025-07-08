<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
    v-bind="$attrs"
    :hide-default-footer="true"
  >
      
      <template v-for="slot in Object.keys($slots)" :key="slot" v-slot:[slot]="{ item }">
        <slot :name="slot" :item="item" />
      </template>

      <template #no-data>
        <div class="text-center">
          <v-icon>mdi-database-search</v-icon>
          <span>Nenhum dado encontrado</span>
        </div>
      </template>
  </v-data-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseTable',
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
})
</script>