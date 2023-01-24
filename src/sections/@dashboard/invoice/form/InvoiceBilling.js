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
import { RHFSelect, RHFTextField, RHFInput } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function InvoiceBilling() {
  const { control, setValue, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  const totalOnRow = values.items.map((item) => item.quantity * item.price);

  const totalPrice = sum(totalOnRow) - values.discount + values.taxes;

  useEffect(() => {
    setValue('totalPrice', totalPrice);
  }, [setValue, totalPrice]);

  return (
    <Box sx={{ p: 3 }}>
      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
      <Typography variant="h4" gutterBottom>
        Billing Info
      </Typography>
      <Stack
        spacing={2}
        sx={{ mt: 3 }}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-center', md: 'center' }}
        justifyContent="center"
      >
        <Typography variant="inherit" className="font-medium">
          <RHFInput autoFocus className="ml-2" name="Name" placeholder="Name" />
        </Typography>
        <Typography variant="inherit" className="font-medium">
          <RHFInput autoFocus className="ml-2" name="Email" placeholder="Email" />
        </Typography>
        <Typography variant="inherit" className="font-medium">
          <RHFInput autoFocus className="ml-2" name="Mobile" placeholder=" Mobile No" />
        </Typography>
        <Typography variant="inherit" className=" flex items-center font-medium">
          <RHFInput autoFocus className="ml-2 " name="Card" placeholder="Card No" />
        </Typography>
      </Stack>

      <Box className="px-10 mt-10 pb-10 border-dotted border-2 border-indigo-600">
        <Box className="flex justify-between items-center border-b-2 mt-10 border-grey-600">
          <Box>
            <Typography variant="inherit" className="justify-start font-medium text-base text-slate-500">
              ADT Base Fare
            </Typography>
          </Box>
          <Box>
            <RHFInput autoFocus className="ml-2" name="AdtFare" placeholder="Adt Fare" />
          </Box>
        </Box>
        <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
          <Box>
            <Typography variant="inherit" className="justify-start font-medium text-base text-slate-500">
              Taxes & Fees
            </Typography>
          </Box>
          <Box>
            <RHFInput autoFocus className="ml-2" name="taxes" placeholder="Taxes" />
          </Box>
        </Box>
        <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
          <Box>
            <Typography variant="inherit" className="justify-start font-medium text-lg text-slate-500">
              Sub Total
            </Typography>
          </Box>
          <Box>
            <RHFInput autoFocus className="ml-2" name="subTotal" placeholder="Sub Total" />
          </Box>
        </Box>
        <Box className="flex justify-between items-center border-b-2 mt-7 border-grey-600">
          <Box>
            <Typography variant="inherit" className="justify-start font-medium text-base text-slate-500">
              Traveller Assist+
            </Typography>
          </Box>
          <Box>
            <RHFInput autoFocus className="ml-2" name="travellerAssist" placeholder="Traveller Assist"/>
          </Box>
        </Box>
        <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
          <Box>
            <Typography variant="inherit" className="justify-start font-medium text-base text-slate-500">
              Flight Monitor
            </Typography>
          </Box>
          <Box>
            <RHFInput autoFocus className="ml-2" name="flightMonitor" placeholder="Flight Monitor"/>
          </Box>
        </Box>
        <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
          <Box>
            <Typography variant="inherit" className="justify-start font-medium text-xl text-slate-500">
              Grand Total
            </Typography>
          </Box>
          <Box>
            <RHFInput autoFocus className="ml-2" name="GrandTotal" placeholder="Grand Total" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
