import Parse from "../shared/parseApi";
import { getCurrentUser } from "../authService/authService";

export async function addToCart(game, platform, quantity) {
    const user = await getCurrentUser("raw");
    const userCart = [...user.attributes.cart];
    // const cart = [...user.attributes.cart, { game, platform, quantity }] : [{ game, platform, quantity }];
    const newCart = [];

    if (Array.isArray(userCart)) {
        console.log(userCart);

        for (const item of userCart) {
            if (item.game === game && item.platform === platform) {
                item.quantity = Number(item.quantity) + 1;
                newCart.push(...userCart);
                break;
            };
        };

        if (newCart.length > 0) newCart.push(...userCart, { game, platform, quantity });
    } else {
        newCart.push({ game, platform, quantity });
    };

    console.log(newCart);
    // user.set("cart", newCart);

    // user.save()
    //     .then((res) => {
    //         console.log("yay");
    //     }, (error) => {
    //         // !!!ERROR!!!
    //         alert('Failed to create new object, with error code: ' + error.message);
    //     });
};

export function clearCartItem() {
    
};

export async function getCartContents() {
    const user = await getCurrentUser();
    return user.cart;
};

export async function getCartContentsCount() {
    const user = await getCurrentUser();
    return user.cart.length;
};

function handleCart() {
    
}