import { makeAutoObservable, runInAction } from "mobx";
import { router } from "../../features/routers/Routes";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;
    rememberMeSwitch: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/institutions');
            store.modalStore.closeModal();
            store.profileStore.loadProfile();
        } catch (error) {
            throw error;
        }
    }
    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/institutions');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        store.modalStore.closeModal();
        store.commonStore.setSidebarOpened(false);
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => {
                this.user = user;
            })
        } catch (error) {
            console.log(error);
        }
    }
    requestEmailChange = async (newEmail: string) => {
        try {
            console.log(newEmail);
            const user = await agent.Account.updateEmail(newEmail);
        } catch (error) {
            console.log(error);
        }
    }
    requestPasswordReset = async (email: string) => {
        try {
            const user = await agent.Account.requestPasswordReset(email);
            console.log(email)
        } catch (error) {
            console.log(error);
        }
    }

    resetPassword = async (newPassword: string, email: string, token: string) => {
        try {
            const user = await agent.Account.resetPassword(newPassword, email, token);
        } catch (error) {
            console.log(error);
        }
    }

    changePassword = async (newPassword: string, oldPassword: string) => {
        try {
            const user = await agent.Account.changePassword(newPassword, oldPassword);
        } catch (error) {
            console.log(error);
        }
    }
    requestEmailConfirmationMessage = async () => {
        try {
            const user = await agent.Account.sendConfirmMessage();
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }
}