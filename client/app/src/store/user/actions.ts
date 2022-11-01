import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { fireBaseAuth } from '../../services';

import config from '../../config';
import { store } from '../../store';
import type { IUser } from '../../store/types';
import { displayAlert } from '../alert/actions';
import { setUser } from './reducer';

export const signUp = async (payload: {
	email: string;
	password: string;
	userName?: string;
}): Promise<any> => {
	const { email, password, userName } = payload;

	try {
		const { user } = await createUserWithEmailAndPassword(
			fireBaseAuth,
			email,
			password
		);

		if (!user.email || user.email === null) {
			return;
		}

		return await logIn({
			payload: { email: user.email, password, userName },
			isFirstLogin: true,
		});
	} catch (err) {
		console.log(err);
		displayAlert({
			payload: {
				message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
				type: 'error',
			},
		});
	}
};

export const logIn = async ({
	payload,
	isFirstLogin,
}: {
	payload: { email: string; password: string; userName?: string };
	isFirstLogin: boolean;
}): Promise<IUser | undefined> => {
	const { password, email, userName } = payload;

	try {
		const { user } = await signInWithEmailAndPassword(
			fireBaseAuth,
			email,
			password
		);

		if (!user.email || user.email === null) {
			displayAlert({
				payload: {
					message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
					type: 'error',
				},
			});
			return;
		}

		if (isFirstLogin) {
			return await saveUserToDb({ email: user.email, uid: user.uid, userName });
		}
	} catch (error) {
		console.log(error);
		displayAlert({
			payload: {
				message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
				type: 'error',
			},
		});
	}
};

export const saveUserToDb = async (payload: IUser): Promise<any> => {
	const { email, uid, userName } = payload;

	try {
		const response = await fetch(`${config.API.url}/user`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, uid, userName }),
		});

		const data = await response.json();
		store.dispatch(setUser(data));
		return data;
	} catch (error) {
		console.log(error);
		displayAlert({
			payload: {
				message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
				type: 'error',
			},
		});
	}
};

export const getUser = async (payload: IUser): Promise<any> => {
	const { email, uid } = payload;
	try {
		const response = await fetch(`${config.API.url}/user/getUser`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, uid }),
		});

		const data = await response.json();
		store.dispatch(setUser(data));
		return data;
	} catch (error) {
		console.log(error);
		displayAlert({
			payload: {
				message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
				type: 'error',
			},
		});
	}
};

export const signOut = async (): Promise<void> => {
	try {
		return await fireBaseAuth.signOut();
	} catch (error) {
		console.log(error);
	}
};
