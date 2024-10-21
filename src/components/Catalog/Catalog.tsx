import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCategoriesRequest } from '../../redux/slices/categoriesSlice';
import { fetchItemsRequest, setItems } from '../../redux/slices/itemsSlice';
import Preloader from '../Preloader/Preloader';
import Product from '../Product/Product';
import './catalog.css';

const Catalog: FC<{ search?: boolean }> = ({ search = false }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { categories, categoriesLoading, categoriesError } = useAppSelector(
    state => state.categories,
  );
  const { items, itemsLoading, itemsError, fetchItems } = useAppSelector(
    state => state.items,
  );

  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [searchData, setSearchData] = useState<string>('');
  const [fetchItemsParams, setFetchItemsParams] = useState<{
    categoryId?: number | undefined;
    offset?: number | undefined;
    quest?: string | undefined;
  }>({});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    setFetchItemsParams(prev => {
      return { ...prev, quest: searchData };
    });
  };

  useEffect(() => {
    if (location.state?.quest) {
      setFetchItemsParams(prev => {
        return { ...prev, quest: location.state.quest };
      });
      setSearchData(location.state.quest);
    }
  }, [location]);

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (fetchItemsParams) {
      dispatch(fetchItemsRequest(fetchItemsParams));
    }
  }, [dispatch, fetchItemsParams]);

  useEffect(() => {
    setFetchItemsParams(prev => {
      return { ...prev, categoryId: activeCategory || undefined };
    });
  }, [activeCategory]);

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
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>

      {search && (
        <form onSubmit={handleSearch} className="catalog-search-form form-inline">
          <input
            id="search"
            name="search"
            type="text"
            value={searchData}
            required={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchData(e.target.value)
            }
            className="form-control"
            placeholder="Поиск"
          />
        </form>
      )}

      <ul className="catalog-categories nav justify-content-center">
        {categoriesLoading && <Preloader />}
        {!categoriesLoading && categories && (
          <>
            <li key={0} className="nav-item">
              <a
                className={`nav-link ${activeCategory === 0 ? 'active' : ''}`}
                href="javascript:void(0);"
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
              <li key={category.id} className="nav-item">
                <a
                  className={`nav-link ${activeCategory === category.id ? 'active' : ''}`}
                  href="javascript:void(0);"
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

      {itemsLoading && !isInitialized && !categoriesLoading && <Preloader />}
      {isInitialized && (
        <>
          <div className="row">
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

          <div className="text-center">
            {itemsLoading && fetchItems && <Preloader />}
            {!itemsLoading && fetchItems && items.length >= 6 && (
              <button
                onClick={() => {
                  setFetchItemsParams({ offset: items.length });
                  if (activeCategory === 0) {
                    dispatch(fetchItemsRequest({ offset: items.length }));
                  } else
                    dispatch(
                      fetchItemsRequest({
                        categoryId: activeCategory,
                        offset: items.length,
                      }),
                    );
                }}
                className="btn btn-outline-primary"
              >
                {!itemsError ? 'Загрузить ещё' : 'Попробовать ещё'}
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Catalog;
