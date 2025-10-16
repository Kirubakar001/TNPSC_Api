import api from "./apiConfig";

export const fetchGroups = async (credentials) => {
    try {
        const response = await api.post("/adminExamDetails/getExam", credentials);
        if(response.status === 200 ){
        return response.data;
        }
    } catch (error) {
        throw error;
    }
};

export const addGroup = async (credentials) => {
    console.log("credentials",credentials);
    
    try {
        const response = await api.post("/adminExamDetails/insertExam", credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateGroup = async (credentials) => {
    try {
        const response = await api.post(`/adminExamDetails/updateExam`, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteGroup = async (credentials) => {
    try {
        const response = await api.post(`/adminExamDetails/deleteExam`, credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
};
