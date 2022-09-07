import Parse from "../shared/parseApi";

export async function registerUser(username, email, password) {
    if (username === "" || email === "" || password === "") return false;
    let user = new Parse.User();

    user.set("username", username);
    user.set("email", email);
    user.set("password", password);

    const collection = await initCollection();
    user.set("collection", collection.id);

    return user.save()
        .then(res => {
            return res ? loginUser(username, password) : null;
        })
        .catch(err => {
            // !!!ERROR!!!
            throw new Error(err.message);
        });
};

export async function loginUser(username, password) {

    return Parse.User.logIn(username, password)
        .then(res => res)
        .catch(err => err);
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

async function initCollection() {
    const Collections = Parse.Object.extend("Collections");
    const collection = new Collections();

    return collection.save()
        .then(res => res)
        .catch(err => {
            // !!!ERROR!!!
            console.log(err);
        });
};