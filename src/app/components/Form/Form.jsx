import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getPositions, registerUser } from '../../services/users';

import FormInput from '../shared/form/FormInput/FormInput';
import RagioGroup from '../shared/form/RagioGroup/RagioGroup';
import FormUpload from '../shared/form/FormUpload/FormUpload';
import Button from '../shared/Button/Button';
import Preloader from '../shared/Preloader/Preloader';

import './Form.scss';

const Form = ({ onFormSend = null, className = '' }) => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      const positionsList = await getPositions();

      setPositions(
        positionsList.map((position) => ({
          value: position.id.toString(),
          title: position.name,
        }))
      );
    };

    fetchPositions();
  }, []);

  useEffect(() => {
    reset({ ...defaultValues, position: positions[0]?.value });
  }, [positions]);

  const [formStatus, setFormStatus] = useState('idle');

  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    position: '',
    photo: '',
  };

  const {
    control,
    getValues,
    setValue,
    setError,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    shouldFocusError: false,
    defaultValues,
  });

  const onSubmit = (data) => {
    setFormStatus('loading');

    const normalizedData = {
      ...data,
      position: +data.position,
      phone: data.phone.replace(/[^0-9+]+/g, ''),
    };

    const createUser = async () => {
      const userId = await registerUser(normalizedData);

      setFormStatus('idle');

      if (userId) {
        onFormSend?.();
      }
    };

    createUser();
  };

  return (
    <form
      className={`form ${className}`}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <FormInput
        control={control}
        setValue={setValue}
        value={getValues('name')}
        name="name"
        label="Your name"
        type="text"
        required
        maxLength={60}
        minLength={2}
        error={errors.name}
      />

      <FormInput
        control={control}
        setValue={setValue}
        value={getValues('email')}
        name="email"
        label="Email"
        type="email"
        required
        maxLength={100}
        minLength={6}
        error={errors.email}
      />

      <FormInput
        control={control}
        setValue={setValue}
        value={getValues('phone')}
        name="phone"
        label="Phone"
        helper="+38 (XXX) XXX - XX - XX"
        type="tel"
        required
        error={errors.phone}
      />

      <RagioGroup
        control={control}
        setValue={setValue}
        value={getValues('position')}
        name="position"
        options={positions}
        label="Select your position"
      />

      <FormUpload
        control={control}
        setValue={setValue}
        setError={setError}
        name="photo"
        placeholder="Upload your photo"
        required
        maxSizeMb={5}
        minDimensions={{ width: 70, height: 70 }}
        error={errors.photo}
      />

      {formStatus === 'idle' && (
        <Button type="submit" disabled={!isValid}>
          Sign up
        </Button>
      )}

      {formStatus === 'loading' && <Preloader />}
    </form>
  );
};

export default Form;
