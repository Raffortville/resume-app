import React from 'react';
import { useResume } from '../../../../../hooks/resume';
import { useAppDispatch } from '../../../../../store/hooks';
import {
	deleteAchievementOrStackFromResumeExperience,
	deleteExpertiseFromResume,
	setResume,
} from '../../../../../store/resume/reducer';
import {
	FormSectionType,
	ObjectKeyListItems,
} from '../../../../../types/common';
import { ExpertiseKeyType } from '../../../../../types/store';
import { ListChips } from '../../../../ui/list/listChips';
import { ListRadios } from '../../../../ui/list/listRadios';
import { ListTexts } from '../../../../ui/list/listTexts';

import './previewResumeFormValuesStyles.scss';

interface CustomProps {
	formSection: FormSectionType;
	onSelectExperienceId: (id: string) => void;
	experienceId?: string;
}

export const PreviewResumeFormValues: React.FC<CustomProps> = ({
	formSection,
	onSelectExperienceId,
	experienceId,
}) => {
	const { resume, resumeExperiences } = useResume();
	const dispatch = useAppDispatch();

	if (resume === null) {
		return null;
	}

	const getChipsData = (): ObjectKeyListItems[] => {
		switch (formSection) {
			case 'expertises':
				return resume.expertises.filter(
					(expert) => expert.key !== 'soft_skills'
				);
			case 'experiences': {
				return resumeExperiences
					? resumeExperiences.map((exp) => ({
							title: exp.stack.title,
							key: exp.stack.key,
							items: exp.stack.items,
					  }))
					: [];
			}
			default:
				return [];
		}
	};

	const getTextsData = (): ObjectKeyListItems[] => {
		switch (formSection) {
			case 'expertises':
				return resume.expertises.filter(
					(expert) => expert.key === 'soft_skills'
				);
			case 'experiences': {
				return resumeExperiences
					? resumeExperiences.map((exp) => ({
							title: exp.achievements.title,
							key: exp.achievements.key,
							items: exp.achievements.items,
					  }))
					: [];
			}
			default:
				return [];
		}
	};

	const getRadiosData = (): ObjectKeyListItems[] => {
		switch (formSection) {
			case 'experiences': {
				if (!resumeExperiences) {
					return [];
				}
				return [
					{
						key: resume._id,
						title: 'Experiences',
						items: resumeExperiences.map((exp) => ({
							id: exp.exp_id,
							value: exp.company,
						})),
					},
				];
			}

			default:
				return [];
		}
	};

	const onDeleteItemFromResume = ({
		key,
		itemId,
	}: {
		key: string;
		itemId: string;
	}): void => {
		switch (formSection) {
			case 'expertises':
				dispatch(
					deleteExpertiseFromResume({
						expertiseKey: key as ExpertiseKeyType,
						skillId: itemId,
					})
				);
				break;
			case 'experiences':
				if (!resumeExperiences || !resume) {
					return;
				}
				dispatch(
					setResume({
						...resume,
						experiences: resumeExperiences.filter(
							(exp) => exp.exp_id !== itemId
						),
					})
				);
				break;
			default:
				break;
		}
	};

	const onDeleteAchievementOrStackFromResumeExperience = ({
		categoryKey,
		experienceKey,
		itemId,
	}: {
		categoryKey: 'achievements' | 'stack';
		experienceKey: string;
		itemId: string;
	}) => {
		dispatch(
			deleteAchievementOrStackFromResumeExperience({
				categoryKey: categoryKey,
				experienceId: experienceKey,
				itemId,
			})
		);
	};

	return (
		<div className='previewResumeFormValues'>
			<ListRadios
				radios={getRadiosData()}
				onSelectRadio={onSelectExperienceId}
				onDeleteRadio={({ radioKey, itemId }) => {
					onDeleteItemFromResume({ key: radioKey, itemId });
				}}
				defaultSelectedRadio={experienceId}
			/>
			<ListChips
				chips={getChipsData()}
				onDeleteChip={({ chipKey, itemId }) => {
					if (formSection === 'experiences') {
						onDeleteAchievementOrStackFromResumeExperience({
							categoryKey: 'stack',
							experienceKey: chipKey,
							itemId,
						});
						return;
					}
					onDeleteItemFromResume({ key: chipKey, itemId });
				}}
			/>
			<ListTexts
				texts={getTextsData()}
				onDeleteText={({ textKey, itemId }) => {
					if (formSection === 'experiences') {
						onDeleteAchievementOrStackFromResumeExperience({
							categoryKey: 'achievements',
							experienceKey: textKey,
							itemId,
						});
						return;
					}
					onDeleteItemFromResume({ key: textKey, itemId });
				}}
			/>
		</div>
	);
};
