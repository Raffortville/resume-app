import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../../../store/hooks';
import { alertSelector } from '../../../../store/alert/reducer';
import { IUserLite } from '../../../../store/types';
import { updateUserToDB } from '../../../../store/user/actions';
import { checkIsValidInputFormat } from '../../../../helpers';

import { Button, TextField } from '@mui/material';
import { FormSkeleton } from '../../../layout/form/FormSkeleton';
import { ToastAlert } from '../../../ui/toastAlert';

import './contactFormStyles.scss';

interface IContactFormInputFieldsProps {
	userValues: IUserLite;
	onChange: ({ value, name }: { value: string; name: string }) => void;
	onSubmit: () => void;
	isEmailNoValid?: boolean;
}

const ContactFormInputFields: React.FC<IContactFormInputFieldsProps> = ({
	userValues,
	onChange,
	onSubmit,
	isEmailNoValid,
}) => {
	return (
		<div className='form'>
			<TextField
				label='Nom'
				type='text'
				value={userValues?.lastName}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					if (checkIsValidInputFormat(e.target.value, 'text')) {
						onChange({ value: e.target.value, name: 'lastName' });
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
						onChange({ value: e.target.value, name: 'firstName' });
					}
				}}
				variant='standard'
			/>
			<TextField
				label='Email'
				type='email'
				value={userValues?.emailPro}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					onChange({ value: e.target.value, name: 'emailPro' });
				}}
				variant='standard'
				error={isEmailNoValid}
				helperText={
					isEmailNoValid && "'Veuillez remplir le champs avec email correct'"
				}
			/>
			<TextField
				label='Ville'
				type='text'
				value={userValues?.city}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					if (checkIsValidInputFormat(e.target.value, 'text')) {
						onChange({ value: e.target.value, name: 'city' });
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
						onChange({ value: e.target.value, name: 'country' });
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
						onChange({ value: e.target.value, name: 'phone' });
					}
				}}
				variant='standard'
			/>
			<Button onClick={onSubmit} className='form-button' variant='contained'>
				ENREGISTRER
			</Button>
		</div>
	);
};

interface IContactFormContainerProps {
	initialState: IUserLite;
}

export const ContactFormContainer: React.FC<IContactFormContainerProps> = ({
	initialState,
}) => {
	const [userValues, setUserValues] = useState<IUserLite>(initialState);
	const [emailError, setEmailError] = useState<boolean>(false);

	const navigate = useNavigate();
	const alert = useAppSelector(alertSelector);

	const onNavigateToNextFormPage = (): void => {
		navigate('/resume_form/create/profile');
	};

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
		if (!emailPro && !lastName && !firstName && !phone && !country && !city) {
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
		onNavigateToNextFormPage();
	};

	return (
		<>
			{alert !== null && (
				<ToastAlert
					isOpen={alert !== null}
					message={alert?.message ?? ''}
					severity={alert?.type ?? 'info'}
				/>
			)}
			<div className='contact-form'>
				<FormSkeleton
					title='contact'
					children={
						<ContactFormInputFields
							userValues={userValues}
							onChange={handleChange}
							onSubmit={handleSubmit}
							isEmailNoValid={emailError}
						/>
					}
					hasNextButton
					onNavigateButtonClick={onNavigateToNextFormPage}
				/>
			</div>
		</>
	);
};
