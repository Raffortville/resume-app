import React from 'react';
import { useNavigate } from 'react-router-dom';

import { createResumeToDB } from '../../../../store/resume/actions';
import { TitleForm } from '../forms/titleForm';

export const ResumeCreateContainer: React.FC = () => {
	const navigate = useNavigate();

	const createResume = async (title: string): Promise<void> => {
		const createdResume = await createResumeToDB({ title });
		createdResume &&
			navigate(`/resume/form/${createdResume._id}`, {
				state: { resumeId: createdResume._id },
				replace: true,
			});
	};
	return <TitleForm onSubmitForm={createResume} />;
};
