import Banner from '../../components/Banner/Banner';
import Cart from '../../components/Cart/Cart';
import Order from '../../components/Order/Order';
import './cartpage.css';

const CartPage = () => {
  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Cart />
            <Order />
          </div>
        </div>
      </main>
    </>
  );
};

export default CartPage;
