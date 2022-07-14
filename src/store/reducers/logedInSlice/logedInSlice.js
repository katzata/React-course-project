import { createSlice } from '@reduxjs/toolkit'
import { isLoged } from '../../../services/authService/authService';

export const logedInSlice = createSlice({
    name: "isLoged",
    initialState: {
        value: isLoged(),
    },
    reducers: {
        setLoggedState: (state) => {
            state.value = isLoged();
        }
    },
});

export const { setLoggedState } = logedInSlice.actions;
export default logedInSlice.reducer