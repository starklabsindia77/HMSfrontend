import PropTypes from 'prop-types';
// @mui
import { Dialog, Button, DialogTitle, DialogActions, DialogContent } from '@mui/material';

// ----------------------------------------------------------------------

CustomDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.node,
  action: PropTypes.node,
  content: PropTypes.node,
  onClose: PropTypes.func,
};

export default function CustomDialog({ title, content, action, open, onClose, ...other }) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      {content && <DialogContent sx={{ typography: 'body2' }}> {content} </DialogContent>}

      <DialogActions>
        {action}

        <Button variant="outlined" color="inherit" onClick={onClose}>
         Close Popup
        </Button>
      </DialogActions>
    </Dialog>
  );
}
