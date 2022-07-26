// const urlPrefix = "https://proxy.kashchiev.com";
const urlPrefix = "http://192.168.0.185:80";

export async function getList() {
    const url = `${urlPrefix}/list`;
    return requestHttpData(url);
};

export async function getRecommended() {
    // const url = `${urlPrefix}/details`;
    
    // requestHttpData(url).then(res => {
        
        // console.log(new Date(res[1].first_release_date));
        // console.log(res);
    // });

    return requestLocalData("./local/recommended.json");
};

export function getDetails(itemType, slug) {
    const url = `${urlPrefix}/${itemType}/details?slug=${slug}`;
    console.log(url);
    return requestHttpData(url);
};

export async function getPlatforms(query) {
    let url = `${urlPrefix}/platforms`;
    if (query) url += `/${query}`;

    return requestHttpData(url);
};

export async function getSingleGame(query) {
    const url = `${urlPrefix}/games/${query}`;
    return requestHttpData(url);
};

export async function getGames(query) {
    const url = `${urlPrefix}/games/${query}`;
    return requestHttpData(url);
};

export async function getFeatured() {
    const url = `${urlPrefix}/featured`;
    return requestHttpData(url);
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
            "Content-type": "application/x-www-form-urlencoded"
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
    return fetch(url, options)
        .then(res => res.json())
        .then(res => res);
};