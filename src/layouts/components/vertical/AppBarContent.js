import React, { useState, Fragment } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import BellRing from 'mdi-material-ui/BellRing';
import TimelineIcon from '@mui/icons-material/Timeline';

import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'; // Import your UserDropdown component
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown';
import Box from "@mui/material/Box";
const AppBarContent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorBooking, setAnchorElBooking] = useState(null);

  const [notifications, setNotifications] = useState([]); // Define notifications state
  const [notificationsBooking, setNotificationsBooking] = useState([]); // Define notificationsBooking state

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleConvertBooking = (event) => {
    setAnchorElBooking(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleDropdownBookingClose = () => {
    setAnchorElBooking(null);
  };

  return (
    <Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
     <IconButton 
        color='inherit' 
        aria-haspopup='true' 
        onClick={handleConvertBooking} 
        aria-controls='booking-menu'
      >
        <Badge badgeContent={notificationsBooking.length} color='error'>
          <BellRing />
        </Badge>
      </IconButton>

      <IconButton 
        color='inherit' 
        aria-haspopup='true' 
        onClick={handleDropdownOpen} 
        aria-controls='notification-menu'
        sx={{ marginLeft: 2 }} // Add margin for spacing
      >
        <Badge badgeContent={notifications.length} color='error'>
          <TimelineIcon />
        </Badge>
      </IconButton>

      <NotificationDropdown
        anchorEl={anchorEl}
        handleDropdownClose={handleDropdownClose}
        anchorBooking={anchorBooking}
        handleDropdownBookingClose={handleDropdownBookingClose}
        handleConvertBooking={handleConvertBooking}
        notifications={notifications} // Pass notifications
        notificationsBooking={notificationsBooking} // Pass notificationsBooking
        setNotifications={setNotifications} // Pass setNotifications if needed
        setNotificationsBooking={setNotificationsBooking} // Pass setNotificationsBooking if needed
      />

      <UserDropdown />
      </Box>
    </Fragment>
  );
};

export default AppBarContent;
