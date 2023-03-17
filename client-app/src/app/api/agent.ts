import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../../features/routers/Routes";
import { Branch } from "../models/branch";
import { City } from "../models/city";
import { Institution, InstitutionFormValues } from "../models/institution";
import { PaginatedResult } from "../models/pagination";
import { Region } from "../models/region";
import { ReviewFormValues } from "../models/review";
import { Specialty, SpecialtyFormValues } from "../models/specialty";
import { SpecialtyCore } from "../models/specialtyCore";
import { Profile } from "../models/profile";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";
import { Image } from '../../app/models/image';
import { Skill } from "../models/skill";
import { ComponentCore } from "../models/componentCore";


axios.defaults.baseURL = 'http://localhost:5172/api';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

const responseBody = <T>(response: AxiosResponse<T>) => response.data; // or response data

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(500);
    const pagination = response.headers['pagination'];
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
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Institutions = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Institution[]>>("/institutions", { params }).then(responseBody),
    details: (id: string) => requests.get<Institution>(`/institutions/${id}`),
    create: (institution: InstitutionFormValues) => requests.post<void>("/institutions", institution),
    update: (institution: InstitutionFormValues) => requests.put<void>(`/institutions/${institution.id}`, institution),
    delete: (id: string) => requests.delete<void>(`/institutions/${id}`),
    listCities: (params: URLSearchParams) => axios.get<City[]>("/institutions/cities", { params }).then(responseBody),
    listRegions: () => requests.get<Region[]>("/institutions/regions"),
    setTitleImage: (file: Blob, id: string) => {
        let formData = new FormData();
        formData.append('File', file)
        return axios.post<Image>(`/images/institutions/${id}?isTitleImage=true`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    setBackgroundImage: (file: Blob, id: string) => {
        let formData = new FormData();
        formData.append('File', file)
        return axios.post<Image>(`/images/institutions/${id}?isBackgroundImage=true`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }
}

const Reviews = {
    create: (institutionId: string, review: ReviewFormValues) => requests.post<void>(`/institutions/${institutionId}/reviews`, review),
}

const Specialties = {
    list: (institutionId: string, params: URLSearchParams) => axios.get<PaginatedResult<Specialty[]>>(`/specialties/${institutionId}/list`, { params }).then(responseBody),
    details: (id: string) => requests.get<Specialty>(`/specialties/${id}`),
    listCores: () => requests.get<SpecialtyCore[]>("/specialties/specialtyCores"),
    listBranches: () => requests.get<Branch[]>("/specialties/branches"),
    listSkills: () => requests.get<Skill[]>("/specialties/skills"),
    listComponentCores: () => requests.get<ComponentCore[]>("/specialties/componentCores"),
    create: (specialty: SpecialtyFormValues, institutionId: string) => requests.post<void>(`/institutions/${institutionId}/specialties`, specialty),
    update: (specialty: SpecialtyFormValues, institutionId: string) => requests.put<void>(`/specialties/${institutionId}/specialty/${specialty.id}`, specialty),
    delete: (id: string) => requests.delete<void>(`/specialties/${id}`)
}

const Account = {
    current: () => requests.get<User>("/account"),
    login: (user: UserFormValues) => requests.post<User>("/account/login", user),
    register: (user: UserFormValues) => requests.post<User>("/account/register", user)
}

const Profiles = {
    get: () => requests.get<Profile>(`/profile`),
    setProfileImage: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file)
        return axios.post<Image>('/images/profileImage', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
}

const agent = {
    Institutions,
    Account,
    Specialties,
    Reviews,
    Profiles
}

export default agent;