import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress, Alert, Button } from '@mui/material';
import axios from 'axios';
import AddTellecallingDetails from 'src/views/add-tellecallingDetails/AddTellecallingDetails';
import Sidebar from 'src/views/TellecallingSidebar/Sidebar';
import ListTellecalling from 'src/views/list-tellecalling/ListTellecalling';

const Tellecalling = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [rowDataToUpdate, setRowDataToUpdate] = useState(null);
  const [showAddDetails, setShowAddDetails] = useState(false); // State to manage showing AddTellecallingDetails

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
      const response = await axios.post('https://ideacafe-backend.vercel.app/api/proxy/api-delete-telecalling.php', {
        Tid: id,
        DeleteUID: 1
      });
      if (response.data.status === 'Success') {
        setRows(rows.filter(row => row.Tid !== id));
        console.log('Deleted successfully');
        setRowDataToUpdate(null); // Reset rowDataToUpdate after deletion
        setShowAddDetails(false); // Hide AddTellecallingDetails after deletion
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      setError(error);
    }
  };



  const handleBack = () => {
    setEditData(null);
    setShowAddDetails(false); // Hide AddTellecallingDetails
    fetchData(); // Refetch data after adding or editing details
  };

  const handleEdit = (row) => {
    setEditData(row);
    setRowDataToUpdate(null); // Reset rowDataToUpdate when editing
    setShowAddDetails(true); // Show AddTellecallingDetails
  };


  const handleShow = (item) => {
    // Show ListTellecalling component
    setRowDataToUpdate(item); // Set item to display details in ListTellecalling
    setShowAddDetails(false); // Hide AddTellecallingDetails
  };

  const handleAddTelecaller = () => {
    setShowAddDetails(true); // Show AddTellecallingDetails
    // setRowDataToUpdate(null); // Reset rowDataToUpdate
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <Sidebar rows={rows} onItemClick={handleShow} onEdit={handleEdit} onCreate={handleAddTelecaller} />
      </Grid>
      <Grid item xs={8}>
        {loading && <CircularProgress />}
        {error && (
          <Alert severity="error">Error fetching data: {error.message}</Alert>
        )}

        {!loading && !error && !showAddDetails && !rowDataToUpdate && (
          <Button
            variant="contained"
            sx={{
              marginTop: "50px",
              marginBottom: "20px",
              backgroundColor: "#9155FD",
              color: "#FFFFFF",
            }}
            onClick={handleAddTelecaller}
          >
            Add Telecaller
          </Button>
        )}
        {showAddDetails && (
          <AddTellecallingDetails show={handleBack} editData={editData} />
        )}
        {!loading && !error && (
          <>
            {rowDataToUpdate && (
              <ListTellecalling
                item={rowDataToUpdate} // Pass the selected item to ListTellecalling
                onDelete={handleDelete}
                // onCreate={handleAddTelecaller} // Pass the onCreate handler
             
                />
            )}
          </>
        )}
      </Grid>
    </Grid>
  );

};

export default Tellecalling;
