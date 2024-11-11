import Container from '../Container/Container';
import Button from '../../components/shared/Button/Button';
import { scrollToSection } from '../../utils/utils';

import './Header.scss';

import logo from '../../assets/img/Logo.svg';

const Header = () => {
  return (
    <header className="header">
      <Container className="header__content">
        <img className="header__logo" src={logo} alt="Logo" />

        <nav className="header__nav">
          <Button onClick={() => scrollToSection('users')}>Users</Button>
          <Button onClick={() => scrollToSection('sign-up')}>Sign up</Button>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
