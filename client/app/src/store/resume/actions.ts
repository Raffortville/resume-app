import { store } from '..';
import config from '../../config';
import { displayAlert } from '../alert/actions';
import { IResume } from '../../types/store';
import {
	addResume,
	deleteResume,
	setResume,
	setResumes,
	resetResume,
	resetResumes,
} from './reducer';
import { expertises } from '../../constants';

export const getResumes = async (uid: string): Promise<IResume[] | void> => {
	try {
		const response = await fetch(`${config.API.url}/resume/getAll/${uid}`, {
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
): Promise<IResume | undefined> => {
	try {
		const response = await fetch(
			`${config.API.url}/resume/getById/${resumeId}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				referrerPolicy: 'unsafe-url',
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
		return;
	}
};

export const createResumeToDB = async (payload: {
	title: string;
	userId: string;
}): Promise<IResume | void> => {
	const data = {
		...payload,
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
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (response.status === 200) {
			const createdResume: IResume = await response.json();
			displayAlert({
				payload: {
					message: `${createdResume.title} a été initié avec succès !`,
					type: 'success',
				},
			});
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
): Promise<IResume | undefined> => {
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
			store.dispatch(setResume(updatedResume));
			displayAlert({
				payload: {
					message: 'Vos informations ont bien été enregisttés',
					type: 'success',
				},
			});
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
		displayAlert({
			payload: {
				message: 'Votre cv a bien été supprimé',
				type: 'info',
			},
		});
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

export const resetCurrentResume = () => {
	store.dispatch(resetResume());
};

export const resetAllResumes = () => {
	store.dispatch(resetResumes());
};
