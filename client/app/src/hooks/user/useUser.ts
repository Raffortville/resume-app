import { useAppSelector } from '../../store/hooks';
import { userSelector } from '../../store/user/reducer';
import { IUserLite } from '../../types/store';
import { updateUserToDB } from '../../store/user/actions';

import {
	checkIsValidInputFormat,
	removeEmptyOrNullKeyValueFromObject,
} from '../../helpers';

export const useUser = () => {
	const user = useAppSelector(userSelector);

	const updateUser = (
		userValues: IUserLite
	): { isEmailValid: boolean; isSucces: boolean } => {
		const { emailPro } = userValues;

		if (emailPro !== undefined && emailPro !== '') {
			const isEmailValid = checkIsValidInputFormat(emailPro, 'email');
			if (!isEmailValid) {
				return { isEmailValid: false, isSucces: false };
			}
		}

		const userFiltred: IUserLite | undefined =
			removeEmptyOrNullKeyValueFromObject(userValues);

		if (!userFiltred) {
			return { isEmailValid: true, isSucces: false };
		}

		updateUserToDB(userValues);
		return { isEmailValid: true, isSucces: true };
	};
	return { user, updateUser };
};
