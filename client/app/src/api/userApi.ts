import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	User,
} from 'firebase/auth';
import config from '../config';
import { fireBaseAuth } from '../services';
import { IUser, IUserLite } from '../types/store';
import { headers } from './configApi';

const createUserOnFBase = async (user: {
	email: string;
	password: string;
	userName?: string;
}): Promise<User | undefined> => {
	const { email, password, userName } = user;
	try {
		const { user } = await createUserWithEmailAndPassword(
			fireBaseAuth,
			email,
			password
		);
		if (userName) {
			updateUserOnFBase(userName);
		}
		return user;
	} catch (error) {
		console.log(error);
	}
};

const signInUserOnFBase = async ({
	email,
	password,
	userName,
}: {
	email: string;
	password: string;
	userName?: string;
}): Promise<User | undefined> => {
	try {
		const { user } = await signInWithEmailAndPassword(
			fireBaseAuth,
			email,
			password
		);
		if (!user) {
			throw new Error('error user not found in firebase auth');
		}
		return user;
	} catch (error) {
		console.log(error);
	}
};

const updateUserOnFBase = async (userName: string): Promise<void> => {
	const { currentUser } = fireBaseAuth;
	if (!currentUser) {
		throw new Error('Current user not found on fbase');
	}

	try {
		await updateProfile(currentUser, { displayName: userName });
	} catch (error) {
		console.log(error);
	}
};

const createUserOnDB = async (payload: IUser): Promise<IUser | undefined> => {
	const { email, uid, userName } = payload;

	try {
		const response = await fetch(`${config.API.url}/user`, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({ email, uid, userName }),
		});

		return await response.json();
	} catch (error) {
		console.log(error);
	}
};

const fetchUserFromDB = async (payload: IUser): Promise<IUser | undefined> => {
	const { email, uid } = payload;

	try {
		const response = await fetch(`${config.API.url}/user/getUser`, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({ email, uid }),
		});

		return await response.json();
	} catch (error) {
		console.log(error);
	}
};

const updateUserOnDB = async (
	payload: IUserLite
): Promise<IUser | undefined> => {
	try {
		const response = await fetch(
			`${config.API.url}/user/update/${payload._id}`,
			{
				method: 'PUT',
				headers: headers,
				body: JSON.stringify(payload),
			}
		);
		if (response.status !== 200) {
			return;
		}

		return await response.json();
	} catch (error) {
		console.log(error);
	}
};

const signOutFromFBaseAuth = async (): Promise<void> => {
	try {
		return await fireBaseAuth.signOut();
	} catch (error) {
		console.log(error);
	}
};

export {
	createUserOnFBase,
	signInUserOnFBase,
	createUserOnDB,
	fetchUserFromDB,
	updateUserOnDB,
	signOutFromFBaseAuth,
};
