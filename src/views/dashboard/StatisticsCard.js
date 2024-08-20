import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import TrendingUp from 'mdi-material-ui/TrendingUp';
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd';
import DotsVertical from 'mdi-material-ui/DotsVertical';
import CellphoneLink from 'mdi-material-ui/CellphoneLink';
import AccountOutline from 'mdi-material-ui/AccountOutline';
import { CircularProgress } from '@mui/material';
import { useCookies } from "react-cookie";

const StatisticsCard = () => {
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["amr"]);
  const userid = cookies.amr?.UserID || 'Role';
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://apiforcorners.cubisysit.com/api/api-graph-admin.php?UserID=${userid}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApiData(data.counts); // Store counts in state
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

    return (
      <Grid container spacing={[5, 0]}>
        <Grid item xs={12} sm={3}>
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
              <TrendingUp sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Today Follow Up</Typography>
              <Typography variant='h6'>{apiData?.totalOpportunityFollowupCount || 0}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
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
              <AccountOutline sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Backlog Pending</Typography>
              <Typography variant='h6'>42</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
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
              <CellphoneLink sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>Open Opportunity</Typography>
              <Typography variant='h6'>{apiData?.totalNextFollowupCount || 0}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
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
              <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
            </Avatar>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='caption'>All Opportunity</Typography>
              <Typography variant='h6'>223</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    );
  };

  return (
    <Card>
      <CardHeader
        title='Statistics Card'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Total 234 % growth
            </Box>{' '}
            😎 this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important',
          },
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        {renderStats()}
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
