import React from 'react';
import { NavBar } from '../../ui/navBar';
import type { ListItemType } from '../../../types';
import { useNavigate } from 'react-router-dom';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './header.scss';

interface CustomPros {
	isUserLogged: boolean;
}

export const Header: React.FC<CustomPros> = ({ isUserLogged }) => {
	const navigate = useNavigate();

	const onNavigate = (linkKey: string) => {
		navigate(linkKey);
	};

	const navBarItems: ListItemType[] = [
		{ key: '/create', label: 'Créer nouveau CV' },
		...(isUserLogged ? [{ key: '/dashboard', label: 'Voir mes CV' }] : []),
		{
			key: '/connexion',
			label: isUserLogged ? 'Deconnexion' : 'Connexion',
		},
	];

	return (
		<header className='header'>
			<h2 onClick={() => onNavigate('/')} className='header-title'>
				Resume Maker
			</h2>
			<div className='menu'>
				<NavBar items={navBarItems} onItemClick={onNavigate} />
			</div>
			{/* <AccountCircleIcon fontSize='large' style={{ cursor: 'pointer' }} /> */}
		</header>
	);
};
