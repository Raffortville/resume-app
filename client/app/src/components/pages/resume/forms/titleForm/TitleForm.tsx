import React, { useState } from 'react';

import { isStringEmpty } from '../../../../../helpers';
import { TextField, Button } from '@mui/material';

import './titleFormStyles.scss';

interface CustomProps {
	onSubmitForm: (title: string) => void;
}

export const TitleForm: React.FC<CustomProps> = ({ onSubmitForm }) => {
	const [title, setTitle] = useState<{ value: string; error?: string }>({
		value: '',
	});

	const handleSubmit = async (): Promise<void> => {
		if (isStringEmpty(title.value)) {
			setTitle({ ...title, error: 'Veuillez remplir le champs' });
			return;
		}
		onSubmitForm(title.value);
	};

	return (
		<div className='title-form'>
			<h1>Donnez un titre à votre CV</h1>
			<div className='title-form--input'>
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
			<Button variant='contained' onClick={handleSubmit}>
				enregistrer
			</Button>
		</div>
	);
};
