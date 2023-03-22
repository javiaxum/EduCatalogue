import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Institution, InstitutionFormValues } from "../models/institution";
import { store } from "./store";
import * as Yup from 'yup';
import { Pagination, InstitutionsPagingParams, ReviewsPagingParams, ImagesPagingParams } from "../models/pagination";
import { City } from "../models/city";
import { Review, ReviewFormValues } from "../models/review";
import { Region } from "../models/region";
import { debounce } from "lodash";
import { Image } from "../models/image";

export default class InstitutionStore {
    institutionsRegistry = new Map<string, Institution>();
    selectedInstitution: Institution | undefined = undefined;
    institutionPagingParams: InstitutionsPagingParams = new InstitutionsPagingParams();
    institutionPagination: Pagination | null = null;

    populatedCityRegistry = new Map<number, City>();
    regionRegistry = new Map<number, Region>();
    loading: boolean = false;
    uploading: boolean = false;
    reviewForm: boolean = false;
    loadingInitial: boolean = true;
    activeMenuItem: string = 'About';

    selectedInstitutionReviews = new Map<string, Review>();
    reviewsPagination: Pagination | null = null;
    reviewPagingParams: ReviewsPagingParams = new ReviewsPagingParams();
    reviewsLoading: boolean = false;

    reviewTargetRating: number | undefined = undefined;
    reviewSorting: string = 'mr';

    selectedInstitutionImages = new Map<string, Image>();
    imagesPagination: Pagination | null = null;
    imagesPagingParams: ImagesPagingParams = new ImagesPagingParams();
    imagesLoading: boolean = false;

    selectedSpecialties: string[] = [];
    selectedBranches: string[] = [];
    selectedCities: number[] = [];
    institutionsSorting: string = 'az';
    minTuition: string = '';
    maxTuition: string = '';
    selectedDegreeId: string = '';
    searchNameParam: string = '';

    selectedInstitutionIds: string[] = [];

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => [
                this.selectedSpecialties,
                this.selectedBranches,
                this.maxTuition,
                this.minTuition,
                this.selectedDegreeId,
                this.searchNameParam,
                this.institutionsSorting,
                this.selectedCities],
            () => {
                this.debouncedLoadInstitutions();
            })
        reaction(
            () => [
                this.reviewSorting,
                this.reviewTargetRating],
            () => {
                this.selectedInstitutionReviews.clear();
                this.reviewsPagination = null;
                this.reviewPagingParams = new ReviewsPagingParams(1);
                this.setReviewsLoading(true);
                this.debouncedLoadReviews();
            })
        reaction(
            () => [
                this.reviewPagingParams], //existing pagination information should be erased
            () => {
                this.debouncedLoadReviews();
            })
        reaction(
            () => [
                this.imagesPagingParams], //existing pagination information should be erased
            () => {
                this.debouncedLoadImages();
            })
    }

    toggleSelectedInstitutionId = (id: string) => {
        if (this.selectedInstitutionIds.includes(id)) {
            this.selectedInstitutionIds = this.selectedInstitutionIds.filter((x) => x !== id);
        }
        else this.selectedInstitutionIds.push(id);
    }

    setSelectedCities = (value: number[]) => {
        this.selectedCities = value;
    }

    setDegreePredicate = (degree: string) => {
        this.selectedDegreeId = degree;
    }

    setMaxPrice = (value: string) => {
        this.maxTuition = value;
    }

    setMinPrice = (value: string) => {
        this.minTuition = value;
    }

    setSelectedSpeialties = (value: string[]) => {
        this.selectedSpecialties = value;
    }

    setSearchNameParam = (value: string) => {
        this.searchNameParam = value;
    }

    setSelectedBranches = (value: string[]) => {
        this.selectedBranches = value;
    }
    //implement an image delete handler

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

    setActiveMenuItem = (itemName: string) => {
        this.activeMenuItem = itemName;
    }

    get institutionAxiosParams() {
        const params = new URLSearchParams();
        params.append('name', this.searchNameParam);
        params.append('pageNumber', this.institutionPagingParams.pageNumber.toString());
        params.append('pageSize', this.institutionPagingParams.pageSize.toString());
        let branchesPredicate = this.selectedBranches.join('-');
        let specialtiesPredicate = this.selectedSpecialties.join('-');
        let citiesPredicate = this.selectedCities.join('-');
        params.append('specialtiesPredicate', specialtiesPredicate);
        params.append('branchesPredicate', branchesPredicate);
        params.append('citiesPredicate', citiesPredicate);
        params.append('minTuition', this.minTuition.toString());
        params.append('maxTuition', this.maxTuition.toString());
        params.append('degreeId', this.selectedDegreeId);
        params.append('sorting', this.institutionsSorting);
        return params;
    }

    debouncedLoadInstitutions = debounce(() => {
        this.institutionPagingParams = new InstitutionsPagingParams();
        this.institutionsRegistry.clear();
        this.loadInstitutions();
    }, 1500);

    loadInstitutions = async () => {
        try {
            this.setLoading(true);
            const result = await agent.Institutions.list(this.institutionAxiosParams);
            runInAction(() => {
                this.setLoading(false);
                result.data.forEach((institution, index) => {
                    setTimeout(() =>
                        this.setInstiutionRegistryItem(institution), index * 100)
                });
            })
            this.setInstiutionsPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
            this.setLoading(false);
        }
    }

    setImageStatus = async (id: string, statusId: number) => {
        this.uploading = true;
        try {
            const params = new URLSearchParams();
            const status = ['isTitleImage', 'isBackgroundImage', 'isEmblemImage']
            params.append(status[statusId], 'true');
            await agent.Images.setImageStatus(id, params);
            runInAction(() => {
                if (this.selectedInstitution) {
                    const image = this.selectedInstitutionImages.get(id)!.url;
                    if (statusId === 0)
                        this.selectedInstitution.titleImageUrl = image;
                    if (statusId === 1)
                        this.selectedInstitution.backgroundImageUrl = image;
                    if (statusId === 2)
                        this.selectedInstitution.emblemImageUrl = image;
                    this.institutionsRegistry.set(this.selectedInstitution.id, this.selectedInstitution);
                }
                this.uploading = false;
            })
        } catch (error) {
            this.uploading = false;
            console.log(error);
        }
    }
    deleteInstitutionImage = async (id: string, institutionId: string) => {
        this.uploading = true;
        try {
            await agent.Images.delete(id, institutionId);
            runInAction(() => {
                if (this.selectedInstitution) {
                    const image = this.selectedInstitutionImages.get(id)!.url;
                    if (this.selectedInstitution.titleImageUrl === image)
                        this.selectedInstitution.titleImageUrl = '';
                    if (this.selectedInstitution.backgroundImageUrl === image)
                        this.selectedInstitution.backgroundImageUrl = '';
                    if (this.selectedInstitution.emblemImageUrl === image)
                        this.selectedInstitution.emblemImageUrl = '';
                    this.institutionsRegistry.set(this.selectedInstitution.id, this.selectedInstitution);
                    this.selectedInstitutionImages.delete(id);
                }
                this.uploading = false;
            })
        } catch (error) {
            this.uploading = false;
            console.log(error);
        }
    }

    setInstitutionPagingParams = (pagingParams: InstitutionsPagingParams) => {
        this.institutionPagingParams = pagingParams;
    }

    setInstiutionRegistryItem = (institution: Institution) => {
        this.institutionsRegistry.set(institution.id, institution);
    }

    private setInstitution = (institution: Institution) => {
        this.institutionsRegistry.set(institution.id, institution);
    }
    private getInstitution = (id: string) => {
        return this.institutionsRegistry.get(id);
    }

    get institutions() {
        return Array.from(this.institutionsRegistry.values());
    }

    get isInstitutionManager() {
        if (store.userStore.isLoggedIn && store.profileStore.profile)
            return !!store.profileStore.profile?.managedInstitutions.find((x) => x.id === this.selectedInstitution?.id);
        return false;
    }

    setInstitutionsSearchSort = (selectedInstitutionsSort: string) => {
        this.institutionsSorting = selectedInstitutionsSort;
    }

    get imageAxiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.imagesPagingParams.pageNumber.toString());
        params.append('pageSize', this.imagesPagingParams.pageSize.toString());
        return params;
    }

    debouncedLoadImages = debounce(() => {
        this.loadImages();
    }, 800);

    loadImages = async () => {
        this.setImagesLoading(true);
        try {
            const result = await agent.Images.list(this.selectedInstitution!.id, this.imageAxiosParams);
            runInAction(() => {
                this.setImagesLoading(false);
                result.data.forEach((image, index) => {
                    setTimeout(() =>
                        this.selectedInstitutionImages.set(image.id, image), index * 100)
                });
            })
            console.log(result.pagination)
            this.setImagesPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
            this.setReviewsLoading(false);
        }
    }

    setTitleImage = async (file: Blob, id: string) => {
        this.uploading = true;
        try {
            const response = await agent.Images.setTitleImage(file, id);
            const titleImage = response.data;
            runInAction(() => {
                if (this.selectedInstitution) {
                    this.selectedInstitution.titleImageUrl = titleImage.url;
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
            const response = await agent.Images.setBackgroundImage(file, id);
            const backgroundImage = response.data;
            runInAction(() => {
                if (this.selectedInstitution) {
                    this.selectedInstitution.backgroundImageUrl = backgroundImage.url;
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

    setImage = async (file: Blob, id: string) => {
        this.uploading = true;
        try {
            const response = await agent.Images.setImage(file, id);
            const image = response.data;
            runInAction(() => {
                if (this.selectedInstitutionImages) {
                    this.selectedInstitutionImages.set(image.id, image);
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

    clearImagesPagination = () => {
        this.imagesPagination = null;
    }

    clearImages = () => {
        this.selectedInstitutionImages.clear();
    }

    setImagesLoading = (state: boolean) => {
        this.imagesLoading = state;
    }

    setImagesPagingParams = (pagingParams: ImagesPagingParams) => {
        this.imagesPagingParams = pagingParams;
    }

    setImagesPagination = (pagination: Pagination) => {
        this.imagesPagination = pagination;
    }

    get images() {
        return Array.from(this.selectedInstitutionImages.values());
    }

    get reviewAxiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.reviewPagingParams.pageNumber.toString());
        params.append('pageSize', this.reviewPagingParams.pageSize.toString());
        params.append('targetRating', this.reviewTargetRating?.toString() || '');
        params.append('sorting', this.reviewSorting);
        return params;
    }

    debouncedLoadReviews = debounce(() => {
        this.loadReviews();
    }, 800);

    loadReviews = async () => {
        this.setReviewsLoading(true);
        try {
            const result = await agent.Reviews.list(this.selectedInstitution!.id, this.reviewAxiosParams);
            runInAction(() => {
                this.setReviewsLoading(false);
                result.data.forEach((review, index) => {
                    review.createdAt = new Date(review.createdAt);
                    setTimeout(() =>
                        this.selectedInstitutionReviews.set(review.id, review), index * 100)
                });
            })
            console.log(result.pagination)
            this.setReviewsPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
            this.setReviewsLoading(false);
        }
    }

    get reviews() {
        return Array.from(this.selectedInstitutionReviews.values());
    }

    setReviewForm = (state: boolean) => {
        this.reviewForm = state;
    }

    createReview = async (review: ReviewFormValues, institutionId: string) => {
        try {
            await agent.Reviews.create(institutionId, review);
        } catch (error) {
            console.log(error);
        }
    }

    clearReviewsPagination = () => {
        this.reviewsPagination = null;
    }

    clearInstitutionReviews = () => {
        this.selectedInstitutionReviews.clear();
    }

    setReviewsLoading = (state: boolean) => {
        this.reviewsLoading = state;
    }

    setReviewTargetRating = (rating: number | undefined) => {
        this.reviewTargetRating = rating;
    }

    setReviewPagingParams = (pagingParams: ReviewsPagingParams) => {
        this.reviewPagingParams = pagingParams;
    }

    setReviewSorting = (sorting: string) => {
        this.reviewSorting = sorting;
    }

    setReviewsPagination = (pagination: Pagination) => {
        this.reviewsPagination = pagination;
    }

    setInstiutionsPagination = (pagination: Pagination) => {
        this.institutionPagination = pagination;
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
        try {
            await agent.Institutions.create(institution);
            const newInstitution = new Institution(institution);
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