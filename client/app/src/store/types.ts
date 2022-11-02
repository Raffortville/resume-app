import { AlertColor } from '@mui/material/Alert';

export interface IUser {
	email: string;
	uid: string;
	_id?: string;
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

export interface IAlert {
	type: AlertColor | undefined;
	message: string;
}

export type AlertType = IAlert | null;
