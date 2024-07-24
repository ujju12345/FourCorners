import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Alert, Typography, Box, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import axios from 'axios';
import BacklogSidebar from 'src/views/TellecallingSidebar/Backlog/BacklogSidebar';
import Listbacklog from 'src/views/list-tellecalling/Backlog/Listbacklog';
import HistoryBooking from 'src/views/history-telecalling/HistoryBacklog/HistoryBooking';
import PieChartIcon from '@mui/icons-material/PieChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ScheduleIcon from '@mui/icons-material/Schedule';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CancelIcon from '@mui/icons-material/Cancel';
import { useCookies } from "react-cookie";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import AddTellecallingDetails from 'src/views/add-tellecallingDetails/AddTellecallingDetails'; // Uncomment this import

const salesData = [
  { stats: '50', title: 'Today Leads', color: 'primary', icon: <AccountBalanceWalletIcon sx={{ fontSize: '1.75rem' }} /> },
  { stats: '15', title: 'Followup', color: 'success', icon: <ScheduleIcon sx={{ fontSize: '1.75rem' }} /> },
  { stats: '20', title: 'Interested', color: 'warning', icon: <FavoriteIcon sx={{ fontSize: '1.75rem' }} /> },
  { stats: '02', title: 'Disqualified', color: 'info', icon: <CancelIcon sx={{ fontSize: '1.75rem' }} /> }
];

const pieData = [
  { name: 'Today Leads', value: 50, color: '#3f51b5' },
  { name: 'Followup', value: 15, color: '#4caf50' },
  { name: 'Interested', value: 20, color: '#ff9800' },
  { name: 'Disqualified', value: 2, color: '#00acc1' }
];

const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
  ));
};

const StatisticsCard = () => {
  return (
    <>
      <CardHeader
        title='Statistics Card'
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
  );
};

const WelcomeScreen = () => {
  return (
    <Card>
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <PieChartIcon sx={{ fontSize: 60, color: "#333" }} />
        <Typography variant="h5" sx={{ marginTop: 2, fontWeight: "bold" }}>
          Welcome to My Backlog Dashboard
        </Typography>
        <Grid variant="body1" sx={{ marginTop: 10, marginLeft: 20 }}>
          <StatisticsCard />
        </Grid>
      </Box>
    </Card>
  );
};

const BacklogLead = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('dashboard'); // 'dashboard', 'addDetails', 'history', 'list'
  const [editData, setEditData] = useState(null);
  const [rowDataToUpdate, setRowDataToUpdate] = useState(null);
  const [cookies] = useCookies(["amr"]);

  const userid = cookies.amr?.UserID || 'Role';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://apiforcorners.cubisysit.com/api/api-fetch-backlog.php?UserID=${userid}`);
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
        setView('dashboard');
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleBack = () => {
    setEditData(null);
    setView('dashboard');
    fetchData();
  };

  const handleEdit = (row) => {
    setEditData(row);
    setView('addDetails');
  };

  const handleShow = (item) => {
    setRowDataToUpdate(item);
    setView('list');
  };

  const handleAddTelecaller = () => {
    setEditData(null);
    setView('addDetails');
  };

  const handleShowHistory = () => {
    setView('history');
  };
  const handleNavigation = () => {
    setView('dashboard');
  };

  const renderContent = () => {
    if (loading) return <CircularProgress />;
    if (error) return <Typography>Error loading data</Typography>;

    switch (view) {
      case 'dashboard':
        return <WelcomeScreen />;
      case 'addDetails':
        return <AddTellecallingDetails show={handleBack} editData={editData} />;
      case 'list':
        return (
          <Listbacklog
            item={rowDataToUpdate}
            onDelete={handleDelete}
            onHistoryClick={handleShowHistory}
            onEdit={handleEdit}
          />
        );
      case 'history':
        return (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <Typography variant="body2" sx={{ marginTop: 5, fontWeight: "bold", alignItems: 'center', textAlign: 'center', fontSize: 20 }}>
              User History
            </Typography>
            <HistoryBooking item={rowDataToUpdate} onBack={handleBack} />
          </Box>
        );
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <BacklogSidebar rows={rows} onItemClick={handleShow} onEdit={handleEdit} onCreate={handleAddTelecaller} onDashboardClick={handleNavigation} />
      </Grid>
      <Grid item xs={8}>
        {renderContent()}
      </Grid>
    </Grid>
  );
};

export default BacklogLead;
