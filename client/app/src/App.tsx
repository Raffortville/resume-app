import { useEffect, useState } from 'react';
import { useAppSelector } from './store/hooks';
import { fireBaseAuth } from './services';
import { MainRoutes } from './routes';
import { getUser, signOut } from './store/user/actions';
import { alertSelector } from './store/alert/reducer';

import { Header } from './components/layout/header';
import { ToastAlert } from './components/ui/toastAlert';

import { CircularProgressLoad } from './components/ui/progress/circular';

function App() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

	const alert = useAppSelector(alertSelector);

	const fetchUser = async (email: string) => {
		const user = await getUser({ email });
		if (user) {
			setIsUserLogged(true);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const unsub = fireBaseAuth.onAuthStateChanged((user) => {
			if (user?.email) {
				fetchUser(user.email);
				return;
			} else {
				setIsUserLogged(false);
				signOut();
				setIsLoading(false);
			}
		});

		return () => unsub();
	}, []);

	if (isLoading) {
		return <CircularProgressLoad />;
	}

	return (
		<>
			{alert !== null && (
				<ToastAlert
					isOpen={alert !== null}
					message={alert?.message ?? ''}
					severity={alert?.type ?? 'info'}
				/>
			)}
			<Header isUserLogged={isUserLogged} />
			<MainRoutes isUserLogged={isUserLogged} />
		</>
	);
}

export default App;
