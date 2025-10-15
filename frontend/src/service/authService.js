import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
axios.defaults.baseURL = baseUrl;

// const baseUrl =
//   import.meta.env.VITE_API_BASE_URL ||
//   (window.location.hostname === "localhost" ? localURL : tunnelURL);

axios.defaults.baseURL = baseUrl;

export const signIn = async ({ emp_id, password }) => {
    const response = await axios.post("/admin/login", { emp_id, password });
    return response.data;
};

export const signUp = async ({ emp_id, password, name }) => {
    const response = await axios.post("/admin/add", { emp_id, password, name });
    console.log(response);

    return response.data;
};
