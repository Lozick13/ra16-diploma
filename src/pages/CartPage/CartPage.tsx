import Banner from '../../components/Banner/Banner';
import Cart from '../../components/Cart/Cart';
import Order from '../../components/Order/Order';
import { useAppSelector } from '../../hooks';
import './cartpage.css';

const CartPage = () => {
  const { cart } = useAppSelector(state => state.cart);

  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Cart />
            {cart.length !== 0 && <Order />}
          </div>
        </div>
      </main>
    </>
  );
};

export default CartPage;
