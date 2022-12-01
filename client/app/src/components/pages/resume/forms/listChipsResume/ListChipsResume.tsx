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

interface CustomProps {
	formSection: FormSectionType;
}

export const ListChipsResume: React.FC<CustomProps> = ({ formSection }) => {
	const { resume } = useResume();
	const dispatch = useAppDispatch();

	if (resume === null) {
		return null;
	}

	const getChipsData = (): ObjectKeyListItems[] => {
		switch (formSection) {
			case 'expertises':
				return resume.expertises;

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

	return <ListChips chips={getChipsData()} onDeleteChip={onDeleteChip} />;
};
