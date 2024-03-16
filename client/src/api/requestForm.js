import { axiosInstance } from "./axiosInstance";

// Send Request Form
export const CreateRequestForm = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/request/rent-request', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get all request
export const GetAllRequests = async () => {
    try {
        const response = await axiosInstance.get('/api/request/rent-requests');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to approve rent request
export const ApproveRequest = async (id) => {
    try {
        const response = await axiosInstance.put(`/api/request/rent-request/approve/${id}`);
        return response.data;
    } catch (error) {
        throw error
    }
};