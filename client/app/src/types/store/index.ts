import type { AlertColor } from '@mui/material/Alert';
import {
	ColorKey,
	IPeriodRange,
	ObjectIdValue,
	ObjectKeyListItems,
} from '../common/index';

export interface IBaseUser {
	email?: string;
	password?: string;
	_id?: string;
	userName?: string;
	emailPro?: string;
	firstName?: string;
	lastName?: string;
	city?: string;
	phone?: string;
	country?: string;
}

export type UserType = IBaseUser | null;
export interface IAlert {
	type: AlertColor | undefined;
	message: string;
}

export type AlertType = IAlert | null;
export interface IEducation {
	academy?: string;
	period?: IPeriodRange;
	certificate?: string;
}
export interface IExperience {
	exp_id: string;
	company: string;
	achievements: ObjectKeyListItems;
	stack: ObjectKeyListItems;
	period: IPeriodRange;
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
	colorMain: ColorKey;
}

export type StatusType = 'complete' | 'draft';

export interface IResume {
	userId: string;
	_id: string;
	title: string;
	expertises: IExpertise[];
	design: IDesign;
	contact?: IBaseUser;
	createdtAt?: Date;
	status?: StatusType;
	profil?: IProfil;
	experiences?: IExperience[];
}
