import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const ListCustomerDetails = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-customermaster.php');
      console.log('API Response:', response.data);
      setRows(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Alert severity="error">Error fetching data: {error.message}</Alert>
      </Grid>
    );
  }

  return (
    <Box p={3}>
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="customer details table">
            <TableHead>
              <TableRow>
                <TableCell>Customer ID</TableCell>
                <TableCell>Title ID</TableCell>
                <TableCell>Mobile No</TableCell>
                <TableCell>Party Name</TableCell>
                <TableCell>Member Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>CLocation</TableCell>
                {/* Add more table headers here */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.CompanyID}</TableCell>
                    <TableCell>{row.TitleID}</TableCell>
                    <TableCell>{row.MobileNo}</TableCell>
                    <TableCell>{row.PartyName}</TableCell>
                    <TableCell>{row.MemberName}</TableCell>
                    <TableCell>{row.Email}</TableCell>
                    <TableCell>{row.CLocation}</TableCell>
                    {/* Render additional table cells for other data fields */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default ListCustomerDetails;
