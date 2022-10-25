export interface IUser {
	email: string;
	password?: string;
	userName?: string;
	emailPro?: String;
	firstName?: String;
	lastName?: String;
	city?: string;
	phone?: string;
	country?: string;
}

export type UserType = IUser | null;
