import { Controller } from 'react-hook-form';
import { useMask } from '@react-input/mask';

import './FormInput.scss';

const FormInput = ({
  control,
  setValue,
  value,
  name,
  label = '',
  helper = '',
  type,
  required = false,
  maxLength = null,
  minLength = null,
  error = null,
}) => {
  const rules = {
    required: required,
    maxLength: maxLength ? { value: maxLength } : null,
    minLength: minLength ? { value: minLength } : null,
    validate: {},
  };

  switch (type) {
    case 'email':
      rules.validate.email = (value) =>
        /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/gu.test(
          value
        )
          ? true
          : 'Please enter a valid email address.';
      break;
    case 'tel':
      rules.validate.tel = (value) =>
        value.length === '+38 (XXX) XXX - XX - XX'.length
          ? true
          : 'Please enter a valid phone number.';
      break;
    default:
      break;
  }

  const phoneRef = useMask({
    mask: '+38 (0__) ___ - __ - __',
    replacement: { _: /\d/ },
  });

  const errorMessages = {
    required: 'This field is required.',
    maxLength: `Please enter no more than ${maxLength} characters.`,
    minLength: `Please enter at least ${minLength} characters.`,
  };

  return (
    <div className={`form-input${error ? ' form-input--error' : ''}`}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            id={name}
            onChange={(e) =>
              setValue(name, e.target.value, { shouldValidate: true })
            }
            className={!value.length ? 'is-empty' : ''}
            aria-invalid={Boolean(error)}
            ref={type === 'tel' ? phoneRef : null}
          />
        )}
      />

      {label && <label htmlFor={name}>{label}</label>}

      {(error || helper) && (
        <span className="form-input__helper" role="alert">
          {error
            ? error.type in errorMessages
              ? errorMessages[error.type]
              : error.message
            : helper}
        </span>
      )}
    </div>
  );
};

export default FormInput;
