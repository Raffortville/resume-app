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
		</div>
	);
};
