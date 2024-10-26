import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearCart } from '../../redux/slices/cartSlice';
import { clearOrder, sendOrderRequest, setOrder } from '../../redux/slices/orderSlice';
import Preloader from '../Preloader/Preloader';

const Order = () => {
  const dispatch = useAppDispatch();
  const { orderLoading, orderError, orderSuccess } = useAppSelector(state => state.order);
  const { cart } = useAppSelector(state => state.cart);

  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const handleSubmitOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      setOrder({
        owner: {
          phone,
          address,
        },
        items: cart.map(item => ({
          id: item.count,
          price: item.price,
          count: item.count,
        })),
      }),
    );
    dispatch(sendOrderRequest());
  };

  useEffect(() => {
    if (orderError) {
      alert('Ошибка при отправке заказа');
    }
    if (orderSuccess) {
      alert('Заказ отправлен успешно');
      dispatch(clearCart());
      dispatch(clearOrder());
    }
  }, [dispatch, orderError, orderSuccess]);

  return (
    <>
      {orderLoading && <Preloader />}
      {!orderLoading && (
        <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
            <form className="card-body" onSubmit={handleSubmitOrder}>
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  className="form-control"
                  id="phone"
                  placeholder="Ваш телефон"
                  value={phone}
                  required={true}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input
                  className="form-control"
                  id="address"
                  placeholder="Адрес доставки"
                  value={address}
                  required={true}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreement"
                  required={true}
                  checked={confirmation}
                  onChange={e => setConfirmation(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="agreement">
                  Согласен с правилами доставки
                </label>
              </div>
              <button
                type="submit"
                disabled={!confirmation}
                className="btn btn-outline-secondary"
              >
                Оформить
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Order;
