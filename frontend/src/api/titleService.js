import api from "./apiConfig";

export const fetchTitles = async (credentials) => {
    try {
        const response = await api.post("/adminTitle/list", credentials);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

export const addTitle = async (credentials) => {
    try {
        const response = await api.post("/adminTitle/insert", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateTitle = async (credentials) => {
    try {
        const response = await api.post("/adminTitle/update", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTitle = async (credentials) => {
    try {
        const response = await api.post("/adminTitle/delete", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};
