import React, { useEffect, useState } from 'react';

import { IUser, IUserLite, UserType } from '../../../../store/types';
import { TextField } from '@mui/material';
import { FormSkeleton } from '../../../layout/form/FormSkeleton';

import './contactFormStyles.scss';

// email: string;
// 	uid: string;
// 	_id?: string;
// 	password?: string;
// 	userName?: string;
// 	emailPro?: String;
// 	firstName?: String;
// 	lastName?: String;
// 	city?: string;
// 	phone?: string;
// 	country?: string;

interface IContactFormInputFieldsProps {
	userValues: IUserLite;
	onChange: ({ value, name }: { value: string; name: string }) => void;
}

const ContactFormInputFields: React.FC<IContactFormInputFieldsProps> = ({
	userValues,
	onChange,
}) => {
	return (
		<div className='form'>
			<TextField
				label='Nom'
				type='text'
				value={userValues?.lastName}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					onChange({ value: e.target.value, name: 'lastName' })
				}
				variant='standard'
			/>
			<TextField
				label='Prénom'
				type='text'
				value={userValues?.firstName}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					onChange({ value: e.target.value, name: 'firstName' })
				}
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
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					onChange({ value: e.target.value, name: 'city' })
				}
				variant='standard'
			/>
			<TextField
				label='Pays'
				type='text'
				value={userValues?.country}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					onChange({ value: e.target.value, name: 'country' })
				}
				variant='standard'
			/>
			<TextField
				label='Téléphone'
				type='tel'
				value={userValues?.phone}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					onChange({ value: e.target.value, name: 'phone' })
				}
				variant='standard'
			/>
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
					/>
				}
				hasBackButton
				hasNextButton
			/>
		</div>
	);
};
