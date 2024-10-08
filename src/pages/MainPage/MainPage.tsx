import Catalog from '../../components/Catalog/Catalog';
import TopSales from '../../components/TopSales/TopSales';
import Banner from '../../layouts/Banner/Banner';

const MainPage = () => {
	return (
		<>
			<main className='container'>
				<div className='row'>
					<div className='col'>
						<Banner />
						<TopSales />
						<Catalog />
					</div>
				</div>
			</main>
		</>
	);
};

export default MainPage;
