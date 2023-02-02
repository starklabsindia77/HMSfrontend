import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';
const base_url = 'https://serkowebtest.blob.core.windows.net/airline-logos';
// ----------------------------------------------------------------------

const AirlineLogo = forwardRef(({ disabledLink = false, sx, code, type, height, ...other }, ref) => {
  const theme = useTheme();
  
  const AirlineLogo = (
    <Box
      ref={ref}
      height={height}
      component="div"
      sx={{
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      
       <img
            alt={code}
            className="rounded-lg mr-2"
            src={ code.length > 2 ? `${code}`: `${base_url}/${code}${type}.png`}
            // onError={this.handleError}
          />
    </Box>
  );

  if (disabledLink) {
    return <>{AirlineLogo}</>;
  }

  return (
    <NextLink href="#" passHref>
      <Link sx={{ display: 'contents' }}>{AirlineLogo}</Link>
    </NextLink>
  );
});

AirlineLogo.propTypes = {
  sx: PropTypes.object,
  code:PropTypes.string,
  type: PropTypes.string,
  height: PropTypes.number,
  disabledLink: PropTypes.bool,
};

export default AirlineLogo;
