import React, { useState, useEffect } from 'react';
import { Button, Grid, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import AddTellecallingDetails from 'src/views/add-tellecallingDetails/AddTellecallingDetails';
import ListTellecalling from 'src/views/list-tellecalling/ListTellecalling';

const Tellecalling = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTabAccount, setShowTabAccount] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-installmentdetails.php');
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

  const handleNavigation = () => {
    setShowTabAccount(true);
  };

  const handleBack = () => {
    setShowTabAccount(false);
    fetchData(); // Refetch data after adding or editing an installment
  };

  const handleEdit = (row) => {
    setEditData(row);
    setShowTabAccount(true);
  };

  return (
    <>
      {!showTabAccount && (
        <>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ marginRight: 3.5 }}
              onClick={handleNavigation}
            >
              Add   
            </Button>
          </Grid>

          <Grid container spacing={6}>
            <Grid item xs={12}>
              {/* Render the ListInstallmentDetails component */}
              {/* <AddTellecallingDetails rows={rows} setRows={setRows} onEdit={handleEdit} /> */}
              <ListTellecalling  />

            </Grid>
          </Grid>
        </>
      )}

      {/* {showTabAccount && <AddTellecallingDetails show={handleBack} editData={editData} />} */}
      {showTabAccount && <AddTellecallingDetails  />}

    </>
  );
};

export default Tellecalling;
