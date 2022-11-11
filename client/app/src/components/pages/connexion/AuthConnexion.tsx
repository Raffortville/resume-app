import React, { useEffect, useState } from 'react';

import { useAppSelector } from '../../../store/hooks';
import { alertSelector } from '../../../store/alert/reducer';
import { checkIsValidInputFormat, isStringEmpty } from '../../../helpers';
import { logIn, signUp } from '../../../store/user/actions';
import { Button, TextField } from '@mui/material';
import { ToastAlert } from '../../ui/toastAlert';

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
	const alert = useAppSelector(alertSelector);

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
					!checkIsValidInputFormat(field.value, 'email');
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

		if (!isFormValid) {
			return;
		}

		if (keyForm === 'signUp') {
			const [username, email, password] = formFields;
			return signUp({
				email: email.value,
				password: password.value,
				userName: username.value,
			});
		}

		const [email, password] = formFields;
		return logIn({
			payload: { email: email.value, password: password.value },
			isFirstLogin: false,
		});
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
					required={field.key !== 'username'}
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
		<>
			{alert !== null && (
				<ToastAlert
					isOpen={alert !== null}
					message={alert?.message ?? ''}
					severity={alert?.type ?? 'info'}
				/>
			)}

			<form className='form' onMouseLeave={resetErrorsField}>
				<div>{renderFormFields()}</div>
				<Button onClick={handleSubmit} variant='contained' fullWidth>
					{keyForm === 'login' ? 'connecter' : 'enregistrer'}
				</Button>
			</form>
		</>
	);
};
