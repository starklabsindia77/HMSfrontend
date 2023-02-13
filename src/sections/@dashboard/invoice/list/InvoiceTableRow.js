import PropTypes from 'prop-types';
import { useState,  useEffect } from 'react';
// @mui
import {
  Link,
  Stack,
  Button,
  Divider,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  Modal,
} from '@mui/material';
import { FormComponent, FormContainer } from "react-authorize-net";
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import { CustomAvatar } from '../../../../components/custom-avatar';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
const imageUrls = [
  'https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png',
  'https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mastercard_vrt_rev_92px_2x.png',
  'https://www.discover.com/company/images/newsroom/media-downloads/discover.png',
  'https://s1.q4cdn.com/692158879/files/design/svg/american-express-logo.svg',
  'https://cdn4.iconfinder.com/data/icons/simple-peyment-methods/512/diners_club-512.png',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JCB_logo.svg/1280px-JCB_logo.svg.png',
];


// ----------------------------------------------------------------------

InvoiceTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function InvoiceTableRow({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const { invoiceNumber,
  BookedOn,  
  status,
  tripType,
  airline,
  passenger,
  Name,
  Email,
  Mobile,
  Card,
  AdtFare,
  taxes,
  subTotal,
  travellerAssist,
  flightMonitor,
  GrandTotal,
  userStatus, createdBy, cardInfo } = row;

  const [openConfirm, setOpenConfirm] = useState(false);
  const [cardOpenConfirm, setCardOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState(null);
  const [cardTypeUrl, setCardTypeUrl] = useState('https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png');
  const handleType = (type) => {
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

  useEffect(()=> {
    handleType(cardInfo?.cardType)
  }, [])

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCardOpenConfirm = () => {
    setCardOpenConfirm(true);
  };
  const handleCardCloseConfirm = () => {
    setCardOpenConfirm(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar name={Name} />

            <div>
              <Typography variant="subtitle2" noWrap>
                {Name}
              </Typography>

              <Link noWrap variant="body2" onClick={onViewRow} sx={{ color: 'text.disabled', cursor: 'pointer' }}>
                {`${invoiceNumber}`}
              </Link>
            </div>
          </Stack>
        </TableCell>

        <TableCell align="left">{fDate(BookedOn)}</TableCell>
        <TableCell align="center">{fCurrency(GrandTotal)}</TableCell>

        <TableCell align="center">{createdBy.displayName}</TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={
              (status === 'paid' && 'success') ||
              (status === 'unpaid' && 'warning') ||
              (status === 'overdue' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>
        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        <Label
            variant="soft"
            color={
              (userStatus === true && 'success') ||
              (userStatus === false && 'error') 
            }
          >
            {userStatus ? 'Approve': 'Pending' }
          </Label>
        </TableCell>
        <TableCell align="center">{row?.userIPData?.IP}</TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="right-top" sx={{ width: 160 }}>
        <MenuItem
          onClick={() => {
            onViewRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCardOpenConfirm();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View Card Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            onViewRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          Make Payment
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />

      <Modal
        open={cardOpenConfirm}
        onClose={handleCardCloseConfirm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ height: '50%' }}
      >
        <div className="container">
          <form id="form">
            <div id="card">
              <div className="header">
                <div className="sticker" />
                <div>
                  <img className="logo" src={cardTypeUrl} alt="Card logo" />
                </div>

              </div>
              <div className="body">
                <h2 id="creditCardNumber">{cardInfo?.cardNumber}</h2>
              </div>
              <div className="footer">
                <div>
                  <h5>Card Holder</h5>
                  <h3>{cardInfo?.cardHolder}</h3>
                </div>
                <div>
                  <h5>Expires</h5>
                  <h3>
                    {cardInfo?.expireMonth} / {cardInfo?.expireYear}
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

            
          </form>
        </div>
      </Modal>

    </>
  );
}
