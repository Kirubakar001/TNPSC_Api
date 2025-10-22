import api from "./apiConfig";

export const fetchUnits = async (credentials) => {
    try {
        const response = await api.post("/adminUnit/list", credentials);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

export const addUnit = async (credentials) => {
    try {
        const response = await api.post("/adminUnit/insert", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUnit = async (credentials) => {
    try {
        const response = await api.post("/adminUnit/update", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUnit = async (credentials) => {
    try {
        const response = await api.post("/adminUnit/delete", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};
