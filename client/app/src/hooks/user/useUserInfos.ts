import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { getUser } from '../../store/user/actions';
import { userSelector } from '../../store/user/reducer';
import { IBaseUser } from '../../types/store';

interface IUseUserInfosOutput {
	userName: string | undefined;
}

export const useUserInfos = (): IUseUserInfosOutput => {
	const user = useAppSelector(userSelector);
	const [userName, setUserName] = useState<string | undefined>();

	const fetchCurrentUser = async (): Promise<IBaseUser | undefined> => {
		if (!user?.email || !user?._id) {
			return;
		}
		return await getUser({ email: user.email, _id: user._id });
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
