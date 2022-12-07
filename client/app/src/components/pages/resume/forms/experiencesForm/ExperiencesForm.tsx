import React, { useState } from 'react';

import { useResume } from '../../../../../hooks/resume';
import { useAppDispatch } from '../../../../../store/hooks';
import { setResume } from '../../../../../store/resume/reducer';

import { isStringEmpty } from '../../../../../helpers';
import {
	Button,
	IconButton,
	InputAdornment,
	TextareaAutosize,
	TextField,
} from '@mui/material';
import { AddCircle, AddCircleOutline, Cancel } from '@mui/icons-material';
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

type ExperiencesFormType = {
	occupiedPosition: string | undefined;
	period: string | undefined;
	place: string | undefined;
	project: string | undefined;
	description: string | undefined;
	achievements: string | undefined;
	stack: string | undefined;
};
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

interface IExperiencesFormInputFieldsProps {
	initialState: ExperiencesFormType;
}

const ExperiencesFormInputFields: React.FC<
	IExperiencesFormInputFieldsProps
> = ({ initialState }) => {
	const [experienceValues, setExperienceValues] =
		useState<ExperiencesFormType>(initialState);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setExperienceValues({ ...experienceValues, [name]: value });
	};

	return (
		<div className='resume-form-container'>
			<TextField
				label='Poste occupé'
				value={experienceValues.occupiedPosition || ''}
				name='occupiedPosition'
				onChange={handleChange}
				helperText='Intitulé du poste'
				variant='standard'
			/>
			<TextField
				label='Période'
				value={experienceValues.period}
				name='period'
				onChange={handleChange}
				variant='standard'
			/>
			<TextField
				label='Lieu'
				value={experienceValues.place || ''}
				name='place'
				onChange={handleChange}
				helperText='Ville, pays ou full-remote'
				variant='standard'
			/>
			<TextField
				label='Projet'
				value={experienceValues.project || ''}
				name='project'
				onChange={handleChange}
				helperText='Lien vers le projet'
				variant='standard'
			/>
			<TextareaAutosize
				name='description'
				value={experienceValues.description || ''}
				onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
					const { value } = event.target;
					setExperienceValues({ ...experienceValues, description: value });
				}}
				minRows={3}
				maxRows={6}
				placeholder='Décrivez la mission globale réalisée'
			/>
			<TextField
				label='Réalisations'
				name='achievements'
				value={experienceValues.achievements || ''}
				onChange={handleChange}
				helperText='Listez les tâches réalisées'
				variant='standard'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<AddCircleOutline
								onClick={(): void => console.log('achievements')}
								className='resume-form--icon'
								color='primary'
							/>
						</InputAdornment>
					),
				}}
			/>
			<TextField
				label='Technologies utilisées'
				name='stack'
				value={experienceValues.stack || ''}
				onChange={handleChange}
				helperText='Ajouter les technos employées'
				variant='standard'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<AddCircleOutline
								onClick={(): void => console.log('stack')}
								className='resume-form--icon'
								color='primary'
							/>
						</InputAdornment>
					),
				}}
			/>
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

	const experienceSelected = resume?.experiences
		? selectedExperienceId
			? resume.experiences.find((exp) => exp.exp_id === selectedExperienceId)
			: resume.experiences[0]
		: undefined;

	const initialExperiencesState: ExperiencesFormType = {
		occupiedPosition: experienceSelected?.occupiedPosition,
		period: experienceSelected?.period,
		place: experienceSelected?.place,
		description: experienceSelected?.description,
		project: experienceSelected?.project,
		achievements: undefined,
		stack: undefined,
	};

	const dispatch = useAppDispatch();

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
	};

	return (
		<div className='resume-form-container'>
			<BoxAddNewExperience onAddExperience={onAddNewExperience} />
			{experienceSelected && (
				<ExperiencesFormInputFields initialState={initialExperiencesState} />
			)}
		</div>
	);
};
