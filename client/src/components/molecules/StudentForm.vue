<template>
<v-container class="pa-8" max-width="1200">
    <v-card class="pa-6" elevation="2">
        <v-card-title class="text-h5 text-center mb-6">
        {{ isEditing ? 'Editar Aluno' : 'Cadastrar Novo Aluno' }}
        </v-card-title>

        <v-form @submit.prevent="handleSubmit">
        <v-row>
            <v-col cols="12" md="6">
            <InputField
                v-model="studentData.name"
                label="Nome Completo *"
                required
            />
            </v-col>
            
            <v-col cols="12" md="6">
            <InputField
                v-model="studentData.email"
                label="E-mail *"
                type="email"
                required
            />
            </v-col>
            
            <v-col cols="12" md="6">
            <InputField
                v-model="studentData.academicRecord"
                label="Registro Acadêmico (RA) *"
                required
                :readonly="isEditing"
                :variant="isEditing ? 'filled' : 'outlined'"
            />
            </v-col>
            
            <v-col cols="12" md="6">
                <InputField
                    v-model="studentData.cpf"
                    label="CPF *"
                    required
                    :readonly="isEditing"
                    :variant="isEditing ? 'filled' : 'outlined'"
                />
            </v-col>
        </v-row>

        <v-row class="mt-4">
            <v-col cols="12" class="d-flex justify-end gap-4">
            
            <ButtonComponent
                color="grey"
                variant="outlined"
                button-class="px-8 mr-4"
                @click="handleCancel"
            >
                Cancelar
            </ButtonComponent>
           
            <ButtonComponent
                type="submit"
                color="primary"
                button-class="text-white px-8"
                :loading="loading"
            >
                Salvar
            </ButtonComponent>
            </v-col>
        </v-row>
        </v-form>
    </v-card>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStudentStore } from '@/store/studentStore'
import { storeToRefs } from 'pinia'
import { InputField, Button as ButtonComponent } from '@/components/atoms'

export default defineComponent({
  name: 'StudentForm',
  components: {
    InputField,
    ButtonComponent
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const studentStore = useStudentStore()
    const { loading } = storeToRefs(studentStore)

    const studentData = reactive({
      name: '',
      email: '',
      academicRecord: '',
      cpf: ''
    })

    const isEditing = computed(() => !!route.params.id)
    const studentId = computed(() => route.params.id as string)

    const loadStudentData = async () => {
      if (isEditing.value) {
        try {
          const student = await studentStore.getStudent(studentId.value)
          if (student) {
            studentData.name = student.name
            studentData.email = student.email
            studentData.academicRecord = student.academicRecord
            studentData.cpf = student.cpf
          }
        } catch (error) {
          window.toast.fire({
            icon: 'error',
            title: 'Erro ao carregar dados do aluno'
          })
          router.push('/students')
        }
      }
    }

    const handleSubmit = async () => {
      try {
        if (isEditing.value) {
          await studentStore.updateStudent(studentId.value, {
            name: studentData.name,
            email: studentData.email
          })
          window.toast.fire({
            icon: 'success',
            title: 'Aluno atualizado com sucesso!'
          })
        } else {
          await studentStore.createStudent({
            name: studentData.name,
            email: studentData.email,
            academicRecord: studentData.academicRecord,
            cpf: studentData.cpf
          })
          window.toast.fire({
            icon: 'success',
            title: 'Aluno cadastrado com sucesso!'
          })
        }
        router.push('/students')
      } catch (error) {
        window.toast.fire({
          icon: 'error',
          title: error.data.message
        })
      }
    }

    const handleCancel = () => {
      router.push('/students')
    }

    onMounted(() => {
      loadStudentData()
    })

    return {
      studentData,
      isEditing,
      loading,
      handleSubmit,
      handleCancel
    }
  }
})
</script> 