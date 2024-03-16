import { axiosInstance } from "./axiosInstance";

// Register a user
export const RegisterUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/register', payload);
        return response.data;
    } catch (error) {
        throw error
    }
};

// Login a user
export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/login', payload);
        return response.data;
    } catch (error) {
        throw error
    }
};

// Login a user through Firebase Google auth
export const GoogleLogin = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/google', payload);
        return response.data;
    } catch (error) {
        throw error
    }
}

// Get loggedin user details
export const GetLoggedInUserDetails = async () => {
    try {
        const response = await axiosInstance.get('/api/users/get-logged-in-user');
        return response.data;
    } catch (error) {
        throw error;
    }
};


// Get all Users
export const getAllUsers = async (role) => {
    try {
        const response = await axiosInstance.get(`/api/users/get-all-users/${role}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Get user by Id
export const GetUserById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/users/get-user-by-id/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Update User
export const UpdateUser = async (payload) => {
    try {
        const response = await axiosInstance.put('/api/users/update-user', payload);
        return response.data;
    } catch (error) {
        throw error
    }
};

// Delete user by admin
export const DeleteUser = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/users/delete-user/${id}`);
        return response.data;
    } catch (error) {
        throw error
    }
}