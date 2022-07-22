import { useState } from "react";

const useGamesList = () => {
    const [gamesList, setGamesList] = useState(null);

    // useEffect(() => {
    //     fetch(url)
    //         .then((res) => res.json())
    //         .then((data) => setData(data));
    // }, [url]);

    return [gamesList, setGamesList];
};

export default useGamesList;