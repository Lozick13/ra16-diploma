import { FC } from 'react';
import { Link } from 'react-router-dom';

const ColumnNavbar: FC<{
	items: { text: string; link: string; active?: boolean }[];
}> = ({ items }) => {
	return (
		<>
			<ul className='nav flex-column'>
				{items.map(item => (
					<li
						key={item.link}
						className={`nav-item ${item.active ? 'active' : ''}`}
					>
						<Link className='nav-link' to={item.link}>
							{item.text}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
};

export default ColumnNavbar;
