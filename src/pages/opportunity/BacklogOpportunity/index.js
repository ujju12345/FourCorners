import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Alert, Typography, Box } from "@mui/material";
import axios from "axios";
import BacklogSidebar from "src/views/opportunitysidebar/backlog/BacklogSidebar";
import ListOpportunitybacklog from "src/views/list-opportunity/backlog/ListOpportunitybacklog";
import HistoryOpportunitybacklog from "src/views/history-apportunity/HistoryOpportunityBacklog/HistoryOpportunitybacklog";
import PieChartIcon from "@mui/icons-material/PieChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useCookies } from "react-cookie";
import TrendingUp from 'mdi-material-ui/TrendingUp';
import CellphoneLink from 'mdi-material-ui/CellphoneLink';
import AccountOutline from 'mdi-material-ui/AccountOutline';
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd';

const BacklogOpportunity = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [rowDataToUpdate, setRowDataToUpdate] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard"); // Manage current view state
  const [counts, setCounts] = useState(null);
  const [cookies, setCookie] = useCookies(["amr"]);
  const userid = cookies.amr?.UserID || 'Role';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://apiforcorners.cubisysit.com/api/api-graph-oppo.php?UserID=${userid}`);
      
      // Check if response.data.data or response.data.counts is undefined or null
      const data = response.data.data || [];
      const counts = response.data.counts || {
        todayFollowup: 0,
        backlogFollowup: 0,
        transfertobooking: 0,
        totalFollowup: 0,
        nextFollowup: 0
      };

      setRows(data);
      setCounts(counts);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const renderStats = () => {
    if (!counts) {
      return null;
    }

    const dynamicSalesData = [
      {
        stats: counts.todayFollowup || 0,
        title: 'Today Followups',
        color: 'primary',
        icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
      },
      {
        stats: counts.backlogFollowup || 0,
        title: 'Backlog Followups',
        color: 'success',
        icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
      },
      {
        stats: counts.transfertobooking || 0,
        color: 'warning',
        title: 'Transfer to Booking',
        icon: <CellphoneLink sx={{ fontSize: '1.75rem' }} />
      },
      {
        stats: counts.totalFollowup || 0,
        color: 'info',
        title: 'Total Followups',
        icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
      }
    ];

    return dynamicSalesData.map((item, index) => (
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
    ));
  };

  const getPieData = () => {
    if (!counts) {
      return [];
    }

    return [
      { name: 'Today Followups', value: counts.todayFollowup || 0, color: '#8884d8' },
      { name: 'Backlog Followups', value: counts.backlogFollowup || 0, color: '#82ca9d' },
      { name: 'Next Followups', value: counts.nextFollowup || 0, color: '#ffc658' },
      { name: 'Total Followups', value: counts.totalFollowup || 0, color: '#a4de6c' }
    ];
  };

  const pieData = getPieData();

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
            Welcome to Opportunity Dashboard
          </Typography>
          <Grid variant="body1" sx={{ marginTop: 10, marginLeft: 20 }}>
            <StatisticsCard />
          </Grid>
        </Box>
      </Card>
    );
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        "https://ideacafe-backend.vercel.app/api/proxy/api-delete-telecalling.php",
        {
          Tid: id,
          DeleteUID: 1,
        }
      );
      if (response.data.status === "Success") {
        setRows(rows.filter((row) => row.Tid !== id));
        setRowDataToUpdate(null);
        setCurrentView("dashboard");
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleBack = () => {
    setEditData(null);
    setRowDataToUpdate(null);
    setCurrentView("dashboard");
    fetchData();
  };

  const handleEdit = (row) => {
    setEditData(row);
    setRowDataToUpdate(null);
    setCurrentView("addDetails");
  };

  const handleShow = (item) => {
    setRowDataToUpdate(item);
    setCurrentView("details");
  };

  const handleAddTelecaller = () => {
    setEditData(null);
    setRowDataToUpdate(null);
    setCurrentView("addDetails");
  };

  const handleShowHistory = () => {
    setCurrentView("history");
  };

  const handleNavigation = () => {
    setCurrentView("dashboard");
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <BacklogSidebar
          rows={rows}
          onItemClick={handleShow}
          onEdit={handleEdit}
          onCreate={handleAddTelecaller}
          onDashboardClick={handleNavigation}
        />
      </Grid>
      <Grid item xs={8}>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">Error fetching data: {error.message}</Alert>}

        {currentView === "dashboard" && !loading && !error && <WelcomeScreen />}
        {currentView === "details" && !loading && !error && rowDataToUpdate && (
          <ListOpportunitybacklog
            item={rowDataToUpdate}
            onDelete={handleDelete}
            onHistoryClick={handleShowHistory}
            onBack={handleBack}
          />
        )}
        {currentView === "addDetails" && !loading && !error && (
          <ListOpportunitybacklog
            item={editData}
            onBack={handleBack}
          />
        )}
        {currentView === "history" && !loading && !error && (
          <HistoryOpportunitybacklog
            onBack={handleBack}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default BacklogOpportunity;
