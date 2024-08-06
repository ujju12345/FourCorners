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
  Badge,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useCookies } from "react-cookie";
import BellOutline from 'mdi-material-ui/BellOutline';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';
import { useRouter } from 'next/router';
import CancelIcon from "@mui/icons-material/Cancel";

// ** Styled Menu component
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

// ** Styled MenuItem component
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

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
});

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
});

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}));

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
});

const OpportunityNotification = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["amr"]);
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'));
  const router = useRouter();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userid = cookies.amr?.UserID || 'Role';

    try {
      const response = await axios.get(
        `https://apiforcorners.cubisysit.com/api/api-fetch-convtooppo.php?UserID=${userid}`
      );
      console.log("RESPONSEEEEEE DEKHHH<<<<<<<<<<<>>>>>>>>>>>>", response.data);

      // Ensure the data is an array before setting notifications
      if (Array.isArray(response.data.data)) {
        const newNotifications = response.data.data;

        if (newNotifications.length > notifications.length) {
          playNotificationSound();
        }

        setNotifications(newNotifications);
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

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play();
  };

  const handleOpportunity = () => {
    window.location.href = "/opportunity/";
  };
  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(false)
  }
  const handleDropdownClose = (notification) => {
    // Store the notification data and flag in local storage
    localStorage.setItem('selectedNotification', JSON.stringify(notification));
    localStorage.setItem('showAddDetails', 'true'); // Set flag
    // Redirect to the Opportunity page
    router.push('/opportunity');
    handleClose();
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
        onClick={handleDropdownOpen}
        aria-controls='customized-menu'
      >
        <Badge
          badgeContent={notifications.length}
          color='error'
          overlap='circular'
        >
          <BellOutline />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
            <IconButton
              aria-label="cancel"
              onClick={handleClose}
              sx={{ position: "absolute", top: 6, right: 10 }}
            >
              <CancelIcon sx={{ color: "red" }} />
            </IconButton>
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {notifications.map((notification, index) => (
            <MenuItem key={index} onClick={() => handleDropdownClose(notification)}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <Avatar alt='notification' src='/images/avatars/3.png' />
                <Box
                  sx={{
                    mx: 4,
                    flex: '1 1',
                    display: 'flex',
                    overflow: 'hidden',
                    flexDirection: 'column',
                  }}
                >
                  <MenuItemTitle>
                    Name: {notification.TitleName} {notification.CName}
                  </MenuItemTitle>
                  <MenuItemSubtitle variant='body2'>
                    Date: {notification.CreateDate}
                  </MenuItemSubtitle>
                  <MenuItemSubtitle variant='body2'>
                    Converted By: {notification.Name}
                  </MenuItemSubtitle>
                </Box>
              </Box>
            </MenuItem>
          ))}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Button fullWidth variant='contained' onClick={handleDropdownClose}>
            Read All Notifications
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default OpportunityNotification;

