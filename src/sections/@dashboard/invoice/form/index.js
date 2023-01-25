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
//
import InvoiceNewEditDetails from './InvoiceNewEditDetails';
import InvoiceNewEditAddress from './InvoiceNewEditAddress';
import InvoiceNewEditStatusDate from './InvoiceNewEditStatusDate';
import InvoiceTerms from './InvoiceTerms';
import InvoiceBilling from './InvoiceBilling';
import InvoiceTop from './InvoiceTop';
import InvoicePassenger from './InvoicePassenger';


// ----------------------------------------------------------------------

InvoiceNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentInvoice: PropTypes.object,
};

export default function InvoiceNewEditForm({ isEdit, currentInvoice }) {
  const { push } = useRouter();

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    createDate: Yup.string().nullable().required('Create date is required'),
    dueDate: Yup.string().nullable().required('Due date is required'),
    invoiceTo: Yup.mixed().nullable().required('Invoice to is required'),
  });

  const defaultValues = useMemo(
    () => ({
      invoiceNumber: currentInvoice?.invoiceNumber || '17099',
      createDate: currentInvoice?.createDate || new Date(),
      dueDate: currentInvoice?.dueDate || null,
      taxes: currentInvoice?.taxes || 0,
      status: currentInvoice?.status || 'draft',
      discount: currentInvoice?.discount || 0,
      invoiceFrom: currentInvoice?.invoiceFrom || _invoiceAddressFrom[0],
      invoiceTo: currentInvoice?.invoiceTo || null,
      items: currentInvoice?.items || [{ title: '', description: '', service: '', quantity: 1, price: 0, total: 0 }],
      passenger: currentInvoice?.passenger || [{ name: '', dob: '', gender: ''}],
      totalPrice: currentInvoice?.totalPrice || 0,
    }),
    [currentInvoice]
  );

  // const [numberOfForm, setnumberOfForm] = useState(1);
  // const [numberOfPassager, setnumberOfPassager] = useState(1);
  // const [OpenFormStatus, setOpenFormStatus] = useState(false);
  // const [OpenPassangerStatus, setOpenPassangerStatus] = useState(false);
  // const [status, setStatus] = useState({
  //   filghtNo:false,
  //   bookingId: false,
  //   bookingTime: false,
  //   pnv: false,
  //   Onward_Flight: false,
  //   Onward_Flight_start: false,
  //   Onward_Flight_start_code: false,
  //   Onward_Flight_end: false,
  //   Onward_Flight_end_code: false,
  //   Onward_Flight_start_time: false,
  //   Onward_Flight_start_time_2: false,
  //   Onward_Flight_end_time: false,
  //   Onward_Flight_end_time_2: false,
  //   Onward_Flight_start_address: false,
  //   Onward_Flight_end_address: false,
  //   awaiting_time: false,
  //   flight_class: false,
  //   AdtFare: false,
  //   taxes: false,
  //   subTotal: false,
  //   travellerAssist: false,
  //   flightMonitor: false,
  //   GrandTotal: false,
  //   name: false,
  //   mobile: false,
  //   email: false,
  //   card:false,

  // });
  // const [bookingInfo, setBookingInfo] = useState({
  //   bookingId: "",
  //   bookingTime: "",
  // })
  // const [travelInfoStatus, setTravelInfoStatus] = useState([{
  //   name: false,
  //   dob: false,
  //   gender: false,
  // }])
  // const [travelInfo, setTravelInfo] = useState([{
  //   name: "",
  //   dob: "",
  //   gender: "",
  // }])
  // const [billingInfo, setBillingInfo] = useState({
  //   name: "",
  //   mobile: "",
  //   email: "",
  //   card:"",
  //   AdtFare: "",
  //   taxes: "",
  //   subTotal: "",
  //   travellerAssist: "",
  //   flightMonitor: "",
  //   GrandTotal: "",
  // })
  // const [data, setData] = useState([
  //   {

  //     pnv: "",
  //     filghtNo:"",
  //     Onward_Flight: "",
  //     Onward_Flight_start: "",
  //     Onward_Flight_start_Code: "",
  //     Onward_Flight_end: "",
  //     Onward_Flight_end_Code: "",
  //     Onward_Flight_start_time: "",
  //     Onward_Flight_start_time_2: "",
  //     Onward_Flight_end_time: "",
  //     Onward_Flight_end_time_2: "",
  //     Onward_Flight_start_address: "",
  //     Onward_Flight_end_address: "",
  //     awaiting_time: "",
  //     flight_class: "",
  //   },
  // ]);


  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
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

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSave(false);
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
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSend(false);
      push(PATH_DASHBOARD.invoice.list);
      console.log('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setLoadingSend(false);
    }
  };

  return (
    <FormProvider methods={methods}>
      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mb: 3 }}>
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
      <Card>
        <InvoiceTop/>
        <InvoiceNewEditStatusDate />
        <InvoicePassenger />
        <InvoiceBilling />
      </Card>      
    </FormProvider>
  );
}
