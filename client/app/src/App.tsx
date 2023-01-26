import { useEffect, useState } from 'react';
import { fireBaseAuth } from './services';
import { MainRoutes } from './routes';
import { store } from './store';
import { getUser } from './store/user/actions';
import { resetUser, setUser, userSelector } from './store/user/reducer';

import { Header } from './components/layout/header';
import { useAppSelector } from './store/hooks';
import { ToastAlert } from './components/ui/toastAlert';
import { alertSelector } from './store/alert/reducer';
import { CircularProgressLoad } from './components/ui/progress/circular';

function App() {
	const [isUserLogged, setIsUserLogged] = useState<boolean | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const userSelect = useAppSelector(userSelector);
	const alert = useAppSelector(alertSelector);

	const fetchUser = async ({
		email,
		uid,
	}: {
		email: string;
		uid: string;
	}): Promise<void> => {
		if (userSelect) {
			setIsUserLogged(true);
			return;
		}

		const user = await getUser({ email, uid });
		if (user) {
			store.dispatch(setUser(user));
			setIsUserLogged(true);
		}
	};

	useEffect(() => {
		const unsub = fireBaseAuth.onAuthStateChanged((user) => {
			setIsLoading(true);
			if (user?.email) {
				fetchUser({ email: user.email, uid: user.uid });
			} else {
				setIsUserLogged(false);
				store.dispatch(resetUser(null));
			}
			setIsLoading(false);
		});

		return () => {
			unsub();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading || isUserLogged === undefined) {
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
