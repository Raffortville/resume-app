import { store } from '..';
import config from '../../config';
import { displayAlert } from '../alert/actions';
import { IResume } from '../types';
import { addResume, deleteResume, setResume, setResumes } from './reducer';

export const getResumes = async (userId: string): Promise<IResume[] | void> => {
	try {
		const response = await fetch(`${config.API.url}/resume/getAll/${userId}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		if (response.status === 200) {
			const resumes: IResume[] = await response.json();
			store.dispatch(setResumes(resumes));
			return resumes;
		}
	} catch (error) {
		console.log(error);
		displayAlert({
			payload: {
				message:
					'Erreur lors du chargement de vos cvs, veuillez essayer plus tard',
				type: 'error',
			},
		});
	}
};

export const getResumeById = async (
	resumeId: string
): Promise<IResume | void> => {
	try {
		const response = await fetch(
			`${config.API.url}/resume/getById/${resumeId}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}
		);
		if (response.status === 200) {
			const resume: IResume = await response.json();
			store.dispatch(setResume(resume));
			return resume;
		}
	} catch (error) {
		console.log(error);
		displayAlert({
			payload: {
				message:
					'Erreur lors du chargement de votre cv, veuillez essayer plus tard',
				type: 'error',
			},
		});
	}
};

export const createResumeToDB = async (
	payload: IResume
): Promise<IResume | void> => {
	try {
		const response = await fetch(`${config.API.url}/resume/create`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});

		if (response.status === 200) {
			const createdResume: IResume = await response.json();
			store.dispatch(setResume(createdResume));
			store.dispatch(addResume(createdResume));
			return createdResume;
		}
	} catch (error) {
		console.log(error);
		displayAlert({
			payload: {
				message:
					'Erreur lors de la création de votre cv, veuillez essayer plus tard',
				type: 'error',
			},
		});
	}
};

export const updateResumeToDB = async (
	payload: IResume
): Promise<IResume | void> => {
	try {
		const response = await fetch(
			`${config.API.url}/resume/update/${payload._id}`,
			{
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			}
		);

		if (response.status === 200) {
			const updatedResume = await response.json();
			store.dispatch(updatedResume(updatedResume));
			store.dispatch(updatedResume(updatedResume));
			return updatedResume;
		}
	} catch (error) {
		console.log(error);
		displayAlert({
			payload: {
				message:
					'Erreur lors de la modification de votre cv, veuillez essayer plus tard',
				type: 'error',
			},
		});
	}
};

export const deleteResumeFromDB = async (id: string) => {
	try {
		await fetch(`${config.API.url}/resume/delete/${id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		store.dispatch(deleteResume(id));
	} catch (error) {
		console.log(error);
		displayAlert({
			payload: {
				message:
					'Erreur lors de la suppression de votre cv, veuillez essayer plus tard',
				type: 'error',
			},
		});
	}
};
