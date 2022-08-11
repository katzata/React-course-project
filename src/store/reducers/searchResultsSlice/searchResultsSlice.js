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
    const [user] = Object.entries(window.localStorage).filter(el => el[0].includes("currentUser"));
    if (!user) return 0;
    
    const cart = (JSON.parse(user[1]).cart && JSON.parse(user[1]).cart.length) || 0;
    return user.length === 0 ? null : cart;
}

export const { setCartState } = cartSlice.actions;
export default cartSlice.reducer;