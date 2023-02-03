import config from '../config';
import { IResume } from '../types/store';
import { headers } from './configApi';
import { expertises } from '../constants';

export const fetchResumeById = async (
	resumeId: string
): Promise<IResume | undefined> => {
	try {
		const response = await fetch(
			`${config.API.url}/resume/getById/${resumeId}`,
			{
				method: 'GET',
				headers: headers,
				referrerPolicy: 'unsafe-url',
			}
		);
		if (response.status !== 200) {
			throw new Error('Error fetching resume from DB');
		}
		return await response.json();
	} catch (error) {
		console.log(error);
	}
};

export const addResumeOnDB = async ({
	title,
	userId,
}: {
	title: string;
	userId: string;
}): Promise<IResume | undefined> => {
	const data = {
		title,
		userId,
		expertises: expertises,
		design: {
			colorMain: {
				name: 'grey',
				hex: '#757575',
			},
		},
	};

	try {
		const response = await fetch(`${config.API.url}/resume/create`, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(data),
		});

		if (response.status !== 200) {
			throw new Error('Error adding resume on DB');
		}
		return await response.json();
	} catch (error) {
		console.log(error);
	}
};

export const updateResumeOnDB = async (
	payload: IResume
): Promise<IResume | undefined> => {
	try {
		const response = await fetch(
			`${config.API.url}/resume/update/${payload._id}`,
			{
				method: 'PUT',
				headers: headers,
				body: JSON.stringify(payload),
			}
		);

		if (response.status !== 200) {
			throw new Error('Error updating resume on DB');
		}

		return await response.json();
	} catch (error) {
		console.log(error);
	}
};

export const deleteResumeFromDB = async (id: string) => {
	try {
		await fetch(`${config.API.url}/resume/delete/${id}`, {
			method: 'DELETE',
			headers: headers,
		});
	} catch (error) {
		console.log(error);
	}
};
