import axios from 'axios';
import { API_BASE_URL } from '../../configs/config';
import { LecturerCourseAssignment } from '../../models/lecturer_courses';

export const lecturerCourseAssignmentApi = {
    getAllAssignments: async () => {
        const response = await axios.get(`${API_BASE_URL}/lecturer/course/assignments`);
        return response.data;
    },

    getAssignmentById: async (id: string) => {
        const response = await axios.get(`${API_BASE_URL}/lecturer/course/assignments/${id}`);
        return response.data;
    },

    getAssignmentsByLecturerId: async (lecturerId: string) => {
        const response = await axios.get(`${API_BASE_URL}/lecturer/course/assignments/lecturer/${lecturerId}`);
        return response.data;
    },

    createAssignment: async (assignment: Omit<LecturerCourseAssignment, 'assignment_id'>) => {
        const response = await axios.post(`${API_BASE_URL}/lecturer/course/assignments`, assignment);
        return response.data;
    },

    updateAssignment: async (id: string, assignment: Partial<LecturerCourseAssignment>) => {
        const response = await axios.put(`${API_BASE_URL}/lecturer/course/assignments/${id}`, assignment);
        return response.data;
    },

    deleteAssignment: async (id: string) => {
        const response = await axios.delete(`${API_BASE_URL}/lecturer/course/assignments/${id}`);
        return response.data;
    },
};
