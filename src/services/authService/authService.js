import Parse from "../shared/parseApi";

export async function registerUser(username, email, password) {
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
            console.log(err);
        });
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