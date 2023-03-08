import { makeAutoObservable, reaction, runInAction } from "mobx";
import { DropdownItemProps } from "semantic-ui-react";
import agent from "../api/agent";
import { Branch } from "../models/branch";
import { ComponentCore } from "../models/componentCore";
import { EducationalComponent } from "../models/educationalComponent";
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
    selectedSpecialties: string[] = [];
    selectedBranches: string[] = [];
    minPrice: string = '';
    maxPrice: string = '';
    selectedDegree: string = '';

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => [
                this.selectedSpecialties,
                this.selectedBranches,
                this.maxPrice,
                this.minPrice,
                this.selectedDegree],
            () => {
                store.institutionStore.debouncedLoadInstitutions();
            })
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

    filterSpecialtiesBySelectedBranch = (value: string[]) => {
        this.selectedSpecialties = value;
    }

    setSelectedBranches = (value: string[]) => {
        this.selectedBranches = value;
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

    getComponentCore  = (id: number) => {
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

    loadSpecialty = async (id: string) => {
        this.setLoading(true);
        let specialty = this.specialtyRegistry.get(id);
        if (specialty) {
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
        const user = store.userStore.user;
        const manager = new Profile(user!);
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
    editSpecialty = async (specialty: SpecialtyFormValues, institutionId: string) => {
        try {
            await agent.Specialties.update(new SpecialtyFormValues(specialty), institutionId);
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