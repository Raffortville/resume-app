import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { getUser } from '../../store/user/actions';
import { userSelector } from '../../store/user/reducer';
import { IUser } from '../../types/store';

interface IUseUserInfosOutput {
	userName: string | undefined;
}

export const useUserInfos = (): IUseUserInfosOutput => {
	const user = useAppSelector(userSelector);
	const [userName, setUserName] = useState<string | undefined>();

	const fetchCurrentUser = async (): Promise<IUser | undefined> => {
		if (!user?.email || !user?.uid) {
			return;
		}
		return await getUser({ email: user.email, uid: user.uid });
	};

	const getUserName = async (): Promise<void> => {
		const user = await fetchCurrentUser();
		setUserName(user?.userName);
	};

	useEffect(() => {
		if (!userName && user) {
			getUserName();
			return;
		}
		setUserName(undefined);
	}, [user]);

	return {
		userName: userName,
	};
};
