// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DatePicker } from '@mui/x-date-pickers';
import { Stack, TextField, MenuItem } from '@mui/material';
// components
import { RHFSelect, RHFTextField, RHFDateInput } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['paid', 'unpaid', 'overdue', 'draft'];
const TRIP_OPTIONS = ['one way', 'round', 'multi city'];

// ----------------------------------------------------------------------

export default function InvoiceNewEditStatusDate() {
  const { control, watch } = useFormContext();

  const values = watch();

  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ p: 3, bgcolor: 'background.neutral', marginTop:"20px" }}
    >
      {/* <RHFTextField
        size="small"
        name="invoiceNumber"
        label="Booking Number"
        value={`${values.invoiceNumber}`}
      /> */}

      
      
     
      <Controller
        name="BookedOn"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="Booked On"
            value={field.value}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth size="small" error={!!error} helperText={error?.message} />
            )}
          />
        )}
      />
       <RHFSelect
        fullWidth
        name="tripType"
        size="small"
        label="Trip Type"
        InputLabelProps={{ shrink: true }}
        SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
      >
        {TRIP_OPTIONS.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
              '&:first-of-type': { mt: 0 },
              '&:last-of-type': { mb: 0 },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </RHFSelect>
      <RHFSelect
        fullWidth
        name="status"
        size="small"
        label="Status"
        InputLabelProps={{ shrink: true }}
        SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
      >
        {STATUS_OPTIONS.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
              '&:first-of-type': { mt: 0 },
              '&:last-of-type': { mb: 0 },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </RHFSelect>

      {/* <Controller
        name="dueDate"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <DatePicker
            label="Due date"
            value={field.value}
            onChange={(newValue) => {
              field.onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
            )}
          />
        )}
      /> */}
    </Stack>
  );
}
