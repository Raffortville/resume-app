import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { checkIsValidInputFormat, isStringEmpty } from '../../../helpers';
import { logIn, signUp, saveUserToDb } from '../../../store/user/userStore';
import { Button, TextField } from '@mui/material';

import './authConnexion.scss';

type FormFieldType = {
	key: string;
	label: string;
	inputType: string;
	value: string;
	hasError: boolean;
	errorText?: string;
};

type SignUpAndLoginFormType = 'signUp' | 'login';

interface ISignUpAndLoginFormProps {
	keyForm: SignUpAndLoginFormType;
}

const initialFormLoginState: FormFieldType[] = [
	{
		key: 'email',
		label: 'Email',
		inputType: 'email',
		value: '',
		hasError: false,
	},
	{
		key: 'password',
		label: 'Mot de passe',
		inputType: 'password',
		value: '',
		hasError: false,
	},
];

const initialFormSignupState: FormFieldType[] = [
	{
		key: 'username',
		label: "Nom d'utilisateur",
		inputType: 'text',
		value: '',
		hasError: false,
	},
	{
		key: 'email',
		label: 'Email',
		inputType: 'email',
		value: '',
		hasError: false,
	},
	{
		key: 'password',
		label: 'Mot de passe',
		inputType: 'password',
		value: '',
		hasError: false,
	},
];

export const AuthConnexion: React.FC<ISignUpAndLoginFormProps> = ({
	keyForm,
}) => {
	const [formFields, setFormFields] = useState<FormFieldType[]>(
		initialFormLoginState
	);

	const navigate = useNavigate();

	useEffect(() => {
		if (keyForm === 'signUp') {
			setFormFields(initialFormSignupState);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keyForm]);

	const handleChange = (e: React.FormEvent<EventTarget>): void => {
		const { value, name } = e.target as HTMLInputElement;
		setFormFields(
			formFields.map((field) => {
				if (field.key === name) {
					return {
						...field,
						value: value,
						hasError: false,
						errorText: undefined,
					};
				}
				return field;
			})
		);
	};

	const handleErrors = (): boolean => {
		const formFieldsErrors = [...formFields].map((field) => {
			if (field.key === 'username') {
				const hasError: boolean =
					isStringEmpty(field.value) ||
					checkIsValidInputFormat(field.value, 'email');
				return {
					...field,
					hasError,
					errorText: hasError
						? 'Veuillez remplir le champs avec un email correct'
						: undefined,
				};
			}
			if (field.key === 'password') {
				const hasError: boolean =
					isStringEmpty(field.value) ||
					checkIsValidInputFormat(field.value, 'password');
				return {
					...field,
					hasError,
					errorText: hasError
						? 'Veuillez remplir le champs avec un mot de passe de 7 lettres minimum'
						: undefined,
				};
			}
			if (field.key === 'email') {
				const hasError: boolean =
					isStringEmpty(field.value) ||
					checkIsValidInputFormat(field.value, 'email');
				return {
					...field,
					hasError,
					errorText: hasError
						? 'Veuillez remplir le champs avec email correct'
						: undefined,
				};
			}
			return field;
		});
		setFormFields([...formFieldsErrors]);

		return formFieldsErrors.every((field) => !field.hasError);
	};

	const resetErrorsField = (): void => {
		const isValidForm = handleErrors();

		if (!isValidForm) {
			setFormFields(
				formFields.map((field) => {
					if (field.hasError) {
						return {
							...field,
							hasError: false,
							errorText: undefined,
							value: '',
						};
					}
					return field;
				})
			);
		}
	};

	const handleSubmit = () => {
		const isFormValid = handleErrors();
		console.log(isFormValid);
	};

	const renderFormFields = (): React.ReactNode => {
		return formFields.map((field) => {
			return (
				<TextField
					key={field.key}
					label={field.label}
					type={field.inputType}
					value={field.value}
					name={field.key}
					onChange={handleChange}
					required
					variant='standard'
					fullWidth
					size='small'
					margin='dense'
					error={field.hasError}
					helperText={field.errorText}
				/>
			);
		});
	};

	return (
		<form className='form' onMouseLeave={resetErrorsField}>
			<div>{renderFormFields()}</div>
			<Button
				className='form-button'
				onClick={handleSubmit}
				variant='contained'
				fullWidth>
				{keyForm === 'login' ? 'connecter' : 'enregistrer'}
			</Button>
		</form>
	);
};
