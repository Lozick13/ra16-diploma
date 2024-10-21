import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RowNavbar from '../lists/RowNavbar/RowNavbar';
import './header.css';

const Header = () => {
  const [searchActivity, setSearchActivity] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<string>('');

  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/catalog', { state: { quest: searchData } });
    setSearchData('');
  };

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
                      onSubmit={handleSearch}
                      data-id="search-form"
                      className={`header-controls-search-form form-inline ${
                        !searchActivity ? 'invisible' : ''
                      }`}
                    >
                      <input
                        id="search"
                        name="search"
                        type="text"
                        value={searchData}
                        required={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSearchData(e.target.value)
                        }
                        className="form-control"
                        placeholder="Поиск"
                      />
                    </form>
                    <div
                      onClick={() => setSearchActivity(prev => !prev)}
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
