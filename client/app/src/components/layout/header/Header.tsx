import React from 'react';
import { NavBar } from '../../ui/navBar';
import type { ListItemType } from '../../../types';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './header.scss';

interface CustomPros {
	isUserLogged: boolean;
}

export const Header: React.FC<CustomPros> = ({ isUserLogged }) => {
	const navBarItems: ListItemType[] = [
		{ key: 'créer', label: 'Créer nouveau CV' },
		...(isUserLogged ? [{ key: 'voir', label: 'Voir mes CV' }] : []),
		{
			key: 'connexion',
			label: isUserLogged ? 'Connexion' : 'Déconnexion',
		},
	];

	return (
		<header className='header'>
			<h2 className='header-title'>Resume Maker</h2>
			<div className='menu'>
				<NavBar items={navBarItems} />
			</div>
			{/* <AccountCircleIcon fontSize='large' style={{ cursor: 'pointer' }} /> */}
		</header>
	);
};
