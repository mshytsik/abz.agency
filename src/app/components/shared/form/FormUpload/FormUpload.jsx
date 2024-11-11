import { useRef } from 'react';
import { Controller } from 'react-hook-form';
import { validateImageFile } from '../../../../utils/utils';

import './FormUpload.scss';

const FormUpload = ({
  control,
  setValue,
  setError,
  name,
  placeholder,
  required = false,
  maxSizeMb = 1,
  minDimensions = { width: 100, height: 100 },
  accept = '.jpg,.jpeg',
  error = null,
}) => {
  const fileRef = useRef();

  const rules = { required: required };

  return (
    <div className={`form-upload${error ? ' form-upload--error' : ''}`}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => (
          <label className="form-upload__wrap">
            <p className="form-upload__button">Upload</p>

            <input
              {...field}
              type="file"
              value={field.value.filename}
              accept={accept}
              id={name}
              required={required}
              onChange={(e) =>
                validateImageFile(
                  e.target.files[0],
                  (value) => setValue(name, value, { shouldValidate: true }),
                  (error) => setError(name, error),
                  required,
                  { width: minDimensions.width, height: minDimensions.height },
                  maxSizeMb
                )
              }
              aria-invalid={Boolean(error)}
              ref={fileRef}
            />

            <input
              type="text"
              className="form-upload__input"
              placeholder={placeholder}
              defaultValue={fileRef.current?.files[0]?.name}
              aria-invalid={Boolean(error)}
              readOnly
            />
          </label>
        )}
      />

      {error && (
        <span className="form-upload__helper" role="alert">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default FormUpload;
