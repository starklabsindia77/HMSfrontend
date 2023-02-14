/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  Stack,
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
import LuggageIcon from '@mui/icons-material/Luggage';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import AirlineLogo from '../../../../components/logo/airlineLogo';
import Scrollbar from '../../../../components/scrollbar';
import logo from './logo.png';
//const logo = require('./logo.png');

//
import InvoiceToolbar from './InvoiceToolbar';
import moment from 'moment';
import InvoiceTerms from './InvoiceTerms';

// ----------------------------------------------------------------------

const StyledRowResult = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

InvoiceDetails.propTypes = {
  invoice: PropTypes.object,
};

export default function InvoiceDetails({ invoice }) {
  if (!invoice) {
    return null;
  }
  // console.log('Invoice', logo);

  // const {
  //   invoiceNumber,
  //   BookedOn,
  //   status,
  //   tripType,
  //   airline,
  //   passenger,
  //   Name,
  //   Email,
  //   Mobile,
  //   Card,
  //   AdtFare,
  //   taxes,
  //   subTotal,
  //   travellerAssist,
  //   flightMonitor,
  //   GrandTotal,
  //   userStatus,
  //   createdBy,
  // } = invoice;

  return (
    <>
      <InvoiceToolbar invoice={invoice} />
      <div id="page">
        <div sx={{ pt: 5, px: 5 }}>
          <Box className="px-16 pb-52" sx={{paddingBottom:"50px"}}>
            <Box className="py-10">
              <Box className="flex justify-between items-center pb-8">
                <img src={logo.src} className="w-40 rounded-lg h-16" />
              </Box>
              <Typography variant="inherit" fontSize={30} className="font-semibold mt-2">
                Itenary
              </Typography>
              <Typography variant="inherit" className=" flex items-center font-medium mt-2">
                Booking ID :<span className="text-sm text-slate-400 ml-2">HMS-{invoice.invoiceNumber}</span>
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
            {invoice?.airline.map((item, i) => (
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
                  <AirlineLogo code={invoice.airline[i].airlineCode} type={'_4x'} height={50} />
                  <Box className="flex justify-between">
                    <Box className="flex items-center">
                      
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
                          {invoice.airline[i].Onward_Flight_start_time 
                            && moment(invoice.airline[i].Onward_Flight_start_time).format('DD MMM, YYYY')
                          }
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
                            moment(invoice.airline[i].Onward_Flight_end_time).format('DD MMM, YYYY')}
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
            <span className="text-sm text-slate-400">No of Passenger : {invoice?.passenger?.length}</span>
            {invoice?.passenger.map((item, i) => (
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

                    <Typography variant="inherit" className="text-sm text-slate-400" >
                      E-Ticket Number: {invoice.passenger[i]?.eticketNumber}{' '}
                    </Typography>

                    <Typography variant="inherit" className="text-sm text-slate-400" >
                      Special Request: {invoice.passenger[i]?.specialRequest}{' '}
                    </Typography>
                  {/* </Box> */}
                </Box>
              </>
            ))}

        <Box className="flex justify-between items-center mt-10">
          <Typography variant="inherit" className="justify-start font-medium text-2xl text-black-600">
            Baggage Details:
          </Typography>
        </Box>
        <Stack
          spacing={2}
          sx={{ mt: 3 }}
          direction={{ xs: 'column-reverse', md: 'row' }}
          alignItems={{ xs: 'flex-center', md: 'center' }}
          justifyContent="space-between"
        >
          <Typography variant="inherit" className="flex items-center font-medium">
            <LuggageIcon color="primary" fontSize="large" />
            Personal Item: <span className="text-gray-500 ml-2">{invoice?.baggage?.personalItem}</span>
          </Typography>
          <Typography variant="inherit" className="flex items-center font-medium">
            <LuggageIcon  color="primary" fontSize="large" />
            Carry On Bag: <span className="text-gray-500 ml-2">{invoice?.baggage?.carryOnBag}</span>
          </Typography>
          <Typography variant="inherit" className="flex items-center font-medium">
            <LuggageIcon color="primary" fontSize="large" />
            Checked In Bag: <span className="text-gray-500 ml-2">{invoice?.baggage?.checkedInBag}</span>
          </Typography>
        </Stack>

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
