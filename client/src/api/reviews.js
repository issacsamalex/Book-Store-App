import { axiosInstance } from "./axiosInstance";
import axios from 'axios';


// Add Review
export const AddReview = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/reviews/add', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get Review by BookId
export const GetReviewsByBookId = async (payload) => {
    try {
        const response = await axiosInstance.get(`/api/reviews/get/${payload}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get Review by UserId
export const GetReviewsByUserId = async (payload) => {
    try {
        const response = await axiosInstance.get(`/api/reviews/get/user/${payload}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update Review
export const UpdateReview = async (payload) => {
    try {
        const response = await axiosInstance.put(`/api/reviews/update/${payload._id}`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete Review
export const DeleteReview = async (payload) => {
    try {
        const response = await axiosInstance.delete(`/api/reviews/delete/${payload._id}`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}




// Get Review by BookId for public routes
export const GetReviewsByBookIdPublic = async (payload) => {
    try {
        const response = await axios.get(`/api/reviews/get/public/${payload}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};