/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// next
import Cleave from 'cleave.js/react';

import Head from 'next/head';
import { LoadingButton } from '@mui/lab';

// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
  TextField,
  Modal,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import SaveIcon from '@mui/icons-material/Save';
// utils
import CompactLayout from '../../../layouts/compact';
import SimpleLayout from '../../../layouts/simple';
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import Image from '../../../components/image';
import CustomDialog from '../../../components/custom-dialog';
import AirlineLogo from '../../../components/logo/airlineLogo';
import Scrollbar from '../../../components/scrollbar';
import logo from '../../../sections/@dashboard/invoice/details/logo.png';
//const logo = require('./logo.png');

//
import InvoiceToolbar from '../../../sections/@dashboard/invoice/details/InvoiceToolbar';
import moment from 'moment';
import InvoiceTerms from '../../../sections/@dashboard/invoice/details/InvoiceTerms';
import { updateInvoiceStatus, updateInvoiceSingle } from '../../../functions';

// ----------------------------------------------------------------------

ThankYouPage.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

const close_icon = {
  fontSize: '1.7em',
  position: 'absolute',
  right: '10px',
  color: '#999',
  border: '2px solid #999',
  width: '28px',
  textAlign: 'center',
  lineHeight: '25px',
  borderRadius: '50px',
  top: '10px',
  height: '28px',
  cursor: 'pointer',
};
const styleedit = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const myStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: '-50px',
  marginLeft: '-50px',
  width: '100px',
  height: '100px',
};
const imageUrls = [
  'https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png',
  'https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_rev_92px_2x.png',
  'https://www.discover.com/company/images/newsroom/media-downloads/discover.png',
  'https://s1.q4cdn.com/692158879/files/design/svg/american-express-logo.svg',
  'https://cdn4.iconfinder.com/data/icons/simple-peyment-methods/512/diners_club-512.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/1280px-JCB_logo.svg.png',
];

export default function ThankYouPage() {
  const {
    query: { name },
  } = useRouter();
  const defaultValues = {
    creditCardNum: '',
    cardType:'',
    cardHolder: '',
    expireMonth:'',
    expireYear:'',
  };

  const methods = useForm({
    defaultValues,
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;
  const [invoice, setCurrentInvoice] = useState();
  const [invoiceInfo, setInvoiceInfo] = useState({});
  const [loadingSend, setLoadingSend] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [ModalVal, setModalVal] = useState(false);
  const [commentsVal, setCommentsVal] = useState('');
  const [creditCardNum, setCreditCardNum] = useState('#### #### #### ####');
  const [cardType, setCardType] = useState('');
  const [cardHolder, setCardHolder] = useState('Your Full Name');
  const [cvv, setCvv] = useState('');
  const [expireMonth, setExpireMonth] = useState('MM');
  const [expireYear, setExpireYear] = useState('YYYY');
  const [cardTypeUrl, setCardTypeUrl] = useState('https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png');
  // const [flip, setFlip] = useState(null);

  const handleNum = (e) => {
    setCreditCardNum(e.target.value);
    // console.log(e.target.value);
  };

  const handleType = (type) => {
    setCardType(type);
    console.log(type);

    if (type === 'visa') {
      setCardTypeUrl(imageUrls[0]);
      console.log('Visa');
    } else if (type === 'mastercard') {
      setCardTypeUrl(imageUrls[1]);
      console.log('Mastercard');
    } else if (type === 'discover') {
      setCardTypeUrl(imageUrls[2]);
      console.log('Discover');
    } else if (type === 'amex') {
      setCardTypeUrl(imageUrls[3]);
      console.log('Amex');
    } else if (type === 'diners') {
      console.log('Diners');
      setCardTypeUrl(imageUrls[4]);
    } else if (type === 'jcb') {
      console.log('JCB');
      setCardTypeUrl(imageUrls[5]);
    }
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  const handleCardHolder = (e) => {
    setCardHolder(e.target.value);
  };
  const handleCvv = (e) => {
    setCvv(e.target.value);
  };

  const handleExpMonth = (e) => {
    setExpireMonth(e.target.value);
  };

  const handleExpYear = (e) => {
    setExpireYear(e.target.value);
  };

  const handleCloseEditModal = () => {
    setModalVal(false);
  };

  useEffect(() => {
    async function userinfo() {
      let userData = await updateInvoiceSingle(name);
      // console.log("response", userData);

      // console.log("invoice Single", JSON.stringify(userData));
      setCurrentInvoice(userData);
    }
    userinfo();
  }, [name]);

  const updatePayment = async () => {
    const card = {
      cardNumber: creditCardNum,
      cardType: cardType,
      cardHolder: cardHolder,
      cvvNumber: cvv,
      expireMonth: expireMonth,
      expireYear: expireYear,
    };
    console.log("card info", card)
    try {
      const statusUpdate = await updateInvoiceStatus(card, name);
      setInvoiceInfo(statusUpdate);
      setModalVal(false);
      setOpenConfirm(true)
    } catch (err) {
      alert(err.message);
    }
    // console.log("saveComments")
  };

  // const { days, hours, minutes, seconds } = useCountdown(new Date('07/07/2024 21:30'));

  return (
    <>
      <Head>
        <title> Thank You </title>
      </Head>

      <div id="page">
        <div sx={{ pt: 5, px: 5 }}>
          <Box className="px-16 pb-52" sx={{ paddingBottom: '50px' }}>
            <Box className="py-10">
              <Box className="flex justify-between items-center pb-8">
                {/* <img src={logo.src} className="w-40 rounded-lg h-16" /> */}
                <Box>
                  <Typography variant="inherit" fontSize={30} className="font-semibold mt-2">
                   Itenary
                  </Typography>
                  <Typography variant="inherit" className=" flex items-center font-medium mt-2">
                    Booking ID :<span className="text-sm text-slate-400 ml-2">HMS-{invoice?.invoiceNumber}</span>
                  </Typography>
                  <Typography variant="inherit" className="font-medium mt-2">
                    Booked On :
                    <span className="text-sm text-slate-400 ml-2">
                      {invoice?.BookedOn && moment(invoice?.BookedOn).format('DD MMM YYYY, h:mm a')}
                    </span>
                  </Typography>
                </Box>
                <LoadingButton size="large" variant="contained" loading={loadingSend} onClick={() => setModalVal(true)}>
                  {'Pay Now'}
                </LoadingButton>
              </Box>
            </Box>

            <Box className="flex justify-between items-center">
              <Typography variant="inherit" className="justify-start font-medium text-2xl text-black-600">
                Flight Details
              </Typography>
            </Box>
            {invoice?.airline.map((item, i) => (
              <>
                {invoice?.airline[i]?.layover_status && (
                  <Box className="flex justify-center font-medium">
                    <Typography variant="inherit" className="font-normal text-slate-400" fontSize={20}>
                      Layover Time:{' '}
                      <span className="text-slate-400 font-medium mr-2">{invoice?.airline[i]?.layover_time}</span>
                    </Typography>
                  </Box>
                )}
                <Box className="flex justify-between items-center border-b-2 py-2 my-10 border-indigo-600">
                  <Box className="flex justify-center items-center">
                    <FlightTakeoffOutlinedIcon fontSize="large" className="mr-5 text-gray-500" />
                    <Box>
                      <Typography variant="inherit" className="font-medium text-slate-400 capitalize">
                        {invoice?.airline[i]?.flightType}
                      </Typography>

                      <Typography variant="inherit" className="font-medium text-2xl text-indigo-600 flex items-center">
                        <span className="pr-2 capitalize">{invoice?.airline[i]?.Onward_Flight_start}</span>
                        to
                        <span className="pl-2 capitalize">{invoice?.airline[i]?.Onward_Flight_end}</span>
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="pt-1">
                  <Box className="flex justify-between">
                    <Box className="flex items-center">
                      <AirlineLogo code={invoice?.airline[i]?.airlineCode} type={'_4x'} height={50} />
                      <Typography variant="inherit" className="font-normal text-slate-400" fontSize={20}>
                        {invoice?.airline[i]?.airlineName}
                        <span className="text-slate-400 font-medium mr-2">{invoice?.airline[i]?.flightNo}</span>
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="flex justify-between items-center border-b-2 pt-2 pb-10">
                    <Box>
                      <Box>
                        <Typography variant="inherit" className=" text-slate-400 font-medium py-1">
                          <span className="text-slate-400 font-medium mr-2">
                            {invoice?.airline[i]?.Onward_Flight_start_Code}
                          </span>

                          <span className="text-slate-400 font-medium mr-2">
                            {invoice?.airline[i]?.Onward_Flight_start_time &&
                              moment(invoice?.airline[i]?.Onward_Flight_start_time).format('hh:mm a')}
                          </span>
                        </Typography>

                        <Typography variant="inherit" className="text-slate-400 font-medium">
                          {invoice?.airline[i]?.Onward_Flight_start_time &&
                            moment(invoice?.airline[i]?.Onward_Flight_start_time).format('DD MMM, YYYY')}
                        </Typography>

                        <Typography
                          variant="inherit"
                          className="w-56"
                          sx={{
                            minWidth: 200,
                            maxWidth: 300,
                            overflowWrap: 'anywhere',
                            inlineSize: 300,
                          }}
                        >
                          {invoice?.airline[i]?.Onward_Flight_start_address}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="flex justify-center flex-col items-center">
                      <HistoryToggleOffOutlinedIcon className="my-2 text-gray-500" />

                      <Typography variant="inherit" className="text-gray-500">
                        {invoice?.airline[i]?.travel_time}
                      </Typography>

                      <Typography variant="inherit" className="text-gray-500 capitalize">
                        {invoice?.airline[i]?.flight_class}
                      </Typography>
                    </Box>
                    <Box>
                      <Box className="text-right">
                        <Typography variant="inherit" className=" text-slate-400 font-medium py-1">
                          <span className="text-slate-400 font-medium mr-2">
                            {invoice?.airline[i]?.Onward_Flight_end_time &&
                              moment(invoice?.airline[i]?.Onward_Flight_end_time).format('hh:mm a')}
                          </span>

                          <span className="text-slate-400 font-medium ml-2">
                            {invoice?.airline[i]?.Onward_Flight_end_Code}
                          </span>
                        </Typography>

                        <Typography variant="inherit" className="text-slate-400 font-medium text-indigo-600">
                          {invoice?.airline[i]?.Onward_Flight_end_time &&
                            moment(invoice?.airline[i]?.Onward_Flight_end_time).format('DD MMM, YYYY')}
                        </Typography>

                        <Typography
                          variant="inherit"
                          className="w-56"
                          sx={{
                            minWidth: 200,
                            maxWidth: 300,
                            overflowWrap: 'anywhere',
                            inlineSize: 300,
                          }}
                        >
                          {invoice?.airline[i]?.Onward_Flight_end_address}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </>
            ))}

            <Box className="flex justify-between items-center mt-10">
              <Typography variant="inherit" className="justify-start font-medium text-2xl text-black-600">
                Passenger Info
              </Typography>
            </Box>
            <span className="text-sm text-slate-400">No of Passenger : {invoice?.passenger?.length}</span>
            {invoice?.passenger.map((item, i) => (
              <>
                <Box className="flex justify-around items-center border-b-2 py-2 my-10 border-grey-600">
                  <Typography variant="inherit" className="text-sm text-slate-400">
                    Passenger Name: {invoice?.passenger[i]?.name}{' '}
                  </Typography>

                  <Typography variant="inherit" className="text-sm text-slate-400">
                    Passenger Gender: {invoice?.passenger[i]?.gender}{' '}
                  </Typography>

                  <Typography variant="inherit" className="text-sm text-slate-400">
                    Passenger DOB:{' '}
                    {invoice?.passenger[i]?.dob && moment(invoice?.passenger[i]?.dob).format('DD MMM, YYYY')}{' '}
                  </Typography>
                </Box>
              </>
            ))}

            <Box className="flex justify-between items-center mt-10">
              <Typography variant="inherit" className="justify-start font-medium text-2xl text-black-600">
                Billing Info
              </Typography>
            </Box>
            <Box className="flex justify-between items-center px-6 pt-8 pb-8">
              <Typography variant="inherit" className="font-medium">
                Name :<span className="text-gray-500 ml-2">{invoice?.Name}</span>
              </Typography>
              <Typography variant="inherit" className="font-medium">
                Email :<span className="text-gray-500">{invoice?.Email}</span>
              </Typography>
              <Typography variant="inherit" className="font-medium">
                Mobile No :<span className="text-gray-500">{invoice?.Mobile}</span>
              </Typography>
              <Typography variant="inherit" className=" flex items-center font-medium">
                Card No :<span className="text-gray-500 ml-2">{invoice?.Card}</span>
              </Typography>
            </Box>
            <Box className="px-10 mt-10 pb-10 border-dotted border-2 border-indigo-600">
              <Box className="flex justify-between items-center border-b-2 mt-10 border-grey-600">
                <Box>
                  <Typography variant="inherit" className="justify-start font-medium text-base text-slate-500">
                    ADT Base Fare
                  </Typography>
                </Box>
                <Box>
                  <span className="text-gray-500 ml-2">${invoice?.AdtFare} USD</span>
                </Box>
              </Box>
              <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
                <Box>
                  <Typography variant="inherit" className="justify-start font-medium text-base text-slate-500">
                    Taxes & Fees
                  </Typography>
                </Box>
                <Box>
                  <span className="text-gray-500 ml-2">${invoice?.taxes} USD</span>
                </Box>
              </Box>
              <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
                <Box>
                  <Typography variant="inherit" className="justify-start font-medium text-lg text-slate-500">
                    Sub Total
                  </Typography>
                </Box>
                <Box>
                  <span className="text-gray-500 ml-2">${invoice?.taxes} USD</span>
                </Box>
              </Box>
              <Box className="flex justify-between items-center border-b-2 mt-7 border-grey-600">
                <Box>
                  <Typography variant="inherit" className="justify-start font-medium text-base text-slate-500">
                    Traveller Assist+
                  </Typography>
                </Box>
                <Box>
                  <span className="text-gray-500 ml-2">${invoice?.travellerAssist} USD</span>
                </Box>
              </Box>
              <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
                <Box>
                  <Typography variant="inherit" className="justify-start font-medium text-base text-slate-500">
                    Flight Monitor
                  </Typography>
                </Box>
                <Box>
                  <span className="text-gray-500 ml-2">${invoice?.flightMonitor} USD</span>
                </Box>
              </Box>
              <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
                <Box>
                  <Typography variant="inherit" className="justify-start font-medium text-xl text-slate-500">
                    Grand Total
                  </Typography>
                </Box>
                <Box>
                  <span className="text-gray-500 ml-2">${invoice?.GrandTotal} USD</span>
                </Box>
              </Box>
            </Box>
            <div id="terms">
              <InvoiceTerms />
            </div>
          </Box>
        </div>
      </div>

      <Modal
        open={ModalVal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ height: '50%' }}
      >
        <div className="container">
          <form id="form" methods={methods} onSubmit={handleSubmit(updatePayment)}>
            <div id="card">
              <div className="header">
                <div className="sticker" />
                <div>
                  <img className="logo" src={cardTypeUrl} alt="Card logo" />
                </div>

              </div>
              <div className="body">
                <h2 id="creditCardNumber">{creditCardNum}</h2>
              </div>
              <div className="footer">
                <div>
                  <h5>Card Holder</h5>
                  <h3>{cardHolder}</h3>
                </div>
                <div>
                  <h5>Expires</h5>
                  <h3>
                    {expireMonth} / {expireYear}
                  </h3>
                </div>
              </div>
              {/*(c) 2005, 2023. Authorize.Net is a registered trademark of CyberSource Corporation*/}
              {/* <div className="AuthorizeNetSeal">
              <script type="text/javascript" language="javascript">
                  var ANS_customer_id="a4df7ae5-c63c-40be-b277-d383e9b59925";
                </script>
                <script
                  type="text/javascript"
                  language="javascript"
                  src="//verify.authorize.net:443/anetseal/seal.js"
                />
              </div> */}
            </div>

            <div className="input-container mt">
              <h4>Enter card number</h4>
              {/* <Cleave
                delimiter="-"
                options={{
                  creditCard: true,
                  onCreditCardTypeChanged: handleType,
                }}
                onChange={handleNum}
                placeholder="Please enter your credit card number"
              /> */}
              <input onChange={handleNum} type="text" placeholder="Please enter your credit card number" required />
            </div>

            <div className="input-container">
              <h4>Card Holder</h4>
              <input onChange={handleCardHolder} type="text" placeholder="Please enter your full name" required />
            </div>

            <div className="input-grp">
              <div className="input-container">
                <h4>Expiration Year</h4>
                <select value={expireMonth} onChange={handleExpMonth}>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div className="input-container">
                <h4>Month</h4>
                <select value={expireYear} onChange={handleExpYear}>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                </select>
              </div>
              <div className="input-container">
                <h4>CVV</h4>
                <input onChange={handleCvv} type="password" placeholder="CVV" required />
              </div>
            </div>

            <button onClick={() => updatePayment}>{`Submit Payment`}</button>
          </form>
        </div>
      </Modal>

      <CustomDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Thank you for submitting your payment"
        content="Thank you for submitting your payment,you will get your etickets in next 30 min (Please note in case of verification oir billing team will call you to verify the details)"
      />
    </>
  );
}

// ----------------------------------------------------------------------

// TimeBlock.propTypes = {
//   label: PropTypes.string,
//   value: PropTypes.string,
// };

// function TimeBlock({ label, value }) {
//   return (
//     <div>
//       <Box> {value} </Box>
//       <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
//     </div>
//   );
// }
