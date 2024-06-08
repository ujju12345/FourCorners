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


const ListTellecalling = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-telecalling.php');
      console.log('API Response:', response.data);
      setRows(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    try {
    

      const response = await axios.post('https://ideacafe-backend.vercel.app/api/proxy/api-delete-telecalling.php',
        { TelecallingID: id, DeleteUID: 1 },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === 'Success') {
        // Remove the deleted row from the state
        setRows(rows.filter(row => row.TelecallingID !== id));
      } else {
        console.log("hiiiiiiiiiiiiiiiiiiiii  ");

        console.error('Error deleting data:', response.data.message);
      }
    } catch (error) {
      console.log("heeeeeeeeeeeeeeeeeeee  ");

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
              <TableCell align="left">Party Name</TableCell>
              <TableCell align="left">Mobile</TableCell>
              <TableCell align="left">Project Name</TableCell>
              <TableCell align="left">Source</TableCell>
              <TableCell align="left">Source Name</TableCell>
              <TableCell align="left">Source Description</TableCell>
              <TableCell align="left">Action</TableCell>

              {/* Add more table headers here */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left">
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500 }}>{row.PartyName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="left">{row.Mobile}</TableCell>
                  <TableCell align="left">{row.ProjectID}</TableCell>
                  <TableCell align="left">{row.Source}</TableCell>
                  <TableCell align="left">{row.SourceName}</TableCell>
                  <TableCell align="left">{row.SourceDescription}</TableCell>
                  {/* <TableCell align="left">{row.StampDutyPercent}</TableCell>
                  <TableCell align="left">{row.RegistrationPercent}</TableCell> */}
                  <TableCell sx={{ padding: '15px', }}>
                    <IconButton onClick={() => handleEdit(row)} aria-label="edit" sx={{ color: 'blue' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.TelecallingID)} aria-label="delete" sx={{ color: 'red' }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                 
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
  );
};

export default ListTellecalling;