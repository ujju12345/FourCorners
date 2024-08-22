import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Typography,
  IconButton,
  TextField,
  Avatar,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NoDataIcon = () => (
  <Avatar
    alt="No Data"
    sx={{ width: 500, height: "auto" }}
    src="/images/avatars/nodata.svg"
  />
);

const ListReport = ({ item }) => {
  const [formData, setFormData] = useState({
    fromdate: new Date(),
    todate: new Date(),
    BookingID: item?.BookingID || "",
  });

  const [paymentReceivedData, setPaymentReceivedData] = useState([]);
  const [upcomingPaymentData, setUpcomingPaymentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [totalReceived, setTotalReceived] = useState({
    cash: 0,
    cheque: 0,
    total: 0
  });

  const [totalUpcoming, setTotalUpcoming] = useState({
    cash: 0,
    cheque: 0,
    total: 0
  });

  const fetchData = async () => {
    if (!item) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `https://apiforcorners.cubisysit.com/api/api-project-networth.php?ProjectID=${item}`
      );

      if (response.data.status === "Success") {
        setPaymentReceivedData(
          response.data.receivedpayment.cash.concat(
            response.data.receivedpayment.cheque
          ) || []
        );
        setUpcomingPaymentData(
          response.data.upcomingpayment.cash.concat(
            response.data.upcomingpayment.cheque
          ) || []
        );
        setTotalReceived(response.data.totalReceivedPayment || {
          cash: 0,
          cheque: 0,
          total: 0
        });
        setTotalUpcoming(response.data.totalUpcomingPayment || {
          cash: 0,
          cheque: 0,
          total: 0
        });
        setDataAvailable(
          response.data.receivedpayment.cash.length > 0 ||
            response.data.receivedpayment.cheque.length > 0 ||
            response.data.upcomingpayment.cash.length > 0 ||
            response.data.upcomingpayment.cheque.length > 0
        );
      } else {
        setDataAvailable(false);
      }
    } catch (error) {
      console.error("Error fetching payment data:", error);
      setDataAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, [item, formData]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddPayment = (row) => {
    // Implement your payment add logic here
    console.log("Add payment", row);
  };

  const SortableTableCell = ({ label }) => (
    <TableCell
    sx={{
      fontWeight: "bold",
      fontSize: "1rem",
      cursor: "pointer",
      position: "sticky",
      top: 0,
      zIndex: 1,
      backgroundColor: "#ffffff", // Background color for the sticky header
    }}
  >
    {label}
  </TableCell>
  );

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12}>
      <Card sx={{ padding: 2, marginBottom: 3 }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                Total Payment Summary
              </Typography>
              <Box mt={2}>
                <Typography variant="body1">
                  <strong>Received Payments:</strong>
                </Typography>
                <Typography variant="body2">Current: {totalReceived.cash}</Typography>
                <Typography variant="body2">Post: {totalReceived.cheque}</Typography>
                <Typography variant="body2">Total: {totalReceived.total}</Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body1">
                  <strong>Upcoming Payments:</strong>
                </Typography>
                <Typography variant="body2">Current: {totalUpcoming.cash}</Typography>
                <Typography variant="body2">Post: {totalUpcoming.cheque}</Typography>
                <Typography variant="body2">Total: {totalUpcoming.total}</Typography>
              </Box>
            </CardContent>
          </Card>

        {/* <Card>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={3}>
                <DatePicker
                  selected={formData.fromdate}
                  onChange={(date) => handleDateChange(date, "fromdate")}
                  dateFormat="dd-MM-yyyy"
                  className="form-control"
                  customInput={
                    <TextField
                      fullWidth
                      label="From When"
                      InputProps={{
                        readOnly: true,
                        sx: { width: "100%" },
                      }}
                    />
                  }
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <DatePicker
                  selected={formData.todate}
                  onChange={(date) => handleDateChange(date, "todate")}
                  dateFormat="dd-MM-yyyy"
                  className="form-control"
                  customInput={
                    <TextField
                      fullWidth
                      label="Till When"
                      InputProps={{
                        readOnly: true,
                        sx: { width: "100%" },
                      }}
                    />
                  }
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={3}
                mb={3}
                display="flex"
                justifyContent="center"
                alignItems="flex-end"
              >
               * <Button variant="contained" onClick={fetchData}>
                  Search
                </Button> 
              </Grid>
            </Grid>
          </CardContent>
        </Card> */}

        <Grid container justifyContent="center" spacing={2} mt={5}>
          <Grid item>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Dashboard of Payment Received
            </Typography>
          </Grid>
        </Grid>

        <Card sx={{margin: "auto", padding: 2 ,height:400 , overflow:'auto' , mt:5}}>
          <CardContent>
            {loading ? (
              <CircularProgress />
            ) : dataAvailable ? (
              <>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 800 ,  }}
                    aria-label="payment received table"
                  >
                    <TableHead>
                      <TableRow>
                        <SortableTableCell label="Purchaser Name" />
                        <SortableTableCell label="Project Name" />
                        <SortableTableCell label="Wing Name" />

                        <SortableTableCell label="Flat No" />

                        <SortableTableCell label="Post" />
                        <SortableTableCell label="Current" />
                     
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paymentReceivedData
                      
                        .map((row) => (
                          <TableRow key={row.paymentID}>
                            <TableCell>{row.Name}</TableCell>
                            <TableCell>{row.ProjectName}</TableCell>
                            <TableCell>{row.WingName}</TableCell>

                            <TableCell>{row.FlatNo}</TableCell>
                            <TableCell>{row.ChequeAmount}</TableCell>
                            <TableCell>{row.Cash}</TableCell>
                          
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
               
              </>
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                minHeight={200}
              >
                <NoDataIcon />
                <Typography variant="h6" color="textSecondary" align="center">
                  No data available for this booking.
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        <Grid container justifyContent="center" spacing={2} mt={5}>
          <Grid item>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Dashboard of Upcoming Payment
            </Typography>
          </Grid>
        </Grid>

        <Card
  sx={{
    maxWidth: 1200,
    margin: "auto",
    padding: 2,
    height: 400,
    overflow: "auto",
    mt: 5,
  }}
>
  <CardContent>
    {loading ? (
      <CircularProgress />
    ) : dataAvailable ? (
      <>
        <TableContainer component={Paper}>
          <Table
            sx={{
              minWidth: 800,
              position: "relative",
              "& thead th": {
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "#ffffff", // You can change this to match your design
              },
            }}
            aria-label="upcoming payment table"
          >
            <TableHead>
              <TableRow>
                <SortableTableCell label="Purchaser Name" />
                <SortableTableCell label="Project Name" />
                <SortableTableCell label="Wing Name" />
                <SortableTableCell label="Flat No" />
                <SortableTableCell label="RemarkAmount" />
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcomingPaymentData.map((row) => (
                <TableRow key={row.paymentID}>
                  <TableCell>{row.Name}</TableCell>
                  <TableCell>{row.ProjectName}</TableCell>
                  <TableCell>{row.WingName}</TableCell>
                  <TableCell>{row.FlatNo}</TableCell>
                  <TableCell>{row.Remarkamount}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleAddPayment(row)}
                    >
                      <PaymentIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    ) : (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        minHeight={200}
      >
        <NoDataIcon />
        <Typography variant="h6" color="textSecondary" align="center">
          No data available for this booking.
        </Typography>
      </Box>
    )}
  </CardContent>
</Card>

      </Grid>
    </Grid>
  );
};

export default ListReport;
