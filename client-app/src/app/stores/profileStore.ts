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

    setProfileImage = async (file: Blob, id: string) => {
        this.uploading = true;
        try {
            const response = await agent.Institutions.setBackgroundImage(file, id);
            const profileAvatar = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.image = profileAvatar;
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