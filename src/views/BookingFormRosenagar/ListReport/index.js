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
    BookingID: item?.BookingID || "", // Assuming `item` has BookingID
  });

  const [paymentReceivedData, setPaymentReceivedData] = useState([]);
  const [upcomingPaymentData, setUpcomingPaymentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchData = async () => {
    if (!item || !formData.BookingID) return; // Exit if no item or BookingID

    try {
      setLoading(true);
      const response = await axios.get(
        `https://apiforcorners.cubisysit.com/api/api-fetch-paymentreceived.php?BookingID=${formData.BookingID}`
      );

      if (response.data.status === "Success") {
        setPaymentReceivedData(response.data.data.proccess_one || []);
        setUpcomingPaymentData(response.data.data.proccess_null || []);
        setDataAvailable(
          response.data.data.proccess_one.length > 0 ||
            response.data.data.proccess_null.length > 0
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
      sx={{ fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
    >
      {label}
    </TableCell>
  );

  return (
    <>
      <Card>
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
              <Button variant="contained" onClick={fetchData}>
                Search
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

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

      <Card sx={{ maxWidth: 1200, margin: "auto", padding: 2 }}>
        <CardContent>
          {loading ? (
            <CircularProgress />
          ) : dataAvailable ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="payment received table">
                  <TableHead>
                    <TableRow>
                      <SortableTableCell label="Customer Name" />
                      <SortableTableCell label="Bank Name" />
                      <SortableTableCell label="Cheque Number" />
                      <SortableTableCell label="Cheque Date" />
                      <SortableTableCell label="Amount" />
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentReceivedData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow key={row.paymentID}>
                          <TableCell>{row.RemarkName}</TableCell>
                          <TableCell>{row.BankName}</TableCell>
                          <TableCell>{row.ChequeNumber}</TableCell>
                          <TableCell>{row.ChequeDate}</TableCell>
                          <TableCell>{row.ChequeAmount}</TableCell>
                          <TableCell>
                            <IconButton color="primary" onClick={() => handleAddPayment(row)}>
                              <PaymentIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={paymentReceivedData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
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

      <Card sx={{ maxWidth: 1200, margin: "auto", padding: 2 }}>
        <CardContent>
          {loading ? (
            <CircularProgress />
          ) : dataAvailable ? (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="upcoming payment table">
                  <TableHead>
                    <TableRow>
                      <SortableTableCell label="Customer Name" />
                      <SortableTableCell label="Bank Name" />
                      <SortableTableCell label="Cheque Number" />
                      <SortableTableCell label="Cheque Date" />
                      <SortableTableCell label="Amount" />
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {upcomingPaymentData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <TableRow key={row.paymentID}>
                          <TableCell>{row.RemarkName}</TableCell>
                          <TableCell>{row.BankName}</TableCell>
                          <TableCell>{row.ChequeNumber}</TableCell>
                          <TableCell>{row.ChequeDate}</TableCell>
                          <TableCell>{row.ChequeAmount}</TableCell>
                          <TableCell>
                            <IconButton color="primary" onClick={() => handleAddPayment(row)}>
                              <PaymentIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={upcomingPaymentData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
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
    </>
  );
};

export default ListReport;
