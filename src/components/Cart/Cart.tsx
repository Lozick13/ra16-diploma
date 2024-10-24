import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeCartItem } from '../../redux/slices/cartSlice';

const Cart = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(state => state.cart);

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr>
                <td scope="row">{index + 1}</td>
                <td>
                  <a href="/products/1.html">{item.title}</a>
                </td>
                <td>{item.size}</td>
                <td>{item.count}</td>
                <td>{item.price} руб.</td>
                <td>{item.totalPrice} руб.</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() =>
                      dispatch(removeCartItem({ id: item.id, size: item.size }))
                    }
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} className="text-right">
                Общая стоимость
              </td>
              <td>{cart.reduce((acc, item) => acc + item.totalPrice, 0)} руб.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Cart;
