import { Route, Routes } from 'react-router-dom';
import { ConnexionPage } from '../pages/connexion';
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
					<PrivateRoute isAllowed={!isUserLogged}>
						<ConnexionPage />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};
