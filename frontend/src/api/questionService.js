import api from "./apiConfig";

export const fetchQuestions = async (credentials) => {
    try {
        const response = await api.post("/adminQuestion/list", credentials);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

export const addQuestion = async (credentials) => {
    try {
        const response = await api.post("/adminQuestion/insert", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateQuestion = async (credentials) => {
    try {
        const response = await api.post("/adminQuestion/update", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteQuestion = async (credentials) => {
    try {
        const response = await api.post("/adminQuestion/delete", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};
