import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createResumeToDB } from '../../../../store/resume/actions';
import { isStringEmpty } from '../../../../helpers';
import { Button, TextField } from '@mui/material';

import './resumeCreateStyles.scss';

interface IResumeCreateFormProps {
	onSubmitForm: (title: string) => void;
}

const ResumeCreateForm: React.FC<IResumeCreateFormProps> = ({
	onSubmitForm,
}) => {
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
			<Button variant='contained' onClick={handleSubmit}>
				créer
			</Button>
		</div>
	);
};

export const ResumeCreateContainer: React.FC = () => {
	const navigate = useNavigate();

	const createResume = async (title: string): Promise<void> => {
		const createdResume = await createResumeToDB({ title });
		createdResume &&
			navigate(`/resume/form/${createdResume._id}`, {
				state: { resumeId: createdResume._id },
				replace: true,
			});
	};
	return <ResumeCreateForm onSubmitForm={createResume} />;
};
