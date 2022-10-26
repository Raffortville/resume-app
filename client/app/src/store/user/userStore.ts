import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { fireBaseAuth } from '../../services';
import { RootState } from '..';
import type { IUser, UserType } from '../types';
import { displayAlert } from '../alert/alertStore';

export const initialState: { user: UserType } = {
	user: null,
};

const userSlice = createSlice({
	name: 'USER',
	initialState: initialState,
	reducers: {
		setUser: (state, { payload }: PayloadAction<UserType>) => {
			state.user = payload;
		},
		resetUser: (state, { payload }: PayloadAction<UserType>) => {
			state.user = payload;
		},
		updateUser: (state, { payload }: PayloadAction<UserType>) => {
			if (payload) {
				state.user = { ...state.user, ...payload };
			}
		},
	},
});

export const { setUser, resetUser, updateUser } = userSlice.actions;

export const signUp = async (payload: IUser): Promise<void> => {
	const { email, password } = payload;

	if (!password) {
		displayAlert({
			payload: {
				message: 'Le mot de passe est manquant',
				type: 'error',
			},
		});
		return;
	}

	try {
		const { user } = await createUserWithEmailAndPassword(
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

		logIn({ payload: { email: user.email, password }, isFirstLogin: true });
	} catch (err) {
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
	payload: IUser;
	isFirstLogin: boolean;
}): Promise<void> => {
	const { password, email } = payload;

	if (!password) {
		throw new Error('Le mot de passe est manquant');
	}

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

		isFirstLogin
			? saveUserToDb({ email: user.email })
			: getUser({ email: user.email });
	} catch (error) {
		displayAlert({
			payload: {
				message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
				type: 'error',
			},
		});
	}
};

export const saveUserToDb = async (payload: IUser): Promise<void> => {
	const { email } = payload;

	try {
		const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});

		if (response.status !== 200) {
			displayAlert({
				payload: {
					message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
					type: 'error',
				},
			});
			return;
		}

		const data = await response.json();
		setUser(data);
	} catch (error) {
		displayAlert({
			payload: {
				message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
				type: 'error',
			},
		});
	}
};

export const getUser = async (payload: IUser): Promise<void> => {
	const { email } = payload;
	try {
		const response = await fetch(
			`${process.env.REACT_APP_API_URL}/user/loadUser`,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			}
		);

		if (response.status !== 200) {
			displayAlert({
				payload: {
					message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
					type: 'error',
				},
			});
			return;
		}

		const data = await response.json();
		setUser(data);
	} catch (error) {
		displayAlert({
			payload: {
				message: 'Erreur lors de votre connexion, veuillez essayer plus tard',
				type: 'error',
			},
		});
	}
};

export const userSelector = (state: RootState) => state.userReducer.user;
export const userReducer = userSlice.reducer;
