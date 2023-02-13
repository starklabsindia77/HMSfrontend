import sum from 'lodash/sum';
import { useCallback, useEffect } from 'react';
// form
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
// @mui
// @mui
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Stack, Chip, Button, Divider, Typography, InputAdornment, MenuItem, TextField } from '@mui/material';
// utils
import { fNumber, fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import { RHFSelect, RHFTextField, RHFInput } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  { id: 1, name: 'Male'},
  { id: 2, name: 'Female' },
  { id: 3, name: 'Other' },
//   { id: 4, name: 'ui/ux design', price: 60.99 },
//   { id: 5, name: 'front end development', price: 40.99 },
];

// ----------------------------------------------------------------------

export default function InvoicePassenger() {
  const { control, setValue, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'passenger',
  });

  const values = watch();


  const handleAdd = () => {
    append({
      name: '',
      dob: '',
      gender: '',
      eticketNumber:'',
      specialRequest:''
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

//  

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb:1 }}>
        Passenger Details:
      </Typography>
      <Typography variant="inherit" sx={{ color: 'text.disabled', mb: 3 }} fontSize={13}>
        No of Passenger: {fields.length}
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignpassenger="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                size="small"
                name={`passenger[${index}].name`}
                label="Name"
                InputLabelProps={{ shrink: true }}
              />

              {/* <RHFTextField
                size="small"
                name={`passenger[${index}].dob`}
                label="DOB"
                InputLabelProps={{ shrink: true }}
              /> */}
              <Controller
                    name={`passenger[${index}].dob`}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                    <DatePicker
                        label="DOB"
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
                name={`passenger[${index}].gender`}
                size="small"
                label="Gender"
                InputLabelProps={{ shrink: true }}
                SelectProps={{
                  native: false,
                  MenuProps: {
                    PaperProps: {
                      sx: { maxHeight: 220 },
                    },
                  },
                  sx: { textTransform: 'capitalize' },
                }}
                sx={{
                  maxWidth: { md: 160 },
                }}
              >
                {/* <MenuItem
                  value=""
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    fontStyle: 'italic',
                    color: 'text.secondary',
                  }}
                >
                  None
                </MenuItem>

                <Divider /> */}

                {SERVICE_OPTIONS.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.name}
                    
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
                    {option.name}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField
                size="small"
                name={`passenger[${index}].eticketNumber`}
                label="Eticket Number"
                InputLabelProps={{ shrink: true }}
              />
               <RHFTextField
                size="small"
                name={`passenger[${index}].specialRequest`}
                label="Special Request"
                InputLabelProps={{ shrink: true }}
              />                  
            </Stack>

            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              sx={{justifyContent:"flex-end", textAlign:"end"}}
              onClick={() => handleRemove(index)}
            >
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignpassenger={{ xs: 'flex-start', md: 'center' }}
      >
        <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAdd} sx={{ flexShrink: 0 }}>
          Add Passenger
        </Button>

        
      </Stack>
    </Box>
  );
}
