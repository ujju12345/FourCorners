import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TablePagination,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Avatar from "@mui/material/Avatar";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios"; // Import Axios for API requests
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";
import StatisticsCard from "src/views/dashboard/StatisticsCard";
import Trophy from "src/views/dashboard/Trophy";
import WeeklyOverview from "src/views/dashboard/WeeklyOverview";
import TotalEarning from "src/views/dashboard/TotalEarning";
import CardStatisticsVerticalComponent from "src/@core/components/card-statistics/card-stats-vertical";
import SalesByCountries from "src/views/dashboard/SalesByCountries";
import DepositWithdraw from "src/views/dashboard/DepositWithdraw";
import { HelpCircleOutline, BriefcaseVariantOutline } from "mdi-material-ui";
import { Call, Contacts } from "@mui/icons-material";
import PhoneIcon from "@mui/icons-material/Phone";
import ShareIcon from "@mui/icons-material/Share";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";


const SaleDashboard = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fromdate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    todate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    Status: 1,
  });
  const [cookies] = useCookies(["amr"]);
  const [telecallingData, setTelecallingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenContact, setModalOpenContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);


  const [selectedTelecaller, setSelectedTelecaller] = useState(null);



  const userName = cookies.amr?.FullName || "User";

  useEffect(() => {
    if (!cookies || !cookies.amr || !cookies.amr.UserID) {
      router.push("/pages/login");
    }
  }, []);

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const formatCreateDate = (createDate) => {
    if (!createDate) return ""; // Handle case where createDate might be null or undefined
    const parts = createDate.split(" "); // Split date and time
    const dateParts = parts[0].split("-"); // Split yyyy-mm-dd into parts
    const time = parts[1]; // Get hh-ss-mm
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]} ${time}`; // dd-mm-yyyy format
    return formattedDate;
  };

  const whatsappText = encodeURIComponent(
    `Hello, I wanted to discuss the following details:\n\nSource Name: ${selectedTelecaller?.SourceName}\nLocation: ${selectedTelecaller?.Location}\nAttended By: ${selectedTelecaller?.TelecallAttendedByName}`
  );

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        UserID: cookies?.amr?.UserID,
        fromdate: formData?.fromdate?.toISOString(),
        todate: formData?.todate?.toISOString(),
      });
      const response = await fetch(
        `https://apiforcorners.cubisysit.com/api/api-fetch-telecallingdashboard.php?${params}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTelecallingData(data);
    } catch (error) {
      console.error("Error fetching telecalling data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (type) => {
    if (type === "telecalling") {
      setSelectedData(telecallingData?.data?.telecallingRecords);
      setSelectedType("telecalling");
    } else if (type === "contacts") {
      setSelectedData(telecallingData?.data?.contactsRecords);
      setSelectedType("contacts");
    }
  };

  const fetchDataForModal = async (Tid) => {
    try {
      const apiUrl = `https://apiforcorners.cubisysit.com/api/api-singel-telecalling.php?Tid=${Tid}`;
      const response = await axios.get(apiUrl);

      if (response.data.status === "Success") {
        console.log(response.data.data[0], "Single telecalling data fetched");
        setSelectedTelecaller(response.data.data[0]);
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching single telecalling data:", error);
    }
  };

  const fetchDataForModalContact = async (Cid) => {
    console.log('CID AAYA' , Cid);
    console.log('press');
    try {
      const apiUrl = `https://apiforcorners.cubisysit.com/api/api-singel-contacts.php?Cid=${Cid}`;
      const response = await axios.get(apiUrl);

      if (response.data.status === "Success") {
        console.log(response.data.data, "Single telecalling data fetched for cotact");
        setSelectedContact(response.data.data);
        setModalOpenContact(true);
      }
    } catch (error) {
      console.error("Error fetching single telecalling data:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>

       



        <Grid item xs={12} md={6}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats="862"
                trend="negative"
                trendNumber="-18%"
                title="New Project"
                subtitle="Yearly Project"
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats="15"
                color="warning"
                trend="negative"
                trendNumber="-18%"
                subtitle="Last Week"
                title="Sales Queries"
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default SaleDashboard;
