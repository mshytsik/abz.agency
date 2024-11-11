import './Container.scss';

const Container = ({ className = '', children }) => {
  return (
    <div className="container">
      <div className={`container__content ${className}`}>{children}</div>
    </div>
  );
};

export default Container;
