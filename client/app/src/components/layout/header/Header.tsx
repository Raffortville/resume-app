import React from 'react';
import { NavBar } from '../../ui/navBar';
import type { ObjectKeyLabel } from '../../../types/common';
import { useNavigate } from 'react-router-dom';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './header.scss';
import { signOut } from '../../../store/user/actions';
import { DialogConfirm } from '../../ui/dialogs/dialogConfirm';

interface CustomPros {
	isUserLogged: boolean;
}

export const Header: React.FC<CustomPros> = ({ isUserLogged }) => {
	const navigate = useNavigate();

	const navBarItems: ObjectKeyLabel[] = [
		{ key: '/resume/create', label: 'Créer nouveau CV' },
		...(isUserLogged ? [{ key: '/dashboard', label: 'Voir mes CV' }] : []),
		{
			key: isUserLogged ? '/deconnexion' : '/connexion',
			label: isUserLogged ? 'Deconnexion' : 'Connexion',
		},
	];

	const onNavItemClick = (linkKey: string): void => {
		if (linkKey === '/deconnexion') {
			signOut();
			navigate('/connexion');
			return;
		}
		navigate(linkKey);
		return;
	};

	return (
		<>
			<DialogConfirm
				title='Déconnexion'
				text='Voulez-vous vous déconnecter ?'
				open={true}
				onCancel={() => console.log('cancel')}
				onConfirm={() => console.log('onConfirm')}
			/>
			<header className='header'>
				<h2 onClick={() => onNavItemClick('/')} className='header-title'>
					Make my CV Tech
				</h2>
				<div className='menu'>
					<NavBar items={navBarItems} onItemClick={onNavItemClick} />
				</div>
				{/* <AccountCircleIcon fontSize='large' style={{ cursor: 'pointer' }} /> */}
			</header>
		</>
	);
};
