import api from '@/services/api'
import type { ICreateStudent, IUpdateStudent } from '@/types/Student'
import { defineStore } from 'pinia'

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [],
    loading: false,
    query: null,
    pagination: {
      totalRecords: 0,
      page: 1,
      limit: 10
    }
  }),
  actions: {
    async getStudents() {
      this.loading = true
      try {
        const { data: { students, pagination } } = await api.get('/students', {
          page: this.pagination.page,
          q: this.query,
          limit: this.pagination.limit
        })
        
        this.students = students
        this.pagination.totalRecords = pagination.totalRecords
      } catch (error: any) {
        window.toast.fire({
          icon: 'error',
          title: error.data.message
        })
      } finally {
        this.loading = false
      }
    },
    async getStudent(id: string) {
      this.loading = true
      try {
        const { data: { student } } = await api.get(`/students/${id}`)
        return student
      } catch (error: any) {
        window.toast.fire({
          icon: 'error',
          title: error.data.message
        })
      } finally {
        this.loading = false
      }
    },

    async createStudent(student: ICreateStudent) {
      const response = await api.post('/students', student)
      return response.data
    },

    async updateStudent(id: string, student: IUpdateStudent) {
      const response = await api.put(`/students/${id}`, student)
      return response.data
    },

    async deleteStudent(id: string) {
      const response = await api.delete(`/students/${id}`)
      await this.getStudents()
      return response.data
    }
  }
})