import axios from 'axios';
import { API_BASE_URL } from '../../configs/config';
import { Admin } from '../../models/admin';

export const adminApi = {
    getAllAdmins: async () => {
        const response = await axios.get(`${API_BASE_URL}/admin`);
        return response.data;
    },

    getAdminById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/admin/${id}`);
        return response.data;
    },

    createAdmin: async (admin: Omit<Admin, 'admin'>) => {
        const response = await axios.post(`${API_BASE_URL}/admin`, admin);
        return response.data;
    },

    updateAdmin: async (id: string, admin: Partial<Admin>) => {
        const response = await axios.put(`${API_BASE_URL}/admin/${id}`, admin);
        return response.data;
    },

    deleteAdmin: async (id: string) => {
        const response = await axios.delete(`${API_BASE_URL}/admin/${id}`);
        return response.data;
    },
};