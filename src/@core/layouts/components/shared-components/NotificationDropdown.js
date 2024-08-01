import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Chip,
  Button,
  IconButton,
  Menu as MuiMenu,
  Avatar as MuiAvatar,
  MenuItem as MuiMenuItem,
  Typography,
  Badge
} from '@mui/material';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCookies } from "react-cookie";
import BellRing from 'mdi-material-ui/BellRing';
import TimelineIcon from '@mui/icons-material/Timeline';
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

const NotificationDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorBooking, setAnchorElBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [notificationsBooking, setNotificationsBooking] = useState([]);
  const [error, setError] = useState(null);
  const [permission, setPermission] = useState('default'); // Default value
  const [cookies] = useCookies(["amr"]);
  const [hasShownNotification, setHasShownNotification] = useState(false); // Track if notification has been shown
  const [hasShownBookingNotification, setHasShownBookingNotification] = useState(false); // Track if booking notification has been shown
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    } else {
      console.log('Notifications are not supported by this browser.');
    }
    fetchData();
    fetchDataBooking();
  }, []);

  useEffect(() => {
    if (notifications.length > 0 && !hasShownNotification) {
      // Sort notifications by CreatedDate and display the latest one
      const sortedNotifications = [...notifications].sort((a, b) => new Date(b.CreatedDate) - new Date(a.CreatedDate));
      const latestNotification = sortedNotifications[0];
      showNotification(latestNotification.Details?.CName, latestNotification?.Name);
      setHasShownNotification(true); // Set flag to true after showing notification
    }
  }, [notifications, hasShownNotification]);

  useEffect(() => {
    if (notificationsBooking.length > 0 && !hasShownBookingNotification) {
      // Sort notifications by CreatedDate and display the latest one
      const sortedNotifications = [...notificationsBooking].sort((a, b) => new Date(b.CreatedDate) - new Date(a.CreatedDate));
      const latestNotification = sortedNotifications[0];
      showNotification(latestNotification.Details?.CName, latestNotification?.Name);
      setHasShownBookingNotification(true); // Set flag to true after showing notification
    }
  }, [notificationsBooking, hasShownBookingNotification]);

  const fetchDataBooking = async () => {
    const userid = cookies.amr?.UserID || 'Role';

    try {
      const response = await axios.get(
        `https://apiforcorners.cubisysit.com/api/api-fetch-convertbooking.php?UserID=${userid}`
      );
      console.log("RESPONSE:", response.data);

      if (Array.isArray(response.data.data)) {
        const newNotifications = response.data.data;
        
        if (newNotifications.length > notificationsBooking.length) {
          setNotificationsBooking(newNotifications);
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

  const fetchData = async () => {
    const userid = cookies.amr?.UserID || 'Role';

    try {
      const response = await axios.get(
        `https://apiforcorners.cubisysit.com/api/api-fetch-notification.php`
      );
      console.log("RESPONSE:", response.data);

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

  const requestNotificationPermission = () => {
    if (typeof Notification !== 'undefined') {
      Notification.requestPermission().then(permission => {
        setPermission(permission);
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    }
  };

  const showNotification = (CName, Name) => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      const options = {
        body: `CName: ${CName}\nInserted by: ${Name}`,
        icon: '/images/favicon.png', // Optional: Path to an icon
      };
      new Notification('New Notification', options);
    }
  };

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleConvertBooking = event => {
    setAnchorElBooking(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleDropdownBooking = () => {
    setAnchorElBooking(null);
  };

  const handleReadAllNotifications = () => {
    router.push('/notification');
    handleDropdownClose();
  };

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>;
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
      );
    }
  };

  return (
    <Fragment>
      <IconButton 
        color='inherit' 
        aria-haspopup='true' 
        onClick={handleConvertBooking} 
        aria-controls='customized-menu'
      >
        <Badge badgeContent={notificationsBooking.length} color='error'>
          <BellRing />
        </Badge>
      </IconButton>

      <IconButton 
        color='inherit' 
        aria-haspopup='true' 
        onClick={handleDropdownOpen} 
        aria-controls='customized-menu'
        sx={{ marginLeft: 2 }} // Add margin for spacing
      >
        <Badge badgeContent={notifications.length} color='error'>
          <TimelineIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorBooking}
        open={Boolean(anchorBooking)}
        onClose={handleDropdownBooking}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Booking Notifications</Typography>
            <Chip
              size='small'
              label={`${notificationsBooking.length} New`}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {notificationsBooking.map((notification, index) => (
            <MenuItem key={index} onClick={handleDropdownClose}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Avatar alt='notification' src='/images/avatars/3.png' />
                <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle>Name: {notification?.TitleName} {notification.Details?.CName}</MenuItemTitle>
                  <MenuItemSubtitle variant='body2'>Estimated budget: {notification.EstimatedbudgetName}</MenuItemSubtitle>
                  <MenuItemSubtitle variant='body2'>Source Name: {notification.SourceName}</MenuItemSubtitle>
                </Box>
              </Box>
            </MenuItem>
          ))}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Button fullWidth variant='contained' onClick={handleReadAllNotifications}>
            Read All Booking Notifications
          </Button>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>General Notifications</Typography>
            <Chip
              size='small'
              label={`${notifications.length} New`}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {notifications.map((notification, index) => (
            <MenuItem key={index} onClick={handleDropdownClose}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Avatar alt='notification' src='/images/avatars/3.png' />
                <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle>Name: {notification?.TitleName} {notification.Details?.CName}</MenuItemTitle>
                  <MenuItemSubtitle variant='body2'>Estimated budget: {notification.EstimatedbudgetName}</MenuItemSubtitle>
                  <MenuItemSubtitle variant='body2'>Source Name: {notification.SourceName}</MenuItemSubtitle>
                </Box>
              </Box>
            </MenuItem>
          ))}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Button fullWidth variant='contained' onClick={handleReadAllNotifications}>
            Read All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default NotificationDropdown;
