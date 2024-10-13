import Banner from '../../components/Banner/Banner';
import Catalog from '../../components/Catalog/Catalog';
import TopSales from '../../components/TopSales/TopSales';

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
