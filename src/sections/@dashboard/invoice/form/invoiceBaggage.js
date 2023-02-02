import sum from 'lodash/sum';

import { useCallback, useEffect } from 'react';
// form
import { useFormContext, useFieldArray } from 'react-hook-form';
import LuggageIcon from '@mui/icons-material/Luggage';
// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem } from '@mui/material';
// utils
import { fNumber, fCurrency } from '../../../../utils/formatNumber';
// components
import Iconify from '../../../../components/iconify';
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function InvoiceBaggage() {
  const { control, setValue, watch, resetField } = useFormContext();


  const values = watch();

  return (
    <Box sx={{ p: 3 }}>
      {/* <Divider sx={{ my: 3, borderStyle: 'dashed' }} /> */}
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 1 }}>
        Baggage Details:
      </Typography>
      <Stack
        spacing={2}
        sx={{ mt: 3 }}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-center', md: 'center' }}
        justifyContent="space-between"
      >
        <Typography variant="inherit" className="flex items-center font-medium">
          <LuggageIcon color="primary" fontSize="large" />
          <RHFTextField autoFocus size="small"  className="ml-2" name={`baggage.personalItem`} label="Personal Item" />
        </Typography>
        <Typography variant="inherit" className="flex items-center font-medium">
          <LuggageIcon  color="primary" fontSize="large" />
          <RHFTextField autoFocus size="small"  className="ml-2"  name={`baggage.carryOnBag`} label="Carry On Bag" />
        </Typography>
        <Typography variant="inherit" className="flex items-center font-medium">
          <LuggageIcon color="primary" fontSize="large" />
          <RHFTextField autoFocus size="small"  className="ml-2"  name={`baggage.checkedInBag`} label="Checked In Bag" />
        </Typography>
      </Stack>
    </Box>
  );
}
