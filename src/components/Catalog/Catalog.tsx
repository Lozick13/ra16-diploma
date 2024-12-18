import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCategoriesRequest } from '../../redux/slices/categoriesSlice';
import { fetchItemsRequest, setItems } from '../../redux/slices/itemsSlice';
import BrokenRequest from '../BrokenRequest/BrokenRequest';
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
      return { categoryId: prev.categoryId, quest: searchData };
    });
  };

  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (fetchItemsParams) {
      dispatch(fetchItemsRequest(fetchItemsParams));
    }
  }, [dispatch, fetchItemsParams]);

  useEffect(() => {
    if (location.state?.quest) {
      setFetchItemsParams(prev => {
        return { ...prev, quest: location.state.quest };
      });
      setSearchData(location.state.quest);
    }
  }, [location]);

  useEffect(() => {
    setFetchItemsParams(prev => {
      return { ...prev, categoryId: activeCategory || undefined };
    });
  }, [activeCategory]);

  useEffect(() => {
    if (!isInitialized && items.length > 0) {
      setIsInitialized(true);
    }
  }, [items, isInitialized]);

  useEffect(() => {
    if (categoriesError) console.error(categoriesError);
    if (itemsError) console.error(itemsError);
  }, [categoriesError, itemsError]);

  if (!isInitialized && itemsError) {
    return (
      <BrokenRequest
        click={() =>
          setFetchItemsParams(prev => {
            return { ...prev };
          })
        }
      />
    );
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
        {!categoriesLoading && !categoriesError && (
          <>
            <li key={0} className="nav-item">
              <a
                className={`nav-link ${activeCategory === 0 ? 'active' : ''}`}
                href="javascript:void(0);"
                onClick={() => {
                  setIsInitialized(false);
                  setActiveCategory(0);
                  dispatch(setItems([]));
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
                    setActiveCategory(category.id);
                    dispatch(setItems([]));
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
      {!itemsLoading && !isInitialized && <span>Ничего не найдено</span>}
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
                  setFetchItemsParams(prev => {
                    return { ...prev, offset: items.length };
                  });
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
