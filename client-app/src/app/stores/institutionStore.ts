import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Institution, InstitutionFormValues } from "../models/institution";
import { Profile } from "../models/profile";
import { store } from "./store";
import * as Yup from 'yup';
import { Pagination, PagingParams } from "../models/pagination";
import { City } from "../models/city";
import { Review, ReviewFormValues } from "../models/review";
import { Region } from "../models/region";
import { Specialty } from "../models/specialty";
import { debounce } from "lodash";

export default class InstitutionStore {
    institutionsRegistry = new Map<string, Institution>();
    populatedCityRegistry = new Map<number, City>();
    regionRegistry = new Map<number, Region>();
    selectedInstitution: Institution | undefined = undefined;
    loading: boolean = false;
    uploading: boolean = false;
    reviewForm: boolean = false;
    loadingInitial: boolean = true;
    detailsMenuActiveItem: string = 'About';
    pagination: Pagination | null = null;
    pagingParams: PagingParams = new PagingParams();
    selectedCities: number[] = [];
    selectedInstitutionsSort: string = 'az';
    searchNameParam: string = '';

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => [
                this.searchNameParam,
                this.selectedInstitutionsSort,
                this.selectedCities],
            () => {
                this.debouncedLoadInstitutions();
            })
    }

    setSelectedCities = (value: number[]) => {
        this.selectedCities = value;
    }
    setSearchNameParam = (value: string) => {
        this.searchNameParam = value;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('name', this.searchNameParam);
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());

        let branchesPredicate = store.specialtyStore.selectedBranches.join('-');
        let specialtiesPredicate = store.specialtyStore.selectedSpecialties.join('-');
        let citiesPredicate = this.selectedCities.join('-');
        params.append('specialtiesPredicate', specialtiesPredicate);
        params.append('branchesPredicate', branchesPredicate);
        params.append('citiesPredicate', citiesPredicate);
        
        params.append('minPrice', store.specialtyStore.minPrice.toString());
        params.append('maxPrice', store.specialtyStore.maxPrice.toString());
        params.append('degree', store.specialtyStore.selectedDegree);
        params.append('sort', this.selectedInstitutionsSort);
        return params;
    }

    get instititutionsByName() {
        return Array.from(this.institutionsRegistry.values()).sort((a, b) => a.name.localeCompare(b.name));
    }

    get instititutionsBySelectedSort() {
        const institutions = Array.from(this.institutionsRegistry.values());
        if (this.selectedInstitutionsSort == 'hr')
            return institutions.sort((a, b) => b.rating - a.rating)
        if (this.selectedInstitutionsSort == 'za')
            return institutions.sort((a, b) => b.name.localeCompare(a.name));
        return institutions.sort((a, b) => a.name.localeCompare(b.name));
    }


    get isInstitutionManager() {
        if (store.userStore.isLoggedIn && store.profileStore.profile)
            return !!store.profileStore.profile?.managedInstitutions.find((x) => x.id === this.selectedInstitution?.id);
        return false;
    }

    setReviewForm = (state: boolean) => {
        this.reviewForm = state;
    }

    setInstitutionsSearchSort = (selectedInstitutionsSort: string) => {
        this.selectedInstitutionsSort = selectedInstitutionsSort;
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

    setTitleImage = async (file: Blob, id: string) => {
        this.uploading = true;
        try {
            const response = await agent.Institutions.setTitleImage(file, id);
            const titleImage = response.data;
            runInAction(() => {
                if (this.selectedInstitution) {
                    this.selectedInstitution.images.filter((x) => x.id === this.selectedInstitution?.titleImageId);
                    this.selectedInstitution.titleImageUrl = titleImage.url;
                    this.selectedInstitution.titleImageId = titleImage.id;
                    this.selectedInstitution.images.push(titleImage);
                    this.institutionsRegistry.set(this.selectedInstitution.id, this.selectedInstitution);
                }
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.uploading = false;
            })
        }
    }

    setBackgroundImage = async (file: Blob, id: string) => {
        this.uploading = true;
        try {
            const response = await agent.Institutions.setBackgroundImage(file, id);
            const titleImage = response.data;
            runInAction(() => {
                if (this.selectedInstitution) {
                    this.selectedInstitution.images.filter((x) => x.id === this.selectedInstitution?.titleImageId);
                    this.selectedInstitution.backgroundImageUrl = titleImage.url;
                    this.selectedInstitution.backgroundImageId = titleImage.id;
                    this.selectedInstitution.images.push(titleImage);
                    this.institutionsRegistry.set(this.selectedInstitution.id, this.selectedInstitution);
                }
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.uploading = false;
            })
        }
    }

    setReview = (institutionId: string, review: Review) => {
        let institution = this.institutionsRegistry.get(institutionId);
        institution?.reviews.push(review);
        this.institutionsRegistry.set(institutionId, institution!);
        this.selectedInstitution?.reviews.push(review);
    }

    setSpecialty = (specialty: Specialty, institutionId: string) => {
        let institution = this.institutionsRegistry.get(institutionId);
        let newSpecialties = [...institution!.specialties.filter((x) => x.id !== specialty.id), specialty];
        institution!.specialties = newSpecialties;
        this.institutionsRegistry.set(institutionId, institution!);
        this.selectedInstitution!.specialties = newSpecialties;
    }

    get populatedCitiesByName() {
        return Array.from(this.populatedCityRegistry.values()).sort((a, b) => a.name.localeCompare(b.name));
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

    loadRegionsWithCities = async () => {
        this.setLoading(true);
        try {
            const regions = await agent.Institutions.listRegions();
            runInAction(() => {
                regions.forEach(region => {
                    this.regionRegistry.set(region.id, region);
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


    getRegionById = (regionId: number) => {
        return this.regionRegistry.get(regionId);
    }

    getCityById = (cityId: number, regionId: number) => {
        return this.regionRegistry.get(regionId)?.cities.find((x) => x.id == cityId);
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
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

    debouncedLoadInstitutions = debounce(() => {
        this.pagingParams = new PagingParams();
        this.institutionsRegistry.clear();
        this.loadInstitutions()
    }, 800);

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
                    institution.titleImageUrl = this.institutionsRegistry.get(institution.id)?.titleImageUrl!;
                    institution.rating = this.institutionsRegistry.get(institution.id)?.rating!;
                    this.selectedInstitution = institution;
                    this.institutionsRegistry.set(institution.id, institution);
                })
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
        try {
            await agent.Institutions.delete(id);
            runInAction(() => {
                this.institutionsRegistry.delete(id);
            })
        } catch (error) {
            console.log(error);
        }

    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    setLoading = (state: boolean) => {
        this.loading = state;
    }
}