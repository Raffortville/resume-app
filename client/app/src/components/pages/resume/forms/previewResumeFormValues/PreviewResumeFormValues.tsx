import React from 'react';
import { useResume } from '../../../../../hooks/resume';
import { useAppDispatch } from '../../../../../store/hooks';
import { deleteExpertiseFromResume } from '../../../../../store/resume/reducer';
import {
	FormSectionType,
	ObjectKeyListItems,
} from '../../../../../types/common';
import { ExpertiseKeyType } from '../../../../../types/store';
import { ListChips } from '../../../../ui/list/listChips';
import { ListTexts } from '../../../../ui/list/listTexts';

interface CustomProps {
	formSection: FormSectionType;
}

export const PreviewResumeFormValues: React.FC<CustomProps> = ({
	formSection,
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

	const onDeleteChip = ({
		chipKey,
		itemId,
	}: {
		chipKey: string;
		itemId: string;
	}): void => {
		switch (formSection) {
			case 'expertises':
				dispatch(
					deleteExpertiseFromResume({
						expertiseKey: chipKey as ExpertiseKeyType,
						skillId: itemId,
					})
				);
				break;

			default:
				break;
		}
	};

	const onDeleteText = ({
		textKey,
		itemId,
	}: {
		textKey: string;
		itemId: string;
	}): void => {
		console.log(textKey, itemId);
	};

	return (
		<div>
			<ListChips chips={getChipsData()} onDeleteChip={onDeleteChip} />
			<ListTexts texts={getTextsData()} onDeleteText={onDeleteText} />
		</div>
	);
};
