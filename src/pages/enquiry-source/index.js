import React, { useState, useEffect } from 'react';
import { Button, Grid, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import Listenquirysource from 'src/views/Listenquirysource/Listenquirysource';
import Addenquirysource from 'src/views/Addenquirysource/Addenquirysource';

const Enquirysource = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'add', 'update'
  const [rowDataToUpdate, setRowDataToUpdate] = useState(null);

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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Error fetching data: {error.message}</Alert>;
  }

  const handleAddNavigation = () => {
    setActiveTab('add'); // Show AddEnquirysource component
    setRowDataToUpdate(null); // Clear any row data for update
  };

  const handleEdit = (rowData) => {
    setActiveTab('add'); // Show AddEnquirysource component for update
    setRowDataToUpdate(rowData); // Pass the selected row data
  };

  const handleBack = () => {
    setActiveTab('list');
    fetchData(); // Refetch data after adding or updating an enquiry source
  };

  return (
    <>
      {activeTab === 'list' && (
        <>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Button
              variant="contained"
              sx={{ marginRight: 3.5, mt: -1 }} 
              onClick={handleAddNavigation}
            >
              Add
            </Button>
          </Grid>

          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Listenquirysource onEdit={handleEdit} setShowTabAccount={handleBack}/> 
            </Grid>
          </Grid>
        </>
      )}

      {activeTab === 'add' && (
        <Addenquirysource show={handleBack} rowData={rowDataToUpdate} />
      )}
    </>
  );
};

export default Enquirysource;
