import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Preloader from '../../layouts/Preloader/Preloader';
import { fetchCategoriesRequest } from '../../redux/slices/categoriesSlice';
import { fetchItemsRequest, setItems } from '../../redux/slices/itemsSlice';
import Product from '../Product/Product';
import './catalog.css';

const Catalog: FC<{ search?: boolean }> = ({ search = false }) => {
	const dispatch = useAppDispatch();

	const { categories, categoriesLoading, categoriesError } = useAppSelector(
		state => state.categories
	);
	const { items, itemsLoading, itemsError, fetchItems } = useAppSelector(
		state => state.items
	);

	const [activeCategory, setActiveCategory] = useState<number>(0);
	const [isInitialized, setIsInitialized] = useState<boolean>(false);
	const [isEmpty, setIsEmpty] = useState<boolean>(false);

	useEffect(() => {
		dispatch(fetchCategoriesRequest());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchItemsRequest({ categoryId: activeCategory }));
	}, [activeCategory, dispatch]);

	useEffect(() => {
		if (!isInitialized && itemsError) {
			setIsEmpty(true);
			setIsInitialized(true);
		} else if (!isInitialized && items.length > 0) {
			setIsInitialized(true);
		}
	}, [items, isInitialized, itemsError]);

	useEffect(() => {
		if (categoriesError) console.error(categoriesError);
		if (itemsError) console.error(itemsError);
	}, [categoriesError, itemsError]);

	if (isEmpty) {
		return null;
	}

	return (
		<>
			<section className='catalog'>
				<h2 className='text-center'>Каталог</h2>

				{search && (
					<form className='catalog-search-form form-inline'>
						<input className='form-control' placeholder='Поиск' />
					</form>
				)}
				{itemsLoading && !isInitialized && <Preloader />}
				{isInitialized && (
					<>
						<ul className='catalog-categories nav justify-content-center'>
							{categoriesLoading && <Preloader />}
							{!categoriesLoading && (
								<>
									<li key={0} className='nav-item'>
										<a
											className={`nav-link ${
												activeCategory === 0 ? 'active' : ''
											}`}
											href='javascript:void(0);'
											onClick={() => {
												setIsInitialized(false);
												dispatch(setItems([]));
												setActiveCategory(0);
											}}
										>
											Все
										</a>
									</li>
									{categories.map(category => (
										<li key={category.id} className='nav-item'>
											<a
												className={`nav-link ${
													activeCategory === category.id ? 'active' : ''
												}`}
												href='javascript:void(0);'
												onClick={() => {
													setIsInitialized(false);
													dispatch(setItems([]));
													setActiveCategory(category.id);
												}}
											>
												{category.title}
											</a>
										</li>
									))}
								</>
							)}
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

						<div className='text-center'>
							{itemsLoading && fetchItems && <Preloader />}
							{!itemsLoading && fetchItems && items.length >= 6 && (
								<button
									onClick={() => {
										if (activeCategory === 0) {
											dispatch(fetchItemsRequest({ offset: items.length }));
										} else
											dispatch(
												fetchItemsRequest({
													categoryId: activeCategory,
													offset: items.length,
												})
											);
									}}
									className='btn btn-outline-primary'
								>
									{!itemsError ? 'Загрузить ещё' : 'Попробовать ещё'}
								</button>
							)}
						</div>
					</>
				)}
			</section>
		</>
	);
};

export default Catalog;
