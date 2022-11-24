import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { userReducer } from './user';
import { alertReducer } from './alert';
import { resumeReducer } from './resume';

const rootReducer = combineReducers({
	userReducer,
	alertReducer,
	resumeReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
