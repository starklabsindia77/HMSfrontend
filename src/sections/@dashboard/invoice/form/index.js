import PropTypes from 'prop-types';
import { useState, useMemo, useEffect } from 'react';
import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Stack, Box,
  Button,
  Chip,
  IconButton,
  Typography,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem, } from '@mui/material';
  import FlightTakeoffOutlinedIcon from "@mui/icons-material/FlightTakeoffOutlined";
import AirplaneTicketOutlinedIcon from "@mui/icons-material/AirplaneTicketOutlined";
import HistoryToggleOffOutlinedIcon from "@mui/icons-material/HistoryToggleOffOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CheckIcon from "@mui/icons-material/Check";

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// mock
import { _invoiceAddressFrom } from '../../../../_mock/arrays';
// components
import FormProvider from '../../../../components/hook-form';
import { useSnackbar } from '../../../../components/snackbar';
//
import InvoiceNewEditDetails from './InvoiceNewEditDetails';
import InvoiceNewEditAddress from './InvoiceNewEditAddress';
import InvoiceNewEditStatusDate from './InvoiceNewEditStatusDate';
import InvoiceTerms from './InvoiceTerms';
import InvoiceBilling from './InvoiceBilling';
import InvoiceTop from './InvoiceTop';
import InvoicePassenger from './InvoicePassenger';
import InvoiceAirline from './InvoiceAirline';
import { insertInvoice, updateInvoice } from '../../../../functions';


// ----------------------------------------------------------------------

InvoiceNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentInvoice: PropTypes.object,
};

export default function InvoiceNewEditForm({ isEdit, currentInvoice }) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    // createDate: Yup.string().nullable().required('Create date is required'),
    // dueDate: Yup.string().nullable().required('Due date is required'),
    // invoiceTo: Yup.mixed().nullable().required('Invoice to is required'),
  });

  const defaultValues = useMemo(
    () => ({
      invoiceNumber: currentInvoice?.invoiceNumber || '',
      BookedOn: currentInvoice?.BookedOn || new Date(),  
      status: currentInvoice?.status || 'draft',
      tripType: currentInvoice?.tripType || '',
      airline: currentInvoice?.airline || [
        { 
          airlineName:"",
          airlineCode:"", 
          flightType: "",
          Onward_Flight_start: "",
          Onward_Flight_start_Code: "",
          Onward_Flight_end: "",
          Onward_Flight_end_Code: "",
          Onward_Flight_start_time: "",         
          Onward_Flight_end_time: "",
          Onward_Flight_start_address: "",
          Onward_Flight_end_address: "",
          travel_time: "",
          flightNo: "",
          flight_class: "", 
          layover_status:false, 
          layover_time:""
        }
      ],
      passenger: currentInvoice?.passenger || [{ name: '', dob: '', gender: ''}],
      Name:currentInvoice?.Name || '',
      Email:currentInvoice?.Email || '',
      Mobile: currentInvoice?.Mobile ||'',
      Card: currentInvoice?.Card || '',
      AdtFare: currentInvoice?.AdtFare || '',
      taxes: currentInvoice?.taxes || '',
      subTotal: currentInvoice?.subTotal || '',
      travellerAssist: currentInvoice?.travellerAssist || '',
      flightMonitor: currentInvoice?.flightMonitor || '',
      GrandTotal: currentInvoice?.GrandTotal || '',
      userStatus: false,
    }),
    [currentInvoice]
  );

 


  const methods = useForm({
    // resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentInvoice) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentInvoice]);

  const handleSaveAsDraft = async (data) => {
    setLoadingSave(true);
    // console.log('invoice data', JSON.stringify(data));
    data.status = 'draft';
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      !isEdit ? await insertInvoice(data) : await updateInvoice(data, currentInvoice?._id)
      reset();
      setLoadingSave(false);
      enqueueSnackbar('Save Invoice Draft Success!');
      push(PATH_DASHBOARD.invoice.list);
      console.log('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setLoadingSave(false);
    }
  };

  const handleCreateAndSend = async (data) => {
    setLoadingSend(true);

    try {
      !isEdit ? await insertInvoice(data) : await updateInvoice(data, currentInvoice?._id)
      // await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSend(false);
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      push(PATH_DASHBOARD.invoice.list);
      console.log('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setLoadingSend(false);
    }
  };

  return (
    <FormProvider methods={methods}>
      <Card>
        <InvoiceNewEditStatusDate />
        <InvoiceAirline />
        <InvoicePassenger />
        <InvoiceBilling />
      </Card>
      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          color="inherit"
          size="large"
          variant="contained"
          loading={loadingSave && isSubmitting}
          onClick={handleSubmit(handleSaveAsDraft)}
        >
          Save as Draft
        </LoadingButton>

        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend && isSubmitting}
          onClick={handleSubmit(handleCreateAndSend)}
        >
          {isEdit ? 'Update' : 'Create'} & Send
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
