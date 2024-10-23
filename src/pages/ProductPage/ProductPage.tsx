import Banner from '../../components/Banner/Banner';
import ProductDetails from '../../components/ProductDetails/ProductDetails';

const ProductPage = () => {
  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            <ProductDetails />
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductPage;
