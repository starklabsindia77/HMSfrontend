import React from 'react';
import { useRouter } from 'next/router';
import { HostedForm } from 'react-acceptjs';
import Head from 'next/head';
import {
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
} from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSnackbar } from '../../../components/snackbar';
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import ConfirmDialog from '../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
// @mui
import { useTheme } from '@mui/material/styles';
// layouts
import DashboardLayout from '../../../layouts/dashboard';

const authData = {
  apiLoginID: '3VZ4jUAm36',
  clientKey: '9bHPz94HT7ar45RZ',
};

Index.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default function Index() {
    const { push } = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();

  const { themeStretch } = useSettingsContext();
  const handleSubmit = (response) => {
    console.log('Received response:', response);
    if (response.messages.resultCode === "Error") {
      var i = 0;
      while (i < response.messages.message.length) {
          console.log(
              response.messages.message[i].code + ": " +
              response.messages.message[i].text
          );
          i = i + 1;
      }
    } else {
      enqueueSnackbar('Payment Done Successfully');
      push(PATH_DASHBOARD.general.app);
    }
    
  };
  // return (
  //   <HostedForm authData={authData} onSubmit={handleSubmit} />
  // );
  return (
    <>
      <Head>
        <title> Invoice: List </title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Invoice Payment"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Invoices',
              href: PATH_DASHBOARD.invoice.root,
            },
            {
              name: 'Payment',
            },
          ]}
          // action={
          //   <NextLink href={PATH_DASHBOARD.invoice.new} passHref>
          //     <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          //       New Invoice
          //     </Button>
          //   </NextLink>
          // }
        />

        {/* <Card sx={{ mb: 5 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              
            </Stack>
          </Scrollbar>
        </Card> */}

        <Card>
          <HostedForm authData={authData} onSubmit={handleSubmit} environment={'SANDBOX'} />  
          
        </Card>
      </Container>

      
    </>
  );
};