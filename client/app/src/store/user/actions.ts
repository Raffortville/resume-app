import { store } from '../../store';
import type { IUser, IUserLite } from '../../types/store';
import { displayAlert } from '../alert/actions';
import { resetUser, setUser, updateUser } from './reducer';
import {
	createUserOnFBase,
	createUserOnDB,
	fetchUserFromDB,
	signInUserOnFBase,
	signOutFromFBaseAuth,
	updateUserOnDB,
} from '../../api/userApi';
import { resetAllResumes, resetCurrentResume } from '../resume/actions';

export const signUp = async (payload: {
	email: string;
	password: string;
	userName?: string;
}): Promise<any> => {
	const { email, password, userName } = payload;

	try {
		const user = await createUserOnFBase({ email, password, userName });

		if (!user || !user.email || user.email === null) {
			displayAlert({
				payload: {
					message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
					type: 'error',
				},
			});
			throw new Error('Error create user with firebase auth');
		}
		saveUserToDb({ email: email, uid: user.uid, userName: userName });
		logIn(payload);
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
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<void> => {
	try {
		const user = await signInUserOnFBase({ email, password });

		if (!user || !user.email || user.email === null) {
			displayAlert({
				payload: {
					message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
					type: 'error',
				},
			});
			throw new Error('Error signIn with firebase auth');
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

export const saveUserToDb = async (payload: IUser): Promise<void> => {
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

export const setUserOnStore = (user: IUser) => {
	store.dispatch(setUser(user));
};

export const signOut = async (): Promise<void> => {
	await signOutFromFBaseAuth();
	resetCurrentResume();
	resetAllResumes();
	store.dispatch(resetUser());
};
