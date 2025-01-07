import axios from 'axios';
import { API_BASE_URL } from '../../configs/config';
import { School } from '../../models/school';

export const schoolApi = {
    getAllSchools: async () => {
        const response = await axios.get(`${API_BASE_URL}/schools`);
        return response.data;
    },

    getSchoolById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/schools/${id}`);
        return response.data;
    },

    createSchool: async (student: Omit<School, 'school'>) => {
        const response = await axios.post(`${API_BASE_URL}/schools`, student);
        return response.data;
    },

    updateSchool: async (id: string, school: Partial<School>) => {
        const response = await axios.put(`${API_BASE_URL}/schools/${id}`, school);
        return response.data;
    },

    deleteSchool: async (id: string) => {
        const response = await axios.delete(`${API_BASE_URL}/schools/${id}`);
        return response.data;
    },
};