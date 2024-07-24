import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Swal from 'sweetalert2';
import { useCookies } from "react-cookie";
import IconButton from "@mui/material/IconButton";
import PaymentIcon from '@mui/icons-material/Payment';

const NoDataIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ color: '#9e9e9e' }} // Adjust color as needed
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>
);

const Listprojectbookng = ({ item, onDelete, onEdit, onHistoryClick }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["amr"]);
  const [wings, setWings] = useState([]);
  const [selectedWing, setSelectedWing] = useState(null);
  const [wingDetails, setWingDetails] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(true); // New state to check data availability

  useEffect(() => {
    const fetchData = async () => {
      if (!item) return; // Exit if no item is provided
      try {
        const apiUrl = `https://apiforcorners.cubisysit.com/api/api-fetch-projectwings.php?ProjectID=${item.ProjectID}`;
        const response = await axios.get(apiUrl);
        if (response.data.status === "Success") {
          console.log(response.data.data, "Wings data fetched");
          setWings(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching wings data:", error);
      }
    };
    fetchData();
  }, [item]);

  const handleWingClick = async (wing) => {
    try {
      setLoading(true);
      const apiUrl = `https://apiforcorners.cubisysit.com/api/api-fetch-wing.php?WingID=${wing.WingID}&ProjectID=${item.ProjectID}`;
      const response = await axios.get(apiUrl);
      if (response.data.status === "Success") {
        setWingDetails(response.data.data);
        setSelectedWing(wing);
        setDataAvailable(response.data.data.length > 0); // Update the state based on data availability
      } else {
        setDataAvailable(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching wing details:", error);
      setDataAvailable(false); // Set to false if there is an error
    }
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

  const handleAddPayment = (row) => {
    // Implement your logic to handle adding payment
    console.log("Add payment for", row);
  };

  console.log("Wing Details:", wingDetails); // Log wingDetails to debug

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
                        <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>Actions</TableCell> {/* New Actions Column */}
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
                              <IconButton
                                color="primary"
                                onClick={() => handleAddPayment(row)}
                              >
                                <PaymentIcon />
                              </IconButton>
                            </TableCell> {/* Add Payment Icon */}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={searchQuery ? filteredRows.length : wingDetails.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                <NoDataIcon width={100} height={100} />
                <Typography variant="h6" sx={{ mt: 2 }}>No details available for this wing.</Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Listprojectbookng;
