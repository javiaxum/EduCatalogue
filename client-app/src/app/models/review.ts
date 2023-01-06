import { Profile } from "./profile";

export interface Review {
    id: string;
    author: Profile;
    reviewMessage: string;
    rating: number;
    createdAt: Date;
}