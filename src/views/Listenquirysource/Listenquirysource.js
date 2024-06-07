import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Listenquirysource = ({setShowTabAccount}) => {
const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://ideacafe-backend.vercel.app/api/proxy/api-fetch-enquirysource.php');
      console.log('API Response:', response.data);
      setRows(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    }
  };

  const handleEdit = (rowData) => {
    
    setShowTabAccount(rowData); // Pass selected row data to the parent component
    console.log(`Editing company with ID ${rowData.EnquirySourceID}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        'https://ideacafe-backend.vercel.app/api/proxy/api-delete-enquirysource.php',
        { EnquirySourceID: id, DeleteUID: 1 },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === 'Success') {
        // Remove the deleted row from the state
        setRows(rows.filter(row => row.EnquirySourceID !== id));
      } else {
        console.error('Error deleting data:', response.data.message);
      }
    } catch (error) {
      console.error('There was an error!', error);
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
              <TableCell>Action</TableCell>
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
                  <TableCell>
                    <IconButton onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.EnquirySourceID)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
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
  );
};

export default Listenquirysource;
