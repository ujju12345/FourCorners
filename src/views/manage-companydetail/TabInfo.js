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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import { format, parseISO } from 'date-fns';

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
      console.log('API Response COMPANYYYYY', response.data);
      setRows(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'yyyy-MM-dd');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };


  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async () => {
    // debugger;
    const body = {
      CompanyID: deleteId,
      DeleteUID: 1,
    };

    try {
      const response = await axios.post(
        "https://ideacafe-backend.vercel.app/api/proxy/api-delete-companymaster.php",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // debugger;
      if (response.data.status === "Success") {
        // debugger;
        setRows(rows.filter(row => row.CompanyID !== deleteId));
      } else {
        console.error("Failed to delete:", response.data);
      }
    } catch (error) {
      console.error("There was an error!", error);
    } finally {
      setOpen(false);
      setDeleteId(null);
    }
  };

  const handleOpen = (CompanyID) => {
    // debugger;
    setDeleteId(CompanyID);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
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
              <TableCell sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Company Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Company Code</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Communication Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '2rem' }}>City Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '2rem' }}>ERP Live Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Company Status Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '2rem' }}>State Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Book Beginning From</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ padding: '8px', fontSize: '0.75rem' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ padding: '8px', fontSize: '0.75rem' }}>{row.CompanyName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ padding: '15px', fontSize: '0.75rem' }}>{row.CompanyCode}</TableCell>
                  <TableCell sx={{ padding: '15px', fontSize: '0.75rem' }}>{row.CommAddress}</TableCell>
                  <TableCell sx={{ padding: '15px', fontSize: '0.75rem' }}>{row.CityName}</TableCell>
                  <TableCell sx={{ padding: '15px', fontSize: '0.75rem' }}>{formatDate(row.ERPLiveDate)}</TableCell>
                  <TableCell sx={{ padding: '15px', fontSize: '0.75rem' }}>{row.CompanyStatusName}</TableCell>
                  <TableCell sx={{ padding: '15px', fontSize: '0.75rem' }}>{row.StateName}</TableCell>
                  <TableCell sx={{ padding: '15px', fontSize: '0.75rem' }}>{(row.BookBeginingFrom)}</TableCell>
                  <TableCell sx={{ padding: '15px', display: 'flex', justifyContent: 'space-around' }}>
                    <IconButton onClick={() => handleEdit(row)} aria-label="edit" sx={{ color: 'blue' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleOpen(row.CompanyID)} aria-label="delete" sx={{ color: 'red' }}>
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
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this company ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default TabInfo;
