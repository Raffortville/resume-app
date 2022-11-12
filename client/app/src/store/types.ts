import { AlertColor } from '@mui/material/Alert';

export type ObjKeyValueType = {
	key: string;
	value: string;
};

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

export interface IEducation {
	academy: string;
	period: string;
	certificate: string;
}

export interface IExperience {
	exp_id: string;
	company: string;
	period: string;
	place: string;
	occupiedPosition: string;
	description: string;
	project: string;
	achievements: ObjKeyValueType[];
	stack: ObjKeyValueType[];
}

export interface IExpertise {
	key: string | number;
	name: string;
	skills: ObjKeyValueType[];
}

export interface IProfil {
	position?: string;
	introduction?: string;
	portfolio?: string;
	socialMedias?: string;
	expertises?: IExpertise[];
	softSkills?: ObjKeyValueType[];
	education?: IEducation;
}

export interface IDesign {
	profilPic: string;
	colorMain: string;
}

export interface IResume {
	userId: string;
	createdtAt?: Date;
	state?: string;
	profil?: IProfil;
	experiences?: IExperience[];
	design?: IDesign;
}
