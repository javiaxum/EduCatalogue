import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../../features/routers/Routes";
import { Branch } from "../models/branch";
import { City } from "../models/city";
import { Institution, InstitutionFormValues } from "../models/institution";
import { PaginatedResult } from "../models/pagination";
import { Region } from "../models/region";
import { Review, ReviewFormValues } from "../models/review";
import { Specialty, SpecialtyFormValues } from "../models/specialty";
import { SpecialtyCore } from "../models/specialtyCore";
import { Profile, ProfileInfoFormValues } from "../models/profile";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";
import { Image } from '../../app/models/image';
import { Skill } from "../models/skill";
import { ComponentCore } from "../models/componentCore";
import { getI18n } from "react-i18next";


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
            toast.warning(getI18n().t('Session has expired, please sign in again'));
            break;
        case 403:
            toast.error(getI18n().t('Access is forbidden'));
            break;
        case 404:
            router.navigate('/not-found')
            toast.error(getI18n().t('Page was not found'));
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;
    }
    return Promise.reject(error);
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}



const Images = {
    list: (institutionId: string, params: URLSearchParams) => axios.get<PaginatedResult<Image[]>>(`/images/${institutionId}/list`, { params }).then(responseBody),
    delete: (id: string, institutionId: string,) => requests.delete<void>(`/images/${institutionId}/delete/${id}`),
    setImageStatus: (id: string, params: URLSearchParams) => requests.post(`/images/${id}`, { params }),
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
    },
    setImage: (file: Blob, id: string) => {
        let formData = new FormData();
        formData.append('File', file)
        return axios.post<Image>(`/images/institutions/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }) 
    }
}

const Reviews = {
    create: (institutionId: string, review: ReviewFormValues) => requests.post<void>(`/institutions/${institutionId}/reviews`, review),
    list: (institutionId: string, params: URLSearchParams) => axios.get<PaginatedResult<Review[]>>(`/institutions/${institutionId}/reviews`, { params }).then(responseBody),
}

const Specialties = {
    list: (institutionId: string, params: URLSearchParams) =>
        axios.get<PaginatedResult<Specialty[]>>(`/specialties/${institutionId}/institution/list`, { params }).then(responseBody),
    listPendingChanges: (institutionId: string, params: URLSearchParams) => axios.get<PaginatedResult<Specialty[]>>(`/specialties/${institutionId}/institution/pendingChanges`, { params }).then(responseBody),
    approveChanges: (id: string) => requests.put<void>(`/specialties/approve/${id}`, {}),
    toggleVisibility: (id: string) => requests.put<void>(`/specialties/toggleVisibility/${id}`, {}),
    details: (id: string) => requests.get<Specialty>(`/specialties/${id}`),
    listCores: () => requests.get<SpecialtyCore[]>("/specialties/specialtyCores"),
    listBranches: () => requests.get<Branch[]>("/specialties/branches"),
    listSkills: () => requests.get<Skill[]>("/specialties/skills"),
    listComponentCores: () => requests.get<ComponentCore[]>("/specialties/componentCores"),
    create: (specialty: SpecialtyFormValues, institutionId: string) => requests.post<void>(`/institutions/${institutionId}/specialties`, specialty),
    update: (specialty: SpecialtyFormValues) => requests.put<void>(`/specialties/${specialty.id}`, specialty),
    delete: (id: string) => requests.delete<void>(`/specialties/${id}`)
}

const Account = {
    current: () => requests.get<User>("/account"),
    login: (user: UserFormValues) => requests.post<User>("/account/login", user),
    fbLogin: (accessToken: string) => requests.post<User>(`/account/fbLogin?accessToken=${accessToken}`, {}),
    register: (user: UserFormValues) => requests.post<User>("/account/register", user),
    delete: () => requests.delete<void>("/account/delete"),
    updateEmail: (newEmail: string) => requests.put<void>(`/account/requestEmailChange?newEmail=${newEmail}`, {}),
    toggleInstitutionManager: (username: string, institutionId: string) => requests.put<void>(`/account/toggleInstitutionManager?username=${username}&institutionId=${institutionId}`, {}),
    requestEmailConfirmation: () => requests.get<string>(`/account/requestEmailConfirmation`),
    twoFactorCheck: (user: UserFormValues) => requests.post<boolean>(`/account/twoFactorCheck`, user),
    requestTwoFactorActivationCode: () => requests.get<string>(`/account/requestTwoFactorActivationCode`),
    requestTwoFactorDeactivationCode: () => requests.get<string>(`/account/requestTwoFactorDeactivationCode`),
    confirmTwoFactorActivationCode: (code: string) => requests.put<void>(`/account/confirmTwoFactorActivationCode?code=${code}`, {}),
    confirmTwoFactorDeactivationCode: (code: string) => requests.put<void>(`/account/confirmTwoFactorDeactivationCode?code=${code}`, {}),
    requestPasswordReset: (email: string) => requests.put<void>(`/account/requestPasswordReset?email=${email}`, {}),
    resetPassword: (newPassword: string, email: string, token: string) => requests.put<void>(`/account/confirmPasswordChange?email=${email}&newPassword=${newPassword}&token=${token}`, {}),
    changePassword: (newPassword: string, oldPassword: string) => requests.put<void>(`/account/changePassword?newPassword`, { oldPassword: oldPassword, newPassword: newPassword }),
}

const Profiles = {
    get: () => requests.get<Profile>(`/profile`),
    updateInfo: (formValues: ProfileInfoFormValues) => requests.put<void>(`/profile/bio`, formValues),
    setProfileImage: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file)
        return axios.post<Image>('/images/profileImage', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
}

const Institutions = {
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Institution[]>>("/institutions/list", { params }).then(responseBody),
    pendingChangesList: (params: URLSearchParams) => axios.get<PaginatedResult<Institution[]>>("/institutions/pendingChanges", { params }).then(responseBody),
    approveChanges: (id: string) => requests.put<void>(`/institutions/approve/${id}`, {}),
    toggleVisibility: (id: string) => requests.put<void>(`/institutions/toggleVisibility/${id}`, {}),
    details: (id: string) => requests.get<Institution>(`/institutions/${id}`),
    create: (institution: InstitutionFormValues) => requests.post<void>("/institutions", institution),
    update: (institution: InstitutionFormValues) => requests.put<void>(`/institutions/${institution.id}`, institution),
    delete: (id: string) => requests.delete<void>(`/institutions/${id}`),
    listCities: (params: URLSearchParams) => axios.get<City[]>("/institutions/cities", { params }).then(responseBody),
    listRegions: () => requests.get<Region[]>("/institutions/regions"),
}

const agent = {
    Institutions,
    Account,
    Specialties,
    Reviews,
    Profiles,
    Images
}

export default agent;