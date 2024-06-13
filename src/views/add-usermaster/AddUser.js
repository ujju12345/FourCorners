import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Card, CardContent, Typography, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import axios from 'axios';

const AddUser = ({ show, rowData }) => {
  const [formState, setFormState] = useState({
    UserRoleID: '',
    Name: '',
    MobileNo: '',
    email: '',
    username: '',
    password: '',
    ProfilePhoto: null,
    CreateUID: 1,
    Status: 1
  });
  const [designation, setDesignation] = useState([]);

  useEffect(() => {
    if (rowData && Object.keys(rowData).length !== 0) { // Check if rowData exists and is not empty
      setFormState({
        UserRoleID: rowData.UserRoleID || '',
        Name: rowData.Name || '',
        MobileNo: rowData.MobileNo || '',
        email: rowData.email || '',
        username: rowData.username || '',
        password: rowData.password || '',
        ProfilePhoto: rowData.ProfilePhoto || null,
        CreateUID: 1,
        Status: 1
      });
    } else {
      // Set initial form state with empty fields
      setFormState({
        UserRoleID: '',
        Name: '',
        MobileNo: '',
        email: '',
        username: '',
        password: '',
        ProfilePhoto: null,
        CreateUID: 1,
        Status: 1
      });
    }
  }, [rowData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormState({
      ...formState,
      [name]: files ? files[0] : value // Handle file input
    });
  };

  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-dropdown-userrolemaster.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setDesignation(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      const formData = new FormData();
      for (const key in formState) {
        formData.append(key, formState[key]);
      }

      if (rowData) {
        formData.append('UserID', rowData.UserID); // Pass the ID for updating
        formData.append('UpdateUID', 1); // Assuming you have a user ID to pass
        response = await axios.post('https://ideacafe-backend.vercel.app/api/proxy/api-update-usermaster.php', formData);
      } else {
        formData.append('AddUID', 1); // Assuming you have a user ID to pass
        response = await axios.post('https://ideacafe-backend.vercel.app/api/proxy/api-insert-usermaster.php', formData);
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

  const handleUserRoleChange = (event) => {
    setFormState({
      ...formState,
      UserRoleID: event.target.value,
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {rowData ? 'Update User' : 'Add User'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="Name"
                value={formState.Name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="MobileNo"
                value={formState.MobileNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formState.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formState.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>User Role</InputLabel>
                <Select
                  value={formState.UserRoleID}
                  name="UserRoleID"
                  onChange={handleUserRoleChange}
                  label="UserRoleID"
                >
                  {designation?.map((role) => (
                    <MenuItem key={role.UserRoleID} value={role.UserRoleID}>
                      {role.UserRole}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Profile Photo"
                name="ProfilePhoto"
                type="file"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
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

export default AddUser;
