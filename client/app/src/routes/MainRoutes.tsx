import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './privateRoute';
import { ConnexionPage } from '../pages/connexion';
import { DashboardPage } from '../pages/dashboard';
import { HomePage } from '../pages/home';
import { ContactFormPage } from '../pages/createResume/contactFormPage';
import { CreateProfileFormPage } from '../pages/createResume/profileFormPage';
import { CreateExperienceFormPage } from '../pages/createResume/experiencesFormPage';
import { CreateDesignFormPage } from '../pages/createResume/designFormPage';
import { UpdateProfileFormPage } from '../pages/updateResume/profileForm';
import { UpdateExperienceFormPage } from '../pages/updateResume/experiencesForm';
import { UpdateDesignFormPage } from '../pages/updateResume/designForm';

export const MainRoutes: React.FC<{
	isUserLogged: boolean;
}> = ({ isUserLogged }): JSX.Element => {
	const createResumeRoutesElement: JSX.Element = (
		<>
			<Route
				path='/resume_form/create/contact'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<ContactFormPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/resume_form/create/profile'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<CreateProfileFormPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/resume_form/create/experience'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<CreateExperienceFormPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/resume_form/create/design'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<CreateDesignFormPage />
					</PrivateRoute>
				}
			/>
		</>
	);

	const updateResumeRoutesElement: JSX.Element = (
		<>
			<Route
				path='/resume_form/update/contact'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<ContactFormPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/resume_form/update/profile'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<UpdateProfileFormPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/resume_form/update/experience'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<UpdateExperienceFormPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/resume_form/update/design'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<UpdateDesignFormPage />
					</PrivateRoute>
				}
			/>
		</>
	);

	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route
				path='/connexion'
				element={
					<PrivateRoute isAllowed={!isUserLogged} redirectPath={'/dashboard'}>
						<ConnexionPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/dashboard'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<DashboardPage />
					</PrivateRoute>
				}
			/>
			{createResumeRoutesElement}
			{updateResumeRoutesElement}
		</Routes>
	);
};
