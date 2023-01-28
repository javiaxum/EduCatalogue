import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile } from "../models/profile";

export default class ProfileStore {

    profile: Profile | undefined = undefined;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadProfile = async (username: string) => {
        this.loading = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
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

}