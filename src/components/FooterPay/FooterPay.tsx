import { FC } from 'react';
import './footerpay.css';

const FooterPay: FC<{ items: string[] }> = ({ items }) => {
  return (
    <>
      <div className="footer-pay">
        {items.map((item, index) => (
          <div
            key={item + '-' + index}
            className={`footer-pay-systems footer-pay-systems-${item}`}
          />
        ))}
      </div>
    </>
  );
};

export default FooterPay;
