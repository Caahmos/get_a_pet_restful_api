export interface RegisterUserRequest{
    name: string;
    lastName: string;
    birthdate: Date;
    email: string;
    phone: string;
    password: string;
    confirmPassword?: string;
}