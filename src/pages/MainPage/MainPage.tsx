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
					</div>
				</div>
			</main>
		</>
	);
};

export default MainPage;
