import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _roleList } from '../../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import RoleNewEditForm from '../../../../sections/@dashboard/role/RoleNewEditForm';
import { getRoleSingle } from '../../../../functions';

// ----------------------------------------------------------------------

RoleEditPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function RoleEditPage() {
  const { themeStretch } = useSettingsContext();
  const [ currentRole , setCurrentRole] = useState([])

  const {
    query: { name },
  } = useRouter();
  // const currentRole = _roleList.find((role) => paramCase(role.name) === name);
  useEffect(() => {
    async function userinfo() {
      let userData = await getRoleSingle(name);
      setCurrentRole(userData);  
    };
    userinfo();
  },[]);
  

  return (
    <>
      <Head>
        <title> Role: Edit role </title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit role"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Role',
              href: PATH_DASHBOARD.role.list,
            },
            { name: currentRole?.roleName },
          ]}
        />

        <RoleNewEditForm isEdit currentRole={currentRole} />
      </Container>
    </>
  );
}
