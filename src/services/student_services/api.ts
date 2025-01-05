import axios from 'axios';
import { Student } from '../../models/student';
import { API_BASE_URL } from '../../configs/config';

export const studentApi = {
    getAllStudents: async () => {
        const response = await axios.get(`${API_BASE_URL}/student`);
        return response.data;
    },

    getStudentById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/student/${id}`);
        return response.data;
    },

    createStudent: async (student: Omit<Student, 'student_id'>) => {
        const response = await axios.post(`${API_BASE_URL}/student`, student);
        return response.data;
    },

    updateStudent: async (id: string, student: Partial<Student>) => {
        const response = await axios.put(`${API_BASE_URL}/student/${id}`, student);
        return response.data;
    },

    deleteStudent: async (id: string) => {
        const response = await axios.delete(`${API_BASE_URL}/student/${id}`);
        return response.data;
    },
};