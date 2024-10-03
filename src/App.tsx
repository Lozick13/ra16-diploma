import { Route, Routes } from 'react-router-dom';
import './App.css';
import CartPage from './pages/CartPage/CartPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import InfoPage from './pages/InfoPage/InfoPage';
import MainPage from './pages/MainPage/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProductPage from './pages/ProductPage/ProductPage';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' index element={<MainPage />} />
				<Route path='/catalog' element={<CatalogPage />} />
				<Route path='/info' element={<InfoPage />} />
				<Route path='/product/:id' element={<ProductPage />} />
				<Route path='/cart' element={<CartPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</>
	);
}

export default App;
