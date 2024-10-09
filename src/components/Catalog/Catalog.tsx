import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Preloader from '../../layouts/Preloader/Preloader';
import {
	fetchItemsRequest,
	fetchOffsetItemsRequest,
} from '../../redux/slices/itemsSlice';
import Product from '../Product/Product';
import './catalog.css';

const Catalog: FC<{ search?: boolean }> = ({ search = false }) => {
	const dispatch = useAppDispatch();
	const {
		items,
		itemsLoading,
		itemsError,
		offsetItemsError,
		offsetItemsLoading,
		fetchOffsetItems,
	} = useAppSelector(state => state.items);

	useEffect(() => {
		dispatch(fetchItemsRequest());
	}, [dispatch]);

	useEffect(() => {
		if (itemsError) console.error(itemsError);
	}, [itemsError]);

	useEffect(() => {
		if (offsetItemsError) console.error(offsetItemsError);
	}, [offsetItemsError]);

	return (
		<>
			{!itemsError && (
				<section className='catalog'>
					<h2 className='text-center'>Каталог</h2>
					{itemsLoading && <Preloader />}
					{items && !itemsLoading && (
						<>
							{search && (
								<form className='catalog-search-form form-inline'>
									<input className='form-control' placeholder='Поиск' />
								</form>
							)}
							<ul className='catalog-categories nav justify-content-center'>
								<li className='nav-item'>
									<a className='nav-link active' href='#'>
										Все
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='#'>
										Женская обувь
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='#'>
										Мужская обувь
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='#'>
										Обувь унисекс
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='#'>
										Детская обувь
									</a>
								</li>
							</ul>

							<div className='row'>
								{items.map(item => (
									<Product
										key={item.id}
										catalog={true}
										id={item.id}
										title={item.title}
										url={item.images[0]}
										price={item.price}
									/>
								))}
							</div>
							{offsetItemsLoading && <Preloader />}
							{fetchOffsetItems && !offsetItemsLoading && (
								<div className='text-center'>
									<button
										onClick={() =>
											dispatch(fetchOffsetItemsRequest(items.length))
										}
										className='btn btn-outline-primary'
									>
										{!offsetItemsError ? 'Загрузить ещё' : 'Попробовать ещё'}
									</button>
								</div>
							)}
						</>
					)}
				</section>
			)}
		</>
	);
};

export default Catalog;
