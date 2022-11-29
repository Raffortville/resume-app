import React, { useState } from 'react';

import { useAppSelector } from '../../../../../store/hooks';
import { resumeSelector } from '../../../../../store/resume/reducer';
import { IExpertise } from '../../../../../types/store';

import { AddCircleOutline } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';

type ExpertisesFormType = {
	languages: string;
	frameworks: string;
	databases: string;
	services: string;
	control_version: string;
	soft_skills: string;
};

const ExpertisesFormInputFields: React.FC = () => {
	const [expertisesValues, setExpertisesValues] = useState<ExpertisesFormType>({
		languages: '',
		frameworks: '',
		databases: '',
		services: '',
		control_version: '',
		soft_skills: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setExpertisesValues({ ...expertisesValues, [name]: value });
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
								className='resume-form--expertises-icon'
								color='primary'
							/>
						</InputAdornment>
					),
				}}
			/>
			<TextField
				label='Productivité & Controle de version'
				name='control_version'
				value={expertisesValues.control_version}
				onChange={handleChange}
				variant='standard'
				helperText='Git, Assana, Jira, les environements que vous maitrisez'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<AddCircleOutline
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
								className='resume-form--expertises-icon'
								color='primary'
							/>
						</InputAdornment>
					),
				}}
			/>
			<Button className='resume-form-button' variant='contained'>
				ENREGISTRER
			</Button>
		</div>
	);
};

export const ExpertisesForm: React.FC = () => {
	const resume = useAppSelector(resumeSelector);
	const initialExpertisesState: IExpertise = {
		languages: resume?.expertises?.languages || [],
		frameworks: resume?.expertises?.frameworks || [],
		databases: resume?.expertises?.databases || [],
		services: resume?.expertises?.services || [],
		control_version: resume?.expertises?.control_version || [],
		soft_skills: resume?.expertises?.soft_skills || [],
	};
	console.log(initialExpertisesState);
	return <ExpertisesFormInputFields />;
};
