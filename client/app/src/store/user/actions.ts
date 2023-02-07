import { store } from '../../store';
import type { IBaseUser } from '../../types/store';
import { displayAlert } from '../alert/actions';
import { resetUser, setUser, updateUser } from './reducer';
import { resetAllResumes, resetCurrentResume } from '../resume/actions';
import { updateResumeContact } from '../resume/reducer';
import {
	createUserOnFBase,
	createUserOnDB,
	fetchUserFromDB,
	signInUserOnFBase,
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
		const user = await saveUserToDb({ email: email, userName: userName });

		if (!user || !user.email || user.email === null) {
			displayAlert({
				payload: {
					message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
					type: 'error',
				},
			});
			throw new Error('Error save user on DB');
		}
		const createdUser = await createUserOnFBase({ email, password });
		if (!createdUser?.email) {
			throw new Error('Error create user with firebase auth');
		}

		logIn({ email: createdUser.email, password });
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
		const userFromDB = await getUser({ email });
		if (!userFromDB) {
			displayAlert({
				payload: {
					message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
					type: 'error',
				},
			});
			throw new Error('Error fetching user from db');
		}
		setCurrentUser(userFromDB);
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

export const saveUserToDb = async (
	payload: IBaseUser
): Promise<IBaseUser | undefined> => {
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

export const getUser = async (
	payload: IBaseUser
): Promise<IBaseUser | undefined> => {
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
		setCurrentUser(user);
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
	payload: IBaseUser
): Promise<IBaseUser | undefined> => {
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

		updateCurrentUser(userUpdated);
		updateCurrentResumeContact(userUpdated);
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
	resetCurrentResume();
	resetAllResumes();
	store.dispatch(resetUser());
};

export const updateCurrentUser = (user: IBaseUser) => {
	store.dispatch(updateUser(user));
};

export const updateCurrentResumeContact = (user: IBaseUser) => {
	store.dispatch(updateResumeContact(user));
};

export const setCurrentUser = (user: IBaseUser) => {
	store.dispatch(setUser(user));
};
