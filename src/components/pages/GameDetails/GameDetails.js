import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./GameDetails.module.css";

import { getDetails } from "../../../services/catalogueService/catalogueService";

const test = {
    "id": 29642,
    "slug": "silent-hill-2",
    "name": "Silent Hill 2",
    "name_original": "Silent Hill 2",
    "description": "<p>Silent Hill 2 is an action-adventure game developed by Team Silent and Creature Labs. It came out on 24-09-2001. It was published by Konami. On review aggregator Metacritic, Silent Hill 2 has a score of 89. The game is rated as \"Exceptional\" on RAWG. <br>You can play Silent Hill 2 on PlayStation 3, Xbox, Xbox 360 and PC. <br>It was produced by Akihiro Imamura. It was directed by Masashi Tsuboyama. It was scored by Akira Yamaoka. <br></p>",
    "metacritic": 89,
    "metacritic_platforms": [
        {
            "metascore": 89,
            "url": "https://www.metacritic.com/game/playstation-2/silent-hill-2",
            "platform": {
                "platform": 15,
                "name": "PlayStation 2",
                "slug": "playstation2"
            }
        }
    ],
    "released": "2001-09-24",
    "tba": false,
    "updated": "2022-07-21T10:12:54",
    "background_image": "https://media.rawg.io/media/games/003/0033ae7d21418ff5a7807ab2c7d90247.jpg",
    "background_image_additional": "https://media.rawg.io/media/screenshots/884/884f703d9e53ee31343330508e786114.jpg",
    "website": "",
    "rating": 4.42,
    "rating_top": 5,
    "ratings": [
        {
            "id": 5,
            "title": "exceptional",
            "count": 495,
            "percent": 69.23
        },
        {
            "id": 4,
            "title": "recommended",
            "count": 131,
            "percent": 18.32
        },
        {
            "id": 1,
            "title": "skip",
            "count": 54,
            "percent": 7.55
        },
        {
            "id": 3,
            "title": "meh",
            "count": 35,
            "percent": 4.9
        }
    ],
    "reactions": {
        "1": 8,
        "2": 1,
        "3": 5,
        "4": 4,
        "6": 1,
        "7": 1,
        "10": 6,
        "11": 2,
        "12": 5,
        "19": 1,
        "20": 1
    },
    "added": 1299,
    "added_by_status": {
        "yet": 109,
        "owned": 322,
        "beaten": 567,
        "toplay": 198,
        "dropped": 87,
        "playing": 16
    },
    "playtime": 0,
    "screenshots_count": 91,
    "movies_count": 0,
    "creators_count": 5,
    "achievements_count": 0,
    "parent_achievements_count": 0,
    "reddit_url": "",
    "reddit_name": "",
    "reddit_description": "",
    "reddit_logo": "",
    "reddit_count": 0,
    "twitch_count": 150,
    "youtube_count": 1000000,
    "reviews_text_count": 11,
    "ratings_count": 704,
    "suggestions_count": 359,
    "alternative_names": [],
    "metacritic_url": "https://www.metacritic.com/game/playstation-2/silent-hill-2",
    "parents_count": 0,
    "additions_count": 0,
    "game_series_count": 11,
    "user_game": null,
    "reviews_count": 715,
    "saturated_color": "0f0f0f",
    "dominant_color": "0f0f0f",
    "parent_platforms": [
        {
            "platform": {
                "id": 1,
                "name": "PC",
                "slug": "pc"
            }
        },
        {
            "platform": {
                "id": 2,
                "name": "PlayStation",
                "slug": "playstation"
            }
        },
        {
            "platform": {
                "id": 3,
                "name": "Xbox",
                "slug": "xbox"
            }
        }
    ],
    "platforms": [
        {
            "platform": {
                "id": 16,
                "name": "PlayStation 3",
                "slug": "playstation3",
                "image": null,
                "year_end": null,
                "year_start": null,
                "games_count": 3610,
                "image_background": "https://media.rawg.io/media/games/588/588c6bdff3d4baf66ec36b1c05b793bf.jpg"
            },
            "released_at": "2001-09-24",
            "requirements": []
        },
        {
            "platform": {
                "id": 80,
                "name": "Xbox",
                "slug": "xbox-old",
                "image": null,
                "year_end": null,
                "year_start": null,
                "games_count": 709,
                "image_background": "https://media.rawg.io/media/games/9c4/9c47f320eb73c9a02d462e12f6206b26.jpg"
            },
            "released_at": "2001-09-24",
            "requirements": []
        },
        {
            "platform": {
                "id": 14,
                "name": "Xbox 360",
                "slug": "xbox360",
                "image": null,
                "year_end": null,
                "year_start": null,
                "games_count": 2770,
                "image_background": "https://media.rawg.io/media/games/d1a/d1a2e99ade53494c6330a0ed945fe823.jpg"
            },
            "released_at": "2001-09-24",
            "requirements": []
        },
        {
            "platform": {
                "id": 4,
                "name": "PC",
                "slug": "pc",
                "image": null,
                "year_end": null,
                "year_start": null,
                "games_count": 460708,
                "image_background": "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg"
            },
            "released_at": "2001-09-24",
            "requirements": []
        },
        {
            "platform": {
                "id": 15,
                "name": "PlayStation 2",
                "slug": "playstation2",
                "image": null,
                "year_end": null,
                "year_start": null,
                "games_count": 1931,
                "image_background": "https://media.rawg.io/media/games/97a/97a5fee8bba1189f70a9874171f45195.jpg"
            },
            "released_at": "2001-09-24",
            "requirements": []
        }
    ],
    "stores": [],
    "developers": [
        {
            "id": 14595,
            "name": "Team Silent",
            "slug": "team-silent",
            "games_count": 4,
            "image_background": "https://media.rawg.io/media/screenshots/333/333b1a057a32979e02fcd4fc933df42e.jpg"
        },
        {
            "id": 13199,
            "name": "Creature Labs",
            "slug": "creature-labs",
            "games_count": 13,
            "image_background": "https://media.rawg.io/media/screenshots/e22/e226c20190666caafc69ce8793e50449.jpg"
        }
    ],
    "genres": [
        {
            "id": 4,
            "name": "Action",
            "slug": "action",
            "games_count": 155362,
            "image_background": "https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg"
        },
        {
            "id": 3,
            "name": "Adventure",
            "slug": "adventure",
            "games_count": 117922,
            "image_background": "https://media.rawg.io/media/games/e2d/e2d3f396b16dded0f841c17c9799a882.jpg"
        }
    ],
    "tags": [
        {
            "id": 13,
            "name": "Atmospheric",
            "slug": "atmospheric",
            "language": "eng",
            "games_count": 23160,
            "image_background": "https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg"
        },
        {
            "id": 42,
            "name": "Great Soundtrack",
            "slug": "great-soundtrack",
            "language": "eng",
            "games_count": 3206,
            "image_background": "https://media.rawg.io/media/games/b7b/b7b8381707152afc7d91f5d95de70e39.jpg"
        },
        {
            "id": 41,
            "name": "Dark",
            "slug": "dark",
            "language": "eng",
            "games_count": 11313,
            "image_background": "https://media.rawg.io/media/games/5c0/5c0dd63002cb23f804aab327d40ef119.jpg"
        },
        {
            "id": 17,
            "name": "Survival Horror",
            "slug": "survival-horror",
            "language": "eng",
            "games_count": 6493,
            "image_background": "https://media.rawg.io/media/games/dd5/dd50d4266915d56dd5b63ae1bf72606a.jpg"
        },
        {
            "id": 2114,
            "name": "psychological-horror",
            "slug": "psychological-horror-2",
            "language": "eng",
            "games_count": 29,
            "image_background": "https://media.rawg.io/media/screenshots/8c2/8c2efb985970270137f877a670bcc3cf.jpg"
        }
    ],
    "publishers": [
        {
            "id": 10691,
            "name": "Konami",
            "slug": "konami",
            "games_count": 734,
            "image_background": "https://media.rawg.io/media/games/85e/85e4c8a78cf9b82b5ed19262fe00c00f.jpg"
        }
    ],
    "esrb_rating": null,
    "clip": null,
    "description_raw": ""
};

function GameDetails() {
    const { gameId } = useParams();
    const [details, setDetails] = useState(test);
    console.log(test);

    useEffect(() => {
        // getDetails("games", gameId).then(res => {
        //     console.log(res);
        //     setDetails(res);
        // });
    }, [gameId]);

    return details && details.name 
        ?
            (
                <section className={styles.gameDetails}>
                    <article className={styles.description}>
                        <div className={styles.coverContainer}>
                            <img src={details && details.background_image ? details.background_image : ""} alt={details.name + " image"} />
                        </div>

                        <div className={styles.infoContainer}>
                            <h2>{details.name}</h2>
                            
                            <div>
                                <p className={styles.infoContainer}>
                                    User rating
                                    <span></span>
                                </p>
                            </div>
                        </div>
                    </article>
                </section>
            )
        :
            <section className={styles.gameDetails}>LOADING</section>;
};

export default GameDetails;