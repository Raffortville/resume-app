import React, { useState } from 'react';

import { AddCircleOutline } from '@mui/icons-material';
import { Button, InputAdornment, TextField } from '@mui/material';

type ExpertisesFormType = {
	languages: string;
	frameworks: string;
	databases: string;
	services: string;
	control_version: string;
	productivity: string;
	soft_skills: string;
};

const ExpertisesFormInputFields: React.FC = () => {
	const [expertisesValues, setExpertisesValues] = useState<ExpertisesFormType>({
		languages: '',
		frameworks: '',
		databases: '',
		services: '',
		control_version: '',
		productivity: '',
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
	return <ExpertisesFormInputFields />;
};
