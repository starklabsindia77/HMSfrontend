import React, { useEffect, useState } from 'react';
import sum from 'lodash/sum';
import { useCallback } from 'react';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// form
import { useFormContext, useFieldArray, Controller } from 'react-hook-form';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import CheckIcon from '@mui/icons-material/Check';
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';

// @mui

import {
  Box,
  Stack,
  Button,
  Divider,
  Typography,
  Chip,
  InputAdornment,
  MenuItem,
  TextField,
  Autocomplete,
} from '@mui/material';
// utils
import { fNumber, fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import { RHFSelect, RHFTextField, RHFInput, RHFSwitch, RHFAutocomplete } from '../../../../components/hook-form';
import airlineCode from '../../../../data/airline';
import AirlineLogo from '../../../../components/logo/airlineLogo';
// @mui

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' },
  { id: 3, name: 'Other' },
  //   { id: 4, name: 'ui/ux design', price: 60.99 },
  //   { id: 5, name: 'front end development', price: 40.99 },
];

const ariaLabel = { 'aria-label': 'description' };

// ----------------------------------------------------------------------

export default function InvoiceAirline() {
  const { control, setValue, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'airline',
  });

  const values = watch();

  const handleAdd = () => {
    append({
      flightType: '',
      Onward_Flight_start: '',
      Onward_Flight_start_Code: '',
      Onward_Flight_end: '',
      Onward_Flight_end_Code: '',
      Onward_Flight_start_time: '',
      Onward_Flight_end_time: '',
      Onward_Flight_start_address: '',
      Onward_Flight_end_address: '',
      travel_time: '',
      flightNo: '',
      flight_class: '',
      layover_status: false,
      layover_time: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };
  const flightTypeList = [
    'Non-stop',
    'one stop',
    'Two stop'
  ];
  const flightClassList = [
    'Economy',
    'Premium Economy',
    'Business',
    'First'
  ];

  // const handleAirline = (v, index) => {
  //   console.log('Airline', v, index);
  // };

  //

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 1 }}>
        Airline Details:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignairline="flex-end" spacing={1.5}>
            <Stack spacing={2}>
              <AirlineLogo code={values.airline[index].airlineCode} type={'_4x'} height={150}/>
              <Box className="flex justify-between items-center border-b-2 py-2 my-10 border-indigo-600">
                <Box className="flex items-center">
                  <RHFAutocomplete
                    name={`airline[${index}].airlineName`}
                    onChange={(event, newValue) => {
                      setValue(`airline[${index}].airlineCode`, newValue.code), 
                      setValue(`airline[${index}].airlineName`, newValue.label)
                    }}
                    sx={{ width: 300 }}
                    options={airlineCode}
                    renderInput={(params) => <TextField label="Airline" {...params} />}
                  />
                </Box>
                <Box className="flex justify-center items-center" sx={{ width: '50%' }}>
                  {/* <FlightTakeoffOutlinedIcon fontSize="large" className="mr-5 text-gray-500" /> */}
                  <Box>
                    {/* <RHFTextField
                      size="small"
                      name={`airline[${index}].flightType`}
                      label="Flight Type"
                      InputLabelProps={{ shrink: true }}
                    /> */}
                    <RHFSelect name={`airline[${index}].flightType`}  size="small" label="Flight Type" placeholder="Flight Type">
                     <option value="" />
                      {flightTypeList.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </RHFSelect> 

                    <div className="font-medium text-2xl text-indigo-600 flex items-center mt-2">
                      <RHFTextField
                        size="small"
                        sx={{ marginRight: '10px' }}
                        name={`airline[${index}].Onward_Flight_start`}
                        label="Departure"
                        InputLabelProps={{ shrink: true }}
                      />
                      to
                      <RHFTextField
                        size="small"
                        sx={{ marginLeft: '10px' }}
                        name={`airline[${index}].Onward_Flight_end`}
                        label="Arrival"
                        InputLabelProps={{ shrink: true }}
                      />
                    </div>
                  </Box>
                </Box>
              </Box>

              <Box className="pt-1">
                <Box className="flex justify-between">
                  <Box className="flex items-center">
                    <RHFTextField
                      size="small"
                      name={`airline[${index}].flightNo`}
                      label="Flight No"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                  <RHFSwitch name={`airline[${index}].layover_status`} label="Layover" />
                  {/* <Chip label="Partially refundable" variant="outlined" /> */}
                </Box>
                {values.airline[index].layover_status && (
                  <Box className="flex justify-end mt-2">
                    <Box className="flex items-end">
                      <RHFTextField
                        size="small"
                        name={`airline[${index}].layover_time`}
                        label="Layover T1me"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>
                  </Box>
                )}
                <Box className="flex justify-between items-center border-b-2 pb-10">
                  <Box>
                    <div className=" text-xl text-slate-400 py-1 mt-7">
                      <RHFTextField
                        size="small"
                        name={`airline[${index}].Onward_Flight_start_Code`}
                        label="Departure Airport Code"
                        InputLabelProps={{ shrink: true }}
                      />
                    </div>

                    <Controller
                      name={`airline[${index}].Onward_Flight_start_time`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <DateTimePicker
                          label="Departure Time"
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

                    <div className=" text-xl text-slate-400 py-1 mt-2">
                      <RHFTextField
                        size="small"
                        name={`airline[${index}].Onward_Flight_start_address`}
                        rows={5}
                        label="Departure Address"
                        InputLabelProps={{ shrink: true }}
                      />
                    </div>
                  </Box>

                  <Box className="flex justify-center flex-col items-center">
                    <HistoryToggleOffOutlinedIcon className="my-2 text-gray-500" />
                    <RHFTextField
                      size="small"
                      sx={{ marginBottom: '10px', marginTop: '10px' }}
                      name={`airline[${index}].travel_time`}
                      label="Travel Time (2h 30m)"
                      InputLabelProps={{ shrink: true }}
                    />

                    {/* <RHFTextField
                      size="small"
                      name={`airline[${index}].flight_class`}
                      label="Flight Class"
                      InputLabelProps={{ shrink: true }}
                    /> */}
                    <RHFSelect name={`airline[${index}].flight_class`}  size="small" label="Flight Cabin" placeholder="Flight Cabin">
                     <option value="" />
                      {flightClassList.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </RHFSelect> 
                  </Box>
                  <Box>
                    <Box className="text-right">
                      <div className=" text-xl text-slate-400 py-1 mt-7">
                        <RHFTextField
                          size="small"
                          name={`airline[${index}].Onward_Flight_end_Code`}
                          label="Arrival Airport Code"
                          InputLabelProps={{ shrink: true }}
                        />
                      </div>

                      <Controller
                        name={`airline[${index}].Onward_Flight_end_time`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <DateTimePicker
                            label="Arrival Time"
                            value={field.value}
                            onChange={(newValue) => {
                              field.onChange(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                fullWidth
                                size="small"
                                error={!!error}
                                helperText={error?.message}
                              />
                            )}
                          />
                        )}
                      />

                      <div className=" text-xl text-slate-400 py-1 mt-2">
                        <RHFTextField
                          size="small"
                          name={`airline[${index}].Onward_Flight_end_address`}
                          rows={5}
                          label="Arrival Address"
                          InputLabelProps={{ shrink: true }}
                        />
                      </div>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Stack>

            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              sx={{ justifyContent: 'flex-end', textAlign: 'end' }}
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
        alignairline={{ xs: 'flex-start', md: 'center' }}
      >
        <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAdd} sx={{ flexShrink: 0 }}>
          Add Airline
        </Button>
      </Stack>
    </Box>
  );
}
