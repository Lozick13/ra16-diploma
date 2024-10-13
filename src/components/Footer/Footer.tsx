import ColumnNavbar from '../../ui/lists/ColumnNavbar/ColumnNavbar';
import FooterPay from '../FooterPay/FooterPay';
import FooterSocialLink from '../FooterSocialLink/FooterSocialLink';
import './footer.css';

const Footer = () => {
	return (
		<>
			<footer className='container bg-light footer'>
				<div className='row'>
					<div className='col'>
						<section>
							<h5>Информация</h5>
							<ColumnNavbar
								items={[
									{ text: 'О магазине', link: '/about', active: true },
									{ text: 'Каталог', link: '/catalog' },
									{ text: 'Контакты', link: '/contacts' },
								]}
							/>
						</section>
					</div>
					<div className='col'>
						<section>
							<h5>Принимаем к оплате:</h5>
							<FooterPay
								items={[
									'paypal',
									'master-card',
									'visa',
									'yandex',
									'webmoney',
									'qiwi',
								]}
							/>
						</section>
						<section>
							<div className='footer-copyright'>
								2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и
								аксессуаров. Все права защищены.
								<br />
								Доставка по всей России!
							</div>
						</section>
					</div>
					<div className='col text-right'>
						<section className='footer-contacts'>
							<h5>Контакты:</h5>
							<a className='footer-contacts-phone' href='tel:+7-495-790-35-03'>
								+7 495 79 03 5 03
							</a>
							<span className='footer-contacts-working-hours'>
								Ежедневно: с 09-00 до 21-00
							</span>
							<a
								className='footer-contacts-email'
								href='mailto:office@bosanoga.ru'
							>
								office@bosanoga.ru
							</a>
							<FooterSocialLink items={['twitter', 'vk']} />
						</section>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
