// const urlPrefix = "https://proxy.kashchiev.com";
const urlPrefix = "http://192.168.0.185:80";

export async function getList() {
    const url = `${urlPrefix}/list`;
    return requestHttpData(url);
};

export async function getRecommended() {
    return requestLocalData("./local/recommended.json");
};

export function search(itemType, name) {
    const queryUrl = `${urlPrefix}/${itemType}/search?name=${name}`;
    // const countUrl = `${urlPrefix}/${itemType}/count?name=${name}`;

    return requestHttpData(queryUrl)
};

export function getDetails(itemType, slug) {
    const url = `${urlPrefix}/${itemType}/details?slug=${slug}`;
    return requestHttpData(url);
};

export async function getPlatforms(query) {
    let url = `${urlPrefix}/platforms`;
    if (query) url += `?query=${query}`;

    return requestHttpData(url);
};

export async function getSingleGame(query) {
    const url = `${urlPrefix}/games/${query}`;
    return requestHttpData(url);
};

export async function getGames(page, platform) {
    let url = `${urlPrefix}/catalogue/games?page=${page * 50}`;
    if (platform) url += `&platform=${platform}`;
    return requestHttpData(url);
};

export async function getCount(section, id) {
    let url = `${urlPrefix}/games/count`;
    if (id) url += `?platform=${id}`

    return requestHttpData(url);
}

export async function getFeatured() {
    return requestLocalData("./local/featured.json");
};

export async function getFeaturedCategories() {
    const url = `${urlPrefix}/featuredcategories`;
    return requestHttpData(url);
};

export async function getAppDetails(appId) {
    const url = `${urlPrefix}/appdetails?appids=${appId}`;
    return requestHttpData(url);
};

async function requestHttpData(url, query) {
    const options = {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        }
    };

    try {
        const data = await doFetch(url, options);
        return data;
    } catch (err) {
        console.log("XHttpX", err);
    };
};

async function requestLocalData(localFile) {
    try {
        const data = await doFetch(localFile);
        return data;
    } catch (err) {
        console.log("XLocalX", err);
    };
};

function doFetch(url, options) {
    return fetch(url)
        .then(res => res.json())
        .then(res => res);
};