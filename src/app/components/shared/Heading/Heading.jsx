import './Heading.scss';

const Heading = ({ type = 'h2', children }) => {
  return type === 'h1' ? (
    <h1 className="heading">{children}</h1>
  ) : (
    <h2 className="heading">{children}</h2>
  );
};

export default Heading;
