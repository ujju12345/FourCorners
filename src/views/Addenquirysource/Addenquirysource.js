import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import Box from "@mui/material/Box";

const Addenquirysource = ({ show, rowData }) => {
  console.log(rowData , 'SEEE ');
  const [formState, setFormState] = useState({
    NameOfCompany: '',
    ProjectName: '',
    Source: '',
    FromDate: '', // Empty string for initial state
    ToDate: '', // Empty string for initial state
    SourceName: '',
    SourceAddress: '',
    ActiveTillDate: '', // Empty string for initial state
    ContactNumber: '',
    TotalCost: '',
    CreateUID: 1,
    Status: 1
  });
  

  useEffect(() => {
    if (rowData && Object.keys(rowData).length !== 0) { // Check if rowData exists and is not empty
      setFormState({
        NameOfCompany: rowData.NameOfCompany || '',
        ProjectName: rowData.ProjectName || '',
        Source: rowData.Source || '',
        FromDate: rowData.FromDate || '',
        ToDate: rowData.ToDate || '',
        SourceName: rowData.SourceName || '',
        SourceAddress: rowData.SourceAddress || '',
        ActiveTillDate: rowData.ActiveTillDate || '',
        ContactNumber: rowData.ContactNumber || '',
        TotalCost: rowData.TotalCost || '',
        CreateUID: 1,
        Status: 1
      });
    } else {
      // Set initial form state with empty date fields
      setFormState({
        NameOfCompany: '',
        ProjectName: '',
        Source: '',
        FromDate: '', // Empty string for FromDate
        ToDate: '', // Empty string for ToDate
        SourceName: '',
        SourceAddress: '',
        ActiveTillDate: '',
        ContactNumber: '',
        TotalCost: '',
        CreateUID: 1,
        Status: 1
      });
    }
  }, [rowData]);
  

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (rowData) {
        response = await axios.post('https://ideacafe-backend.vercel.app/api/proxy/api-update-enquirysource.php', {
          ...formState,
          EnquirySourceID: rowData.EnquirySourceID, // Pass the ID for updating
          UpdateUID: 1 // Assuming you have a user ID to pass
        });
      } else {
        response = await axios.post('https://ideacafe-backend.vercel.app/api/proxy/api-insert-enquirysource.php', {
          ...formState,
          // AddUID: 1 // Assuming you have a user ID to pass
        });
      }

      if (response.data.status === 'Success') {
        show(); // Navigate back to the list view
      } else {
        console.error('Error submitting data:', response.data.message);
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
<Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {rowData ? 'Update Enquiry Source' : 'Add Enquiry Source'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}sm={4}>
              <TextField
                fullWidth
                label="Name of Company"
                name="NameOfCompany"
                value={formState.NameOfCompany}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}sm={4}>
              <TextField
                fullWidth
                label="Project Name"
                name="ProjectName"
                value={formState.ProjectName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}sm={4}>
              <TextField
                fullWidth
                label="Source"
                name="Source"
                value={formState.Source}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}sm={4}>
              <TextField
                fullWidth
                label="From Date"
                name="FromDate"
                type="date"
                value={formState.FromDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}sm={4}>
              <TextField
                fullWidth
                label="To Date"
                name="ToDate"
                type="date"
                value={formState.ToDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}sm={4}>
              <TextField
                fullWidth
                label="Source Name"
                name="SourceName"
                value={formState.SourceName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}sm={4}>
              <TextField
                fullWidth
                label="Source Address"
                name="SourceAddress"
                value={formState.SourceAddress}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}sm={4}>
              <TextField
                fullWidth
                label="Active Till Date"
                name="ActiveTillDate"
                type="date"
                value={formState.ActiveTillDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}sm={4}>
              <TextField
                fullWidth
                label="Contact Number"
                name="ContactNumber"
                value={formState.ContactNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}sm={4}>
              <TextField
                fullWidth
                label="Total Cost"
                name="TotalCost"
                value={formState.TotalCost}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} >
              <Button variant="contained" color="primary" type="submit">
                {rowData ? 'Update' : 'Add'}
              </Button>
          
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default Addenquirysource;
