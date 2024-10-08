import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './layouts/Footer/Footer';
import Header from './layouts/Header/Header';
import AboutPage from './pages/AboutPage/AboutPage';
import CartPage from './pages/CartPage/CartPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import MainPage from './pages/MainPage/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProductPage from './pages/ProductPage/ProductPage';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' index element={<MainPage />} />
				<Route path='/catalog' element={<CatalogPage />} />
				<Route path='/about' element={<AboutPage />} />
				<Route path='/contacts' element={<ContactsPage />} />
				<Route path='/product/:id' element={<ProductPage />} />
				<Route path='/cart' element={<CartPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
