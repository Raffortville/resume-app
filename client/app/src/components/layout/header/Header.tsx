import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { ObjectKeyLabel } from '../../../types/common';
import { signOut } from '../../../store/user/actions';
import Avatar from '@mui/material/Avatar';
import { NavBar } from '../../ui/navBar';
import { DialogConfirm } from '../../ui/dialogs/dialogConfirm';

import './header.scss';
import { useAppSelector } from '../../../store/hooks';
import { userSelector } from '../../../store/user/reducer';
interface CustomPros {
	isUserLogged: boolean;
}

export const Header: React.FC<CustomPros> = ({ isUserLogged }) => {
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const user = useAppSelector(userSelector);
	const navigate = useNavigate();

	const navBarItems: ObjectKeyLabel[] = [
		{ key: '/resume/create', label: 'Créer nouveau CV' },
		...(isUserLogged ? [{ key: '/dashboard', label: 'Voir mes CV' }] : []),
		{
			key: isUserLogged ? '/deconnexion' : '/connexion',
			label: isUserLogged ? 'Deconnexion' : 'Connexion',
		},
	];

	const onLoggOut = (): void => {
		setOpenDialog(false);
		signOut();
		navigate('/connexion');
	};

	const onNavItemClick = (linkKey: string): void => {
		if (linkKey === '/deconnexion') {
			setOpenDialog(true);
			return;
		}
		navigate(linkKey);
		return;
	};

	return (
		<>
			<DialogConfirm
				open={openDialog}
				onCancel={(): void => setOpenDialog(false)}
				onConfirm={onLoggOut}
				title='Déconnexion'
				text='Voulez-vous vous déconnecter ?'
			/>
			<header className='header'>
				<h2 onClick={() => onNavItemClick('/')} className='header-title'>
					Make my CV Tech
				</h2>
				<div className='menu'>
					<NavBar items={navBarItems} onItemClick={onNavItemClick} />
				</div>
				{user?.userName && (
					<Avatar style={{ textTransform: 'capitalize' }}>
						{user.userName.slice(0, 1)}
					</Avatar>
				)}
			</header>
		</>
	);
};
