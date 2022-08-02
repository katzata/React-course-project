import { getCurrentUser } from "../userService/userService";

export async function addToCart({ name, slug, price, image_id }, platform, quantity) {
    const user = await getCurrentUser("raw");
    const userCart = Array.isArray(user.attributes.cart) ? [...user.attributes.cart] : [];
    const newCart = [];

    if (userCart.length === 0) {
        newCart.push({ name, slug, platform, quantity, price, image_id });
    } else {
        let updated = false;

        for (const item of userCart) {
            if (item.slug === slug && item.platform === platform) {
                item.quantity += 1;
                newCart.push(...userCart);
                updated = true;
                break;
            };
        };

        if (!updated) newCart.push(...userCart, { name, slug, platform, quantity, price, image_id });
    };

    user.set("cart", newCart);

    return user.save()
        .then((res) => res.attributes.cart)
        .catch(err => {
            // !!!ERROR!!!
            alert('Failed to create new object, with error code: ' + err.message);
        });
};

export async function clearCart() {
    const user = await getCurrentUser("raw");
    user.set("cart", []);

    return user.save()
        .then((res) => res.attributes.cart)
        .catch(err => {
            // !!!ERROR!!!
            alert('Failed to create new object, with error code: ' + err.message);
        });
};

export async function clearCartItem({ game, platform, quantity }) {
    const user = await getCurrentUser("raw");
    const userCart = getCart(user);

    for (const item of userCart) {
        if (item.game === game && item.platform === platform) {
            if (item.quantity - 1 <= 0) {
                userCart.splice(item, 1);
            } else {
                item.quantity -= 1;
            }
        }
    }

    user.set("cart", userCart);
};

function getCart(user) {
    return user.attributes.cart !== undefined ? [...user.attributes.cart] : [];
}