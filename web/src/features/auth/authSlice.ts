import { createSlice } from "@reduxjs/toolkit"
import { store } from "../../app/store";


export interface AuthState {
    user: string | null;
    token: string | null;
  }
  
  const initialState: AuthState = {
    user: null,
    token: null,
  };
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload
            state.user = user
            state.token = accessToken
        },
        logOut: (state) => {
            state.user = null
            state.token = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer
export type RootState = ReturnType<typeof store.getState>;

export const selectCurrentUser = (state:RootState) => state.auth.user
export const selectCurrentToken = (state:RootState) => state.auth.token