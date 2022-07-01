import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Catalogue from "./pages/Catalogue/Catalogue";
import NotFound from "./pages/NotFound/NotFound";

import Header from './components/core/Header/Header';
import Footer from './components/core/Footer/Footer';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header></Header>
				
				<main>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/catalogue" element={<Catalogue />} />
						<Route path="/404" element={<NotFound />} />
						<Route path="*" element={<Navigate replace to="/404" />} />
					</Routes>
				</main>
				
				<Footer></Footer>
			</BrowserRouter>
		</div>
	);
}

export default App;
