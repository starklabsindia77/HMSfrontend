import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Input } from '@mui/material';

// ----------------------------------------------------------------------
const ariaLabel = { "aria-label": "description" };
RHFInput.propTypes = {
  name: PropTypes.string,
};

export default function RHFInput({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          fullWidth
          inputProps={ariaLabel}
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
