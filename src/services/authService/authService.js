import Parse from "../shared/parseApi";

export function registerUser(username, email, password) {
    let user = new Parse.User();

    user.set("username", username);
    user.set("email", email);
    user.set("password", password);

    user.save()
        .then((res) => {
            console.log(res);
        })
        .catch(err => console.log(err));
};

export async function loginUser(username, password) {
    try {
        return await Parse.User.logIn(username, password);
    } catch (error) {
        return null;
    };
};

export async function logoutUser() {
    try {
        const user = await Parse.User.logOut();
        return user;
    } catch (err) {
        console.log(err);
        return err;
    };
};

export default function getPoint(params) {
    
}

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

export function isLoged() {
    const lst = Object.keys(window.localStorage);
    const userCheck = lst.some(el => el.includes("currentUser"));
    return userCheck;
};