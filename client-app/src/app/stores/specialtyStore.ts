import { debounce } from "lodash";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { DropdownItemProps } from "semantic-ui-react";
import agent from "../api/agent";
import { Branch } from "../models/branch";
import { ComponentCore } from "../models/componentCore";
import { EducationalComponent } from "../models/educationalComponent";
import { Pagination, SpecialtiesPagingParams } from "../models/pagination";
import { Profile } from "../models/profile";
import { Skill } from "../models/skill";
import { Specialty, SpecialtyFormValues } from "../models/specialty";
import { SpecialtyCore } from "../models/specialtyCore";
import { store } from "./store";

export default class SpecialtyStore {

    specialtyRegistry = new Map<string, Specialty>();
    selectedSpecialty: Specialty | undefined;

    specialtyCoreRegistry = new Map<string, SpecialtyCore>();
    branchRegistry = new Map<string, Branch>();
    skillRegistry = new Map<number, Skill>();
    componentCoreRegistry = new Map<number, ComponentCore>();
    loadingInitial: boolean = true;
    loading: boolean = false;
    // Search params
    pagination: Pagination | null = null;
    pagingParams: SpecialtiesPagingParams = new SpecialtiesPagingParams();
    selectedSpecialties: string[] = [];
    selectedBranches: string[] = [];
    selectedSkillIds: number[] = [];
    selectedLanguages: string[] = [];
    selectedStudyForms: number[] = [];
    minPrice: string = '';
    maxPrice: string = '';
    selectedDegree: string = '';
    selectedSpecialtyIds: string[] = [];
    selectedSpecialtiesSort: string = 'az';
    //
    popularSpecialtiesRegistry = new Map<string, Specialty>();

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => [
                this.selectedSkillIds,
                this.selectedLanguages,
                this.selectedStudyForms,
                this.selectedSpecialties,
                this.selectedBranches,
                this.maxPrice,
                this.minPrice,
                this.selectedDegree],
            () => {
                this.debouncedLoadSpecialties();
            })
    }

    // reset() {
    //     this.specialtyRegistry = new Map<string, Specialty>();
    //     this.loadingInitial = true;
    //     this.loading = false;
    //     this.pagination = null;
    //     this.pagingParams = new SpecialtiesPagingParams();
    //     this.selectedSpecialties = [];
    //     this.selectedBranches = [];
    //     this.selectedSkillIds = [];
    //     this.minPrice = '';
    //     this.maxPrice = '';
    //     this.selectedDegree = '';
    //     this.selectedSpecialtyIds = [];
    //     this.selectedSpecialtiesSort = 'az';
    // }
    get popularSpecialties() {
        return Array.from(this.popularSpecialtiesRegistry.values());
    }

    get instititutionsBySelectedSort() {
        const specialties = Array.from(this.specialtyRegistry.values());
        if (this.selectedSpecialtiesSort == 'za')
            return specialties.sort((a, b) => b.localSpecialtyCode.localeCompare(a.localSpecialtyCode));
        return specialties.sort((a, b) => a.localSpecialtyCode.localeCompare(b.localSpecialtyCode));
    }

    setSpecialtiesSearchSort = (selectedSpecialtiesSort: string) => {
        this.selectedSpecialtiesSort = selectedSpecialtiesSort;
    }

    toggleSelectedSpecialtyId = (id: string) => {
        if (this.selectedSpecialtyIds.includes(id)) {
            this.selectedSpecialtyIds = this.selectedSpecialtyIds.filter((x) => x != id);
        }
        else this.selectedSpecialtyIds.push(id);
    }

    setDegreePredicate = (degree: string) => {
        this.selectedDegree = degree;
    }

    setMaxPrice = (value: string) => {
        this.maxPrice = value;
    }

    setMinPrice = (value: string) => {
        this.minPrice = value;
    }

    setSelectedSpeialties = (value: string[]) => {
        this.selectedSpecialties = value;
    }

    setSelectedBranches = (value: string[]) => {
        this.selectedBranches = value;
    }

    setSelectedSkillIds = (value: number[]) => {
        this.selectedSkillIds = value;
    }

    setSelectedLanguages = (value: string[]) => {
        this.selectedLanguages = value;
    }

    setSelectedStudyForms = (value: number[]) => {
        this.selectedStudyForms = value;
    }

    get specialtyCoresByName() {
        return Array.from(this.specialtyCoreRegistry.values())
            .sort((a, b) => a.id.localeCompare(b.id));
    }
    get specialtyCoresById() {
        return Array.from(this.specialtyCoreRegistry.values())
            .map(element => (element))
            .sort((a, b) => a.id.localeCompare(b.id))
    }
    get branchesById() {
        return Array.from(this.branchRegistry.values())
            .map(element => (element))
            .sort((a, b) => a.id.localeCompare(b.id))
    }
    get skillsById() {
        return Array.from(this.skillRegistry.values())
            .map(element => (element))
            .sort((a, b) => a.id - b.id)
    }
    get componentCoresById() {
        return Array.from(this.componentCoreRegistry.values())
            .map(element => (element))
            .sort((a, b) => a.id - b.id)
    }

    getSpecialtyCoreISCEDString = (id: string) => {
        const specialtyCore = this.specialtyCoreRegistry.get(id);
        let iscedCodeString = "";
        if (specialtyCore) {
            for (let i = 0; i < specialtyCore.iscedCores.length; i++) {
                if (iscedCodeString !== "") iscedCodeString += ', ';
                iscedCodeString += specialtyCore!.iscedCores[i].id;
            }
        }
        return iscedCodeString;
    }

    private setSpecialty = (specialty: Specialty) => {
        this.specialtyRegistry.set(specialty.id, specialty);
    }
    getSpecialty = (id: string) => {
        return this.specialtyRegistry.get(id);
    }

    getBranch = (id: string) => {
        return this.branchRegistry.get(id);
    }

    getSkill = (id: number) => {
        return this.skillRegistry.get(id);
    }

    getComponentCore = (id: number) => {
        return this.componentCoreRegistry.get(id);
    }

    getSpecialtyCore = (id: string) => {
        return this.specialtyCoreRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    loadSpecialtyCores = async () => {
        this.setLoading(true);
        try {
            const specialtyCores = await agent.Specialties.listCores();
            runInAction(() => {
                specialtyCores.forEach(specialtyCore => {
                    this.specialtyCoreRegistry.set(specialtyCore.id, specialtyCore)
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

    loadComponentCores = async () => {
        this.setLoading(true);
        try {
            const componentCores = await agent.Specialties.listComponentCores();
            runInAction(() => {
                componentCores.forEach(componentCore => {
                    this.componentCoreRegistry.set(componentCore.id, componentCore);
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

    loadSkills = async () => {
        this.setLoading(true);
        try {
            const skills = await agent.Specialties.listSkills();
            runInAction(() => {
                skills.forEach(skill => {
                    this.skillRegistry.set(skill.id, skill);
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

    loadBranches = async () => {
        this.setLoading(true);
        try {
            const branches = await agent.Specialties.listBranches();
            runInAction(() => {
                branches.forEach(branch => {
                    this.branchRegistry.set(branch.id, branch);
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

    setSelectedSpecialty = (specialty: Specialty) => {
        this.selectedSpecialty = specialty;
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    setPagingParams = (pagingParams: SpecialtiesPagingParams) => {
        this.pagingParams = pagingParams;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        let branchesPredicate = store.specialtyStore.selectedBranches.join('-');
        let specialtiesPredicate = store.specialtyStore.selectedSpecialties.join('-');
        let skillsPredicate = store.specialtyStore.selectedSkillIds.join('-');
        let languagesPredicate = store.specialtyStore.selectedLanguages.join('-');
        let studyFormsPredicate = store.specialtyStore.selectedStudyForms.join('-');
        params.append('studyFormsPredicate', studyFormsPredicate);
        params.append('languagesPredicate', languagesPredicate);
        params.append('skillsPredicate', skillsPredicate);
        params.append('specialtiesPredicate', specialtiesPredicate);
        params.append('branchesPredicate', branchesPredicate);
        params.append('minPrice', store.specialtyStore.minPrice.toString());
        params.append('maxPrice', store.specialtyStore.maxPrice.toString());
        params.append('degreeId', store.specialtyStore.selectedDegree);
        params.append('sort', this.selectedSpecialtiesSort);
        return params;
    }

    debouncedLoadSpecialties = debounce(() => {
        this.pagingParams = new SpecialtiesPagingParams();
        this.loadSpecialties()
    }, 800);

    loadSpecialties = async () => {
        this.setLoading(true);
        this.specialtyRegistry.clear();
        try {
            const result = await agent.Specialties.list(store.institutionStore.selectedInstitution!.id, this.axiosParams);
            runInAction(() => {
                result.data.forEach(specialty => {
                    this.specialtyRegistry.set(specialty.id, specialty)
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

    loadPopularSpecialties = async () => {
        this.setLoading(true);
        this.specialtyRegistry.clear();
        const params = new URLSearchParams();
        params.append('pageNumber', '1');
        params.append('pageSize', '10');
        params.append('listMostPopular', 'true');
        this.popularSpecialtiesRegistry.clear();
        try {
            const result = await agent.Specialties.list(store.institutionStore.selectedInstitution!.id, params);
            runInAction(() => {
                result.data.forEach((specialty) =>
                    this.popularSpecialtiesRegistry.set(specialty.id, specialty));
                this.setLoadingInitial(false);
                this.setLoading(false);
            });
            return result.data;

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
            this.setLoading(false);
        }
    }

    loadSpecialty = async (id: string) => {
        this.setLoading(true);
        let specialty = this.specialtyRegistry.get(id);
        if (specialty && specialty.studyFormIds && specialty.componentDTOs && specialty.languageIds && specialty.skillIds) {
            this.selectedSpecialty = specialty;
            this.setLoadingInitial(false);
            this.setLoading(false);
            return specialty;
        }
        try {
            const specialty = await agent.Specialties.details(id);
            runInAction(() => {
                this.selectedSpecialty = specialty;
            })
            this.setSpecialty(specialty)
            this.setLoadingInitial(false);
            this.setLoading(false);
            return specialty;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
            this.setLoading(false);
        }

    }

    createSpecialty = async (specialty: SpecialtyFormValues, institutionId: string) => {
        try {
            await agent.Specialties.create(specialty, institutionId);
            let newSpecialty = new Specialty(specialty);
            this.setSpecialty(newSpecialty);
            runInAction(() => {
                this.selectedSpecialty = newSpecialty;
            })
        } catch (error) {
            console.log(error);
        }
    }
    editSpecialty = async (specialty: SpecialtyFormValues) => {
        try {
            await agent.Specialties.update(new SpecialtyFormValues(specialty));
            runInAction(() => {
                if (specialty.id) {
                    let editedSpecialty = { ...this.getSpecialty(specialty.id), ...specialty };
                    this.specialtyRegistry.set(specialty.id, editedSpecialty as Specialty);
                    this.selectedSpecialty = editedSpecialty as Specialty;
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}