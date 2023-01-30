/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Stack, Button, Typography, IconButton, InputAdornment } from '@mui/material';
// hooks
import useCountdown from '../../../hooks/useCountdown';
// layouts
import CompactLayout from '../../../layouts/compact';
// _mock
import { _socials } from '../../../_mock/arrays';
// components
import Iconify from '../../../components/iconify';
import { CustomTextField } from '../../../components/custom-input';
// assets
import { ComingSoonIllustration } from '../../../assets/illustrations';
import { updateInvoiceStatus } from '../../../functions';


// ----------------------------------------------------------------------

ThankYouPage.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function ThankYouPage() {
  const {
    query: { name },
  } = useRouter();
  const [ invoiceInfo, setInvoiceInfo] = useState({});
  useEffect(async () =>{
    const statusUpdate = await updateInvoiceStatus(name);
    setInvoiceInfo(statusUpdate);
  },[])
  // const { days, hours, minutes, seconds } = useCountdown(new Date('07/07/2024 21:30'));

  return (
    <>
      <Head>
        <title> Thank You </title>
      </Head>

      <Typography variant="h3" paragraph>
        Thank you {invoiceInfo.Name}!
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>We are currently working hard on this page!</Typography>

      <ComingSoonIllustration sx={{ my: 10, height: 240 }} />

      {/* <Stack
        direction="row"
        justifyContent="center"
        divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
        sx={{ typography: 'h2' }}
      >
        <TimeBlock label="Days" value={days} />

        <TimeBlock label="Hours" value={hours} />

        <TimeBlock label="Minutes" value={minutes} />

        <TimeBlock label="Seconds" value={seconds} />
      </Stack> */}

      {/* <CustomTextField
        fullWidth
        placeholder="Enter your email"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" size="large">
                Notify Me
              </Button>
            </InputAdornment>
          ),
          sx: { pr: 0.5 },
        }}
        sx={{ my: 5 }}
      /> */}

      {/* <Stack spacing={1} alignItems="center" justifyContent="center" direction="row">
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              '&:hover': {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack> */}
    </>
  );
}

// ----------------------------------------------------------------------

TimeBlock.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

function TimeBlock({ label, value }) {
  return (
    <div>
      <Box> {value} </Box>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  );
}
