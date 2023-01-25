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
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function InvoiceBilling() {
  const { control, setValue, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  return (
    <Box sx={{ p: 3 }}>
      {/* <Divider sx={{ my: 3, borderStyle: 'dashed' }} /> */}
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
        <Typography variant="inherit" className="flex items-center font-medium">
          <RHFTextField autoFocus size="small"  className="ml-2" name="Name" label="Name" />
        </Typography>
        <Typography variant="inherit" className="flex items-center font-medium">
          <RHFTextField autoFocus size="small"  className="ml-2" name="Email" label="Email" />
        </Typography>
        <Typography variant="inherit" className="flex items-center font-medium">
          <RHFTextField autoFocus size="small"  className="ml-2" name="Mobile" label=" Mobile No" />
        </Typography>
        <Typography variant="inherit" className=" flex items-center font-medium">
          <RHFTextField autoFocus size="small"  className="ml-2 " name="Card" label="Card No" />
        </Typography>
      </Stack>

      <Box className="px-10 mt-10 pb-10 border-dotted border-2 border-indigo-600">
        <Box  className="flex justify-between items-center border-b-2 mt-10 border-grey-600" >          
          <Box>
            <Typography variant="inherit" className="justify-start font-medium text-base text-slate-500">
              ADT Base Fare
            </Typography>
          </Box>            
          <Box>         
            <RHFTextField autoFocus size="small"  className="ml-2" name="AdtFare" label="Adt Fare" />
          </Box> 
        </Box>
        {/* <Divider sx={{ my: 3, borderStyle: 'solid', borderColor: "rgb(75 85 99)"}} /> */}
        <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
          <Box >
            <Typography variant="inherit" className="justify-start font-medium text-base text-slate-500">
              Taxes & Fees
            </Typography>
          </Box>
          <Box>
            <RHFTextField autoFocus size="small"  className="ml-2" name="taxes" label="Taxes" />
          </Box>
        </Box>
        {/* <Divider sx={{ my: 3, borderStyle: 'solid', borderColor: "rgb(75 85 99)"}} /> */}
        <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
          <Box>
            <Typography variant="inherit" className="justify-start font-medium text-lg text-slate-500">
              Sub Total
            </Typography>
          </Box>
          <Box>
            <RHFTextField autoFocus size="small"  className="ml-2" name="subTotal" label="Sub Total" />
          </Box>
        </Box>
        {/* <Divider sx={{ my: 3, borderStyle: 'solid', borderColor: "rgb(75 85 99)"}} /> */}
        <Box className="flex justify-between items-center border-b-2 mt-7 border-grey-600">
          <Box>
            <Typography variant="inherit" className="justify-start font-medium text-base text-slate-500">
              Traveller Assist+
            </Typography>
          </Box>
          <Box>
            <RHFTextField autoFocus size="small"  className="ml-2" name="travellerAssist" label="Traveller Assist"/>
          </Box>
        </Box>
        {/* <Divider sx={{ my: 3, borderStyle: 'solid', borderColor: "rgb(75 85 99)"}} /> */}
        <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
          <Box>
            <Typography variant="inherit" className="justify-start font-medium text-base text-slate-500">
              Flight Monitor
            </Typography>
          </Box>
          <Box>
            <RHFTextField autoFocus size="small"  className="ml-2" name="flightMonitor" label="Flight Monitor"/>
          </Box>
        </Box>
        {/* <Divider sx={{ my: 3, borderStyle: 'solid', borderColor: "rgb(75 85 99)"}} /> */}
        <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
          <Box>
            <Typography variant="inherit" className="justify-start font-medium text-xl text-slate-500">
              Grand Total
            </Typography>
          </Box>
          <Box>
            <RHFTextField autoFocus size="small"  className="ml-2" name="GrandTotal" label="Grand Total" />
          </Box>
        </Box>
        {/* <Divider sx={{ my: 3, borderStyle: 'solid', borderColor: "rgb(75 85 99)"}} /> */}
      </Box>
    </Box>
  );
}
