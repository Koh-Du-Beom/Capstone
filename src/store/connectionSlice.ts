import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ConnectionInfo from "../types/connectionInfo.type";

const initialState : ConnectionInfo = {
	userName : '',
	videoDevice : '',
	audioDevice : '',
}

//연결 기기 정보(참여 전, 유저 이름과, 연결 기기정보 등)

export const ConnectionInfoSlice = createSlice({
	name : 'connectionInfo',
	initialState,
	reducers: {
		updateConnectionInfo: (state, action : PayloadAction<ConnectionInfo>) => {
			return { ...state, ...action.payload };
		}
	}
});

export const { updateConnectionInfo } = ConnectionInfoSlice.actions;
export default ConnectionInfoSlice.reducer;