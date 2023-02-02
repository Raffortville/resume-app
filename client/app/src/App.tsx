import { useEffect, useState } from 'react';
import { useAppSelector } from './store/hooks';
import { fireBaseAuth } from './services';
import { MainRoutes } from './routes';
import { setUserOnStore } from './store/user/actions';
import { userSelector } from './store/user/reducer';
import { alertSelector } from './store/alert/reducer';

import { Header } from './components/layout/header';
import { ToastAlert } from './components/ui/toastAlert';

import { CircularProgressLoad } from './components/ui/progress/circular';

function App() {
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const userSelect = useAppSelector(userSelector);
	const alert = useAppSelector(alertSelector);

	useEffect(() => {
		const unsub = fireBaseAuth.onAuthStateChanged((user) => {
			if (user?.email) {
				setUserOnStore({
					email: user.email,
					uid: user.uid,
					userName: user.displayName ?? undefined,
				});
				setIsLoading(false);
				return;
			}
			setIsLoading(false);
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
			<Header isUserLogged={!!userSelect} />
			<MainRoutes isUserLogged={!!userSelect} />
		</>
	);
}

export default App;
