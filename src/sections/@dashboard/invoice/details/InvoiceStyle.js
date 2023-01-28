import { Font, StyleSheet } from '@react-pdf/renderer';

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
});

// const styles = StyleSheet.create({
//   col4: { width: '25%' },
//   col8: { width: '75%' },
//   col6: { width: '50%' },
//   mb8: { marginBottom: 8 },
//   mb40: { marginBottom: 40 },
//   overline: {
//     fontSize: 8,
//     marginBottom: 8,
//     fontWeight: 700,
//     textTransform: 'uppercase',
//   },
//   h3: { fontSize: 16, fontWeight: 700 },
//   h4: { fontSize: 13, fontWeight: 700 },
//   body1: { fontSize: 10 },
//   subtitle2: { fontSize: 9, fontWeight: 700 },
//   alignRight: { textAlign: 'right' },
//   page: {
//     padding: '40px 24px 0 24px',
//     fontSize: 9,
//     lineHeight: 1.6,
//     fontFamily: 'Roboto',
//     backgroundColor: '#fff',
//     textTransform: 'capitalize',
//   },
//   footer: {
//     left: 0,
//     right: 0,
//     bottom: 0,
//     padding: 24,
//     margin: 'auto',
//     borderTopWidth: 1,
//     borderStyle: 'solid',
//     position: 'absolute',
//     borderColor: '#DFE3E8',
//   },
//   gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
//   table: { display: 'flex', width: 'auto' },
//   tableHeader: {},
//   tableBody: {},
//   tableRow: {
//     padding: '8px 0',
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderStyle: 'solid',
//     borderColor: '#DFE3E8',
//   },
//   noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
//   tableCell_1: { width: '5%' },
//   tableCell_2: { width: '50%', paddingRight: 16 },
//   tableCell_3: { width: '15%' },
// });
const styles = StyleSheet.create({
  page: {
        padding: '40px 24px 0 24px',
        fontSize: 9,
        lineHeight: 1.6,
        fontFamily: 'Roboto',
        backgroundColor: '#fff',
        textTransform: 'capitalize',
      },
  flex: { display: 'flex' },
  flex_row: {
    flexDirection: 'row',
  },

  flex_row_reverse: {
    flexDirection: 'row_reverse',
  },

  flex_col: {
    flexDirection: 'column',
  },

  flex_col_reverse: {
    flexDirection: 'column-reverse',
  },

  w_10: {
    width: '25rem',
  },
  w_20: {
    width: '5rem',
    /* 80px */
  },
  w_40: {
    width: '10rem',
  },
  w_56: {
    width: '14rem',
  },
  h_10 : {
    height: '25rem'
    /* 40px */
  },
  h_16 : {
    height: '4rem', /* 64px */
  },
  h_20 : {
    height: '5rem',
    /* 80px */
  },
  py_1 : {
    paddingTop: '0.25rem', /* 4px */
    paddingBottom: '0.25rem', /* 4px */
  },
  
  pr_2 : {
    paddingRight: '0.5rem',
  },
  
  pl_2 : {
    paddingLeft: '0.5rem',
  },
  
  px_10 : {
    paddingLeft: '40px',
    paddingRight: '40px',
  },
  pt_8 : {
    paddingTop: '2rem', /* 32px */
  },
  pr_8 : {
    paddingRight: '2rem', /* 32px */
  },
  pb_8 : {
    paddingBottom: '2rem', /* 32px */
  },
  
  pb_10 : {
    paddingBottom: '40px',
  },
  
  py_10 : {
    paddingTop: '25rem',
    /* 40px */
    paddingBottom: '25rem',
    /* 40px */
  },
  
  ml_2 : {
    marginLeft: '0.5rem',
    /* 8px */
  },
  mt_2 : {
    marginTop: '0.5rem',
    /* 8px */
  },
  
  mr_2 : {
    marginRight: '0.5rem',
    /* 8px */
  },
  mt_5 : {
    marginTop: '125rem', /* 20px */
  },
  
  mb_5 : {
    marginBottom: '125rem', /* 20px */
  },
  ml_5 : {
    marginLeft: '125rem', /* 20px */
  },
  
  mr_5 : {
    marginRight: '125rem',
    /* 20px */
  },
  
  mt_7 : {
    marginTop: '28px',
  },
  
  my_10 : {
    marginTop: '25rem',
    /* 40px */
    marginBottom: '25rem',
    /* 40px */
  },
  
  mt_10 : {
    marginTop: '40px',
  },
  
  border_dotted : {
    borderStyle: 'dotted',
  },
  
  border_2 : {
    borderWidth: '2px',
  },
  
  border_indigo_600 : {
    borderColor: 'rgb(79 70 229)',
  },
  
  justify_start : {
    justifyContent: 'flex_start',
  },
  
  justify_end : {
    justifyContent: 'flex_end',
  },
  
  justify_center : {
    justifyContent: 'center',
  },
  
  justify_between : {
    justifyContent: 'space-between',
  },
  
  justify_around : {
    justifyContent: 'space-around',
  },
  
  justify_evenly : {
    justifyContent: 'space-evenly',
  },
  items_start : {
    alignItems: 'flex-start',
  },
  
  items_end : {
    alignItems: 'flex-end',
  },
  
  items_center : {
    alignItems: 'center',
  },
  
  items_baseline : {
    alignItems: 'baseline',
  },
  
  items_stretch : {
    alignItems: 'stretch',
  },
  
  border_b_2 : {
    borderBottomWidth: '2px',
  },
  
  border_grey_600 : {
    borderColor: 'rgb(75 85 99)',
  },
  
  font_medium : {
    fontWeight: '500',
  },
  
  text_lg : {
    fontSize: '1.125rem',
    /* 18px */
    lineHeight: '1.75rem',
    /* 28px */
  },
  
  text_slate_500 : {
    color: 'rgb(100 116 139)',
  },
  
  text_gray_500 : {
    color: 'rgb(107 114 128)',
  },
  
  text_slate_400 : {
    color: 'rgb(148 163 184)',
  },
  
  text_sm : {
    fontSize: '0.875rem',
    /* 14px */
    lineHeight: '1.25rem',
    /* 20px */
  },
  
  text_xl : {
    fontSize: '1.25rem',
    /* 20px */
    lineHeight: '1.75rem',
    /* 28px */
  },
  
  text_2xl : {
    fontSize: '1.5rem',
    /* 24px */
    lineHeight: '2rem',
    /* 32px */
  },
  text_left : {
    textAlign: 'left',
  },
  text_center : {
    textAlign: 'center',
  },
  text_right : {
    textAlign: 'right',
  },
  text_justify : {
    textAlign: 'justify',
  },
  text_start : {
    textAlign: 'start',
  },
  text_end : {
    textAlign: 'end',
  },
  
  uppercase : {
    textTransform: 'uppercase',
  },
  
  lowercase : {
    textTransform: 'lowercase',
  },
  
  capitalize : {
    textTransform: 'capitalize',
  },
  
  normal_case : {
    textTransform: 'none',
  },
});

export default styles;
