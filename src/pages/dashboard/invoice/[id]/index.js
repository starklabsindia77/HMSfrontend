// next
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _invoices } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import InvoiceDetails from '../../../../sections/@dashboard/invoice/details';
import { getInvoiceSingle } from '../../../../functions';

// ----------------------------------------------------------------------

InvoiceDetailsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function InvoiceDetailsPage() {
  const { themeStretch } = useSettingsContext();
  const [currentInvoice, setCurrentInvoice] = useState()
  const {
    query: { id },
  } = useRouter();
  useEffect(() => {
    async function userinfo() {
      let userData = await getInvoiceSingle(id);
      // console.log("invoice Single", JSON.stringify(userData));
      setCurrentInvoice(userData);  
    };
    userinfo();
  },[]);
  // const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <>
      <Head>
        <title> Invoice: View </title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Invoice Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Invoices',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: `${currentInvoice?.invoiceNumber}` },
          ]}
        />

        <InvoiceDetails invoice={currentInvoice} /> 
      </Container>
    </>
  );
}
