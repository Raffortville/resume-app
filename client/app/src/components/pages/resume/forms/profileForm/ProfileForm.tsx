import React, { useState } from 'react';

import { TextareaAutosize, TextField } from '@mui/material';
import { IProfil } from '../../../../../store/types';
import { checkIsValidInputFormat } from '../../../../../helpers';

export const ProfileForm: React.FC = () => {
	const [profileValues, setProfileValues] = useState<IProfil>({
		position: '',
		portfolio: '',
		socialMedias: '',
		education: { academy: '', period: '', certificate: '' },
	});

	const handleChange = ({
		name,
		value,
	}: {
		name: string;
		value: string;
	}): void => {
		setProfileValues({ ...profileValues, [name]: value });
	};

	return (
		<div className='resume-form-container'>
			<TextField
				label='Position'
				value={profileValues.position}
				name='position'
				onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
					const { value, name } = e.target;
					if (checkIsValidInputFormat(value, 'text')) {
						handleChange({ value, name });
					}
				}}
				helperText='Titre du cv'
				variant='standard'
			/>
			<TextareaAutosize
				name='introduction'
				minRows={3}
				maxRows={6}
				placeholder='Présentez-vous en quelques mots'
				onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
					const { name, value } = event.target;
					handleChange({ value, name });
				}}
			/>
			<TextField
				label='Académie'
				value={profileValues.education?.academy}
				onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
					const { value } = e.target;
					setProfileValues({
						...profileValues,
						education: { ...profileValues.education, academy: value },
					});
				}}
				variant='standard'
				helperText='Ecole, centre de formation, université...'
			/>
			<TextField
				label='Periode'
				value={profileValues.education?.period}
				onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
					const { value } = e.target;
					setProfileValues({
						...profileValues,
						education: { ...profileValues.education, period: value },
					});
				}}
				variant='standard'
				helperText='Année de formations'
			/>
			<TextField
				label='Diplôme'
				value={profileValues.education?.certificate}
				onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
					const { value } = e.target;
					setProfileValues({
						...profileValues,
						education: { ...profileValues.education, certificate: value },
					});
				}}
				variant='standard'
				helperText='Certificats, parcours diplomant'
			/>
			<TextField
				label='Portfolio'
				value={profileValues.portfolio}
				name='portfolio'
				onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
					const { value, name } = e.target;
					if (checkIsValidInputFormat(value, 'text')) {
						handleChange({ value, name });
					}
				}}
				helperText='Portfolio / Website / répo GIT'
				variant='standard'
			/>
			<TextField
				label='Réseau social'
				value={profileValues.portfolio}
				name='socialMedias'
				onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
					const { value, name } = e.target;
					if (checkIsValidInputFormat(value, 'text')) {
						handleChange({ value, name });
					}
				}}
				variant='standard'
				helperText='Lien LinkedIn,...'
			/>
		</div>
	);
};
