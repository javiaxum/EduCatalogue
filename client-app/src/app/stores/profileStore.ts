import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {

    profile: Profile | undefined = undefined;
    loading: boolean = false;
    uploading: boolean = false;
    

    constructor() {
        makeAutoObservable(this);
    }

    get isCurrentUser() {
        if(store.userStore.user && this.profile) {
            return this.profile.username === store.userStore.user.username;
        }
        return false;
    }

    loadProfile = async () => {
        this.loading = true;
        try {
            const profile = await agent.Profiles.get();
            runInAction(() => {
                profile.reviews.forEach((x) => {
                    x.createdAt = new Date(x.createdAt);
                })
                this.profile = profile;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    setProfileImage = async (file: Blob) => {
        this.uploading = true;
        try {
            const response = await agent.Profiles.setProfileImage(file);
            runInAction(() => {
                if (this.profile) {
                    this.profile.avatar = response.data;
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

}