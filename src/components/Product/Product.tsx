import { FC } from 'react';
import { Link } from 'react-router-dom';
import './product.css';

const Product: FC<{
	id: number;
	title: string;
	url: string;
	price: number;
}> = ({ id, title, url, price }) => {
	return (
		<>
			<div className='col-4'>
				<div className='card'>
					<img src={url} className='card-img-top img-fluid' alt={title} />
					<div className='card-body'>
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
