import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Institution, InstitutionFormValues } from "../models/institution";
import { Profile } from "../models/profile";
import { store } from "./store";
import * as Yup from 'yup';
import { Pagination, PagingParams } from "../models/pagination";
import { City } from "../models/city";
import { Review, ReviewFormValues } from "../models/review";

export default class InstitutionStore {

    institutionsRegistry = new Map<string, Institution>();
    populatedCityRegistry = new Map<string, City>();
    allCityRegistry = new Map<string, City>();
    selectedInstitution: Institution | undefined = undefined;
    loading: boolean = false;
    reviewForm: boolean = false;
    loadingInitial: boolean = true;
    detailsMenuActiveItem: string = 'About';
    pagination: Pagination | null = null;
    pagingParams: PagingParams = new PagingParams();
    specialtyPredicate = new Map();
    branchPredicate = new Map();
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
            () => this.branchPredicate.keys(),
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

    setReviewForm = (state: boolean) => {
        this.reviewForm = state;
    }

    createReview = async (review: ReviewFormValues, institutionId: string) => {
        const user = store.userStore.user;
        const author = new Profile(user!);
        try {
            await agent.Reviews.create(institutionId, review);
            const newReview = new Review(review);
            newReview.author = author;
            newReview.createdAt = new Date();
            this.setReview(institutionId, newReview);
        } catch (error) {
            console.log(error);
        }
    }

    setReview = (institutionId: string, review: Review) => {
        let institution = this.institutionsRegistry.get(institutionId);
        institution?.reviews.push(review);
        this.institutionsRegistry.set(institutionId, institution!);
        this.selectedInstitution?.reviews.push(review);
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

    get specialtyAndBranchPredicates() {
        return Array.from(this.specialtyPredicate.keys()).concat(Array.from(this.branchPredicate.keys()));
    }


    get populatedCitiesByName() {
        return Array.from(this.populatedCityRegistry.values()).sort((a, b) => a.name.localeCompare(b.name));
    }
    get allCitiesByName() {
        return Array.from(this.allCityRegistry.values()).sort((a, b) => a.name.localeCompare(b.name));
    }

    loadCitiesWithInstitutions = async () => {
        this.setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('hasInstitutionEntity', 'true');
            const populatedCities = await agent.Institutions.listCities(params);
            runInAction(() => {
                populatedCities.forEach(city => {
                    this.populatedCityRegistry.set(city.id, city)
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

    loadAllCities = async () => {
        this.setLoading(true);
        try {
            const cities = await agent.Institutions.listCities(new URLSearchParams());
            runInAction(() => {
                cities.forEach(city => {
                    this.allCityRegistry.set(city.id, city)
                });
            })
            this.setLoadingInitial(false);
            this.setLoading(false);
            return cities;
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
        if (this.specialtyPredicate.get(key))
            this.specialtyPredicate.delete(key);
        else
            this.specialtyPredicate.set(key, value);
    }

    toggleBranchPredicateParam = (key: string, value: boolean) => {
        if (this.branchPredicate.get(key))
            this.branchPredicate.delete(key);
        else
            this.branchPredicate.set(key, value);
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
            specialtiesPredicate += `-${key}`
        })
        this.branchPredicate.forEach((value, key: string) => {
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
        institution.reviews.forEach((x) => {
            x.createdAt = new Date(x.createdAt);

        })
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
        if (institution && institution.specialties && institution.reviews) {
            this.selectedInstitution = institution;
            this.setLoadingInitial(false);
            this.setLoading(false);
            return institution;
        }
        else {
            try {
                const institution = await agent.Institutions.details(id);
                runInAction(() => {
                    institution.reviews.forEach((x) => {
                        x.createdAt = new Date(x.createdAt);
                    })
                    console.log(institution.reviews)
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