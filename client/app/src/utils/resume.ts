import {
	resumeProfilProgressKeys,
	userContactProgressKeys,
} from '../constants';
import {
	converObjectToArray,
	fitlterArrayFromKeys,
	isStringEmpty,
} from '../helpers';
import {
	IDesign,
	IExperience,
	IExpertise,
	IProfil,
	IUser,
} from '../types/store';

export const sortExperiencesByDate = (
	experiences: IExperience[] | undefined
): IExperience[] | undefined => {
	if (!experiences) {
		return experiences;
	}
	return experiences
		.map((exp) => ({
			...exp,
			period: { ...exp.period, start: exp.period?.start ?? '0' },
		}))
		.sort((a, b) => (a.period.start > b.period.start ? -1 : 1));
};

export const checkUserContactProgress = (user: IUser | null): boolean => {
	if (!user) {
		return false;
	}
	const userArray = converObjectToArray(user);
	const filtredUserArray = fitlterArrayFromKeys({
		array: userArray,
		keys: userContactProgressKeys,
	});

	if (filtredUserArray.length !== userContactProgressKeys.length) {
		return false;
	}

	const isUserContactComplet = filtredUserArray.every((user) => {
		const [values] = Object.values(user);
		return !isStringEmpty(values as string | undefined);
	});

	return isUserContactComplet;
};

export const checResumeProfileProgress = (
	profile: IProfil | undefined
): boolean => {
	if (!profile) {
		return false;
	}
	const profileArray = converObjectToArray(profile);
	const filtredProfile = fitlterArrayFromKeys({
		array: profileArray,
		keys: resumeProfilProgressKeys,
	});

	if (filtredProfile.length !== resumeProfilProgressKeys.length) {
		return false;
	}

	const isResumeProfilComplete = filtredProfile.every((profil) => {
		if (profil.hasOwnProperty('education')) {
			const academy = profil.education.academy;
			return !isStringEmpty(academy);
		}
		const [value] = Object.values(profil);
		return !isStringEmpty(value as string | undefined);
	});

	return isResumeProfilComplete;
};

export const checkResumeExpertisesProgress = (
	expertises: IExpertise[] | undefined
): boolean => {
	if (!expertises || expertises.length === 0) {
		return false;
	}
	return expertises.some((expert) => expert.items.length > 0);
};

export const checkResumeExperiencesProgress = (
	experiences: IExperience[] | undefined
): boolean => {
	if (!experiences || experiences.length === 0) {
		return false;
	}
	const filtredExperiences = experiences.map((exp) => ({
		position: exp.occupiedPosition,
		name: exp.company,
		start: exp.period.start,
		place: exp.place,
	}));

	const isExperienceCompleted = filtredExperiences.every((exp) => {
		const [value] = Object.values(exp);
		return !isStringEmpty(value);
	});

	return isExperienceCompleted;
};

export const checkResumeDesignProgress = (
	design: IDesign | undefined
): boolean => {
	if (!design) {
		return false;
	}
	return !!design.colorMain.hex && !!design.profilPic;
};
