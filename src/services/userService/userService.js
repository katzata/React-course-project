import Parse from "../shared/parseApi";

export function isLoged() {
    const storage = Object.keys(window.localStorage);
    const userCheck = storage.some(el => el.includes("currentUser"));
    return userCheck;
};

export async function getCurrentUser(raw) {
    const user = await Parse.User.current();
    const formated = user && formatResponse(user);

    function formatResponse(res) {
        const { className, id, attributes } = res;
        const { username, email, address, cart, collection } = attributes;

        return {
            className,
            id,
            username,
            email,
            address,
            cart,
            collection
        };
    };

    return raw ? user : formated;
};

export async function editUser({ username, email, address }) {
    const checkUsername = username.match(/^[a-zA-Z0-9.]+/);
    const checkEmail = address.match(/[a-zA-Z0-9]*@[a-zA-Z0-9]*.[a-zA-Z0-9]*/);
    const checkAddress = address.match(/[a-zа-яA-ZА-Я\s\-\d\.\,]+/);

    if (!checkUsername || !checkEmail || !checkAddress) return false;

    const user = await Parse.User.current();
    console.log(user.attributes.username);

    if (username !== user.attributes.username) user.set("username", username);
    if (email !== user.attributes.email) user.set("email", email);
    if (address !== user.attributes.address) user.set("address", address);

    return user.save()
        .then((res) => res)
        .catch(err => {
            // !!!ERROR!!!
            alert('Failed to create new object, with error code: ' + err.message);
        });
};