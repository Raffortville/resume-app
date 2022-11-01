import { useEffect, useState } from 'react';
import { fireBaseAuth } from './services';
import { MainRoutes } from './routes';
import { store } from './store';
import { getUser } from './store/user/actions';
import { resetUser } from './store/user/reducer';

import { Header } from './components/layout/header';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
	const [isUserLogged, setIsUserLogged] = useState<boolean | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const unsub = fireBaseAuth.onAuthStateChanged((user) => {
			setIsLoading(true);
			if (user?.email) {
				setIsUserLogged(true);
				getUser({ email: user.email, uid: user.uid });
			} else {
				setIsUserLogged(false);
				store.dispatch(resetUser(null));
			}
			setIsLoading(false);
		});

		return () => {
			unsub();
		};
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
