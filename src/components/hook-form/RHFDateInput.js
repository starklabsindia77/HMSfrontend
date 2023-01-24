import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Input, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------
const ariaLabel = { "aria-label": "description" };
RHFDateInput.propTypes = {
  name: PropTypes.string,
};

export default function RHFDateInput({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
        <DatePicker
            {...other}
            value={field.value}
            onChange={(newValue) => {
                field.onChange(newValue);
            }}
            renderInput={(params) => (
                <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
            )}
        />        
        )}
    />
  );
}
