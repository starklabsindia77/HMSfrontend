import PropTypes from 'prop-types';
import { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// next
import { useRouter } from 'next/router';
// @mui
import { Box, Stack, Button, Dialog, Tooltip, IconButton, DialogActions, CircularProgress } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/iconify';
import { useSnackbar } from '../../../../components/snackbar';
//
import InvoicePDF from './InvoicePDF';
import moment from 'moment';
import {sendEmail} from '../../../../functions'

// ----------------------------------------------------------------------

InvoiceToolbar.propTypes = {
  invoice: PropTypes.object,
};



export default function InvoiceToolbar({ invoice }) {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    push(PATH_DASHBOARD.invoice.edit(invoice._id));
  };
  const print = () => { 
   //setpdfgenerateDate(moment().format('YYYY-MM-DD'));
   const input = document.getElementById('page'); 
   input.style.display = "block"; 
   html2canvas(input).then((canvas) => { 
    var imgData = canvas.toDataURL('image/png');
    var imgWidth = 180; 
    var pageHeight = 500; 
    var imgHeight = (canvas.height * imgWidth) / canvas.width;
    //var imgHeight = (canvas.height * imgWidth) / canvas.width; 
    var heightLeft = imgHeight; 
    var doc = new jsPDF('p', 'mm'); 
    var position = 10;
    doc.addImage(imgData, 'PNG', 15, position, imgWidth, imgHeight); 
    heightLeft -= pageHeight; 
    console.log("heightLeft",heightLeft)
    console.log("imgHeight",imgHeight) 
    while (heightLeft >= 0) { 
      position = heightLeft - imgHeight; 
      doc.addPage(); doc.addImage(imgData, 'PNG', 15, position, imgWidth, imgHeight); 
      heightLeft -= pageHeight;
    }
    doc.save(`${invoice.Name}` + moment().format('MM/DD/YYYY') + '.pdf'); });
    //input.style.display = "none"
  };

  const email = async() => {
    const sendE = await sendEmail(invoice._id)
    console.log("email status",sendE);
    enqueueSnackbar('Email send Succesfully!');
  }

  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton onClick={handleEdit}>
              <Iconify icon="eva:edit-fill" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Download">
            <IconButton onClick={print}>
              <Iconify icon="eva:download-fill" />
            </IconButton>
          </Tooltip>

          {/* <PDFDownloadLink
            document={<InvoicePDF invoice={invoice} />}
            fileName={invoice.invoiceNumber}
            style={{ textDecoration: 'none' }}
          >
            {({ loading }) => (
              <Tooltip title="Download">
                <IconButton>
                  {loading ? <CircularProgress size={24} color="inherit" /> : <Iconify icon="eva:download-fill" />}
                </IconButton>
              </Tooltip>
            )}
          </PDFDownloadLink> */}

          {/* <Tooltip title="Print">
            <IconButton>
              <Iconify icon="eva:printer-fill" />
            </IconButton>
          </Tooltip> */}

          <Tooltip title="Send">
            <IconButton onClick={email}>
              <Iconify icon="ic:round-send" />
            </IconButton>
          </Tooltip>

          {/* <Tooltip title="Share">
            <IconButton>
              <Iconify icon="eva:share-fill" />
            </IconButton>
          </Tooltip> */}
        </Stack>

        <Button
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="eva:checkmark-fill" />}
          sx={{ alignSelf: 'flex-end' }}
        >
          Mark as Paid
        </Button>
      </Stack>

      <Dialog fullScreen open={open}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={handleClose}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <InvoicePDF invoice={invoice} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
