<template>
  <v-col cols="12" md="10" lg="8" class="d-flex align-center">
    <InputField
      v-model="searchQuery"
      label="Pesquisar aluno por dados (nome, cpf ou registro acadêmico)"
      outlined
      dense
      hide-details
      single-line
      density="compact"
    />
    <v-btn 
      height="100 %" 
      color="primary" 
      @click="searchStudent" 
      class="ml-1"
    >
      Pesquisar
    </v-btn>
  </v-col>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { InputField } from '@/components/atoms'
import { useStudentStore } from '@/store/studentStore'

export default defineComponent({
  name: 'SearchStudents',
  components: {
    InputField
  },
  setup() {
    const studentStore = useStudentStore()
    const searchQuery = ref('')

    const searchStudent = () => {
      studentStore.query = searchQuery.value
      studentStore.pagination.page = 1
      studentStore.getStudents()
    }

    return {
      studentStore,
      searchStudent,
      searchQuery
    }
  }
})
</script>