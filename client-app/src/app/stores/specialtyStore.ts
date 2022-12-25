import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";
import { Specialty } from "../models/specialty";

export default class SpecialtyStore {

    specialtyRegistry: Specialty[] = [];
    selectedSpecialty: Specialty | undefined;
}