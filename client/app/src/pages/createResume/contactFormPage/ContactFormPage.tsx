import React from 'react';

import { useAppSelector } from '../../../store/hooks';
import { IUserLite } from '../../../store/types';
import { userSelector } from '../../../store/user/reducer';

import { ContactFormContainer } from '../../../components/pages/resumeForm/contactForm';

export const ContactFormPage: React.FC = () => {
	const user = useAppSelector(userSelector);
	const initialState: IUserLite = {
		_id: user?._id,
		emailPro: user?.emailPro,
		lastName: user?.lastName,
		firstName: user?.firstName,
		city: user?.city,
		country: user?.country,
		phone: user?.phone,
	};

	return <ContactFormContainer initialState={initialState} />;
};
