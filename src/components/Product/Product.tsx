import { FC } from 'react';
import { Link } from 'react-router-dom';
import './product.css';

const Product: FC<{
	catalog?: boolean;
	id: number;
	title: string;
	url: string;
	price: number;
}> = ({ catalog = false, id, title, url, price }) => {
	return (
		<>
			<div className='col-4'>
				<div className={`card ${catalog ? 'catalog-item-card' : ''}`}>
					<img src={url} className='card-img-top img-fluid card-img-wrap' alt={title} />
					<div className='card-body card-body-wrap'>
						<p className='card-text'>{title}</p>
						<p className='card-text'>{price} руб.</p>
						<Link to={`/products/${id}`} className='btn btn-outline-primary'>
							Заказать
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Product;
