// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserModel {
    email: string,
    password: string
}

export interface UserList {
    id: number;
    name: string;
    role: string;
    salary: number;
    isActive: boolean;
}