import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../store/hooks';

import { createResumeToDB } from '../../../../store/resume/actions';
import { userSelector } from '../../../../store/user/reducer';
import { TitleForm } from '../forms/titleForm';

export const ResumeCreateContainer: React.FC = () => {
	const user = useAppSelector(userSelector);
	const navigate = useNavigate();

	const createResume = async (title: string): Promise<void> => {
		if (!user?._id) {
			return;
		}
		const createdResume = await createResumeToDB({
			title,
			userId: user._id,
		});
		createdResume && navigate('/dashboard');
	};
	return <TitleForm onSubmitForm={createResume} />;
};
