import Parse from "parse";

Parse.initialize("2FbyS52G7fuLqkFU3YE1WUvmzWAffvYvf7aTH4m7", "EeJwrsDol7v2WWxZrtJy9TOUcIhsgNSCdR3usBbt");
Parse.serverURL = "https://parseapi.back4app.com/";

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

export async function getCurrentUser() {
    const user = await Parse.User.current()/* .then(res => formatResponse(res)) */;
    const formated = user && formatResponse(user);

    function formatResponse(res) {
        const { className, id, attributes } = res;
        const { username, email } = attributes;

        return {
            className,
            id,
            username,
            email
        };
    };

    console.log(formated);
    return formated;
};

export function isLoged() {
    const test = Object.keys(window.localStorage);
    const userCheck = test.some(el => el.includes("currentUser"));
    return userCheck;
};