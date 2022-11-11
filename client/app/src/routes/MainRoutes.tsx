import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './privateRoute';
import { ConnexionPage } from '../pages/connexion';
import { DashboardPage } from '../pages/dashboard';
import { HomePage } from '../pages/home';
import { ContactFormPage } from '../pages/resumeForm/contactForm';
import { ProfileFormPage } from '../pages/resumeForm/profileForm';
import { ExperienceFormPage } from '../pages/resumeForm/experiencesForm';
import { DesignFormPage } from '../pages/resumeForm/designForm';

export const MainRoutes: React.FC<{
	isUserLogged: boolean;
}> = ({ isUserLogged }): JSX.Element => {
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
			<Route
				path='/resume_form/contact'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<ContactFormPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/resume_form/profile'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<ProfileFormPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/resume_form/experience'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<ExperienceFormPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/resume_form/design'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<DesignFormPage />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};
