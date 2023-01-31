// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';


// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
// const role = localStorage.getItem('role');
const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};
let userRole  = ''
if (typeof window !== 'undefined') {
  // Perform localStorage action
  userRole = JSON.parse(localStorage.getItem('user'));
}

const role = userRole?.role?.access;
console.log("user role", role);

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      

      // INVOICE
    
    
    ],
  },
];
if(role?.user?.viewBy && role?.user?.view){
  navConfig[1]?.items?.push(
    {
      title: 'user',
      path: PATH_DASHBOARD.user.list,
      icon: ICONS.user,
    })
};

if(role?.role?.view && role?.role?.viewBy){
  navConfig[1]?.items?.push(
    {
      title: 'role',
      path: PATH_DASHBOARD.role.list,
      icon: ICONS.lock,
    })
}

if(role?.invoice?.viewBy){
  navConfig[1]?.items?.push(
    {
      title: 'invoice',
      path: PATH_DASHBOARD.invoice.list,
      icon: ICONS.invoice,
     
    })
}

export default navConfig;
