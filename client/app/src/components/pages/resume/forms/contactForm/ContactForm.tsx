import React, { useState } from 'react';
import { useUser } from '../../../../../hooks/user';
import { IUserLite } from '../../../../../types/store';
import { checkIsValidInputFormat } from '../../../../../helpers';
import { Button, TextField } from '@mui/material';

interface CustomProps {
	onSubmitForm: () => void;
}

export const ContactForm: React.FC<CustomProps> = ({ onSubmitForm }) => {
	const { user, updateUser } = useUser();
	const [userValues, setUserValues] = useState<IUserLite>({ ...user });
	const [emailError, setEmailError] = useState<boolean>(false);

	const handleChange = ({
		value,
		name,
	}: {
		value: string;
		name: string;
	}): void => {
		if (name === 'email' && emailError) {
			setEmailError(false);
		}
		setUserValues({ ...userValues, [name]: value });
	};

	const handleSubmit = (): void => {
		const { isEmailValid, isSucces } = updateUser(userValues);
		setEmailError(!isEmailValid);
		isSucces && onSubmitForm();
	};

	return (
		<div className='resume-form-container'>
			<TextField
				label='Nom'
				type='text'
				value={userValues?.lastName || ''}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					if (checkIsValidInputFormat(e.target.value, 'text')) {
						handleChange({ value: e.target.value, name: 'lastName' });
					}
				}}
				variant='standard'
			/>
			<TextField
				label='Prénom'
				type='text'
				value={userValues?.firstName || ''}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					if (checkIsValidInputFormat(e.target.value, 'text')) {
						handleChange({ value: e.target.value, name: 'firstName' });
					}
				}}
				variant='standard'
			/>
			<TextField
				label='Email'
				type='email'
				value={userValues?.emailPro || ''}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleChange({ value: e.target.value, name: 'emailPro' });
				}}
				variant='standard'
				error={emailError}
				helperText={
					emailError && "'Veuillez remplir le champs avec email correct'"
				}
			/>
			<TextField
				label='Ville'
				type='text'
				value={userValues?.city || ''}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					if (checkIsValidInputFormat(e.target.value, 'text')) {
						handleChange({ value: e.target.value, name: 'city' });
					}
				}}
				variant='standard'
			/>
			<TextField
				label='Pays'
				type='text'
				value={userValues?.country || ''}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					if (checkIsValidInputFormat(e.target.value, 'text')) {
						handleChange({ value: e.target.value, name: 'country' });
					}
				}}
				variant='standard'
			/>
			<TextField
				label='Téléphone'
				type='tel'
				value={userValues?.phone || ''}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					if (checkIsValidInputFormat(e.target.value, 'number')) {
						handleChange({ value: e.target.value, name: 'phone' });
					}
				}}
				variant='standard'
			/>
			<Button
				onClick={handleSubmit}
				className='resume-form-button'
				variant='contained'>
				ENREGISTRER
			</Button>
		</div>
	);
};
