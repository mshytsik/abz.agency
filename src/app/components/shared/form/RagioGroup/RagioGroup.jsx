import FormRadio from '../FormRadio/FormRadio';

import './RagioGroup.scss';

const RagioGroup = ({
  control,
  setValue,
  value,
  name,
  options = [],
  label = '',
}) => {
  return (
    <div className="radio-group">
      {label && <p className="radio-group__label">{label}</p>}

      <div className="radio-group__list" role="radiogroup">
        {options.map((option) => (
          <FormRadio
            key={option.value}
            control={control}
            setValue={setValue}
            name={name}
            value={option.value}
            title={option.title}
            isChecked={option.value === value}
          />
        ))}
      </div>
    </div>
  );
};

export default RagioGroup;
