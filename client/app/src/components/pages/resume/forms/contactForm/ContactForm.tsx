import React, { useState } from 'react';

import { useAppSelector } from '../../../../../store/hooks';
import { userSelector } from '../../../../../store/user/reducer';
import { IUserLite } from '../../../../../types/store';
import { updateUserToDB } from '../../../../../store/user/actions';
import { checkIsValidInputFormat, isStringEmpty } from '../../../../../helpers';

import { Button, TextField } from '@mui/material';

interface CustomProps {
	onSubmitForm: () => void;
}

export const ContactForm: React.FC<CustomProps> = ({ onSubmitForm }) => {
	const user = useAppSelector(userSelector);
	const [userValues, setUserValues] = useState<IUserLite>({
		_id: user?._id || '',
		emailPro: user?.emailPro || '',
		lastName: user?.lastName || '',
		firstName: user?.firstName || '',
		city: user?.city || '',
		country: user?.country || '',
		phone: user?.phone || '',
	});
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

	const handleSubmit = async (): Promise<void> => {
		const { emailPro, lastName, firstName, phone, country, city } = userValues;
		if (
			isStringEmpty(emailPro) &&
			isStringEmpty(lastName) &&
			isStringEmpty(firstName) &&
			isStringEmpty(phone) &&
			isStringEmpty(country) &&
			isStringEmpty(city)
		) {
			return;
		}

		if (emailPro !== undefined && emailPro !== '') {
			const isEmailValid = checkIsValidInputFormat(emailPro, 'email');
			setEmailError(!isEmailValid);
			if (!isEmailValid) {
				return;
			}
		}
		await updateUserToDB(userValues);
		onSubmitForm();
	};

	return (
		<div className='resume-form-container'>
			<TextField
				label='Nom'
				type='text'
				value={userValues?.lastName}
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
				value={userValues?.firstName}
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
				value={userValues?.emailPro}
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
				value={userValues?.city}
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
				value={userValues?.country}
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
				value={userValues?.phone}
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
