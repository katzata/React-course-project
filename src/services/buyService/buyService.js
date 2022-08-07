import Parse from "../shared/parseApi";
import { getCurrentUser, getSomeUser } from "../userService/userService";

export async function buyItem({ cart, total, isGift, recipient, withDelivery, sendAddress }) {
    const Purchases = Parse.Object.extend("Purchases");
    const purchase = new Purchases();

    const Gifts = Parse.Object.extend("Gifts");
    const gift = new Gifts();

    const user = await getCurrentUser("raw");

    const userCollection = await handleCollection(user.attributes.collection);
    const collection = [...userCollection.attributes.collection];

    const cartFinal = [...cart];
    
    for (let i = 0; i < collection.length; i++) {
        for (let j = 0; j < cartFinal.length; j++) {
            if (collection[i].slug === cartFinal[j].slug && collection[i].platform === cartFinal[j].platform) {
                collection[i].quantity += cartFinal[j].quantity;
                cartFinal.splice(j, 1);
                j--;
            };
        };
    };

    purchase.set("buyer", user.id);
    purchase.set("items", cartFinal);
    purchase.set("isGift", isGift);

    if (sendAddress) purchase.set("deliveryAddress", sendAddress);

    if (!isGift) {
        const newCollection = [...collection, ...cartFinal].sort((a, b) => a.slug.localeCompare(b.slug));
        userCollection.set("collection", newCollection);
        
        purchase.set("recipient", user.id);
        purchase.set("items", cart);
        purchase.set("date", handleDate());

        return Promise.all([purchase.save(), userCollection.save()]);
    } else {
        const giftRecipient = await getSomeUser({ username: recipient });

        gift.set("sender", user.id);
        gift.set("recipient", giftRecipient.id);
        gift.set("gift", cart);
        gift.set("deliveryAddress", sendAddress);

        purchase.set("recipient", giftRecipient.id);

        return Promise.all([purchase.save(), gift.save()]);
    };
};

async function handleCollection(id) {console.log(id);
    const query = new Parse.Query("Collections");
    return query.get(id)
        .then(res => res)
        .catch((err) => {
        // !!!ERROR!!!
        console.log(err);
    });
};

function handleDate() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateObj = new Date();
    const date = {
        day: dateObj.getDay(),
        month: months[dateObj.getMonth()],
        year: dateObj.getFullYear(),
        hours: dateObj.getHours() > 9 ? dateObj.getHours() : `0${dateObj.getHours()}`,
        minutes: dateObj.getMinutes() > 9 ? dateObj.getMinutes() : `0${dateObj.getMinutes()}`,
        seconds: dateObj.getSeconds() > 9 ? dateObj.getSeconds() : `0${dateObj.getSeconds()}`
    };

    return date;
};