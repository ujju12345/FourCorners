import React, { useState, useEffect } from 'react';
import {
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  CardHeader,
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
  MenuItem,
  TextField,
  Modal,
  Avatar,
  FormControlLabel,
  Checkbox,
  InputAdornment
} from "@mui/material";
import PaymentIcon from '@mui/icons-material/Payment';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";import { Info as InfoIcon } from '@mui/icons-material';
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import VisibilityIcon from '@mui/icons-material/Visibility';

const NoDataIcon = () => (
  <Avatar
    alt="No Data"
    sx={{ width: 500, height: 'auto' }}
    src="/images/avatars/nodata.svg"
  />
);

const Listprojectbookng = ({ item }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["amr"]);
  const [wings, setWings] = useState([]);
  const [selectedWing, setSelectedWing] = useState(null);
  const [wingDetails, setWingDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [formDatapayment, setFormDatapayment] = useState({
    fromdate: new Date(),
    todate: new Date()
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(true);
  const[bankName , setBankName] = useState('');
  const[cheqNo , setCheqNo] = useState('');
  const [bookingRemarks, setBookingRemarks] = useState([]);
  const [selectedBookingRemark, setSelectedBookingRemark] = useState('');
  const [bookingRemarkDetails, setBookingRemarkDetails] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [cashPaid, setCashPaid] = useState('');
  const [cashPaidRemark, setCashPaidRemarks] = useState('');
  const [chequePaidRemarks, setChequePaidRemarks] = useState('');
  const [chequePaid, setChequePaid] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [formData, setFormData] = useState({ AmountGiven: new Date() });
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const [remarks, setRemarks] = useState([{ Remarkamount: '', RemarkName: '', RemarkDate: new Date(), Loan: 0 }]);
  const [paymentData, setPaymentData] = useState({
    proccess_null: [],
    proccess_one: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!item) return;
      try {
        const apiUrl = `https://apiforcorners.cubisysit.com/api/api-fetch-projectwings.php?ProjectID=${item.ProjectID}`;
        const response = await axios.get(apiUrl);
        if (response.data.status === "Success") {
          setWings(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching wings data:", error);
      }
    };
    fetchData();
  }, [item]);

  useEffect(() => {
    axios.get('https://apiforcorners.cubisysit.com/api/api-dropdown-paymenttype.php')
      .then(response => {
        if (response.data.code === 200) {
          setPaymentTypes(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching payment types:', error);
      });
  }, []);

  const handleWingClick = async (wing) => {
    try {
      setLoading(true);
      const apiUrl = `https://apiforcorners.cubisysit.com/api/api-fetch-wing.php?WingID=${wing.WingID}&ProjectID=${item.ProjectID}`;
      const response = await axios.get(apiUrl);
      if (response.data.status === "Success") {
        setWingDetails(response.data.data);
        setSelectedWing(wing);
        setDataAvailable(response.data.data.length > 0);
      } else {
        setDataAvailable(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching wing details:", error);
      setDataAvailable(false);
    }
  };

  useEffect(() => {
    // Update booking remark details based on the selected remark
    const selectedRemark = bookingRemarks.find(
      (remark) => remark.BookingremarkID === selectedBookingRemark
    );
    setBookingRemarkDetails(selectedRemark || {});
  }, [selectedBookingRemark]);


  const handleAddPayment = async (bookingID) => {
    setSelectedRow(bookingID);
    setModalOpen(true);
    setCashPaid('');
    setChequePaid('');
    setTotalCost(0); // Assuming TotalCost needs to be reset
    try {
      const response = await axios.get(`https://apiforcorners.cubisysit.com/api/api-dropdown-bookingremark.php?BookingID=${bookingID}`);
      if (response.data.status === 'Success') {
        const bookingRemarksData = response.data.data;
        setBookingRemarks(bookingRemarksData);
  
        // Assuming you want to fetch the details for the first booking remark in the list
        if (bookingRemarksData.length > 0) {
          const firstBookingRemarkID = bookingRemarksData[0].BookingremarkID;
          await fetchBookingRemarkDetails(firstBookingRemarkID);
        }
      }
    } catch (error) {
      console.error('Error fetching booking remarks:', error);
    }
  };
  
  const fetchBookingRemarkDetails = async (bookingRemarkID) => {
    try {
      const response = await axios.get(`https://apiforcorners.cubisysit.com/api/api-dropdown-bookingremarkdetails.php?BookingremarkID=${bookingRemarkID}`);
      if (response.data.status === 'Success') {
        setBookingRemarkDetails(response.data.data[0]);
      }
    } catch (error) {
      console.error('Error fetching booking remark details:', error);
    }
  };
  
  const handleBookingRemarkChange = async (e) => {
    const bookingRemarkID = e.target.value;
    setSelectedBookingRemark(bookingRemarkID);
    await fetchBookingRemarkDetails(bookingRemarkID);
  };
  
  

  const SortableTableCell = ({ label, onClick }) => (
    <TableCell
      sx={{ fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
      onClick={onClick}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {label}
        <span>&#8597;</span>
      </Box>
    </TableCell>
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (searchQuery) {
      setFilteredRows(
        wingDetails.filter(row =>
          row.FlatNo.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.Partyname.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredRows(wingDetails);
    }
  }, [searchQuery, wingDetails]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedPaymentType(event.target.value);
  };


  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  const handleAddition = () => {
    return parseFloat(cashPaid || 0) + parseFloat(chequePaid || 0);
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, AmountGiven: date });
  };
  const handleDateChangePayment = (date, key) => {
    setFormData({ ...formData, [key]: date });
  };

  const handleAddRemark = () => {
    setRemarks([...remarks, { Remarkamount: '', RemarkName: '', RemarkDate: new Date(), Loan: 0 }]);
  };

  const handleRemoveRemark = (index) => {
    const newRemarks = remarks.filter((_, i) => i !== index);
    setRemarks(newRemarks);
  };

  const handleChangeRemark = (e, index, field) => {
    const newRemarks = [...remarks];
    newRemarks[index][field] = e.target.value;
    setRemarks(newRemarks);
  };

  const handleDateRemarks = (date, index) => {
    const newRemarks = [...remarks];
    newRemarks[index].RemarkDate = date;
    setRemarks(newRemarks);
  };

  const handleLoanChange = (e, index) => {
    const newRemarks = [...remarks];
    newRemarks[index].Loan = e.target.checked ? 1 : 0;
    setRemarks(newRemarks);
  };

  const handleOpenPayment = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDateSearch = async () => {
    try {
      const response = await axios.post('https://ideacafe-backend.vercel.app/api/proxy/api-fetch-paymentreceived.php', {
        BookingID: 61,
        fromdate: formData.fromdate?.toISOString().split('T')[0],
        todate: formData.todate?.toISOString().split('T')[0],
      });
      setPaymentData(response.data.data);
    } catch (error) {
      console.error('Error fetching payment data', error);
    }
  };



  const handleSubmit = async () => {
    // Prepare the data for the API request
    const payload = {
      BookingID: selectedRow, 
      BookingremarkID:selectedBookingRemark , 
      Remarkamount: remarks.reduce((acc, remark) => acc + parseFloat(remark.Remarkamount || 0), 0), // Sum of all remark amounts
      Cash: cashPaid || '0',
      ChequeAmount: chequePaid || '0',
      BankName: bankName || '', 
      ChequeNumber:cheqNo ||'', 
      ChequeDate: formData.AmountGiven.toISOString().split('T')[0], 
      paymenttypeID: 1, 
      Loan:1, 
      CreateUID: 1 
    };
  
    try {
      const response = await axios.post('https://ideacafe-backend.vercel.app/api/proxy/api-insert-payment.php', payload);
      console.log('Response:', response.data);
      if (response.data.status === 'Success') {
        console.log('Payment successfully submitted:', response.data);
        setCashPaid('');
        setChequePaid('');
        setBankName('');
        setCheqNo('');
        setFormData({ AmountGiven: new Date() });
        setSelectedPaymentType('');
        setRemarks([{ Remarkamount: '', RemarkName: '', RemarkDate: new Date(), Loan: 0 }]);
        setSelectedBookingRemark('');
        setBookingRemarkDetails({});
        setSelectedRow(null);
        
         Swal.fire({
          icon: "success",
          title: 'Data Submitted Successfully',
          showConfirmButton: false,
          timer: 1000,
        });

        handleModalClose();
      } else {
        // Handle unsuccessful response
        console.error('Failed to submit payment:', response.data.message);
        // Show an error message to the user if needed
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      // Show an error message to the user if needed
    }
  };
  
  
  return (
    <>
      <Grid container justifyContent="center" spacing={2} sx={{ marginBottom: 5 }}>
        {wings.map((wing) => (
          <Grid item key={wing.WingID}>
            <Button
              variant="contained"
              onClick={() => handleWingClick(wing)}
              sx={{
                color: "#333333",
                fontSize: "0.6rem",
                backgroundColor: "#f0f0f0",
                minWidth: "auto",
                minHeight: 20,
                "&:hover": {
                  backgroundColor: "#dcdcdc",
                },
              }}
            >
              {wing.WingName}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ padding: 2, marginBottom: 2 }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Flat No or Name"
          style={{ width: '100%', padding: '8px' }}
        />
      </Box>

      {selectedWing && (
        <Card sx={{ maxWidth: 1200, margin: 'auto', padding: 2 }}>
          <CardHeader title={`${selectedWing.WingName} Details`} />
          <CardContent>
            {loading ? (
              <CircularProgress />
            ) : dataAvailable ? (
              <>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="wing details table">
  <TableHead>
    <TableRow>
      <SortableTableCell label="Party Name" />
      <SortableTableCell label="Project Name" />
      <SortableTableCell label="Wing Name" />
      <SortableTableCell label="Flat No" />
      <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Actions</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {(searchQuery ? filteredRows : wingDetails)
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row) => (
        <TableRow key={row.RoomID}>
          <TableCell>{row.Partyname}</TableCell>
          <TableCell>{row.ProjectName}</TableCell>
          <TableCell>{row.WingName}</TableCell>
          <TableCell>{row.FlatNo}</TableCell>
          <TableCell>
            <IconButton onClick={handleOpenPayment}>
              <VisibilityIcon />
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton
              onClick={() => handleAddPayment(row.BookingID)}
              variant="outlined"
              color="primary"
            >
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
                  count={wingDetails.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            ) : (
              <Box textAlign="center">
                <Typography variant="h6">No data available</Typography>
                <NoDataIcon />
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={{ padding: 15, backgroundColor: 'white', margin:'auto',  width: 900 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6" gutterBottom>Add Payment</Typography>
            </Grid>

            <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          select
          label="Select Booking Remark"
          value={selectedBookingRemark}
          onChange={(e) => setSelectedBookingRemark(e.target.value)}
          fullWidth
          margin="normal"
        >
          {bookingRemarks.map((option) => (
            <MenuItem key={option.BookingremarkID} value={option.BookingremarkID}>
              {option.RemarkName}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {selectedBookingRemark && (
        <>
          <Grid item xs={4}>
            <TextField
              label="Remark Amount"
              value={bookingRemarkDetails.Remarkamount || ''}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Remark Name"
              value={bookingRemarkDetails.RemarkName || ''}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </>
      )}
    </Grid>
         
          
            <Grid item xs={4}>
              <TextField
                label="Cash Paid"
                type="number"
                value={cashPaid}
                onChange={(e) => setCashPaid(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Cheque Paid"
                type="number"
                value={chequePaid}
                onChange={(e) => setChequePaid(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Total Amount"
                type="number"
                value={handleAddition()}
                InputProps={{
                  readOnly: true,
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Bank Name"
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                fullWidth
                margin="normal"
               
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Cheque Number"
                type="Number"
                value={cheqNo}
                onChange={(e) => setCheqNo(e.target.value)}
                fullWidth
                margin="normal"
               
              />
            </Grid>
            

            <Grid item xs={3} mt={3.5}>
              <DatePicker
                selected={formData.AmountGiven}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                customInput={<TextField label="Date" fullWidth />}
              />
            </Grid>
          
            <Grid item xs={4}>
              <TextField
                select
                label="Select Payment Type"
                value={selectedPaymentType}
                onChange={handleChange}
                fullWidth
                margin="normal"
              >
                {paymentTypes.map((option) => (
                  <MenuItem key={option.paymenttypeID} value={option.paymenttypeName}>
                    {option.paymenttypeName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {selectedPaymentType === 'Partial payment' && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Remarks</Typography>
                </Grid>
                {remarks.map((remark, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={3} >
                      <TextField
                        label="Amount"
                        type="number"
                        value={remark.Remarkamount}
                        onChange={(e) => handleChangeRemark(e, index, 'Remarkamount')}
                        fullWidth
                        margin="normal"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        }}
                      />
                    </Grid>
                    <Grid item xs={3} >
                      <TextField
                        label="Remark"
                        value={remark.RemarkName}
                        onChange={(e) => handleChangeRemark(e, index, 'RemarkName')}
                        fullWidth
                        margin="normal"
                      />
                    </Grid>
                    
                    <Grid item xs={3}>
              <TextField
                label="A"
                type="number"
                value={cashPaidRemark}
                onChange={(e) => setCashPaidRemarks(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="B"
                type="number"
                value={chequePaidRemarks}
                onChange={(e) => setChequePaidRemarks(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Grid>
            <Grid item xs={3} >
                      <DatePicker
                        selected={remark.RemarkDate}
                        onChange={(date) => handleDateRemarks(date, index)}
                        dateFormat="yyyy-MM-dd"
                        customInput={<TextField label="Date" fullWidth />}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={remark.Loan === 1}
                            onChange={(e) => handleLoanChange(e, index)}
                          />
                        }
                        label="Loan Process"
                      />
                    </Grid>
                    <Grid item xs={12} container justifyContent="flex-end">
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleRemoveRemark(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Button
                    onClick={handleAddRemark}
                    variant="outlined"
                    startIcon={<AddIcon />}
                  >
                    Add Remark
                  </Button>
                </Grid>
              </>
            )}

            <Grid item xs={12} container justifyContent="flex-end">
              <Button onClick={handleModalClose} variant="contained" color="primary">
                Close
              </Button>
            </Grid>
            <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    marginRight: 3.5,
                    marginTop: 5,
                    backgroundColor: "#9155FD",
                    color: "#FFFFFF",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal open={open} onClose={handleClose}>
      <Card style={{ maxWidth: '800px', margin: 'auto', marginTop: '50px', padding: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">Payment Details</Typography>
          <Grid container spacing={4} mb={3}>
            <Grid item xs={12} sm={6} md={4}>
              <DatePicker
                selected={formData.fromdate}
                onChange={(date) => handleDateChangePayment(date, "fromdate")}
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

            <Grid item xs={12} sm={6} md={4}>
              <DatePicker
                selected={formData.todate}
                onChange={(date) => handleDateChangePayment(date, "todate")}
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
              sm={12}
              md={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button variant="contained" onClick={handleDateSearch} style={{ width: '100%' }}>Search</Button>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Upcoming Payments</Typography>
              <TableContainer component={Paper} style={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Remark Amount</TableCell>
                      <TableCell>Remark Name</TableCell>
                      <TableCell>Remark Date</TableCell>
                      <TableCell>Loan</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentData.proccess_null.length > 0 ? (
                      paymentData.proccess_null.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.Remarkamount}</TableCell>
                          <TableCell>{item.RemarkName}</TableCell>
                          <TableCell>{item.RemarkDate}</TableCell>
                          <TableCell>{item.Loan ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">No Upcoming Payments</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6">Received Payments</Typography>
              <TableContainer component={Paper} style={{ maxHeight: 400 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Remark Amount</TableCell>
                      <TableCell>Remark Name</TableCell>
                      <TableCell>Remark Date</TableCell>
                      <TableCell>Loan</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentData.proccess_one.length > 0 ? (
                      paymentData.proccess_one.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.Remarkamount}</TableCell>
                          <TableCell>{item.RemarkName}</TableCell>
                          <TableCell>{item.RemarkDate}</TableCell>
                          <TableCell>{item.Loan ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">No Received Payments</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
    </>
  );
};

export default Listprojectbookng;
