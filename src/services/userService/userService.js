import Parse from "../shared/parseApi";

export function isLoged() {
    const storage = Object.keys(window.localStorage);
    const userCheck = storage.some(el => el.includes("currentUser"));
    return userCheck;
};

export async function getCurrentUser(rawResponse) {
    const user = await Parse.User.current()/* .then(res => formatResponse(res)) */;
    const formated = user && formatResponse(user);

    function formatResponse(res) {
        const { className, id, attributes } = res;
        const { username, email, cart, collection } = attributes;

        return {
            className,
            id,
            username,
            email,
            cart,
            collection
        };
    };

    return !rawResponse ? formated : user;
};