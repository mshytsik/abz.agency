import './Button.scss';

const Button = ({
  size = 'sm',
  onClick = null,
  type = null,
  disabled = false,
  children,
}) => {
  return (
    <button
      className={`button button--${size}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
