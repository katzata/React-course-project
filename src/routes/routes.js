import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import Catalogue from "../pages/Catalogue/Catalogue";
import NotFound from "../pages/NotFound/NotFound";

const routes = (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
    </Routes>
);

export default routes;