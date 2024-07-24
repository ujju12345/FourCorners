import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/router';

// Icons Imports
import Menu from 'mdi-material-ui/Menu';
import Magnify from 'mdi-material-ui/Magnify';
import BellRing from 'mdi-material-ui/BellRing';
import { useCookies } from 'react-cookie';
// import Menu from '@mui/icons-material/Menu';

// Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler';
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown';
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown';
import TelecallingNotification from 'src/@core/layouts/components/shared-components/TelecallingNotification';
import OpportunityNotification from 'src/@core/layouts/components/shared-components/OpportunityNotification';

const AppBarContent = (props) => {
  // Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props;

  // Hook
  const hiddenSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [cookies, setCookie] = useCookies(['amr']);
  const roleid = cookies.amr?.roleid || '3';
  const router = useRouter();
  const isDashboard = router.pathname === '/';
  const isSalesDashboard = router.pathname === '/SaleDashboard';

  // Render the appropriate component based on roleid and path
  const renderNotificationDropdown = () => {
    if (isDashboard) {
      return <NotificationDropdown />;
    }
    if (isSalesDashboard) {
      return <OpportunityNotification />;
    }
    switch (roleid) {
      case 1:
        return <NotificationDropdown />;
      case 2:
        return <TelecallingNotification />;
      case 3:
        return <OpportunityNotification />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        className='actions-left'
        sx={{ mr: 2, display: 'flex', alignItems: 'center' }}
      >
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
        <TextField
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {/* {isDashboard && ( */}
          {/* <IconButton color='inherit'>
            <Menu />
          </IconButton> */}
        {/* )} */}
        {renderNotificationDropdown()}
        <UserDropdown />
      </Box>
    </Box>
  );
};

export default AppBarContent;
