import Parse from "../shared/parseApi";
import { getCurrentUser } from "../authService/authService";

export async function buyItem(item, platform, quantity) {
    const Purchases = Parse.Object.extend("Purchases");
    const purchase = new Purchases();
    const user = await getCurrentUser("raw");

    purchase.set("slug", item);
    purchase.set("buyer", user);
    purchase.set("quantity", quantity);

    purchase.save()
        .then((res) => {
            console.log(res);
            alert('New object created with objectId: ' + res.id);
        }, (error) => {
            alert('Failed to create new object, with error code: ' + error.message);
        });
};