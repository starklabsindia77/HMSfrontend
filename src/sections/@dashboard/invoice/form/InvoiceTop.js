import sum from 'lodash/sum';

import { useCallback, useEffect } from 'react';
// form
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem } from '@mui/material';
// utils
import { fNumber, fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import { RHFSelect, RHFTextField, RHFInput, RHFDateInput } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function InvoiceTop() {
  const { control, setValue, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  return (
    <Box sx={{ p: 3, marginBotto:"20px" }}>
      <Box className="flex justify-between items-center pb-8">
        {/* <Box>
          <Typography variant="inherit" fontSize={40} className="font-semibold" sx={{marginBottom:"20px"}}>
            E-Ticket
          </Typography>
          <Typography variant="inherit" className=" flex items-center font-medium" sx={{marginBottom:"10px"}}>
            Booking ID :
            <RHFInput autoFocus className="ml-2" name="BookingID" placeholder="Booking ID" />
          </Typography>
          <Typography variant="inherit" className="font-medium">
            Booked On :
            <RHFDateInput autoFocus name="Booked On" className="ml-2" />
          </Typography>
        </Box> */}
        <img src="https://www.hms-travel.com/images/logo.png" className="w-42  rounded-lg h-16" />
      </Box>
    </Box>
  );
}
