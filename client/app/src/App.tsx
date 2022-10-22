import { Header } from './components/layout/header';
import { MainRoutes } from './routes';

function App() {
	return (
		<>
			<Header isUserLogged={true} />
			<MainRoutes />
		</>
	);
}

export default App;
