import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile } from "../models/profile";
import { ServerError } from "../models/serverError";
import { Specialty, SpecialtyFormValues } from "../models/specialty";
import { SpecialtyCore } from "../models/specialtyCore";
import { store } from "./store";

export default class SpecialtyStore {

    specialtyRegistry = new Map<string, Specialty>();
    selectedSpecialty: Specialty | undefined;
    specialtyCoreRegistry = new Map<string, SpecialtyCore>();
    loadingInitial: boolean = true;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get specialtyCoresByNameAndNumber() {
        return Array.from(this.specialtyCoreRegistry.values())
            .map(element => ({ text: `${element.name}`, value: element.uaCode }))
            .sort((a, b) => a.text.localeCompare(b.text))
    }

    private setSpecialty = (specialty: Specialty) => {
        this.specialtyRegistry.set(specialty.id, specialty);
    }
    private getSpecialty = (id: string) => {
        return this.specialtyRegistry.get(id);
    }
    getSpecialtyCore = (id: string) => {
        return this.specialtyCoreRegistry.get(id);
    }

    // setActiveMenuItem = (itemName: string) => {
    //     this.detailsMenuActiveItem = itemName;
    // }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    setLoading = (state: boolean) => {
        this.loading = state;
    }

    loadSpecialtyCores = async () => {
        try {
            const specialtyCores = await agent.Specialties.listCore();
            runInAction(() => {
                specialtyCores.forEach(specialtyCore => {
                    this.specialtyCoreRegistry.set(specialtyCore.uaCode, specialtyCore)
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
        try {
            const specialty = await agent.Specialties.details(id);
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