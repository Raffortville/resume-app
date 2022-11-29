import type { AlertColor } from '@mui/material/Alert';
import { ObjKeyValueType } from '../common/index';

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
	academy?: string;
	period?: string;
	certificate?: string;
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
	languages?: ObjKeyValueType[];
	frameworks?: ObjKeyValueType[];
	databases?: ObjKeyValueType[];
	services?: ObjKeyValueType[];
	control_version?: ObjKeyValueType[];
	productivity?: ObjKeyValueType[];
	soft_skills?: ObjKeyValueType[];
}
export interface IProfil {
	position?: string;
	introduction?: string;
	portfolio?: string;
	socialMedias?: string;
	education?: IEducation;
}
export interface IDesign {
	profilPic: string;
	colorMain: string;
}

export type StatusType = 'complete' | 'draft';

export interface IResume {
	userId: string;
	title: string;
	_id?: string;
	createdtAt?: Date;
	status?: StatusType;
	profil?: IProfil;
	expertises?: IExpertise;
	experiences?: IExperience[];
	design?: IDesign;
}
