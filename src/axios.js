import axios from "axios";

const url = '';

function createApi(){
    const api = axios.create({baseURL: `${url}`, withCredentials: false});
    // api.defaults.headers.common['Authorization'] = `${localStorage.getItem("userToken")}`;
    // api.defaults.headers.get['Authorization'] = `${localStorage.getItem("userToken")}`;
    return api;
}

export const api = createApi();