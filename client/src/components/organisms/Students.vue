<template>
 <v-container class="pa-8">
    <v-row justify="center">
      <SearchStudents />
      <v-col cols="4" class="text-right">
        <v-btn color="primary" @click="registerStudent">
          Cadastrar Aluno
        </v-btn>
      </v-col>
    </v-row>
    <StudentTable />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStudentStore } from '@/store/studentStore'
import { storeToRefs } from 'pinia'
import { SearchStudents, StudentTable } from '@/components/molecules'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'StudentsComponent',
  components: {
    SearchStudents,
    StudentTable
  },

  setup() {
    const router = useRouter()
    const studentStore = useStudentStore()
    const { students, loading } = storeToRefs(studentStore)
    
    const headers = [
      { title: 'Registro Acadêmico', key: 'academicRecord', align: 'center' },
      { title: 'Nome', key: 'name', align: 'center' },
      { title: 'CPF', key: 'cpf', align: 'center' },
      { title: 'Ações', key: 'actions', align: 'center', sortable: false }
    ]

    const registerStudent = () => {
      router.push('/students/register')
    }

    return {
      students,
      headers,
      registerStudent,
      loading
    }
  }
})
</script>