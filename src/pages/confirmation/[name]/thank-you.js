/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// next
import Head from 'next/head';

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
} from '@mui/material';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import AirplaneTicketOutlinedIcon from '@mui/icons-material/AirplaneTicketOutlined';
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
// utils
import CompactLayout from '../../../layouts/compact';
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import Image from '../../../components/image';
import AirlineLogo from '../../../components/logo/airlineLogo';
import Scrollbar from '../../../components/scrollbar';
import logo from '../../../sections/@dashboard/invoice/details/logo.png';
//const logo = require('./logo.png');

//
import InvoiceToolbar from '../../../sections/@dashboard/invoice/details/InvoiceToolbar';
import moment from 'moment';
import InvoiceTerms from '../../../sections/@dashboard/invoice/details/InvoiceTerms';
import { updateInvoiceStatus, getInvoiceSingle } from '../../../functions';


// ----------------------------------------------------------------------

ThankYouPage.getLayout = (page) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function ThankYouPage() {
  const {
    query: { name },
  } = useRouter();
  const [currentInvoice, setCurrentInvoice] = useState()
  const [ invoice, setInvoiceInfo] = useState({});
  useEffect(() =>{
    async function userinfo() {
      let userData = await getInvoiceSingle(name);
      const statusUpdate = await updateInvoiceStatus(name);
      setInvoiceInfo(statusUpdate);
      // console.log("invoice Single", JSON.stringify(userData));
      setCurrentInvoice(userData);  
    };
    userinfo();
    
  },[])
  // const { days, hours, minutes, seconds } = useCountdown(new Date('07/07/2024 21:30'));

  return (
    <>
      <Head>
        <title> Thank You </title>
      </Head>

      

      <div id="page">
        <div sx={{ pt: 5, px: 5 }}>
          <Box className="px-16 pb-52" sx={{paddingBottom:"50px"}}>
            <Box className="py-10">
              <Box className="flex justify-between items-center pb-8">
                <img src={logo.src} className="w-40 rounded-lg h-16" />
              </Box>
              <Typography variant="inherit" fontSize={30} className="font-semibold mt-2">
                E-Ticket
              </Typography>
              <Typography variant="inherit" className=" flex items-center font-medium mt-2">
                Booking ID :<span className="text-sm text-slate-400 ml-2">{invoice.invoiceNumber}</span>
              </Typography>
              <Typography variant="inherit" className="font-medium mt-2">
                Booked On :
                <span className="text-sm text-slate-400 ml-2">
                  {invoice.BookedOn && moment(invoice.BookedOn).format('DD MMM YYYY, h:mm a')}
                </span>
              </Typography>
            </Box>

            <Box className="flex justify-between items-center">
              <Typography variant="inherit" className="justify-start font-medium text-2xl text-black-600">
                Flight Details
              </Typography>
            </Box>
            {[...Array(invoice.airline)].map((item, i) => (
              <>
                {invoice.airline[i].layover_status && 
                  <Box className="flex justify-center font-medium">
                    <Typography variant="inherit" className="font-normal text-slate-400" fontSize={20}>
                      Layover Time: <span className="text-slate-400 font-medium mr-2">{invoice.airline[i].layover_time}</span>
                    </Typography>
                  </Box>
                }         
                <Box className="flex justify-between items-center border-b-2 py-2 my-10 border-indigo-600">
                  <Box className="flex justify-center items-center">
                    <FlightTakeoffOutlinedIcon fontSize="large" className="mr-5 text-gray-500" />
                    <Box>
                      <Typography variant="inherit" className="font-medium text-slate-400 capitalize">
                        {invoice.airline[i].flightType}
                      </Typography>

                      <Typography variant="inherit" className="font-medium text-2xl text-indigo-600 flex items-center">
                        <span className="pr-2 capitalize">{invoice.airline[i].Onward_Flight_start}</span>
                        to
                        <span className="pl-2 capitalize">{invoice.airline[i].Onward_Flight_end}</span>
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="pt-1">
                  <Box className="flex justify-between">
                    <Box className="flex items-center">
                      <AirlineLogo code={invoice.airline[i].airlineCode} type={'_4x'} height={50} />
                      <Typography variant="inherit" className="font-normal text-slate-400" fontSize={20}>
                        {invoice.airline[i].airlineName}
                        <span className="text-slate-400 font-medium mr-2">{invoice.airline[i].flightNo}</span>
                      </Typography>
                    </Box>
                    {/* <Chip label="Partially refundable" variant="outlined" /> */}
                  </Box>
                  <Box className="flex justify-between items-center border-b-2 pt-2 pb-10">
                    <Box>
                      <Box>
                        <Typography variant="inherit" className=" text-slate-400 font-medium py-1">
                          <span className="text-slate-400 font-medium mr-2">
                            {invoice.airline[i].Onward_Flight_start_Code}
                          </span>

                          <span className="text-slate-400 font-medium mr-2">
                            {invoice.airline[i].Onward_Flight_start_time &&
                              moment(invoice.airline[i].Onward_Flight_start_time).format('hh:mm a')}
                          </span>
                        </Typography>

                        <Typography variant="inherit" className="text-slate-400 font-medium">
                          {invoice.airline[i].Onward_Flight_start_time &&
                            moment(invoice.airline[i].Onward_Flight_start_time).format('ddd hh MMM, YYYY')}
                        </Typography>

                        <Typography variant="inherit" className="w-56" sx={{
                            minWidth:200,
                            maxWidth: 300,
                            overflowWrap: "anywhere",
                            inlineSize: 300,
                          }} >
                          {invoice.airline[i].Onward_Flight_start_address}
                        </Typography>
                      </Box>
                    </Box>
                    <Box className="flex justify-center flex-col items-center">
                      <HistoryToggleOffOutlinedIcon className="my-2 text-gray-500" />

                      <Typography variant="inherit" className="text-gray-500">
                        {invoice.airline[i].travel_time}
                      </Typography>

                      <Typography variant="inherit" className="text-gray-500 capitalize">
                        {invoice.airline[i].flight_class}
                      </Typography>
                    </Box>
                    <Box>
                      <Box className="text-right">
                        <Typography variant="inherit" className=" text-slate-400 font-medium py-1">
                          <span className="text-slate-400 font-medium mr-2">
                            {invoice.airline[i].Onward_Flight_end_time &&
                              moment(invoice.airline[i].Onward_Flight_end_time).format('hh:mm a')}
                          </span>

                          <span className="text-slate-400 font-medium ml-2">
                            {invoice.airline[i].Onward_Flight_end_Code}
                          </span>
                        </Typography>

                        <Typography variant="inherit" className="text-slate-400 font-medium text-indigo-600">
                          {invoice.airline[i].Onward_Flight_end_time &&
                            moment(invoice.airline[i].Onward_Flight_end_time).format('ddd hh MMM, YYYY')}
                        </Typography>

                        <Typography variant="inherit" className="w-56" sx={{
                            minWidth:200,
                            maxWidth: 300,
                            overflowWrap: "anywhere",
                            inlineSize: 300,
                          }} >
                          {invoice.airline[i].Onward_Flight_end_address}
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
            <span className="text-sm text-slate-400">No of Passenger : {invoice.passenger.length}</span>
            {[...Array(invoice.passenger)].map((item, i) => (
              <>
                <Box className="flex justify-around items-center border-b-2 py-2 my-10 border-grey-600">
                  {/* <Box className="flex justify-around items-center w-full"> */}
                    <Typography variant="inherit" className="text-sm text-slate-400" >
                      Passenger Name: {invoice.passenger[i].name}{' '}
                    </Typography>

                    <Typography variant="inherit" className="text-sm text-slate-400" >
                    Passenger Gender: {invoice.passenger[i].gender}{' '}
                    </Typography>

                    <Typography variant="inherit" className="text-sm text-slate-400" >
                    Passenger DOB: {invoice.passenger[i].dob && moment(invoice.passenger[i].dob).format('ddd hh MMM, YYYY')}{' '}
                    </Typography>
                  {/* </Box> */}
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
                Name :<span className="text-gray-500 ml-2">{invoice.Name}</span>
              </Typography>
              <Typography variant="inherit" className="font-medium">
                Email :<span className="text-gray-500">{invoice.Email}</span>
              </Typography>
              <Typography variant="inherit" className="font-medium">
                Mobile No :<span className="text-gray-500">{invoice.Mobile}</span>
              </Typography>
              <Typography variant="inherit" className=" flex items-center font-medium">
                Card No :<span className="text-gray-500 ml-2">{invoice.Card}</span>
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
                  <span className="text-gray-500 ml-2">${invoice.AdtFare} USD</span>
                </Box>
              </Box>
              <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
                <Box>
                  <Typography variant="inherit" className="justify-start font-medium text-base text-slate-500">
                    Taxes & Fees
                  </Typography>
                </Box>
                <Box>
                  <span className="text-gray-500 ml-2">${invoice.taxes} USD</span>
                </Box>
              </Box>
              <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
                <Box>
                  <Typography variant="inherit" className="justify-start font-medium text-lg text-slate-500">
                    Sub Total
                  </Typography>
                </Box>
                <Box>
                  <span className="text-gray-500 ml-2">${invoice.taxes} USD</span>
                </Box>
              </Box>
              <Box className="flex justify-between items-center border-b-2 mt-7 border-grey-600">
                <Box>
                  <Typography variant="inherit" className="justify-start font-medium text-base text-slate-500">
                    Traveller Assist+
                  </Typography>
                </Box>
                <Box>
                  <span className="text-gray-500 ml-2">${invoice.travellerAssist} USD</span>
                </Box>
              </Box>
              <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
                <Box>
                  <Typography variant="inherit" className="justify-start font-medium text-base text-slate-500">
                    Flight Monitor
                  </Typography>
                </Box>
                <Box>
                  <span className="text-gray-500 ml-2">${invoice.flightMonitor} USD</span>
                </Box>
              </Box>
              <Box className="flex justify-between mt-7 items-center border-b-2 border-grey-600">
                <Box>
                  <Typography variant="inherit" className="justify-start font-medium text-xl text-slate-500">
                    Grand Total
                  </Typography>
                </Box>
                <Box>
                  <span className="text-gray-500 ml-2">${invoice.GrandTotal} USD</span>
                </Box>
              </Box>
            </Box>
            <div id="terms" >
              <InvoiceTerms />
            </div>
            
          </Box>
        </div>
      </div>
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
