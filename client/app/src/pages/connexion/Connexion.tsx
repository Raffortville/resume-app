import { Button, TextField } from '@mui/material';
import React from 'react';
import { SwitchSections } from '../../components/ui/switchSections';
import { ISectionItemProps } from '../../types';

import './connexion.scss';

type SignUpAndLoginFormType = 'signUp' | 'login';

interface ISignUpAndLoginFormProps {
	keyForm: SignUpAndLoginFormType;
}

export const SignUpAndLoginForm: React.FC<ISignUpAndLoginFormProps> = ({
	keyForm,
}) => {
	return (
		<form className='form'>
			{keyForm === 'signUp' && (
				<TextField
					label="Nom d'utilisateur"
					type='text'
					value={''}
					required
					variant='standard'
					error={false}
					helperText={false && 'At least 2 characters'}
					size='small'
					margin='dense'
					// onChange={(e) => {
					// 	setUser({ ...user, userName: e.target.value });
					// 	if (e.target.value.length <= 1) setErrorUserName(true);
					// 	else setErrorUserName(false);
					// }}
				/>
			)}

			<TextField
				label='Email'
				type='email'
				value={''}
				required
				variant='standard'
				error={false}
				helperText={false && 'Not valid email format'}
				size='small'
				margin='dense'
				// onChange={(e) => {
				// 	setUser({ ...user, email: e.target.value });
				// 	if (!checkInputFormat(user.email, 'email')) setErrorEmail(true);
				// 	else setErrorEmail(false);
				// }}
			/>

			<TextField
				label='Mot de passe'
				type='password'
				value={''}
				required
				variant='standard'
				error={false}
				helperText={false && 'At least 6 characteres'}
				size='small'
				margin='dense'
				// onChange={(e) => {
				// 	setUser({ ...user, password: e.target.value });
				// 	if (!checkInputFormat(e.target.value, 'password'))
				// 		setErrorPassword(true);
				// 	else setErrorPassword(false);
				// }}
			/>

			<Button
				className='form-button'
				variant='contained'
				color='primary'
				disabled={false}>
				{keyForm === 'login' ? 'connecter' : 'enregistrer'}
			</Button>
		</form>
	);
};

export const ConnexionPage: React.FC = () => {
	const sectionItems: ISectionItemProps[] = [
		{
			key: 'login',
			label: 'Se connecter',
			content: <SignUpAndLoginForm keyForm='login' />,
		},
		{
			key: 'signUp',
			label: 'Créer un compte',
			content: <SignUpAndLoginForm keyForm='signUp' />,
		},
	];

	return (
		<div className='connexion'>
			<SwitchSections
				items={sectionItems}
				defaultKey='login'
				title='Connexion'
				className='switchSections'
			/>
		</div>
	);
};
