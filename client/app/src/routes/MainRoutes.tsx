import { Route, Routes } from 'react-router-dom';
import { ConnexionPage } from '../pages/connexion';
import { CreateResumePage } from '../pages/createResume';
import { DashboardPage } from '../pages/dashboard';
import { HomePage } from '../pages/home';
import { PrivateRoute } from './privateRoute';

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
				path='/create'
				element={
					<PrivateRoute isAllowed={isUserLogged}>
						<CreateResumePage />
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
		</Routes>
	);
};
