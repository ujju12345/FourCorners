import React, { useState, Fragment, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import BellRing from 'mdi-material-ui/BellRing';
import TimelineIcon from '@mui/icons-material/Timeline';
import BellOutline from 'mdi-material-ui/BellOutline';
import { useCookies } from 'react-cookie';

import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'; // Import your UserDropdown component
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown';
import Box from "@mui/material/Box";
import OpportunityNotification from 'src/@core/layouts/components/shared-components/OpportunityNotification';

const AppBarContent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorBooking, setAnchorElBooking] = useState(null);

  const [notifications, setNotifications] = useState([]); // Define notifications state
  const [notificationsBooking, setNotificationsBooking] = useState([]); // Define notificationsBooking state
  const [roleid, setRoleId] = useState(null);
  const [cookies] = useCookies(["amr"]); // Correct usage

  useEffect(() => {
    // Fetch roleid from cookies or other sources
    const userRole = cookies.amr?.RoleID;
    setRoleId(userRole);
  }, [cookies]);

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

  // Define role-based route information
  const renderContentBasedOnRole = () => {
    switch (roleid) {
      case 1: // Example role ID for Sales
        return (
          <Fragment>
            {/* Render sales-specific UI */}
          
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
          </Fragment>
        );
      case 2: // Example role ID for Manager
        return (
          <Fragment>
              <IconButton 
              color='inherit' 
              aria-haspopup='true' 
             
              aria-controls='booking-menu'
            >
              <Badge color='error'>
                <BellRing />
              </Badge>
            </IconButton>
          </Fragment>
        );
      case 3: // Example role ID for Admin
        return (
          <Fragment>
            <OpportunityNotification />
            {/* <IconButton 
              color='inherit' 
              aria-haspopup='true' 
              onClick={handleDropdownOpen} 
              aria-controls='notification-menu'
              sx={{ marginLeft: 2 }} // Add margin for spacing
            >
              <Badge badgeContent={notifications.length} color='error'>
                <TimelineIcon />
              </Badge>
            </IconButton> */}
          </Fragment>
        );
      default:
        return <Fragment />;
    }
  };

  return (
    <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
        {renderContentBasedOnRole()}

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
