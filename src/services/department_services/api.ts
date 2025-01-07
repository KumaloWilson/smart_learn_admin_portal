import axios from 'axios';
import { API_BASE_URL } from '../../configs/config';
import { Department } from '../../models/department';

export const departmentApi = {
    getAllDepartments: async () => {
        const response = await axios.get(`${API_BASE_URL}/departments`);
        return response.data;
    },

    getDepartmentById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/departments/${id}`);
        return response.data;
    },

    getDepartmentsBySchool: async (schoolId: string) => {
        const response = await axios.get(`${API_BASE_URL}/departments/school/${schoolId}`);
        return response.data;
    },

    createDepartment: async (department: Omit<Department, 'department'>) => {
        const response = await axios.post(`${API_BASE_URL}/departments`, department);
        return response.data;
    },

    updateDepartment: async (id: string, department: Partial<Department>) => {
        const response = await axios.put(`${API_BASE_URL}/departments/${id}`, department);
        return response.data;
    },

    deleteDepartment: async (id: string) => {
        const response = await axios.delete(`${API_BASE_URL}/departments/${id}`);
        return response.data;
    },
};