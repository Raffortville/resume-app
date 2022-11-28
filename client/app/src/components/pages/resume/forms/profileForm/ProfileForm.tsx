import React, { useState } from 'react';

import { IProfil } from '../../../../../store/types';

import { Button, TextareaAutosize, TextField } from '@mui/material';
import { useAppSelector } from '../../../../../store/hooks';
import { resumeSelector } from '../../../../../store/resume/reducer';
import { updateResumeToDB } from '../../../../../store/resume/actions';

interface CustomProps {
	initialState: IProfil;
	onSubmit: (profil: IProfil) => void;
}

const ProfileFormInputFields: React.FC<CustomProps> = ({
	initialState,
	onSubmit,
}) => {
	const [profileValues, setProfileValues] = useState<IProfil>(initialState);

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
					handleChange({ value, name });
				}}
				helperText='Titre de votre profil professionnel'
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
					handleChange({ value, name });
				}}
				helperText='Portfolio / Website / répo GIT'
				variant='standard'
			/>
			<TextField
				label='Réseau social'
				value={profileValues.socialMedias}
				name='socialMedias'
				onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
					const { value, name } = e.target;
					handleChange({ value, name });
				}}
				variant='standard'
				helperText='Lien LinkedIn,...'
			/>
			<Button
				className='resume-form-button'
				onClick={(): void => onSubmit(profileValues)}
				variant='contained'>
				ENREGISTRER
			</Button>
		</div>
	);
};

interface IProfilFormProps {
	onSubmitForm: () => void;
}

export const ProfileForm: React.FC<IProfilFormProps> = ({ onSubmitForm }) => {
	const resume = useAppSelector(resumeSelector);

	const profileInitialState: IProfil = {
		position: resume?.profil?.position || '',
		portfolio: resume?.profil?.portfolio || '',
		socialMedias: resume?.profil?.socialMedias || '',
		education: {
			academy: resume?.profil?.education?.academy || '',
			period: resume?.profil?.education?.period || '',
			certificate: resume?.profil?.education?.certificate || '',
		},
	};

	const handleSubmit = async (profil: IProfil): Promise<void> => {
		if (!resume?.userId) {
			return;
		}
		await updateResumeToDB({ ...resume, profil });
		onSubmitForm();
	};

	return (
		<ProfileFormInputFields
			initialState={profileInitialState}
			onSubmit={handleSubmit}
		/>
	);
};
