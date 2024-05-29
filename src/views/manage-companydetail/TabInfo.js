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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TabInfo = ({ setShowTabAccount }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-companymaster.php');
      console.log('API Response:', response.data);
      setRows(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    }
  };

  const handleDelete = (companyId) => {
    console.log(`Deleting company with ID ${companyId}`);
  };

  const handleEdit = (rowData) => {
    setShowTabAccount(rowData); // Pass selected row data to the parent component
    console.log(`Editing company with ID ${rowData.CompanyID}`);
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
              <TableCell>Company Name</TableCell>
              <TableCell>Company Code</TableCell>
              <TableCell>Communication Address</TableCell>
              <TableCell>City ID</TableCell>
              <TableCell>ERP Live Date</TableCell>
              <TableCell>Company Status ID</TableCell>
              <TableCell>State ID</TableCell>
              <TableCell>Book Beginning From</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ padding: '8px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500 }}>{row.CompanyName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ padding: '8px' }}>{row.CompanyCode}</TableCell>
                  <TableCell sx={{ padding: '8px' }}>{row.CommAddress}</TableCell>
                  <TableCell sx={{ padding: '8px' }}>{row.CityID}</TableCell>
                  <TableCell sx={{ padding: '8px' }}>{row.ERPLiveDate}</TableCell>
                  <TableCell sx={{ padding: '8px' }}>{row.CompanyStatusID}</TableCell>
                  <TableCell sx={{ padding: '8px' }}>{row.StateID}</TableCell>
                  <TableCell sx={{ padding: '8px' }}>{row.BookBeginingFrom}</TableCell>
                  <TableCell sx={{ padding: '8px', display: 'flex', justifyContent: 'space-around' }}>
                    <IconButton onClick={() => handleEdit(row)} aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.CompanyID)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
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

export default TabInfo;
