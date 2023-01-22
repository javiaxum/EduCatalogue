import { Profile } from "./profile";

export interface Review {
    id: string;
    displayName: string;
    username: string;
    image: string;
    reviewMessage: string;
    rating: number;
    createdAt: Date;
}