import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Box from '@mui/material/Box';

const Listenquirysource = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-enquirysource.php');
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
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error fetching data: {error.message}</Typography>;
  }

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
            
              <TableCell>NameOfCompany</TableCell>
              <TableCell>ProjectName</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>FromDate</TableCell>
              <TableCell>ToDate</TableCell>
              <TableCell>SourceName</TableCell>
              <TableCell>ActiveTillDate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index}>
              
                  <TableCell>{row.NameOfCompany}</TableCell>
                  <TableCell>{row.ProjectName}</TableCell>
                  <TableCell>{row.Source}</TableCell>
                  <TableCell>{row.FromDate}</TableCell>
                  <TableCell>{row.ToDate}</TableCell>
                  <TableCell>{row.SourceName}</TableCell>
                  <TableCell>{row.ActiveTillDate}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default Listenquirysource;
