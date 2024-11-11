import { useState } from 'react';
import Heading from '../shared/Heading/Heading';
import Form from '../Form/Form';

import './UserForm.scss';

import successImage from '../../assets/img/success-image.svg';

const UserForm = ({ onSubmit = null }) => {
  const [isFormSent, setIsFormSent] = useState(false);

  return (
    <>
      <Heading>
        {isFormSent
          ? 'User successfully registered'
          : 'Working with POST request'}
      </Heading>

      <div className="user-form">
        {isFormSent ? (
          <img
            className="user-form__image"
            src={successImage}
            alt="User successfully registered"
          />
        ) : (
          <Form
            onFormSend={() => {
              setIsFormSent(true);
              onSubmit?.();
            }}
            className="user-form__form"
          />
        )}
      </div>
    </>
  );
};

export default UserForm;
