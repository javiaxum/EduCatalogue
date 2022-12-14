import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Institution } from "../models/institution";

export default class InstitutionStore {

    institutionsRegistry = new Map<string, Institution>();
    selectedInstitution: Institution | undefined = undefined;
    loading: boolean = false;
    loadingInitial: boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    get instititutionsByName() {
        return Array.from(this.institutionsRegistry.values()).sort((a, b) => a.name.localeCompare(b.name)); // possibly not sorting by name
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
        let institution = this.institutionsRegistry.get(id);

        if (institution) {
            this.selectedInstitution = institution;
            this.setLoadingInitial(false);
            return institution;
        }
        else {
            try {
                institution = await agent.Institutions.details(id);
                runInAction(() => {
                    this.selectedInstitution = institution;
                    this.setLoadingInitial(false);
                    return institution;
                })
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    createInstitution = async (institution: Institution) => {
        this.setLoading(true);
        try {
            await agent.Institutions.create(institution);
            this.institutionsRegistry.set(institution.id, institution);
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }
    editInstitution = async (institution: Institution) => {
        this.setLoading(true);
        try {
            await agent.Institutions.update(institution);
            runInAction(() => {
                this.institutionsRegistry.set(institution.id, institution);
            })
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
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