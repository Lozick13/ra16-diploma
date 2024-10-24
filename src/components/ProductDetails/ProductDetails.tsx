import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addCartItem } from '../../redux/slices/cartSlice';
import { fetchItemRequest } from '../../redux/slices/itemSlice';
import Preloader from '../Preloader/Preloader';

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { item, itemLoading, itemError } = useAppSelector(state => state.item);
  const { id } = useParams();

  const [sizeAvailability, setSizeAvailability] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchItemRequest({ id: Number(id) }));
  }, [dispatch, id]);

  useEffect(() => {
    if (item?.sizes) {
      const availableSizes = item.sizes.some(size => size.available);
      setSizeAvailability(availableSizes);
    }
  }, [item]);

  if (itemError) {
    return null;
  }

  return (
    <>
      <section className="catalog-item">
        {itemLoading && <Preloader />}
        {!itemLoading && item && (
          <>
            <h2 className="text-center">{item.title}</h2>
            <div className="row">
              <div className="col-5">
                <img
                  src={item.images[0]}
                  className="img-fluid"
                  alt={item.title + '-picture'}
                />
              </div>
              <div className="col-7">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>Артикул</td>
                      <td>{item.sku}</td>
                    </tr>
                    <tr>
                      <td>Производитель</td>
                      <td>{item.manufacturer}</td>
                    </tr>
                    <tr>
                      <td>Цвет</td>
                      <td>{item.color}</td>
                    </tr>
                    <tr>
                      <td>Материалы</td>
                      <td>{item.material}</td>
                    </tr>
                    <tr>
                      <td>Сезон</td>
                      <td>{item.season}</td>
                    </tr>
                    <tr>
                      <td>Повод</td>
                      <td>{item.reason}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-center">
                  <p>
                    Размеры в наличии:{' '}
                    {item.sizes &&
                      item.sizes.map((size, index) => (
                        <span
                          key={`size${index}`}
                          className={`catalog-item-size ${
                            size.available ? '' : 'not-available'
                          } ${selectedSize === size.size ? 'selected' : ''}`}
                          onClick={() => {
                            if (size.size && size.available) setSelectedSize(size.size);
                          }}
                        >
                          {size.size}
                        </span>
                      ))}
                  </p>
                  {sizeAvailability && (
                    <p>
                      Количество:{' '}
                      <span className="btn-group btn-group-sm pl-2">
                        <button
                          className="btn btn-secondary"
                          onClick={() => setCount(prev => Math.max(prev - 1, 1))}
                        >
                          -
                        </button>
                        <span className="btn btn-outline-primary">{count}</span>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setCount(prev => Math.min(prev + 1, 10))}
                        >
                          +
                        </button>
                      </span>
                    </p>
                  )}
                </div>
                {sizeAvailability && (
                  <button
                    className={`btn btn-danger btn-block btn-lg ${
                      !selectedSize ? 'disabled' : ''
                    }`}
                    disabled={!selectedSize}
                    onClick={() => {
                      dispatch(
                        addCartItem({
                          id: item.id,
                          title: item.title,
                          size: selectedSize,
                          count: count,
                          price: item.price,
                          totalPrice: count * item.price,
                        }),
                      );
                      navigate('/cart');
                    }}
                  >
                    В корзину
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ProductDetails;
