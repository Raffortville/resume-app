import React from 'react';
import { NavBar } from '../../ui/navBar';
import type { ListItemType } from '../../../types';
import { useNavigate } from 'react-router-dom';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './header.scss';
import { signOut } from '../../../store/user/actions';

interface CustomPros {
	isUserLogged: boolean;
}

export const Header: React.FC<CustomPros> = ({ isUserLogged }) => {
	const navigate = useNavigate();

	const onNavigate = (linkKey: string): void => {
		if (linkKey === '/deconnexion') {
			signOut();
			navigate('/connexion');
			return;
		}
		navigate(linkKey);
		return;
	};

	const navBarItems: ListItemType[] = [
		{ key: '/resume_form/contact', label: 'Créer nouveau CV' },
		...(isUserLogged ? [{ key: '/dashboard', label: 'Voir mes CV' }] : []),
		{
			key: isUserLogged ? '/deconnexion' : '/connexion',
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
