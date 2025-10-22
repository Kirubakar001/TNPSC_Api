import api from "./apiConfig";

export const fetchUnits = (credentials) => {
    try {
        const response = api.post("/adminUnit/list", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addUnit = (credentials) => {
    try {
        const response = api.post("/adminUnit/insert", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUnit = (credentials) => {
    try {
        const response = api.post("/adminUnit/update", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUnit = (credentials) => {
    try {
        const response = api.post("/adminUnit/delete", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};
