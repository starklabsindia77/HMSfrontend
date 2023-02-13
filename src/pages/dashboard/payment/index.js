import React from 'react';
import { useRouter } from 'next/router';
import { HostedForm } from 'react-acceptjs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSnackbar } from '../../../components/snackbar';

const authData = {
  apiLoginID: '3VZ4jUAm36',
  clientKey: '9bHPz94HT7ar45RZ',
};

export default function Index() {
    const { push } = useRouter();
    const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (response) => {
    console.log('Received response:', response);
    enqueueSnackbar('Payment Done Successfully');
    push(PATH_DASHBOARD.general.app);
  };
  return <HostedForm authData={authData} onSubmit={handleSubmit} />;
};