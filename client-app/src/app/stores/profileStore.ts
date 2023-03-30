import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../api/agent";
import { Profile, ProfileInfoFormValues } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {

    profile: Profile | undefined = undefined;
    loading: boolean = false;
    uploading: boolean = false;


    constructor() {
        makeAutoObservable(this);
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return this.profile.username === store.userStore.user.username;
        }
        return false;
    }
    get isOperator() {
        if (store.userStore.user && this.profile) {
            return this.profile.username === 'CatalogueOperator';
        }
        return false;
    }

    loadProfile = async () => {
        this.loading = true;
        if (store.userStore.isLoggedIn)
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
        else
            this.loading = false;
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

    setProfileBio = async (profileFormValues: ProfileInfoFormValues) => {
        console.log(profileFormValues);
        this.uploading = true;
        try {
            const response = await agent.Profiles.updateInfo(profileFormValues);
            runInAction(() => {
                if (this.profile) {
                    const newProfile = this.profile;
                    newProfile.displayName = profileFormValues.displayName;
                    newProfile.socialAccount1 = profileFormValues.socialAccount1;
                    newProfile.socialAccount2 = profileFormValues.socialAccount2;
                    newProfile.socialAccount3 = profileFormValues.socialAccount3;
                    newProfile.location = profileFormValues.location;
                    newProfile.company = profileFormValues.company;
                    this.profile = newProfile;
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