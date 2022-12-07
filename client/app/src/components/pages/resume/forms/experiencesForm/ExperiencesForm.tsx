import React, { useState } from 'react';

import { useResume } from '../../../../../hooks/resume';
import { useAppDispatch } from '../../../../../store/hooks';
import { setResume } from '../../../../../store/resume/reducer';

import { isStringEmpty } from '../../../../../helpers';
import { Button, IconButton, TextField } from '@mui/material';
import { AddCircle, Cancel } from '@mui/icons-material';
import { BoxLabelAction } from '../../../../ui/boxes/boxLabelAction';

// exp_id: string;
// 	company: string;
// 	period: string;
// 	place: string;
// 	occupiedPosition: string;
// 	description: string;
// 	project: string;
// 	achievements: ObjectKeyListItems[];
// 	stack: ObjectKeyListItems[];

interface IBoxAddNewExperienceProps {
	onAddExperience: (companyValue: string) => void;
}

type CompanyFormType = {
	value: string | undefined;
	errorText: string | undefined;
};

const initialState: CompanyFormType = {
	value: undefined,
	errorText: undefined,
};

const BoxAddNewExperience: React.FC<IBoxAddNewExperienceProps> = ({
	onAddExperience,
}) => {
	const [company, setCompany] = useState<CompanyFormType>(initialState);
	const [openTextField, setOpenTextField] = useState<boolean>(false);

	const getBoxLabelActionIcon = (): React.ReactNode => {
		const onIconClick = (): void => {
			setCompany(initialState);
			setOpenTextField(!openTextField);
		};

		return (
			<IconButton onClick={onIconClick}>
				{openTextField ? (
					<Cancel style={{ color: '#303952' }} />
				) : (
					<AddCircle style={{ color: '#303952' }} />
				)}
			</IconButton>
		);
	};

	const getBoxLabelText = (): string => {
		return openTextField ? 'Annuler' : 'Ajouter une expérience';
	};

	const handleAddExperience = (): void => {
		if (!company.value || isStringEmpty(company?.value)) {
			setCompany({ ...company, errorText: 'Veuillez remplir le champs' });
			return;
		}
		onAddExperience(company.value);
		setOpenTextField(false);
	};

	return (
		<>
			<BoxLabelAction
				label={getBoxLabelText()}
				icon={getBoxLabelActionIcon()}
				styles={{
					container: {
						alignItems: 'center',
						justifyContent: 'space-between',
						backgroundColor: 'whitesmoke',
						color: '#303952',
						border: '1px solid #303952',
					},
				}}
			/>
			{openTextField && (
				<>
					<TextField
						label="Nom de l'entrepise"
						value={company?.value || ''}
						name='position'
						onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
							setCompany({ value: e.target.value, errorText: undefined })
						}
						required
						variant='standard'
						error={!!company.errorText}
						helperText={company.errorText}
					/>
					<Button
						className='resume-form-button'
						onClick={handleAddExperience}
						variant='contained'>
						AJOUTER
					</Button>
				</>
			)}
		</>
	);
};

const ExperiencesFormInputFields: React.FC = () => {
	return (
		<div className='resume-form-container'>
			<Button
				className='resume-form-button'
				onClick={(): void => console.log('test')}
				variant='contained'>
				ENREGISTRER
			</Button>
		</div>
	);
};

interface IExperiencesFormProps {
	selectedExperienceId: string | undefined;
}

export const ExperiencesForm: React.FC<IExperiencesFormProps> = ({
	selectedExperienceId,
}) => {
	const { resume } = useResume();
	const [openForm, setOpenForm] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	console.log(selectedExperienceId);

	const onAddNewExperience = (companyValue: string) => {
		if (!resume) {
			return;
		}
		const experiencesCopy = resume.experiences ?? [];
		dispatch(
			setResume({
				...resume,
				experiences: [
					...experiencesCopy,
					{ exp_id: Date.now().toString(), company: companyValue },
				],
			})
		);
		setOpenForm(true);
	};

	return (
		<div className='resume-form-container'>
			<BoxAddNewExperience onAddExperience={onAddNewExperience} />
			{openForm && <ExperiencesFormInputFields />}
		</div>
	);
};
