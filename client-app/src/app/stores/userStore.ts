import { makeAutoObservable, runInAction } from "mobx";
import { router } from "../../features/routers/Routes";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";
import { UserRegistryItem } from "../models/profile";

export default class UserStore {
    user: User | null = null;
    usersRegistry = new Map<string, UserRegistryItem>();
    rememberMeSwitch: boolean = false;
    loading: boolean = false;
    fbLoading: boolean = false;
    showPendingChanges: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    toggleShowPendingChanges = () => {
        this.showPendingChanges = !this.showPendingChanges;
        store.institutionStore.resetSearchParams();
        store.specialtyStore.resetSearchParams();
    }

    toggleInstitutionManager = async (username: string, institutionId: string) => {
        this.setLoading(true);
        try {
            await agent.Account.toggleInstitutionManager(username, institutionId);
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    login = async (creds: UserFormValues) => {
        this.setLoading(true);
        try {
            const user = await agent.Account.login(creds);
            runInAction(() => {
                store.commonStore.setToken(user.token);
                this.user = user;
            });
            this.setLoading(false);
            store.modalStore.closeModal();
            store.profileStore.loadProfile();
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    setFbLogin = (state: boolean) => {
        this.fbLoading = state;
    }


    fbLogin = async (accessToken: string) => {
        this.setFbLogin(true);
        try {
            const user = await agent.Account.fbLogin(accessToken);
            runInAction(() => {
                store.commonStore.setToken(user.token);
                this.user = user;
                this.setFbLogin(false);
            });
            router.navigate('/institutions');
            store.modalStore.closeModal();
            store.profileStore.loadProfile();
        } catch (error) {
            console.log(error);
            this.setFbLogin(false);
        }
    }
    register = async (creds: UserFormValues) => {
        this.setLoading(true);
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user;
                this.setLoading(false);
            });
            router.navigate('/institutions');
            store.modalStore.closeModal();
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        store.profileStore.profile = undefined;
        this.user = null;
        store.modalStore.closeModal();
        router.navigate('/institutions')
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
    deleteUser = async () => {
        try {
            await agent.Account.delete();
            runInAction(() => {
                this.logout();
                store.profileStore.profile = undefined;
                router.navigate('/institutions')
            })
        } catch (error) {
            console.log(error);
        }
    }
    requestEmailChange = async (newEmail: string) => {
        try {
            await agent.Account.updateEmail(newEmail);
        } catch (error) {
            console.log(error);
        }
    }
    requestPasswordReset = async (email: string) => {
        try {
            await agent.Account.requestPasswordReset(email);
        } catch (error) {
            console.log(error);
        }
    }

    resetPassword = async (newPassword: string, email: string, token: string) => {
        try {
            await agent.Account.resetPassword(newPassword, email, token);
        } catch (error) {
            console.log(error);
        }
    }

    changePassword = async (newPassword: string, oldPassword: string) => {
        try {
            await agent.Account.changePassword(newPassword, oldPassword);
        } catch (error) {
            console.log(error);
        }
    }

    requestEmailConfirmationMessage = async () => {
        try {
            await agent.Account.requestEmailConfirmation();
        } catch (error) {
            console.log(error);
        }
    }

    request2FAActivationCode = async () => {
        this.setLoading(true);
        try {
            await agent.Account.requestTwoFactorActivationCode();
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    request2FADeactivationCode = async () => {
        this.setLoading(true);
        try {
            await agent.Account.requestTwoFactorDeactivationCode();
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    confirm2FAActivation = async (code: string) => {
        this.setLoading(true);
        try {
            await agent.Account.confirmTwoFactorActivationCode(code);
            runInAction(() => {
                store.profileStore.profile!.twoFactorEnabled = true;
            })
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    confirm2FADeactivation = async (code: string) => {
        this.setLoading(true);
        try {
            await agent.Account.confirmTwoFactorDeactivationCode(code);
            runInAction(() => {
                store.profileStore.profile!.twoFactorEnabled = false;
            })
            this.setLoading(false);
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    get2FAStatus = async (user: UserFormValues) => {
        this.setLoading(true);
        try {
            const result = await agent.Account.twoFactorCheck(user);
            this.setLoading(false);
            return result;
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }
}