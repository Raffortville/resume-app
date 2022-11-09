import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './privateRoute';
import { ConnexionPage } from '../pages/connexion';
import { DashboardPage } from '../pages/dashboard';
import { HomePage } from '../pages/home';
import { ContactFormPage } from '../pages/createResume/contactForm/';
import { ProfileFormPage } from '../pages/createResume/profileForm';
import { ExperienceFormPage } from '../pages/createResume/experienceForm';
import { DesignFormPage } from '../pages/createResume/designForm';

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
					<PrivateRoute isAllowed={isUserLogged}>
						<DashboardPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/create/contact'
				element={
					<PrivateRoute isAllowed={isUserLogged}>
						<ContactFormPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/create/profile'
				element={
					<PrivateRoute isAllowed={isUserLogged}>
						<ProfileFormPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/create/experience'
				element={
					<PrivateRoute isAllowed={isUserLogged}>
						<ExperienceFormPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/create/design'
				element={
					<PrivateRoute isAllowed={isUserLogged}>
						<DesignFormPage />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};
