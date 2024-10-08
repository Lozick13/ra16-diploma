import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Preloader from '../../layouts/Preloader/Preloader';
import { fetchTopSalesItemsRequest } from '../../redux/slices/topSalesSlice';
import Product from '../Product/Product';
import './topsales.css';

const TopSales = () => {
	const dispatch = useAppDispatch();
	const { items, loading, error } = useAppSelector(state => state.topSales);

	useEffect(() => {
		dispatch(fetchTopSalesItemsRequest());
	}, [dispatch]);

	useEffect(() => {
		if (error) console.error(error);
	}, [error]);

	return (
		<>
			{!error && (
				<section className='top-sales'>
					<h2 className='text-center'>Хиты продаж!</h2>
					{loading && <Preloader />}
					{items && !loading && (
						<div className='row'>
							{items.map(item => (
								<Product
									key={item.id}
									id={item.id}
									title={item.title}
									url={item.images[0]}
									price={item.price}
								/>
							))}
						</div>
					)}
				</section>
			)}
		</>
	);
};

export default TopSales;
