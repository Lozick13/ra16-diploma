import Banner from '../../components/Banner/Banner';
import Cart from '../../components/Cart/Cart';
import './cartpage.css';

const CartPage = () => {
  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <Cart />
          </div>
        </div>
      </main>
    </>
  );
};

export default CartPage;
