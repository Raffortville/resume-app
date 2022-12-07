import React from 'react';
import { useResume } from '../../../../../hooks/resume';
import { useAppDispatch } from '../../../../../store/hooks';
import {
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

interface CustomProps {
	formSection: FormSectionType;
	onSelectExperienceId: (id: string) => void;
}

export const PreviewResumeFormValues: React.FC<CustomProps> = ({
	formSection,
	onSelectExperienceId,
}) => {
	const { resume } = useResume();
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

			default:
				return [];
		}
	};

	const getRadiosData = (): ObjectKeyListItems[] => {
		switch (formSection) {
			case 'experiences': {
				if (!resume.experiences) {
					return [];
				}
				return [
					{
						key: resume._id,
						title: 'Experiences',
						items: resume.experiences.map((exp) => ({
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

	const onDeleteResumeItem = ({
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
				if (!resume.experiences) {
					return;
				}
				dispatch(
					setResume({
						...resume,
						experiences: resume.experiences.filter(
							(exp) => exp.exp_id !== itemId
						),
					})
				);
				break;

			default:
				break;
		}
	};

	return (
		<div>
			<ListChips
				chips={getChipsData()}
				onDeleteChip={({ chipKey, itemId }) =>
					onDeleteResumeItem({ key: chipKey, itemId })
				}
			/>
			<ListTexts
				texts={getTextsData()}
				onDeleteText={({ textKey, itemId }) =>
					onDeleteResumeItem({ key: textKey, itemId })
				}
			/>
			<ListRadios
				radios={getRadiosData()}
				onSelectRadio={onSelectExperienceId}
				onDeleteRadio={({ radioKey, itemId }) =>
					onDeleteResumeItem({ key: radioKey, itemId })
				}
			/>
		</div>
	);
};
