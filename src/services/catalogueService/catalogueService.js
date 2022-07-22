// const urlPrefix = "https://proxy.kashchiev.com";
const urlPrefix = "http://192.168.0.185:80";

export async function getList() {
    return requestHttpData(`${urlPrefix}/list`);
};

export async function getRecommended() {
    const testQ = "max payne 2";
    // const testQ = "maxpayne 2";
    requestHttpData(`${urlPrefix}/details`, testQ).then(res => {
        
        // console.log(new Date(res[1].first_release_date));
        // console.log(res);
    });

    return requestLocalData("./local/recommended.json");
};

export async function getPlatforms(query) {
    let url = `${urlPrefix}/platforms`;

    if (query) url += `/${query}`;

    return requestHttpData(url);
};

export async function getSingleGame(query) {
    return requestHttpData(`${urlPrefix}/games/${query}`);
};

export async function getGames(query) {
    return requestHttpData(`${urlPrefix}/games/${query}`);
};

export async function getFeatured() {
    return requestHttpData(`${urlPrefix}/featured`);
};

export async function getFeaturedCategories() {
    // return requestHttpData("https://proxy.kashchiev.com/featuredcategories");
    return requestHttpData(`${urlPrefix}/featuredcategories`);
};

export async function getAppDetails(appId) {
    return requestHttpData(`${urlPrefix}/appdetails?appids=${appId}`);
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
            .then(res => res.text())
            .then(res => res);

        return data;
    } catch (err) {
        console.log("XHttpX", err);
    };
};

async function requestLocalData(localFile) {
    try {
        const data = await fetch(localFile)
            .then(res => res.json())
            .then(res => res);
        return data;
    } catch (err) {
        console.log("XLocalX", err);
    };
};