import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../components/pages/Home/Home";
import Catalogue from "../components/pages/Catalogue/Catalogue";
import Deals from "../components/pages/Deals/Deals";
import NotFound from "../components/pages/NotFound/NotFound";
import Platforms from "../components/pages/Platforms/Platforms";
import PlatformDetails from "../components/pages/PlatformDetails/PlatformDetails";
import GameDetails from "../components/pages/GameDetails/GameDetails";

const routes = (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/platforms/" element={<Platforms />} />
        <Route path="/platforms/:platform" element={<PlatformDetails />} />
        <Route path="/games/:slug" element={<GameDetails />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
);

export default routes;