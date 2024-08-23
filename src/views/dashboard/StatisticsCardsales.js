import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { CircularProgress } from '@mui/material';
import { useCookies } from "react-cookie";
import {
  Event as EventIcon,
  Schedule as ScheduleIcon,
  History as HistoryIcon,
  Bookmark as BookmarkIcon,
  Block as BlockIcon,
  Dashboard as DashboardIcon,
  Money as MoneyIcon,
  CreditCard as CreditCardIcon
} from '@mui/icons-material';
import DotsVertical from 'mdi-material-ui/DotsVertical';

const StatisticsCardsales = () => {
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["amr"]);

  const userid = cookies.amr?.UserID || 'Role';
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://apiforcorners.cubisysit.com/api/api-graph-oppo.php?UserID=${userid}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching API data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, [userid]);

  const renderStats = () => {
    if (loading) {
      return (
        <Grid item xs={12} sm={3}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        </Grid>
      );
    }

    const counts = apiData?.counts || {};

    return (
      <Grid container spacing={[5, 0]}>
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: 'primary.main',
              }}
            >
              <EventIcon sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Today's Follow Up</Typography>
              <Typography variant='h6'>{counts?.todayFollowup ?? '--'}</Typography>
            </Box>
          </Box>
        </Grid>
        {/* Backlog Pending */}
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: 'success.main',
              }}
            >
              <HistoryIcon sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Backlog Pending</Typography>
              <Typography variant='h6'>{counts.backlogFollowup ?? '--'}</Typography>
            </Box>
          </Box>
        </Grid>
        {/* Open Lead */}
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: 'warning.main',
              }}
            >
              <ScheduleIcon sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Open Lead</Typography>
              <Typography variant='h6'>{counts.nextFollowup ?? '--'}</Typography>
            </Box>
          </Box>
        </Grid>
        {/* Transfer To Booking */}
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: 'info.main',
              }}
            >
              <BookmarkIcon sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Transfer To Booking</Typography>
              <Typography variant='h6'>{counts.transfertobooking ?? '--'}</Typography>
            </Box>
          </Box>
        </Grid>
        {/* Not Interested */}
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: 'error.main',
              }}
            >
              <BlockIcon sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Not Interested</Typography>
              <Typography variant='h6'>{counts.notInterested ?? '--'}</Typography>
            </Box>
          </Box>
        </Grid>
        {/* Total Follow Up */}
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: 'info.main',
              }}
            >
              <DashboardIcon sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Total Follow Up</Typography>
              <Typography variant='h6'>{counts?.totalFollowup ?? '--'}</Typography>
            </Box>
          </Box>
        </Grid>
        {/* Payment Reminder - Transfer to Opportunity */}
     
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: 'primary.main',
              }}
            >
              <MoneyIcon sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Payment Reminder Transfer</Typography>
              <Typography variant='h6'>{counts.paymentremindertransfertoOppCount ?? '--'}</Typography>
            </Box>
          </Box>
        </Grid>
        {/* Payment Reminder - Today Follow Up */}
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: 'success.main',
              }}
            >
              <MoneyIcon sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Payment Reminder Today</Typography>
              <Typography variant='h6'>{counts.paymentremindertodayFollowupCount ?? '--'}</Typography>
            </Box>
          </Box>
        </Grid>
        {/* Payment Reminder - Backlog */}
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: 'warning.main',
              }}
            >
              <MoneyIcon sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Payment Reminder Backlog</Typography>
              <Typography variant='h6'>{counts.paymentreminderbacklogFollowupCount ?? '--'}</Typography>
            </Box>
          </Box>
        </Grid>
        {/* Loan Reminder - Transfer to Opportunity */}
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: 'primary.main',
              }}
            >
              <CreditCardIcon sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Loan Reminder Transfer</Typography>
              <Typography variant='h6'>{counts.loanremindertransfertoOppCount ?? '--'}</Typography>
            </Box>
          </Box>
        </Grid>
        {/* Loan Reminder - Today Follow Up */}
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: 'success.main',
              }}
            >
              <CreditCardIcon sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Loan Reminder Today</Typography>
              <Typography variant='h6'>{counts.loanremindertodayFollowupCount ?? '--'}</Typography>
            </Box>
          </Box>
        </Grid>
        {/* Loan Reminder - Backlog */}
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant='rounded'
              sx={{
                mr: 3,
                width: 44,
                height: 44,
                boxShadow: 3,
                color: 'common.white',
                backgroundColor: 'warning.main',
              }}
            >
              <CreditCardIcon sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Loan Reminder Backlog</Typography>
              <Typography variant='h6'>{counts.loanreminderbacklogFollowupCount ?? '--'}</Typography>
            </Box>
          </Box>
        </Grid>
        </Grid>

    );
  };

  return (
    <Card>
      <CardHeader
        title="Statistics Card"
        action={
          <IconButton aria-label="settings">
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent>
        <Box>{renderStats()}</Box>
      </CardContent>
    </Card>
  );
};

export default StatisticsCardsales;
