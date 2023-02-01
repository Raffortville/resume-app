import { store } from '../../store';
import type { IUser, IUserLite } from '../../types/store';
import { displayAlert } from '../alert/actions';
import { setUser, updateUser } from './reducer';
import {
	createUser,
	createUserOnDB,
	fetchUserFromDB,
	signInUser,
	signOutFromFBaseAuth,
	updateUserOnDB,
} from '../../api/userApi';

export const signUp = async (payload: {
	email: string;
	password: string;
	userName?: string;
}): Promise<any> => {
	const { email, password, userName } = payload;

	try {
		const user = await createUser({ email, password, userName });

		if (!user || !user.email || user.email === null) {
			displayAlert({
				payload: {
					message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
					type: 'error',
				},
			});
			throw new Error('Error create user with firebase auth');
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
		const user = await signInUser({ email, password });

		if (!user || !user.email || user.email === null) {
			displayAlert({
				payload: {
					message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
					type: 'error',
				},
			});
			throw new Error('Error signIn with firebase auth');
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
	try {
		const user = await createUserOnDB(payload);

		if (!user) {
			displayAlert({
				payload: {
					message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
					type: 'error',
				},
			});
			throw new Error('Error create user on DB');
		}

		store.dispatch(setUser(user));
		return user;
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

export const getUser = async (payload: IUser): Promise<IUser | undefined> => {
	try {
		const user = await fetchUserFromDB(payload);
		if (!user) {
			displayAlert({
				payload: {
					message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
					type: 'error',
				},
			});
			throw new Error('Error fetching user from DB');
		}
		store.dispatch(updateUser(user));
		return user;
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

export const updateUserToDB = async (
	payload: IUserLite
): Promise<IUser | undefined> => {
	try {
		const userUpdated = await updateUserOnDB(payload);
		if (!userUpdated) {
			displayAlert({
				payload: {
					message:
						"Erreur lors l'enregistrement de vos données, veuillez essayer plus tard",
					type: 'error',
				},
			});

			throw new Error('Error updatein user on DB');
		}

		store.dispatch(updateUser(userUpdated));
		displayAlert({
			payload: {
				message: 'Vos données ont enregistrés avec succès !',
				type: 'success',
			},
		});
		return userUpdated;
	} catch (error) {
		console.log(error);
		displayAlert({
			payload: {
				message:
					"Erreur lors l'enregistrement de vos données, veuillez essayer plus tard",
				type: 'error',
			},
		});
	}
};

export const signOut = async (): Promise<void> => {
	await signOutFromFBaseAuth();
};
