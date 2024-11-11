import { useState } from 'react';
import Header from './layout/Header/Header';
import Container from './layout/Container/Container';
import Hero from './components/Hero/Hero';
import Heading from './components/shared/Heading/Heading';
import Button from './components/shared/Button/Button';
import Section from './layout/Section/Section';
import UsersGrid from './components/UsersGrid/UsersGrid';
import UserForm from './components/UserForm/UserForm';
import { scrollToSection } from './utils/utils';

import './App.scss';

const App = () => {
  const [gridPage, setGridPage] = useState(1);

  return (
    <>
      <Header />

      <main className="main">
        <Container className="main__content">
          <Hero>
            <Heading type="h1">Test assignment for front-end developer</Heading>

            <p>
              What defines a good front-end developer is one that has skilled
              knowledge of HTML, CSS, JS with a vast understanding of User
              design thinking as they&apos;ll be building web interfaces with
              accessibility in mind. They should also be excited to learn, as
              the world of Front-End Development keeps evolving.
            </p>

            <Button onClick={() => scrollToSection('sign-up')}>Sign up</Button>
          </Hero>

          <Section id="users">
            <Heading>Working with GET request</Heading>

            <UsersGrid page={gridPage} setPage={setGridPage} />
          </Section>

          <Section id="sign-up">
            <UserForm
              onSubmit={() => {
                setGridPage(1);
                scrollToSection('users');
              }}
            />
          </Section>
        </Container>
      </main>
    </>
  );
};

export default App;
