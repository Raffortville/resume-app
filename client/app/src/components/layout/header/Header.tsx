import React from 'react';
import { NavBar } from '../../ui/navBar';
import type { ListItemType } from '../../../types';
import { useNavigate } from 'react-router-dom';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './header.scss';
import { signOut } from '../../../store/user/actions';
import { useAppSelector } from '../../../store/hooks';
import { alertSelector } from '../../../store/alert/reducer';
import { ToastAlert } from '../../ui/toastAlert';

interface CustomPros {
	isUserLogged: boolean;
}

export const Header: React.FC<CustomPros> = ({ isUserLogged }) => {
	const alert = useAppSelector(alertSelector);
	const navigate = useNavigate();

	const navBarItems: ListItemType[] = [
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
			{alert !== null && (
				<ToastAlert
					isOpen={alert !== null}
					message={alert?.message ?? ''}
					severity={alert?.type ?? 'info'}
				/>
			)}
			<header className='header'>
				<h2 onClick={() => onNavItemClick('/')} className='header-title'>
					Resume Maker
				</h2>
				<div className='menu'>
					<NavBar items={navBarItems} onItemClick={onNavItemClick} />
				</div>
				{/* <AccountCircleIcon fontSize='large' style={{ cursor: 'pointer' }} /> */}
			</header>
		</>
	);
};
