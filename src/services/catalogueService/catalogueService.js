export async function getRecommended() {
    // return requestHttpData("https://proxy.kashchiev.com/recommended");
    return requestLocalData("./local/recommended.json");
};

export async function getIcon(icon) {
    // return requestHttpData("https://proxy.kashchiev.com/recommended");
    return requestIcon(`./icons/${icon}.svg`);
};

export async function getPlatforms() {
    // return requestHttpData("https://proxy.kashchiev.com/platforms");
    return requestHttpData("http://localhost/platforms");
};

export async function getSingleGame(query) {
    return requestHttpData(`http://localhost/games/${query}`);
};

export async function getGames(query) {
    // return requestHttpData("https://proxy.kashchiev.com/platforms");
    return requestHttpData(`http://localhost/games/${query}`);
};

export async function getFeatured() {
    // return requestHttpData("https://proxy.kashchiev.com/featured");
    return requestHttpData("http://localhost/featured");
};

export async function getFeaturedCategories() {
    // return requestHttpData("https://proxy.kashchiev.com/featuredcategories");
    return requestHttpData("http://localhost/featuredcategories");
};

export async function getAppDetails(appId) {
    // return requestHttpData(`https://proxy.kashchiev.com/appdetails?appids=${appId}`);
    return requestHttpData(`http://localhost/appdetails?appids=${appId}`);
};

async function requestHttpData(url, query) {
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        }
    };
    try {
        const data = await fetch(url, options)
            // .then(res => res.json())
            .then(res => res);

        return data;
    } catch (err) {
        console.log("XHttpX", err);
    };
};

async function requestLocalData(localFile) {
    // const urlPrefix = `https://proxy.kashchiev.com${sectionQuery}`;
    // const urlPrefix = `http://localhost${sectionQuery}/`;

    try {
        const data = await fetch(localFile)
            .then(res => res.json())
            .then(res => res);
        return data;
    } catch (err) {
        console.log("XLocalX", err);
    };
};

async function requestIcon(icon) {
    try {
        const data = await fetch(icon)
            .then(res => console.log(res))
            // .then(res => res);
        // return data;
    } catch (err) {
        console.log("XLocalX", err);
    };
}