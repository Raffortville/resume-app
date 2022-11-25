import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createResumeToDB } from '../../../../store/resume/actions';
import { isStringEmpty } from '../../../../helpers';
import { Button, TextField } from '@mui/material';

import './resumeCreateStyles.scss';

export const ResumeCreateContainer: React.FC = () => {
	const [title, setTitle] = useState<{ value: string; error?: string }>({
		value: '',
	});
	const navigate = useNavigate();

	const createResume = async (): Promise<void> => {
		if (isStringEmpty(title.value)) {
			setTitle({ ...title, error: 'Veuillez remplir le champs' });
			return;
		}
		const createdResume = await createResumeToDB({ title: title.value });
		createdResume &&
			navigate(`/resume/form/${createdResume._id}`, { replace: true });
	};

	return (
		<div className='resume-create'>
			<h1>Donnez un titre à votre CV</h1>
			<div className='resume-create--input'>
				<TextField
					label='Titre'
					value={title.value}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setTitle({ value: e.target.value })
					}
					onFocus={() => {
						title.error && setTitle({ ...title, error: undefined });
					}}
					required
					placeholder='Titre, nom du cv'
					error={!!title.error}
					helperText={title.error}
					fullWidth
					variant='standard'
				/>
			</div>
			<Button variant='contained' onClick={createResume}>
				créer
			</Button>
		</div>
	);
};
