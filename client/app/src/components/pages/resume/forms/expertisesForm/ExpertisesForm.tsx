import React, { useState } from 'react';

import { AddCircleOutline } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';
import { useAppDispatch } from '../../../../../store/hooks';
import { addExpertiseToResume } from '../../../../../store/resume/reducer';
import { ExpertiseKeyType } from '../../../../../types/store';
import { useResume } from '../../../../../hooks/resume';
import { updateResumeToDB } from '../../../../../store/resume/actions';

type ExpertisesFormType = {
	languages: string;
	frameworks: string;
	databases: string;
	services: string;
	control_version: string;
	productivity: string;
	soft_skills: string;
};

interface IExpertisesFormInputFieldsProps {
	initialState: ExpertisesFormType;
	onAddExpertiseSkill: (expertiseKey: ExpertiseKeyType, value: string) => void;
	onUpdateResume: () => void;
}

const ExpertisesFormInputFields: React.FC<IExpertisesFormInputFieldsProps> = ({
	initialState,
	onAddExpertiseSkill,
	onUpdateResume,
}) => {
	const [expertisesValues, setExpertisesValues] =
		useState<ExpertisesFormType>(initialState);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setExpertisesValues({ ...expertisesValues, [name]: value });
	};

	const onIconAddClick = (expertiseKey: ExpertiseKeyType) => {
		onAddExpertiseSkill(
			expertiseKey,
			expertisesValues[expertiseKey as keyof ExpertisesFormType]
		);
		setExpertisesValues({
			...expertisesValues,
			[expertiseKey as keyof ExpertisesFormType]: '',
		});
	};

	return (
		<div className='resume-form-container'>
			<TextField
				label='Languages informatiques'
				name='languages'
				value={expertisesValues.languages}
				onChange={handleChange}
				variant='standard'
				helperText='Saisir vos languages maîtrisés et cliquer pour ajouter'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<AddCircleOutline
								onClick={(): void => {
									onIconAddClick('languages');
								}}
								className='resume-form--expertises-icon'
								color='primary'
							/>
						</InputAdornment>
					),
				}}
			/>
			<TextField
				label='Frameworks'
				name='frameworks'
				value={expertisesValues.frameworks}
				onChange={handleChange}
				variant='standard'
				helperText='Saisir vos frameworks maîtrisés et cliquer pour ajouter'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<AddCircleOutline
								onClick={(): void => onIconAddClick('frameworks')}
								className='resume-form--expertises-icon'
								color='primary'
							/>
						</InputAdornment>
					),
				}}
			/>
			<TextField
				label='Base de données'
				name='databases'
				value={expertisesValues.databases}
				onChange={handleChange}
				variant='standard'
				helperText='Saisir les bases de données maîtrisés et cliquer pour ajouter'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<AddCircleOutline
								onClick={(): void => onIconAddClick('databases')}
								className='resume-form--expertises-icon'
								color='primary'
							/>
						</InputAdornment>
					),
				}}
			/>
			<TextField
				label='Services'
				name='services'
				value={expertisesValues.services}
				onChange={handleChange}
				variant='standard'
				helperText='Services, cloud, micro-services, etc..'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<AddCircleOutline
								onClick={(): void => onIconAddClick('services')}
								className='resume-form--expertises-icon'
								color='primary'
							/>
						</InputAdornment>
					),
				}}
			/>
			<TextField
				label='Controle de version'
				name='control_version'
				value={expertisesValues.control_version}
				onChange={handleChange}
				variant='standard'
				helperText='Git, etc..'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<AddCircleOutline
								onClick={(): void => onIconAddClick('control_version')}
								className='resume-form--expertises-icon'
								color='primary'
							/>
						</InputAdornment>
					),
				}}
			/>
			<TextField
				label='Productivité'
				name='productivity'
				value={expertisesValues.productivity}
				onChange={handleChange}
				variant='standard'
				helperText='Jira, assana, etc...'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<AddCircleOutline
								onClick={(): void => onIconAddClick('productivity')}
								className='resume-form--expertises-icon'
								color='primary'
							/>
						</InputAdornment>
					),
				}}
			/>
			<TextField
				label='Soft skills'
				name='soft_skills'
				value={expertisesValues.soft_skills}
				onChange={handleChange}
				variant='standard'
				helperText='Décrire vos softs skills et cliquer pour ajouter'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<AddCircleOutline
								onClick={(): void => onIconAddClick('soft_skills')}
								className='resume-form--expertises-icon'
								color='primary'
							/>
						</InputAdornment>
					),
				}}
			/>
			<Button
				onClick={onUpdateResume}
				className='resume-form-button'
				variant='contained'>
				ENREGISTRER
			</Button>
		</div>
	);
};

interface CustomProps {
	onSubmitForm: () => void;
}

export const ExpertisesForm: React.FC<CustomProps> = ({ onSubmitForm }) => {
	const { resume } = useResume();
	const dispatch = useAppDispatch();
	const initialExpertisesValues: ExpertisesFormType = {
		languages: '',
		frameworks: '',
		databases: '',
		services: '',
		control_version: '',
		productivity: '',
		soft_skills: '',
	};

	const addExpertisesSkill = (
		expertiseKey: ExpertiseKeyType,
		value: string
	) => {
		dispatch(
			addExpertiseToResume({
				expertiseKey,
				skill: {
					id: new Date().toString(),
					value: value,
				},
			})
		);
	};

	const updateResume = async (): Promise<void> => {
		if (resume === null) {
			return;
		}
		const updatedResume = await updateResumeToDB(resume);
		updatedResume && onSubmitForm();
	};

	return (
		<ExpertisesFormInputFields
			initialState={initialExpertisesValues}
			onAddExpertiseSkill={addExpertisesSkill}
			onUpdateResume={updateResume}
		/>
	);
};
