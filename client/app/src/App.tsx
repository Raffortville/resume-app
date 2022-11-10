import { useEffect, useState } from 'react';
import { fireBaseAuth } from './services';
import { MainRoutes } from './routes';
import { store } from './store';
import { getUser } from './store/user/actions';
import { resetUser, setUser, userSelector } from './store/user/reducer';

import { Header } from './components/layout/header';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from './store/hooks';

function App() {
	const [isUserLogged, setIsUserLogged] = useState<boolean | undefined>();
	const userSelect = useAppSelector(userSelector);
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
		return (
			<CircularProgress
				color='primary'
				size={72}
				style={{
					position: 'absolute',
					right: '50%',
					top: '50%',
				}}
			/>
		);
	}

	return (
		<>
			<Header isUserLogged={isUserLogged} />
			<MainRoutes isUserLogged={isUserLogged} />
		</>
	);
}

export default App;
