import './Hero.scss';

import bannerXl from '../../assets/img/banner-xl.webp';
import bannerLg from '../../assets/img/banner-lg.webp';
import bannerMd from '../../assets/img/banner-md.webp';
import bannerSm from '../../assets/img/banner-sm.webp';

const Hero = ({ children }) => {
  return (
    <div className="hero">
      <picture className="hero__background">
        <source srcSet={bannerXl} media="(min-width: 1290px)" />
        <source srcSet={bannerLg} media="(min-width: 1024px)" />
        <source srcSet={bannerMd} media="(min-width: 768px)" />
        <img src={bannerSm} alt="Hero banner" />
      </picture>

      <div className="hero__content">{children}</div>
    </div>
  );
};

export default Hero;
