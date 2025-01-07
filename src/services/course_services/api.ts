import axios from 'axios';
import { API_BASE_URL } from '../../configs/config';
import { Course } from '../../models/course';

export const courseApi = {
    getAllCourses: async () => {
        const response = await axios.get(`${API_BASE_URL}/courses`);
        return response.data;
    },

    getCourseById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/courses/${id}`);
        return response.data;
    },

    getCoursesByProgram: async (programId: string) => {
        const response = await axios.get(`${API_BASE_URL}/courses/program/${programId}`);
        return response.data;
    },

    createCourse: async (course: Omit<Course, 'course'>) => {
        const response = await axios.post(`${API_BASE_URL}/courses`, course);
        return response.data;
    },

    updateCourse: async (id: string, course: Partial<Course>) => {
        const response = await axios.put(`${API_BASE_URL}/courses/${id}`, course);
        return response.data;
    },

    deleteCourse: async (id: string) => {
        const response = await axios.delete(`${API_BASE_URL}/courses/${id}`);
        return response.data;
    },
};