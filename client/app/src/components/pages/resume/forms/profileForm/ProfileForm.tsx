import React, { useState } from 'react';

import { TextareaAutosize, TextField } from '@mui/material';
import { IProfil } from '../../../../../store/types';
import { checkIsValidInputFormat } from '../../../../../helpers';

// position?: string;
// 	introduction?: string;
// 	portfolio?: string;
// 	socialMedias?: string;
// 	expertises?: IExpertise[];
// 	softSkills?: ObjKeyValueType[];
// 	education?: IEducation;

export const ProfileForm: React.FC = () => {
	const [profileValues, setProfileValues] = useState<IProfil>({
		position: undefined,
		portfolio: undefined,
		socialMedias: undefined,
		expertises: undefined,
		softSkills: undefined,
		education: undefined,
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
		</div>
	);
};
