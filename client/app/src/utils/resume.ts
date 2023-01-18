import { IExperience } from '../types/store';

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
