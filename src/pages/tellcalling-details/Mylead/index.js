import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Alert, Typography, Box } from '@mui/material';
import axios from 'axios';
import AddTellecallingDetails from 'src/views/add-tellecallingDetails/AddTellecallingDetails';
import MyleadSidebar from 'src/views/TellecallingSidebar/Mylead/MyleadSidebar';
import Listmylead from 'src/views/list-tellecalling/Mylead/Listmylead';
import HistoryTelecalling from 'src/views/history-telecalling/HistoryTelecalling';
import PieChartIcon from '@mui/icons-material/PieChart';
import Card from '@mui/material/Card'
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import CardContent from '@mui/material/CardContent'
import { useCookies } from "react-cookie";
import Photo from 'src/pages/404'
import AddIcon from "@mui/icons-material/Add";
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CancelIcon from '@mui/icons-material/Cancel';
import HistoryLead from 'src/views/history-telecalling/HistoryLead/HistoryLead';
const salesData = [
  {
    stats: '50',
    title: 'Today Leads',
    color: 'primary',
    icon: <AccountBalanceWalletIcon sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '15',
    title: 'Followup',
    color: 'success',
    icon: <ScheduleIcon sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '20',
    color: 'warning',
    title: 'Interested',
    icon: <FavoriteIcon sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '02',
    color: 'info',
    title: 'Disqualified',
    icon: <CancelIcon sx={{ fontSize: '1.75rem' }} />
  }
]

const pieData = [
  { name: 'Today Leads', value: 50, color: '#3f51b5' },
  { name: 'Followup', value: 15, color: '#4caf50' },
  { name: 'Interested', value: 20, color: '#ff9800' },
  { name: 'Disqualified', value: 2, color: '#00acc1' }
]


const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const StatisticsCard = () => {
  return (
    <>
      <CardHeader
        title='Statistics Card'
        // action={
        //   <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
        //     <DotsVertical />
        //   </IconButton>
        // }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Total 48.5% growth
            </Box>{' '}
            😎 this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
          <Grid item xs={12}>
            <ResponsiveContainer width='100%' height={400}>
              <PieChart>
                <Pie data={pieData} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={120} fill='#8884d8' label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </CardContent>
    </>
  )
}

const WelcomeScreen = () => {
  return (
    <Card>
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <PieChartIcon sx={{ fontSize: 60, color: "#333" }} />
        <Typography variant="h5" sx={{ marginTop: 2, fontWeight: "bold" }}>
          Welcome to My Lead Dashboard
        </Typography>
        <Grid variant="body1" sx={{ marginTop: 10 , marginLeft:20}}>
          <StatisticsCard/>
        </Grid>
      </Box>
    </Card>
  );
};

const Tellecalling = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [rowDataToUpdate, setRowDataToUpdate] = useState(null);
  const [showAddDetails, setShowAddDetails] = useState(false);
  const [cookies, setCookie] = useCookies(["amr"]);
  const [showDashboard, setShowDashboard] = useState(false); // New state for showing dashboard

  const [showHistory, setShowHistory] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const userid = cookies.amr?.UserID || 'Role';
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://apiforcorners.cubisysit.com/api/api-fetch-mylead.php?UserID=${userid}`);
      setRows(response.data.data || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post('https://ideacafe-backend.vercel.app/api/proxy/api-delete-telecalling.php', {
        Tid: id,
        DeleteUID: 1
      });
      if (response.data.status === 'Success') {
        setRows(rows.filter(row => row.Tid !== id));
        setRowDataToUpdate(null);
        setShowAddDetails(false);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleBack = () => {
    setEditData(null);
    setShowAddDetails(false);
    setShowHistory(false);
    setShowDashboard(false); // Reset showDashboard when editing

    setRowDataToUpdate(null);
    fetchData();
  };

  const handleEdit = (row) => {
    setEditData(row);
    setRowDataToUpdate(null);
    setShowAddDetails(true);
    setShowHistory(false);
    setShowDashboard(false); // Reset showDashboard when editing

    setFirstVisit(false);
  };

  const handleShow = (item) => {
    setRowDataToUpdate(item);
    setShowAddDetails(false);
    setShowHistory(false);
    setFirstVisit(false);
    setShowDashboard(false); // Reset showDashboard when showing details

  };

  const handleAddTelecaller = () => {
    setEditData(null);
    setShowAddDetails(false);
    setRowDataToUpdate(null);
    setShowHistory(false);
    setShowDashboard(false); // Ensure dashboard is hidden when adding a contact

    setFirstVisit(false);
    setTimeout(() => {
      setShowAddDetails(true);
    }, 0);
  };

  const handleShowHistory = () => {
    setShowHistory(true);
    setShowAddDetails(false);
    setFirstVisit(false);
    setShowDashboard(false); // Reset showDashboard when showing history

  };

  const handleNavigation = () => {
    setShowDashboard(true);
    setShowAddDetails(false); // Ensure the AddContact form is hidden when navigating to the dashboard
  };


  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <MyleadSidebar rows={rows} onItemClick={handleShow} onEdit={handleEdit} onCreate={handleAddTelecaller} onDashboardClick={handleNavigation} />
      </Grid>
      <Grid item xs={8}>
        {loading && <CircularProgress />}
        {/* {error &&  <Photo/>} */}
        {showDashboard && !loading && !error && <WelcomeScreen />}
        {firstVisit && !loading && !error && (
          <WelcomeScreen />

        )}

     

        {!loading && !error && rowDataToUpdate && !showHistory && !showAddDetails &&  !showDashboard &&(
          <Listmylead
            item={rowDataToUpdate}
            onDelete={handleDelete}
            onHistoryClick={handleShowHistory}
            onEdit={handleEdit}
          />
        )}

{!loading && !error && showHistory && (
          <Box display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh">
            <Typography variant="body2" sx={{ marginTop: 5, fontWeight: "bold",textAlign:'center', fontSize: 20, }}>
              User History
            </Typography>
            <HistoryLead item={rowDataToUpdate} onBack={handleBack} />
          </Box>
        )}

      </Grid>
    </Grid>
  );
};

export default Tellecalling;
