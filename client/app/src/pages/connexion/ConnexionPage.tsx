import React from 'react';
import { ISectionItemProps } from '../../types/common';

import { SwitchSections } from '../../components/ui/switchSections';
import { AuthConnexion } from '../../components/pages/connexion';

import './connexion.scss';

export const ConnexionPage: React.FC = () => {
	const sectionItems: ISectionItemProps[] = [
		{
			key: 'login',
			label: 'Se connecter',
			content: <AuthConnexion keyForm='login' />,
		},
		{
			key: 'signUp',
			label: 'Créer un compte',
			content: <AuthConnexion keyForm='signUp' />,
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
