<template>
  <div>
     <BaseTable
      :headers="headers"
      :items="students"
      class="elevation-2 my-8"
      :loading="loading"
    >
      <template v-slot:[`item.academicRecord`]="{ item }">
        <p class="text-center">{{ item.academicRecord }}</p>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <p class="text-center">{{ item.name }}</p>
      </template>
      <template v-slot:[`item.cpf`]="{ item }">
        <p class="text-center">{{ item.cpf }}</p>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex justify-space-around">
          <v-icon color="secondary" @click="editStudent(item)" size="24">
            mdi-pencil
          </v-icon>
          <v-icon color="primary" @click="openModalDelete(item)" size="24">
            mdi-delete
          </v-icon>
        </div>
      </template>
    </BaseTable>

    <v-dialog v-model="modalDelete" max-width="500">
      <v-card>
        <v-card-title class="text-center">
          <span class="text-h5 font-weight-bold text-primary">Confirmar exclusão?</span>
        </v-card-title>
        <v-card-text class="text-center">
          <p>Tem certeza que deseja deletar este aluno?</p>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="red darken-1" @click="confirmDelete" class="mx-2">
            <v-icon left>mdi-check</v-icon> Sim
          </v-btn>
          <v-btn color="grey darken-1" @click="modalDelete = false" class="mx-2">
            <v-icon left>mdi-close</v-icon> Não
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      :total-visible="5"
      active-color="primary"
      color="secondary"
      @update:model-value="handlePageChange"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { BaseTable } from '@/components/atoms'
import { useStudentStore } from '@/store/studentStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'StudentTable',
  components: {
    BaseTable
  },
  setup() {
    const router = useRouter()
    const studentStore = useStudentStore()
    const { students, loading } = storeToRefs(studentStore)
    const modalDelete = ref(false)
    const studentToDelete = ref(null)

    const totalPages = computed(() => {
      return Math.ceil(
        studentStore.pagination.totalRecords / studentStore.pagination.limit
      )
    })

    const currentPage = computed({
      get: () => studentStore.pagination.page,
      set: (value) => {
        studentStore.pagination.page = value
      }
    })

    const headers = [
      { title: 'Registro Acadêmico', key: 'academicRecord', align: 'center' },
      { title: 'Nome', key: 'name', align: 'center' },
      { title: 'CPF', key: 'cpf', align: 'center' },
      { title: 'Ações', key: 'actions', align: 'center', sortable: false }
    ]

    onMounted(() => {
      studentStore.getStudents()
    })

    const handlePageChange = () => {
      studentStore.getStudents()
    }

    const editStudent = (item) => {
      router.push(`/students/edit/${item.id}`)
    }

    const openModalDelete = (item) => {
      studentToDelete.value = item
      modalDelete.value = true
    }

    const confirmDelete = async () => {
      try {
        await studentStore.deleteStudent(studentToDelete.value.id)
        modalDelete.value = false
        studentToDelete.value = null
      } catch (error: any) {
        window.toast.fire({
          icon: 'error',
          title: error.data.message
        })
      }
    }

    return {
      headers,
      students,
      loading,
      totalPages,
      handlePageChange,
      currentPage,
      modalDelete,
      editStudent,
      openModalDelete,
      confirmDelete
    }
  }
})
</script>