import { Controller } from 'react-hook-form';

import './FormRadio.scss';

const FormRadio = ({ control, setValue, name, value, title, isChecked }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <label className="form-radio">
          <input
            {...field}
            type="radio"
            value={value}
            onChange={(e) => {
              setValue(name, e.target.value, { shouldValidate: true });
            }}
            checked={isChecked}
            aria-checked={isChecked}
          />

          <span className="form-radio__icon"></span>
          <span className="form-radio__title">{title}</span>
        </label>
      )}
    />
  );
};

export default FormRadio;
