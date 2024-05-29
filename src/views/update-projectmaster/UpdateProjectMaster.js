import { useEffect, useState } from 'react';


import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { Console } from 'mdi-material-ui';

const UpdateProjectMaster = ({ show, rowData }) => {
  const [projectData, setProjectData] = useState(null);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState('');
  const [selectedStateId, setSelectedStateId] = useState('');
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    projectCode: '',
    projectStartDate: '',
    projectManagerId: '',
    contactNo: '',
    gstinNumber: '',
    location: '',
    selectedCity: '',
    selectedState: '',
    country: 'India',
    pincode: '',
    projectAddress: '',
    remarks: ''
  });

  useEffect(() => {
    axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-citymaster.php')
      .then(response => {
        if (response.data.status === 'Success') {
          setCities(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });

    axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-statemaster.php')
      .then(response => {
        if (response.data.status === 'Success') {
          setStates(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectId = rowData?.ProjectID;
        const apiUrl = `https://apiforcorners.cubisysit.com/api/api-singel-projectmaster.php?projectid=${projectId}`;

        const response = await axios.get(apiUrl);
        if (response.data.status === 'Success') {
          const project = response.data.data[0];
          setProjectData(project);
          setFormData({
            projectName: project.ProjectName,
            projectCode: project.ProjectCode,
            projectStartDate: new Date(project.ProjectStartDate).toISOString().split('T')[0],
            projectManagerId: project.ProjectManagerID,
            contactNo: project.ContactNo,
            gstinNumber: project.GSTINNo,
            location: project.Location,
            selectedCity: '', // Assuming you fetch city and state data separately
            selectedState: '', // Assuming you fetch city and state data separately
            pincode: project.Pincode,
            projectAddress: project.ProjectAddress,
            remarks: project.Remarks
          });
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };
    if (rowData) {
      fetchData();
    }
  }, [rowData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCityChange = (event) => {
    const selectedCityName = event.target.value;
    setFormData({
      ...formData,
      selectedCity: selectedCityName,
    });

    const selectedCityObject = cities.find(city => city.CityName === selectedCityName);
    if (selectedCityObject) {
      setSelectedCityId(selectedCityObject.CityID);
    }
  };

  const handleStateChange = (event) => {
    const selectedStateName = event.target.value;
    setFormData({
      ...formData,
      selectedState: selectedStateName,
    });

    const selectedStateObject = states.find(state => state.StateName === selectedStateName);
    if (selectedStateObject) {
      setSelectedStateId(selectedStateObject.StateID);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const submitData = {
      CreateUID: 1,
      ...(formData.projectName && { ProjectName: formData.projectName }),
      ...(formData.projectCode && { ProjectCode: formData.projectCode }),
      ...(formData.projectStartDate && { ProjectStartDate: formData.projectStartDate }),
      ...(formData.projectManagerId && { ProjectManagerID: formData.projectManagerId }),
      ...(formData.contactNo && { ContactNo: formData.contactNo }),
      ...(formData.gstinNumber && { GSTINNo: formData.gstinNumber }),
      ...(formData.location && { Location: formData.location }),
      ...(selectedCityId && { CityID: selectedCityId }),
      ...(selectedStateId && { StateID: selectedStateId }),
      CountryID: 1,
      ...(formData.pincode && { Pincode: formData.pincode }),
      ...(formData.projectAddress && { ProjectAddress: formData.projectAddress }),
      ...(formData.remarks && { Remarks: formData.remarks }),
      Status: 1,
      ProjectStatusID: 1
    };

console.log(submitData,'==========================');
    console.log(JSON.stringify(submitData), 'ALL DATAAAAAAA');

    axios.post('https://ideacafe-backend.vercel.app/api/proxy/api-update-projectmaster.php', JSON.stringify(submitData) , {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        Console.log(response.data);
        if (response.data.status === 'Success') {
          console.log('UPDATEDDDDDD');
          setSubmitSuccess(true);
          show(false);
          setFormData({
            projectName: '',
            projectCode: '',
            projectStartDate: '',
            projectManagerId: '',
            contactNo: '',
            gstinNumber: '',
            location: '',
            selectedCity: '',
            selectedState: '',
            country: 'India',
            pincode: '',
            projectAddress: '',
            remarks: ''
          });

        
        } else {
          setSubmitSuccess(false);
        }
      })
      .catch(error => {
        console.error('There was an error!', error);
        setSubmitSuccess(false);
      });
  };

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box>
              <Typography variant='body2' sx={{ marginTop: 5, fontWeight: 'bold', fontSize: 20 }}>
                Manage Project Details
              </Typography>
            </Box>
          </Grid>

          {projectData && (
            <>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label='Project Name'
                  placeholder='Project Name'
                  value={formData.projectName}
                  onChange={handleInputChange}
                  name="projectName"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label='Project Code'
                  placeholder='Project Code'
                  value={formData.projectCode}
                  onChange={handleInputChange}
                  name="projectCode"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  type="date"
                  label='Project Start Date'
                  placeholder='Project Start Date'
                  value={formData.projectStartDate}
                  onChange={handleInputChange}
                  name="projectStartDate"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label='Project Manager ID'
                  placeholder='Project Manager ID'
                  value={formData.projectManagerId}
                  onChange={handleInputChange}
                  name="projectManagerId"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label='Contact No'
                  placeholder='Contact No'
                  value={formData.contactNo}
                  onChange={handleInputChange}
                  name="contactNo"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label='GSTIN Number'
                  placeholder='GSTIN Number'
                  value={formData.gstinNumber}
                  onChange={handleInputChange}
                  name="gstinNumber"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label='Location'
                  placeholder='Location'
                  value={formData.location}
                  onChange={handleInputChange}
                  name="location"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select
                    value={formData.selectedCity}
                    onChange={handleCityChange}
                    name="selectedCity"
                  >
                    {cities.map(city => (
                      <MenuItem key={city.CityID} value={city.CityName}>
                        {city.CityName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select
                    value={formData.selectedState}
                    onChange={handleStateChange}
                    name="selectedState"
                  >
                    {states.map(state => (
                      <MenuItem key={state.StateID} value={state.StateName}>
                        {state.StateName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label='Pincode'
                  placeholder='Pincode'
                  value={formData.pincode}
                  onChange={handleInputChange}
                  name="pincode"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label='Project Address'
                  placeholder='Project Address'
                  value={formData.projectAddress}
                  onChange={handleInputChange}
                  name="projectAddress"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label='Remarks'
                  placeholder='Remarks'
                  value={formData.remarks}
                  onChange={handleInputChange}
                  name="remarks"
                />
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Button variant='contained' color='primary' onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default UpdateProjectMaster;