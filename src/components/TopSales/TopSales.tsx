import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchTopSalesItemsRequest } from '../../redux/slices/topSalesSlice';
import BrokenRequest from '../BrokenRequest/BrokenRequest';
import Preloader from '../Preloader/Preloader';
import Product from '../Product/Product';
import './topsales.css';

const TopSales = () => {
  const dispatch = useAppDispatch();
  const { topSalesItems, topSalesLoading, topSalesError } = useAppSelector(
    state => state.topSales,
  );

  useEffect(() => {
    dispatch(fetchTopSalesItemsRequest());
  }, [dispatch]);

  return (
    <>
      <section className="top-sales">
        <h2 className="text-center">Хиты продаж!</h2>
        {topSalesError && (
          <BrokenRequest click={() => dispatch(fetchTopSalesItemsRequest())} />
        )}
        {topSalesLoading && <Preloader />}
        {!topSalesError && topSalesItems && !topSalesLoading && (
          <div className="row">
            {topSalesItems.map(item => (
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
    </>
  );
};

export default TopSales;
