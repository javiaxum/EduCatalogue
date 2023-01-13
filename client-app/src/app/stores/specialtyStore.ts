import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Branch } from "../models/branch";
import { Profile } from "../models/profile";
import { Specialty, SpecialtyFormValues } from "../models/specialty";
import { SpecialtyCore } from "../models/specialtyCore";
import { store } from "./store";

export default class SpecialtyStore {

    specialtyRegistry = new Map<string, Specialty>();
    selectedSpecialty: Specialty | undefined;
    specialtyCoreRegistry = new Map<string, SpecialtyCore>();
    branchRegistry = new Map<string, Branch>();
    loadingInitial: boolean = true;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get specialtyCoresByNameSelectInput() {
        return Array.from(this.specialtyCoreRegistry.values())
            .map(element => ({ text: `${element.id} ${element.name}`, value: element.id }))
            .sort((a, b) => a.text.localeCompare(b.text))
    }
    get specialtyCoresByName() {
        return Array.from(this.specialtyCoreRegistry.values())
            .map(element => (element))
            .sort((a, b) => a.id.localeCompare(b.id))
    }
    get branchesById() {
        return Array.from(this.branchRegistry.values())
            .map(element => (element))
            .sort((a, b) => a.id.localeCompare(b.id))
    }

    getSpecialtyCoreISCEDString = (id: string) => {
        const specialtyCore = this.specialtyCoreRegistry.get(id);
        let iscedCodeString = "";
        if (specialtyCore) {
            for (let i = 0; i < specialtyCore.iscedCores.length; i++) {
                if (iscedCodeString !== "") iscedCodeString += ` ${specialtyCore!.iscedCores[i].id}`
            }
        }
        return iscedCodeString;
    }

    private setSpecialty = (specialty: Specialty) => {
        this.specialtyRegistry.set(specialty.id, specialty);
    }
    private getSpecialty = (id: string) => {
        return this.specialtyRegistry.get(id);
    }
    getBranch = (id: string) => {
        return this.branchRegistry.get(id);
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

    loadBranches = async () => {
        this.setLoading(true);
        try {
            const branches = await agent.Specialties.listBranches();
            runInAction(() => {
                branches.forEach(branch => {
                    this.branchRegistry.set(branch.id, branch)
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