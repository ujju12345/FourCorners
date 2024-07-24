import React, { useState, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Alert,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Avatar,
} from "@mui/material";
import axios from "axios";
import AddContact from "src/views/add-contact/AddContact";
import SidebarContactDetails from "src/views/sidebarContacts/SidebarContactDetails";
import ListContact from "src/views/list-contact/ListContact";
import PieChartIcon from "@mui/icons-material/PieChart";
import TrendingUp from "@mui/icons-material/TrendingUp";
import CurrencyExchange from "@mui/icons-material/CurrencyExchange";
import PhoneOutlined from "@mui/icons-material/PhoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useCookies } from "react-cookie";

const Contact = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [rowDataToUpdate, setRowDataToUpdate] = useState(null);
  const [showAddDetails, setShowAddDetails] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false); // New state for showing dashboard
  const [cookies, setCookie] = useCookies(["amr"]); // Define cookies and setCookie function
  // const [summary, setSummary] = useState({
  //   totalCount: 0,
  //   pastCount: 0,
  //   todayCount: 0,
  //   futureCount: 0,
  // }); // New state for summary

  // Accessing cookie values
  const userName = cookies.amr?.FullName || "User";
  const roleName = cookies.amr?.RoleName || "Admin";
  const userid = cookies.amr?.UserID || "Role";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://apiforcorners.cubisysit.com/api/api-fetch-contacts.php?UserID=${userid}`
      );
      console.log(response.data.data, "aagaya data userid wise");
      setRows(response.data.data || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }

    // try {
    //   const summaryResponse = await axios.get(
    //     `https://apiforcorners.cubisysit.com/api/api-graph-lead.php?UserID=${userid}`
    //   );
    //   setSummary(summaryResponse.data.summary);
    // } catch (error) {
    //   setError(error);
    // }
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
    setRowDataToUpdate(null);
    setShowDashboard(false); // Reset showDashboard when going back
    fetchData();
  };

  const handleEdit = (row) => {
    setEditData(row);
    setRowDataToUpdate(null);
    setShowAddDetails(true);
    setShowHistory(false);
    setFirstVisit(false);
    setShowDashboard(false); // Reset showDashboard when editing
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
    setFirstVisit(false);
    setShowDashboard(false); // Ensure dashboard is hidden when adding a contact
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

  const salesData = [
    {
      stats: "200",
      title: "Total Count",
      color: "primary",
      icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats: "10",
      title: "Past Count",
      color: "success",
      icon: <AccountCircleOutlinedIcon sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats: "400",
      color: "warning",
      title: "Today Count",
      icon: <PhoneOutlined sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats: "30",
      color: "info",
      title: "Future Count",
      icon: <CurrencyExchange sx={{ fontSize: "1.75rem" }} />,
    },
  ];

  const pieData = [
    { name: "Total Count", value: "400",  color: "#3f51b5" },
    { name: "Past Count", value: "200", color: "#4caf50" },
    { name: "Today Count", value: "200", color: "#ff9800" },
    { name: "Future Count", value: "600", color: "#00acc1" },
  ];

  const renderStats = () => {
    return salesData.map((item, index) => (
      <Grid item xs={12} sm={3} key={index}>
        <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            variant="rounded"
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: "common.white",
              backgroundColor: `${item.color}.main`,
            }}
          >
            {item.icon}
          </Avatar>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="caption">{item.title}</Typography>
            <Typography variant="h6">{item.stats}</Typography>
          </Box>
        </Box>
      </Grid>
    ));
  };

  const StatisticsCard = () => {
    return (
      <>
        <CardHeader
          title="Statistics Card"
          subheader={
            <Typography variant="body2">
              <Box
                component="span"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                Total 48.5% growth
              </Box>{" "}
              😎 this month
            </Typography>
          }
          titleTypographyProps={{
            sx: {
              mb: 2.5,
              lineHeight: "2rem !important",
              letterSpacing: "0.15px !important",
            },
          }}
        />
        <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
          <Grid container spacing={[5, 0]}>
            {renderStats()}
            <Grid item xs={12}>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label
                  >
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
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <PieChartIcon sx={{ fontSize: 60, color: "#333" }} />
          <Typography variant="h5" sx={{ marginTop: 2, fontWeight: "bold" }}>
            Welcome to Contact Dashboard, {userName}
          </Typography>
          <StatisticsCard />
        </Box>
      </Card>
    );
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <SidebarContactDetails
          rows={rows}
          onItemClick={handleShow}
          onEdit={handleEdit}
          onDashboardClick={handleNavigation}
          onCreate={handleAddTelecaller}
        />
      </Grid>
      <Grid item xs={8}>
        {loading && <CircularProgress />}
        {error && (
          <Alert severity="error">Error fetching data: {error.message}</Alert>
        )}

        {showDashboard && !loading && !error && <WelcomeScreen />}

        {firstVisit && !loading && !error && !showDashboard && (
          <WelcomeScreen />
        )}

        {showAddDetails &&
          !showDashboard && ( // Add !showDashboard condition here
            <AddContact
              show={handleBack}
              editData={editData}
              onDashboardClick={handleNavigation}
            />
          )}

        {!loading &&
          !error &&
          rowDataToUpdate &&
          !showHistory &&
          !showAddDetails &&
          !showDashboard && (
            <ListContact
              item={rowDataToUpdate}
              onDelete={handleDelete}
              onHistoryClick={handleShowHistory}
              onEdit={handleEdit}
            />
          )}
      </Grid>
    </Grid>
  );
};

export default Contact;
