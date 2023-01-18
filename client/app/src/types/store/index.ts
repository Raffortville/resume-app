import type { AlertColor } from '@mui/material/Alert';
import { ColorKey, ObjectIdValue, ObjectKeyListItems } from '../common/index';

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
	achievements: ObjectKeyListItems;
	stack: ObjectKeyListItems;
	period: { start: string; end: string };
	place?: string;
	occupiedPosition?: string;
	description?: string;
	project?: string;
}

export type ExpertiseKeyType =
	| 'languages'
	| 'frameworks'
	| 'databases'
	| 'services'
	| 'control_version'
	| 'productivity'
	| 'soft_skills';

export interface IExpertise {
	key: ExpertiseKeyType;
	title: string;
	items: ObjectIdValue[];
}
export interface IProfil {
	position?: string;
	introduction?: string;
	portfolio?: string;
	socialMedias?: string;
	education?: IEducation;
}
export interface IDesign {
	profilPic?: string;
	colorMain?: ColorKey;
}

export type StatusType = 'complete' | 'draft';

export interface IResume {
	userId: string;
	_id: string;
	title: string;
	expertises: IExpertise[];
	createdtAt?: Date;
	status?: StatusType;
	profil?: IProfil;
	experiences?: IExperience[];
	design?: IDesign;
}
