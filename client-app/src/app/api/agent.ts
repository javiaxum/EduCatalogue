import axios, { AxiosError, AxiosResponse } from "axios";
import { createBrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { router } from "../../features/routers/Routes";
import { Institution } from "../models/institution";
import { store } from "../stores/store";

axios.defaults.baseURL = 'http://localhost:5172/api';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

const responseData = <T>(response: AxiosResponse<T>) => response.data; // or response data

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error("Unauthorized");
            break;
        case 403:
            toast.error("Forbidden");
            break;
        case 404:
            router.navigate('/not-found')
            toast.error("Not Found");
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            toast.error("Server Error");
            break;
    }
    return Promise.reject(error);
}
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