import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Institution, InstitutionFormValues } from "../models/institution";
import { Profile } from "../models/profile";
import { store } from "./store";
import * as Yup from 'yup';
import { Pagination, PagingParams } from "../models/pagination";
import { City } from "../models/city";

export default class InstitutionStore {

    institutionsRegistry = new Map<string, Institution>();
    cityRegistry = new Map<string, City>();
    selectedInstitution: Institution | undefined = undefined;
    loading: boolean = false;
    loadingInitial: boolean = true;
    detailsMenuActiveItem: string = 'About';
    pagination: Pagination | null = null;
    pagingParams: PagingParams = new PagingParams();
    specialtyPredicate = new Map();
    citiesPredicate = new Map();
    cityNameFilter: string = '';
    minPrice: string = '';
    maxPrice: string = '';


    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.specialtyPredicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.institutionsRegistry.clear();
                this.loadInstitutions();
            },
        )
        reaction(
            () => this.citiesPredicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.institutionsRegistry.clear();
                this.loadInstitutions();
            },
        )
        reaction(
            () => this.maxPrice,
            () => {
                this.pagingParams = new PagingParams();
                this.institutionsRegistry.clear();
                this.loadInstitutions();
            },
        )
        reaction(
            () => this.minPrice,
            () => {
                this.pagingParams = new PagingParams();
                this.institutionsRegistry.clear();
                this.loadInstitutions();
            },
        )
    }

    setMaxPrice = (value: string) => {
        this.maxPrice = value;
    }

    setMinPrice = (value: string) => {
        this.minPrice = value;
    }

    setCityNameFilter = (value: string) => {
        this.cityNameFilter = value;
    }

    get citiesByName() {
        return Array.from(this.cityRegistry.values()).sort((a, b) => a.name.localeCompare(b.name));
    }

    loadCities = async () => {
        this.setLoading(true);
        try {
            const cities = await agent.Institutions.listCities();
            runInAction(() => {
                cities.forEach(city => {
                    this.cityRegistry.set(city.id, city)
                });
            })
            this.setLoadingInitial(false);
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
            this.setLoading(false);
        }

    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    toggleSpecialtyPredicateParam = (key: string, value: boolean) => {
        // this.specialtyPredicate.forEach((lvalue, lkey: string) => {
        //     if (key.length != lkey.length)
        //         this.specialtyPredicate.clear();
        // });
        if (this.specialtyPredicate.get(key))
            this.specialtyPredicate.delete(key);
        else
            this.specialtyPredicate.set(key, value);
    }

    toggleCityPredicateParam = (key: string, value: boolean) => {
        if (this.citiesPredicate.get(key))
            this.citiesPredicate.delete(key);
        else
            this.citiesPredicate.set(key, value);
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        let branchesPredicate = '';
        let specialtiesPredicate = '';
        let citiesPredicate = '';
        this.specialtyPredicate.forEach((value, key: string) => {
            if (key.length > 2)
                specialtiesPredicate += `-${key}`
            else
                branchesPredicate += `-${key}`
        })
        this.citiesPredicate.forEach((value, key: string) => {
            citiesPredicate += `-${key}`
        })
        params.append('specialtiesPredicate', specialtiesPredicate);
        params.append('branchesPredicate', branchesPredicate);
        params.append('citiesPredicate', citiesPredicate);
        params.append('minPrice', this.minPrice.toString());
        if (this.maxPrice && parseInt(this.maxPrice) != 0)
            params.append('maxPrice', this.maxPrice.toString());
        return params;
    }

    get instititutionsByName() {
        return Array.from(this.institutionsRegistry.values()).sort((a, b) => a.name.localeCompare(b.name)); // possibly not sorting by name
    }

    private setInstitution = (institution: Institution) => {
        this.institutionsRegistry.set(institution.id, institution);
    }
    private getInstitution = (id: string) => {
        return this.institutionsRegistry.get(id);
    }

    setActiveMenuItem = (itemName: string) => {
        this.detailsMenuActiveItem = itemName;
    }

    loadInstitutions = async () => {
        this.setLoading(true);
        try {
            const result = await agent.Institutions.list(this.axiosParams);
            runInAction(() => {
                result.data.forEach(institution => {
                    this.institutionsRegistry.set(institution.id, institution)
                });
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
            this.setLoading(false);
        }

    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    loadInstitution = async (id: string) => {
        this.setLoading(true);
        let institution = this.institutionsRegistry.get(id);
        if (institution) {
            this.selectedInstitution = institution;
            this.setLoadingInitial(false);
            this.setLoading(false);
            return institution;
        }
        else {
            try {
                const institution = await agent.Institutions.details(id);
                runInAction(() => {
                    this.selectedInstitution = institution;
                })
                this.setInstitution(institution);
                this.setLoadingInitial(false);
                this.setLoading(false);
                return institution;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
                this.setLoading(false);
            }
        }
    }
    createInstitution = async (institution: InstitutionFormValues) => {
        const user = store.userStore.user;
        const manager = new Profile(user!);
        try {
            await agent.Institutions.create(institution);
            const newInstitution = new Institution(institution);
            newInstitution.managers = [manager];
            this.setInstitution(newInstitution);
            runInAction(() => {
                this.selectedInstitution = newInstitution;
            })
        } catch (error) {
            console.log(error);
        }
    }
    editInstitution = async (institution: InstitutionFormValues) => {
        try {
            await agent.Institutions.update(new InstitutionFormValues(institution));
            runInAction(() => {
                if (institution.id) {
                    let editedInstitution = { ...this.getInstitution(institution.id), ...institution };
                    this.institutionsRegistry.set(institution.id, editedInstitution as Institution);
                    this.selectedInstitution = editedInstitution as Institution;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    deleteInstitution = async (id: string) => {
        this.setLoading(true);
        try {
            await agent.Institutions.delete(id);
            runInAction(() => {
                this.institutionsRegistry.delete(id);
            })
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }

    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    setLoading = (state: boolean) => {
        this.loading = state;
    }
}