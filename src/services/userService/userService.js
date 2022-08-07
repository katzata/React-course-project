import Parse from "../shared/parseApi";

export function isLoged() {
    const storage = Object.keys(window.localStorage);
    const userCheck = storage.some(el => el.includes("currentUser"));
    return userCheck;
};

export async function getCurrentUser(raw) {
    const user = await Parse.User.current();
    if (!user) return;

    if (raw !== "raw") {
        const [collection, purchases] = await Promise.all([getCollection(user.attributes.collection), getPurchases(user.id)]);
        const formated = user && formatResponse(user, collection, purchases);

        return formated;
    };

    return user;
};

export async function editUser({ username, email, address }) {
    const checkUsername = username.match(/^[a-zA-Z0-9.]+/);
    const checkEmail = email.match(/[a-zA-Z0-9]*@[a-zA-Z0-9]*.[a-zA-Z0-9]*/);
    const checkAddress = address.match(/[a-zа-яA-ZА-Я\s\-\d.,]+/);

    if (!checkUsername || !checkEmail || !checkAddress) return false;

    const user = await Parse.User.current();

    if (username !== user.attributes.username) user.set("username", username);
    if (email !== user.attributes.email) user.set("email", email);
    if (address !== user.attributes.address) user.set("address", address);

    return parseSave(user);
};

export async function addToWishlist(item) {
    const user = await Parse.User.current();
    const { wishlist } = user.attributes;
    // console.log(item);
    for (const { name, slug } of wishlist) {
        if (item.name === name && item.slug === slug) return false;
    };

    user.set("wishlist", [...wishlist, item]);

    return parseSave(user);
};

export async function removeFromWishlist(game) {
    const user = await Parse.User.current();
    const wishlist = [...user.attributes.wishlist];

    for (let i = 0; i < wishlist.length; i++) {
        const { name, slug } = wishlist[i];

        if (game.name === name && game.slug === slug) {
            wishlist.splice(i, 1);

            user.set("wishlist", wishlist);
            const response = await parseSave(user);
            return response.attributes.wishlist;
        };
    };
};

export async function getSomeUser(query) {
    const userQuey = new Parse.Query(Parse.User);
    const [field, value] = Object.entries(query)[0];
    userQuey.equalTo(field, value);

    return userQuey.find()
        .then(res => res[0])
        .catch(err => console.log(err));
}

export async function getPurchases(userId) {
    if (!userId) return;
    const purchasesQuery = new Parse.Query("Purchases");

    purchasesQuery.equalTo("buyer", userId);
    return purchasesQuery.find();
};

export async function getCollection(collectionId) {
    if (!collectionId) return;
    const collectionQuery = new Parse.Query("Collections");

    collectionQuery.equalTo("objectId", collectionId);
    return collectionQuery.find().then(res => res[0].attributes.collection);
};

function parseSave(classObject) {
    return classObject.save()
        .then((res) => res)
        .catch(err => {
            // !!!ERROR!!!
            alert("Failed to create new object, with error code: " + err.message);
            return false;
        });
}

function formatResponse(res, collection, purchases) {
    const { className, id, attributes } = res;
    const { username, email, address, cart, wishlist } = attributes;

    return {
        className,
        id,
        username,
        email,
        address,
        cart,
        wishlist,
        collection,
        purchases
    };
};