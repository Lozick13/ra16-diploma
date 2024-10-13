import { Link } from 'react-router-dom';
import RowNavbar from '../lists/RowNavbar/RowNavbar';
import './header.css';

const Header = () => {
  return (
    <>
      <header className="container">
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <Link className="navbar-brand" to={'/'}>
                <img src="./assets/header-logo.png" alt="Bosa Noga" />
              </Link>

              <div className="collapse navbar-collapse" id="navbarMain">
                <RowNavbar
                  items={[
                    { text: 'Главная', link: '/', active: true },
                    { text: 'Каталог', link: '/catalog' },
                    { text: 'О магазине', link: '/about' },
                    { text: 'Контакты', link: '/contacts' },
                  ]}
                />
                <div>
                  <div className="header-controls-pics">
                    <form
                      data-id="search-form"
                      className="header-controls-search-form form-inline"
                    >
                      <input className="form-control" placeholder="Поиск" />
                    </form>
                    <div
                      data-id="search-expander"
                      className="header-controls-pic header-controls-search"
                    ></div>
                    <div className="header-controls-pic header-controls-cart">
                      <div className="header-controls-cart-full">1</div>
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
