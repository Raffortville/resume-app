import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './privateRoute';
import { ConnexionPage } from '../pages/connexion';
import { DashboardPage } from '../pages/dashboard';
import { HomePage } from '../pages/home';
import { ResumeCreatePage } from '../pages/resumeCreate';
import { ResumeFormsPage } from '../pages/resumeForms';

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
				path='/resume/create'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<ResumeCreatePage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/resume/form/:id'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<ResumeFormsPage />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};
