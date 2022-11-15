import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './privateRoute';
import { ConnexionPage } from '../pages/connexion';
import { DashboardPage } from '../pages/dashboard';
import { HomePage } from '../pages/home';
import { CreateResumePage } from '../pages/createResume';
import { UpdateResumePage } from '../pages/updateResume';

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
				path='/resume_form/create/'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<CreateResumePage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/resume_form/update/'
				element={
					<PrivateRoute isAllowed={isUserLogged} redirectPath='/connexion'>
						<UpdateResumePage />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};
