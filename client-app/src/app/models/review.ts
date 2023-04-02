import { Profile } from "./profile";

export interface Review {
    id: string;
    author: Profile;
    reviewMessage: string;
    institutionId: string;
    institutionName: string;
    titleImageUrl: string;
    rating: number;
    createdAt: Date;
}

export class Review implements Review {
    constructor(init?: ReviewFormValues | Review) {
        Object.assign(this, init);
    }
}

export class ReviewFormValues {
    id?: string = undefined;
    reviewMessage: string = '';
    rating: number = 0;

    constructor(review?: ReviewFormValues) {
        if (review) {
            this.id = review.id;
            this.reviewMessage = review.reviewMessage;
            this.rating = review.rating;
        }
    }
}