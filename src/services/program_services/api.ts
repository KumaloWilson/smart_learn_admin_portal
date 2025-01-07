import axios from 'axios';
import { API_BASE_URL } from '../../configs/config';
import { Program } from '../../models/program';

export const programApi = {
    getAllPrograms: async () => {
        const response = await axios.get(`${API_BASE_URL}/programs`);
        return response.data;
    },

    getProgramById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/programs/${id}`);
        return response.data;
    },

    getProgramsBySchool: async (schoolId: string) => {
        const response = await axios.get(`${API_BASE_URL}/programs/school/${schoolId}`);
        return response.data;
    },

    createProgram: async (program: Omit<Program, 'program'>) => {
        const response = await axios.post(`${API_BASE_URL}/programs`, program);
        return response.data;
    },

    updateProgram: async (id: string, program: Partial<Program>) => {
        const response = await axios.put(`${API_BASE_URL}/programs/${id}`, program);
        return response.data;
    },

    deleteProgram: async (id: string) => {
        const response = await axios.delete(`${API_BASE_URL}/programs/${id}`);
        return response.data;
    },
};