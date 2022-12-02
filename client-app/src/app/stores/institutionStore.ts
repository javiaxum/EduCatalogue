import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Institution } from "../models/institution";
import { v4 as uuid } from 'uuid';

export default class InstitutionStore {

    institutionsRegistry = new Map<string, Institution>();
    selectedInstitution: Institution | undefined = undefined;
    editMode: boolean = false;
    loading: boolean = false;
    loadingInitial: boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    get instititutionsByName() {
        return Array.from(this.institutionsRegistry.values()).sort((a,b) => a.name.localeCompare(b.name)); // possibly not sorting by name
    }

    loadInstitutions = async () => {
        try {
            const institutions = await agent.Institutions.list();
            institutions.forEach(institution => {
                this.institutionsRegistry.set(institution.id, institution)
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
        
    }

    selectInstitution = (id: string) => {
        this.selectedInstitution = this.institutionsRegistry.get(id);
    }
    cancelSelectInstitution = () => {
        this.selectedInstitution = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectInstitution(id) : this.cancelSelectInstitution();
        this.editMode = true;
    }
    closeForm() {
        this.editMode = false;
    }
    createInstitution = async (institution: Institution) => {
        this.setLoading(true);
        institution.id = uuid();
        try {
            await agent.Institutions.create(institution);
            this.institutionsRegistry.set(institution.id, institution);
            this.selectInstitution(institution.id);
            this.setLoading(false);
            this.closeForm();
        } catch (error) {
            console.log(error);
            this.setLoading(false);
            this.closeForm();
        }
    }
    editInstitution = async (institution: Institution) => {
        this.setLoading(true);
        try {
            await agent.Institutions.update(institution);
            runInAction(() => {
                this.institutionsRegistry.set(institution.id, institution);
            })
            this.selectInstitution(institution.id);
            this.setLoading(false);
            this.closeForm();
        } catch (error) {
            console.log(error);
            this.setLoading(false);
            this.closeForm();
        }
    }
    deleteInstitution = async (id: string) => {
        this.setLoading(true);
        try {
            await agent.Institutions.delete(id);
            runInAction(() => {
                this.institutionsRegistry.delete(id);
            })
            this.selectInstitution("");
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