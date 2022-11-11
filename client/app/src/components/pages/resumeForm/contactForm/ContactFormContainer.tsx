import React, { useState } from 'react';

import { IUserLite } from '../../../../store/types';
import { Button, TextField } from '@mui/material';
import { FormSkeleton } from '../../../layout/form/FormSkeleton';

import './contactFormStyles.scss';
import { checkIsValidInputFormat } from '../../../../helpers';

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
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					onChange({ value: e.target.value, name: 'emailPro' })
				}
				variant='standard'
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
				error={isEmailNoValid}
				helperText={isEmailNoValid && "L'email saisi n'est pas conform"}
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

	const handleChange = ({
		value,
		name,
	}: {
		value: string;
		name: string;
	}): void => {
		setUserValues({ ...userValues, [name]: value });
	};

	return (
		<div className='contact-form'>
			<FormSkeleton
				title='contact'
				children={
					<ContactFormInputFields
						userValues={userValues}
						onChange={handleChange}
						onSubmit={() => console.log(userValues)}
					/>
				}
				hasBackButton
				hasNextButton
			/>
		</div>
	);
};
