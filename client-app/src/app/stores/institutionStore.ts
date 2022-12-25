import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Institution, InstitutionFormValues } from "../models/institution";
import { Profile } from "../models/profile";
import { store } from "./store";

export default class InstitutionStore {

    institutionsRegistry = new Map<string, Institution>();
    selectedInstitution: Institution | undefined = undefined;
    loading: boolean = false;
    loadingInitial: boolean = true;
    detailsMenuActiveItem: string = 'About';

    constructor() {
        makeAutoObservable(this);
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
        try {
            const institutions = await agent.Institutions.list();
            runInAction(() => {
                institutions.forEach(institution => {
                    this.institutionsRegistry.set(institution.id, institution)
                });
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }

    }
    loadInstitution = async (id: string) => {
        // let institution = this.institutionsRegistry.get(id);

        // if (institution) {
        //     this.selectedInstitution = institution;
        //     this.setLoadingInitial(false);
        //     return institution;
        // }
        // else {
            try {
                const institution = await agent.Institutions.details(id);
                runInAction(() => {
                    this.selectedInstitution = institution;
                })
                this.setLoadingInitial(false);
                return institution;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        // }
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
            await agent.Institutions.update(institution);
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