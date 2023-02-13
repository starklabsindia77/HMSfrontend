import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { countries } from '../../../assets/data';
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFSelect, RHFSwitch, RHFRadioGroup, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import { insertRole, updateRole } from '../../../functions';
// ----------------------------------------------------------------------
const GENDER_OPTION = [
  { label: 'Men', value: 'Men' },
  { label: 'Women', value: 'Women' },
  { label: 'Kids', value: 'Kids' },
];
RoleNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentRole: PropTypes.object,
};

export default function RoleNewEditForm({ isEdit = false, currentRole }) {
  const { push } = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  // const NewRoleSchema = Yup.object().shape({
  //   roleName: Yup.string().required('Name is required'),
  // });

  const defaultValues = useMemo(
    () => ({
      roleName: currentRole?.roleName || '',
      roleview: currentRole?.access?.role?.view || '',
      roleviewBy: currentRole?.access?.role?.viewBy || '',
      rolecreate: currentRole?.access?.role?.create || '',
      roleedit: currentRole?.access?.role?.edit || '',
      roledelete: currentRole?.access?.role?.delete || '',
      userview: currentRole?.access?.user?.view || '',
      userviewBy: currentRole?.access?.user?.viewBy || '',
      usercreate: currentRole?.access?.user?.create || '',
      useredit: currentRole?.access?.user?.edit || '',
      userdelete: currentRole?.access?.user?.delete || '',
      invoiceviewAll: currentRole?.access?.invoice?.viewAll || '',
      invoiceview: currentRole?.access?.invoice?.view || '',
      invoiceviewBy: currentRole?.access?.invoice?.viewBy || '',
      invoicecreate: currentRole?.access?.invoice?.create || '',
      invoiceedit: currentRole?.access?.invoice?.edit || '',
      invoicedelete: currentRole?.access?.invoice?.delete || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentRole]
  );

  const methods = useForm({
    // resolver: yupResolver(NewRoleSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentRole) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentRole]);

  const onSubmit = async (data) => {
    
    try {      
      let NewRole = {
        roleName: data.roleName,
        access: {
          role: {
            create: data.rolecreate,
            view: data.roleview,
            viewBy: data.roleviewBy,
            edit: data.roleedit,
            delete: data.roledelete
          },
          user: {
            create: data.usercreate,
            view: data.userview,
            viewBy: data.userviewBy,
            edit: data.useredit,
            delete: data.userdelete
          },
          invoice: {
            create: data.invoicecreate,
            view: data.invoiceview,
            viewAll: data.invoiceviewAll,
            viewBy: data.invoiceviewBy,
            edit: data.invoiceedit,
            delete: data.invoicedelete
          }
        }
      }
      !isEdit ? await insertRole(NewRole) : await updateRole(NewRole, currentRole?._id)      
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      push(PATH_DASHBOARD.role.list);
      
      // await new Promise((resolve) => setTimeout(resolve, 500));

    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
       
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
            // gridTemplateColumns={{
            //   xs: 'repeat(1, 1fr)',
            //   sm: 'repeat(2, 1fr)',
            // }}
            >
              <RHFTextField name="roleName" label="Role Name" />
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Role Management
                </Typography>
                <Grid container spacing={2}>
                  <RHFSwitch name="roleview" label="View" />
                  <RHFSwitch name="roleviewBy" label="View By" />
                  <RHFSwitch name="rolecreate" label="Create" />
                  <RHFSwitch name="roleedit" label="Edit" />
                  <RHFSwitch name="roledelete" label="Delete" />
                </Grid>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  User Management
                </Typography>
                <Grid container spacing={2}>
                  <RHFSwitch name="userview" label="View" />
                  <RHFSwitch name="userviewBy" label="View By" />
                  <RHFSwitch name="usercreate" label="Create" />
                  <RHFSwitch name="useredit" label="Edit" />
                  <RHFSwitch name="userdelete" label="Delete" />
                </Grid>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Invoice Management
                </Typography>
                <Grid container spacing={2}>
                  <RHFSwitch name="invoiceviewAll" label="ViewAll" />
                  <RHFSwitch name="invoiceview" label="View" />
                  <RHFSwitch name="invoiceviewBy" label="View By" />
                  <RHFSwitch name="invoicecreate" label="Create" />
                  <RHFSwitch name="invoiceedit" label="Edit" />
                  <RHFSwitch name="invoicedelete" label="Delete" />
                </Grid>
              </Stack>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Role' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
