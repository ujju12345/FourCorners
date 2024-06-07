import React, { useState, useEffect } from 'react';
import { Button, Grid, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import Listenquirysource from 'src/views/Listenquirysource/Listenquirysource';
import Addenquirysource from 'src/views/Addenquirysource/Addenquirysource';
import { useRouter } from 'next/router';
import Link from 'next/link'


const enquirysource = () => {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showenquirysource, setShowenquirysource] = useState(false);


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
    return <CircularProgress />;
  }

  // if (error) {
  //   return <Alert severity="error">Error fetching data: {error.message}</Alert>;
  // }

  const handleNavigation = () => {
    setShowenquirysource(true); // Set to true to show ProjectManage
  };

  return (
    <>
    {!showenquirysource && (
      <>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Button
            variant="contained"
            sx={{ marginRight: 3.5, mt: -1 }} 
            onClick={handleNavigation}
          >
            Add
          </Button>
        </Grid>

        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Listenquirysource/> 
          </Grid>
        </Grid>
      </>
    )}

    {showenquirysource && <Addenquirysource show = {setShowenquirysource} />}
  </>
  );
};

export default enquirysource;
