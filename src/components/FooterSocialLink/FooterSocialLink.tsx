import { FC } from 'react';
import './footersociallink.css';

const FooterSocialLink: FC<{ items: string[] }> = ({ items }) => {
  return (
    <>
      <div className="footer-social-links">
        {items.map((item, index) => (
          <div
            key={item + '-' + index}
            className={`footer-social-link footer-social-link-${item}`}
          />
        ))}
      </div>
    </>
  );
};

export default FooterSocialLink;
