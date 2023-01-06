import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../../features/routers/Routes";
import { Institution, InstitutionFormValues } from "../models/institution";
import { PaginatedResult } from "../models/pagination";
import { Specialty, SpecialtyFormValues } from "../models/specialty";
import { SpecialtyCore } from "../models/specialtyCore";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

axios.defaults.baseURL = 'http://localhost:5172/api';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

const responseData = <T>(response: AxiosResponse<T>) => response.data; // or response data

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    const pagination = response.headers["pagination"];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
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
            break;
    }
    return Promise.reject(error);
}
)

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseData),
    post: <T>(url: string, data: {}) => axios.post<T>(url, data).then(responseData),
    put: <T>(url: string, data: {}) => axios.put<T>(url, data).then(responseData),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseData)
}

const Institutions = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Institution[]>>("/institutions", {params}).then(responseData),
    details: (id: string) => requests.get<Institution>(`/institutions/${id}`),
    create: (institution: InstitutionFormValues) => requests.post<void>("/institutions", institution),
    update: (institution: InstitutionFormValues) => requests.put<void>(`/institutions/${institution.id}`, institution),
    delete: (id: string) => requests.delete<void>(`/institutions/${id}`)
}

const Specialties = {
    details: (id: string) => requests.get<Specialty>(`/specialties/${id}`),
    listCore: () => requests.get<SpecialtyCore[]>("/specialties/specialtyCores"),
    create: (specialty: SpecialtyFormValues, institutionId: string) => requests.post<void>(`/institutions/${institutionId}/specialties`, specialty),
    update: (specialty: SpecialtyFormValues) => requests.put<void>(`/specialties/${specialty.id}`, specialty),
    delete: (id: string) => requests.delete<void>(`/specialties/${id}`)
}

const Account = {
    current: () => requests.get<User>("/account"),
    login: (user: UserFormValues) => requests.post<User>("/account/login", user),
    register: (user: UserFormValues) => requests.post<User>("/account/register", user)
}

const agent = {
    Institutions,
    Account,
    Specialties
}

export default agent;