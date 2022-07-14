import './App.css';
import { BrowserRouter} from "react-router-dom";
import routes from './routes/routes';

import Header from './components/core/Header/Header';
import ErrorModal from './components/core/ErrorModal/ErrorModal';
import Footer from './components/core/Footer/Footer';

// import Home from './pages/Home/Home';
// import Catalogue from './pages/Catalogue/Catalogue';
// import NotFound from './pages/NotFound/NotFound';

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Header></Header>

				<main>
					<ErrorModal />
					{routes}
				</main>

				<Footer></Footer>
			</div>
		</BrowserRouter >
	);
}

export default App;
