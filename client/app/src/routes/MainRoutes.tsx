import { Route, Routes } from 'react-router-dom';
import { ConnexionPage } from '../pages/connexion';
import { HomePage } from '../pages/home';

export const MainRoutes = (): JSX.Element => {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/connexion' element={<ConnexionPage />} />
		</Routes>
	);
};
