import React, { useEffect, useState } from 'react';

import { useResume } from '../../../../../hooks/resume';
import { updateUserToDB } from '../../../../../store/user/actions';
import { IBaseUser } from '../../../../../types/store';
import {
	checkIsValidInputFormat,
	removeEmptyOrNullKeyValueFromObject,
} from '../../../../../helpers';
import { Button, TextField } from '@mui/material';

interface IContactFormInputFieldProps {
	initialState: IBaseUser;
	onSubmitForm: (userValues: IBaseUser) => void;
}

const ContactFormInputFields: React.FC<IContactFormInputFieldProps> = ({
	initialState,
	onSubmitForm,
}) => {
	const [userValues, setUserValues] = useState<IBaseUser>(initialState);
	const [emailError, setEmailError] = useState<boolean>(false);

	useEffect(() => {
		setUserValues(initialState);
	}, [initialState]);

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

	const handleSubmit = () => {
		const { emailPro } = userValues;
		if (!emailPro || emailPro === '') {
			return;
		}
		const isEmailValid = checkIsValidInputFormat(emailPro, 'email');
		setEmailError(!isEmailValid);
		onSubmitForm(userValues);
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

interface IContactFormProps {
	onSubmitForm: () => void;
}

export const ContactForm: React.FC<IContactFormProps> = ({ onSubmitForm }) => {
	const { resumeContact } = useResume();
	const initialResumeContact = { ...resumeContact };

	const updateUser = async (userValues: IBaseUser): Promise<void> => {
		const userFiltred: IBaseUser | undefined =
			removeEmptyOrNullKeyValueFromObject(userValues);
		if (!userFiltred) {
			return;
		}
		const userUpdated = await updateUserToDB({
			...userFiltred,
			_id: resumeContact?._id,
		});
		if (userUpdated) {
			onSubmitForm();
		}
	};

	return (
		<ContactFormInputFields
			initialState={initialResumeContact}
			onSubmitForm={updateUser}
		/>
	);
};
