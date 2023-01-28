/* eslint-disable jsx-a11y/alt-text */
/* eslint_disable jsx_a11y/alt_text */
import PropTypes from 'prop-types';
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';
import moment from 'moment';
// utils
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';

//
import styles from './InvoiceStyle';

// ______________________________________________________________________

InvoicePDF.propTypes = {
  invoice: PropTypes.object,
};

export default function InvoicePDF({ invoice }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.px_16, styles.pb_52]} sx={{ paddingBottom: '50px' }}>
          <View style={styles.py_10}>
            <View style={[styles.flex, styles.justify_between, styles.items_center, styles.pb_8]}>
              <Image
                source="https://www.hms-travel.com/images/logo.png"
                style={[styles.w_42, styles.rounded_lg, styles.h_16]}
              />
            </View>
            <Text fontSize={30} style={[styles.fontSemibold, styles.mt_2]}>
              E Ticket
            </Text>
            <Text style={[styles.flex, styles.items_center, styles.font_medium, styles.mt_2]}>
              Booking ID :
              <Text style={[styles.text_sm, styles.text_slate_400, styles.ml_2]}>{invoice.invoiceNumber}</Text>
            </Text>
            <Text style={[styles.font_medium, styles.mt_2]}>
              Booked On :
              <Text style={[styles.text_sm, styles.text_slate_400, styles.ml_2]}>
                {invoice.BookedOn && moment(invoice.BookedOn).format('DD MMM YYYY, h:mm a')}
              </Text>
            </Text>
          </View>

          {/*  */}
        </View>
      </Page>
    </Document>
  );
}
