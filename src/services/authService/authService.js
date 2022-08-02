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