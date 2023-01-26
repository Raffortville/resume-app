import React, { useState } from 'react';
import { useResume } from '../../../../../hooks/resume/';
import { IProfil } from '../../../../../types/store';
import { Button, TextareaAutosize, TextField } from '@mui/material';
import { removeEmptyOrNullKeyValueFromObject } from '../../../../../helpers';
import { updateResumeToDB } from '../../../../../store/resume/actions';
import { DatePickerField } from '../../../../ui/datePicker';

interface IProfileFormInputFieldsProps {
	initialState: IProfil;
	updateResumeProfil: (profil: IProfil) => void;
}

const ProfileFormInputFields: React.FC<IProfileFormInputFieldsProps> = ({
	initialState,
	updateResumeProfil,
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
				value={profileValues.position || ''}
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
				value={profileValues.introduction || ''}
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
				value={profileValues.education?.academy || ''}
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
			<DatePickerField
				period={profileValues.education?.period ?? { start: '', end: '' }}
				label='Année de formations'
				onChangeDate={(period): void => {
					setProfileValues({
						...profileValues,
						education: { ...profileValues.education, period },
					});
				}}
			/>
			<TextField
				label='Diplôme'
				value={profileValues.education?.certificate || ''}
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
				value={profileValues.portfolio || ''}
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
				value={profileValues.socialMedias || ''}
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
				onClick={(): void => updateResumeProfil(profileValues)}
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
	const { resumeProfile, resume } = useResume();

	const onUpdateResumeProfile = async (profil: IProfil): Promise<void> => {
		if (!resume) {
			return;
		}
		const profilFiltred: IProfil | undefined =
			removeEmptyOrNullKeyValueFromObject(profil);

		if (!profilFiltred) {
			return;
		}

		const updatedResume = await updateResumeToDB({
			...resume,
			profil: profilFiltred,
		});
		updatedResume && onSubmitForm();
	};

	return (
		<ProfileFormInputFields
			initialState={{ ...resumeProfile }}
			updateResumeProfil={onUpdateResumeProfile}
		/>
	);
};
