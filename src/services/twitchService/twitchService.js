const urlPrefix = "https://proxy.kashchiev.com";
// const urlPrefix = "http://192.168.0.185:80";

export async function getStreams(game) {
    if (!game) return null;

    const url = `${urlPrefix}/twitch/streams?query=${game}&sort=views`;

    try {
        return doFetch(url)
    } catch (err) {
        console.log("XtwitcX", err);
        return null;
    };
};

export async function getTwitchGames(game) {
    if (!game) return null;

    const url = `${urlPrefix}/twitch/games?query=${game}`;

    try {
        return doFetch(url)
    } catch (err) {
        console.log("XtwitcX", err);
        return null;
    };
};

function doFetch(url) {
    return fetch(url)
        .then(res => res.json())
        .then(res => res);
};