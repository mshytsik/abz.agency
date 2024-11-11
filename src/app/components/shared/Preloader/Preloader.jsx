import './Preloader.scss';

import preloaderImage from '../../../assets/img/preloader.svg';

const Preloader = () => {
  return (
    <div className="preloader">
      <img src={preloaderImage} alt="Preloader" />
    </div>
  );
};

export default Preloader;
