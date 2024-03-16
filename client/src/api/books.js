import { axiosInstance } from "./axiosInstance";
import axios from 'axios';


// Add book
export const AddBook = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/books/add-book', payload)
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Get all books
export const GetAllBooks = async () => {
    try {
        const response = await axiosInstance.get('/api/books/get-all-books');
        return response.data;
    } catch (error) {
       throw error; 
    }
};

// Get all books for public routes
export const GetAllBooksPublic = async () => {
    try {
        const response = await axiosInstance.get('/api/books/get-all-books-public');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update book
export const UpdateBook = async (payload) => {
    try {
        const response = await axiosInstance.put(`/api/books/update-book/${payload._id}`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Delete book
export const DeleteBook = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/books/delete-book/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Get book by id
export const GetBookById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/books/get-book-by-id/${id}`);
        return response.data;
    } catch (error) {
        throw error
    }
}

// Get book by id for Public Routes
export const GetBookByIdPublic = async (id) => {
    try {
        const response = await axios.get(`/api/books/get-book-by-id/public/${id}`);
        return response.data;
    } catch (error) {
        throw error
    }
}

// Issue a book to user
export const IssueBook = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/issues/issue-new-book', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Get issues
export const GetIssues = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/issues/get-issues', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Return a book
export const ReturnBook = async (payload)  => {
    try {
        const response = await axiosInstance.post('/api/issues/return-book', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Edit an issue
export const EditIssue = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/issues/edit-issue', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Delete an issue
export const DeleteIssue = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/issues/delete-issue', payload);
        return response.data;
    } catch (error) {
        throw error;
    }
}