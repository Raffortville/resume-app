import { store } from '..';
import { IAlert } from '../../types/store';
import { setAlert, resetAlert } from './reducer';

export const displayAlert = ({
	payload,
	timer,
}: {
	payload: IAlert;
	timer?: number;
}): any => {
	store.dispatch(setAlert(payload));
	setTimeout(() => {
		store.dispatch(resetAlert());
	}, timer ?? 3000);
};
