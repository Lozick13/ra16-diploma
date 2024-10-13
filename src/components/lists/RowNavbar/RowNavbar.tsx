import { FC } from 'react';
import { Link } from 'react-router-dom';

const RowNavbar: FC<{
  items: { text: string; link: string; active?: boolean }[];
}> = ({ items }) => {
  return (
    <>
      <ul className="navbar-nav mr-auto">
        {items.map(item => (
          <li key={item.link} className={`nav-item ${item.active ? 'active' : ''}`}>
            <Link className="nav-link" to={item.link}>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default RowNavbar;
