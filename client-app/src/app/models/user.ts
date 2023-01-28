export interface User {
    username: string;
    displayName: string;
    email: string;
    emailConfirmed: boolean;
    twoFactorEnabled: string;
    token: string;
    image?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    username?: string;
    displayName?: string;
}