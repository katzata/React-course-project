import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        value: handleCart(),
    },
    reducers: {
        setCartState: (state, data) => {
            state.value = data.payload;
        }
    },
});

function handleCart() {
    const user = Object.entries(window.localStorage).filter(el => el[0].includes("currentUser"));
    return user.length === 0 ? null : JSON.parse(user[0][1]).cart.length;
}

export const { setCartState } = cartSlice.actions;
export default cartSlice.reducer;