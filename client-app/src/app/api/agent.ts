import axios, { AxiosResponse } from "axios";
import { Institution } from "../models/institution";

axios.defaults.baseURL = 'http://localhost:5172/api';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

const responseData = <T>(response: AxiosResponse<T>) => response.data; // or response data

axios.interceptors.response.use(response =>
    sleep(1000).then(() => response
    ).catch((error) => {
        console.log(error);
        return Promise.reject(error);
    })
)

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseData),
    post: <T>(url: string, data: {}) => axios.post<T>(url, data).then(responseData),
    put: <T>(url: string, data: {}) => axios.put<T>(url, data).then(responseData),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseData),
}

const Institutions = {
    list: () => requests.get<Institution[]>("/institutions"),
    details: (id: string) => requests.get<Institution>(`/institutions/${id}`),
    create: (institution: Institution) => requests.post<void>("/institutions", institution),
    update: (institution: Institution) => requests.put<void>(`/institutions/${institution.id}`, institution),
    delete: (id: string) => requests.delete<void>(`/institutions/${id}`),
}

const agent = {
    Institutions
}

export default agent;