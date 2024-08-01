import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {
  Box,
  Chip,
  Button,
  IconButton,
  Menu as MuiMenu,
  Avatar as MuiAvatar,
  MenuItem as MuiMenuItem,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';
import { useRouter } from 'next/router';

// ** Styled components
const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}));

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
};

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
});

const Avatar = styled(MuiAvatar)({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
});

const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}));

const MenuItemSubtitle = styled(Typography)({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
});

const NotificationDropdown = ({ 
  anchorEl, 
  handleDropdownClose, 
  anchorBooking, 
  handleDropdownBookingClose, 
  handleConvertBooking,
  notifications, 
  notificationsBooking, 
  setNotifications, 
  setNotificationsBooking 
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchData();
    fetchDataBooking();
  }, []);

  const fetchDataBooking = async () => {
    try {
      const response = await axios.get(
        `https://apiforcorners.cubisysit.com/api/api-fetch-convertbooking.php`
      );
      if (Array.isArray(response.data.data)) {
        const newNotifications = response.data.data;
        if (newNotifications.length > notificationsBooking.length) {
          setNotificationsBooking(newNotifications);
        }
      } else {
        console.error("Expected an array of notifications for booking");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching booking data:", error);
      setError(error);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://apiforcorners.cubisysit.com/api/api-fetch-notification.php`
      );
      if (Array.isArray(response.data.data)) {
        const newNotifications = response.data.data;
        if (newNotifications.length > notifications.length) {
          setNotifications(newNotifications);
        }
      } else {
        console.error("Expected an array of notifications");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setLoading(false);
    }
  };

  const handleReadAllNotifications = () => {
    router.push('/notification');
    handleDropdownClose();
  };

  const handleBookingReadAllNotifications = () => {
    router.push('/booking-notification');
    handleDropdownBookingClose();
  };

  return (
    <Fragment>
      <Menu
        id='notification-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
      >
        <PerfectScrollbar>
          <Box sx={{ padding: 2 }}>
            <Typography variant='h6'>Notifications</Typography>
          </Box>
          {loading ? (
            <Box sx={{ padding: 2 }}>
              <Typography>Loading...</Typography>
            </Box>
          ) : (
            notifications.map((notification, index) => (
              <MenuItem key={index}>
                <Avatar src='/images/avatars/1.png' alt='Avatar' />
                <Box sx={{ marginLeft: 2, flex: 1 }}>
                  <MenuItemTitle>{notification.Name}</MenuItemTitle>
                  <MenuItemSubtitle>{notification.Details?.CName}</MenuItemSubtitle>
                </Box>
              </MenuItem>
            ))
          )}
          {error && (
            <Box sx={{ padding: 2 }}>
              <Typography color='error'>Error fetching notifications</Typography>
            </Box>
          )}
          <MenuItem onClick={handleReadAllNotifications}>
            <Button variant='outlined' fullWidth>
              View All Notifications
            </Button>
          </MenuItem>
        </PerfectScrollbar>
      </Menu>

      <Menu
        id='booking-menu'
        anchorEl={anchorBooking}
        open={Boolean(anchorBooking)}
        onClose={handleDropdownBookingClose}
      >
        <PerfectScrollbar>
          <Box sx={{ padding: 2 }}>
            <Typography variant='h6'>Booking Notifications</Typography>
          </Box>
          {loading ? (
            <Box sx={{ padding: 2 }}>
              <Typography>Loading...</Typography>
            </Box>
          ) : (
            notificationsBooking.map((notification, index) => (
              <MenuItem key={index}>
                <Avatar src='/images/avatars/1.png' alt='Avatar' />
                <Box sx={{ marginLeft: 2, flex: 1 }}>
                  <MenuItemTitle>{notification.Name}</MenuItemTitle>
                  <MenuItemSubtitle>{notification.Details?.CName}</MenuItemSubtitle>
                </Box>
              </MenuItem>
            ))
          )}
          {error && (
            <Box sx={{ padding: 2 }}>
              <Typography color='error'>Error fetching booking notifications</Typography>
            </Box>
          )}
          <MenuItem onClick={handleBookingReadAllNotifications}>
            <Button variant='outlined' fullWidth>
              View All Booking Notifications
            </Button>
          </MenuItem>
        </PerfectScrollbar>
      </Menu>
    </Fragment>
  );
};

export default NotificationDropdown;
