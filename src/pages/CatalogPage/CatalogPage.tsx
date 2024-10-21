import Catalog from '../../components/Catalog/Catalog';
import './catalogpage.css';

const CatalogPage = () => {
  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <Catalog search={true} />
          </div>
        </div>
      </main>
    </>
  );
};

export default CatalogPage;
