import type { AlertColor } from '@mui/material/Alert';
import { ObjKeyValueType } from '../common/index';
import type { ObjectIdLabel } from '../common/index';
import type { ObjectKeyListItems } from '../common/index';

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
	languages?: ObjectKeyListItems;
	frameworks?: ObjectKeyListItems;
	databases?: ObjectKeyListItems;
	services?: ObjectKeyListItems;
	control_version?: ObjectKeyListItems;
	productivity?: ObjectKeyListItems;
	soft_skills?: ObjectKeyListItems;
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
