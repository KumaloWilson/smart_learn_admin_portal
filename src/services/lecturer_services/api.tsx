import axios from 'axios';
import { API_BASE_URL } from '../../configs/config';
import { Lecturer } from '../../models/lecturer';

export const lecturerApi = {
    getAllLecturers: async () => {
        const response = await axios.get(`${API_BASE_URL}/lecturer`);
        return response.data;
    },

    getLecturerById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/lecturer/${id}`);
        return response.data;
    },

    createLecturer: async (student: Omit<Lecturer, 'lecturer'>) => {
        const response = await axios.post(`${API_BASE_URL}/lecturer`, student);
        return response.data;
    },

    updateLecturer: async (id: string, student: Partial<Lecturer>) => {
        const response = await axios.put(`${API_BASE_URL}/lecturer/${id}`, student);
        return response.data;
    },

    deleteLecturer: async (id: string) => {
        const response = await axios.delete(`${API_BASE_URL}/lecturer/${id}`);
        return response.data;
    },
};