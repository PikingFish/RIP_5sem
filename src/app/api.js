import axios from "axios";

export default axios.create({
    baseURL: "/api"
});

export const chatAPI = axios.create({
    baseURL: "/api/messanger"
})