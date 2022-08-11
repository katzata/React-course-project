import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../components/pages/Home/Home";
import Catalogue from "../components/pages/Catalogue/Catalogue";
import Cart from "../components/pages/Cart/Cart";
import UserDetails from "../components/pages/UserDetails/UserDetails";
import Search from "../components/pages/Search/Search";
import NotFound from "../components/pages/NotFound/NotFound";
import Platforms from "../components/pages/Platforms/Platforms";
import PlatformDetails from "../components/pages/PlatformDetails/PlatformDetails";
import GameDetails from "../components/pages/GameDetails/GameDetails";

const routes = (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<UserDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/404" element={<NotFound />} />
        
        <Route path="/platforms/" element={<Platforms />} />
        <Route path="/platforms/:platform" element={<PlatformDetails />} />
        <Route path="/games/:slug" element={<GameDetails />} />
        
        <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
);

export default routes;