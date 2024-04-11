import { configureStore } from "@reduxjs/toolkit";
import connectionInfoReducer from './connectionSlice';

export const store = configureStore({
	reducer : {
		connectionInfo : connectionInfoReducer,

	}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;