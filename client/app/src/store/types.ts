import { AlertColor } from '@mui/material/Alert';

export interface IUserLite {
	_id?: string;
	userName?: string;
	emailPro?: string;
	firstName?: string;
	lastName?: string;
	city?: string;
	phone?: string;
	country?: string;
}

export interface IUser extends IUserLite {
	email: string;
	uid: string;
	password?: string;
}

export type UserType = IUser | null;

export interface IAlert {
	type: AlertColor | undefined;
	message: string;
}

export type AlertType = IAlert | null;
