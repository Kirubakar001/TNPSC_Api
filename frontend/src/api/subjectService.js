import api from "./apiConfig";

export const fetchPart = async (credentials) => {
    try {
        const response = await api.post("/adminPart/getParts", credentials);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

export const addPart = async (credentials) => {
    console.log("credentials", credentials);

    try {
        const response = await api.post("/adminPart/insertPart", credentials);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

export const updatePart = async (credentials) => {
    try {
        const response = await api.post(`/adminPart/updatePart`, credentials);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};
export const deletePart = async (credentials) => {
    try {
        const response = await api.post(`/adminPart/deletePart`, credentials);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};
