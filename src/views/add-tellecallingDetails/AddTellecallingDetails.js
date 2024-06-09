import { useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Card from "@mui/material/Card";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";


const AddTellecallingDetails = ({ show , editData }) => {
  console.log(editData , 'Tellcalling update data');
  const [formData, setFormData] = useState({
    titleprefixID:1,
    PartyName: '',
    Mobile: '',
    AlternateMobileNo:'',
    TelephoneNo:'',
    AlternateTelephoneNo:'',
    Email:'',
    ProjectID:'',
    UnitType:'',
    EstimatedBudget:'',
    LeadStatus:'',
    Comments:'',
    Location:'',
    FollowupThrough:'',
    Source:'',
    SourceName:'',
    SourceDescription:'',
    TelecallAttendedBy:'',
    CreateUID:1,
    TelecallingID:''
  });


 
  
  const [projectTypes, setProjectTypes] = useState([]);
  const [tellecallingID, setTellecallingID] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-projectmaster.php"
      );
      setProjectTypes(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setErrors(error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };


  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);
  

  useEffect(() => {
    fetchDataTellecalling();
  }, []);

  const fetchDataTellecalling = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-telecalling.php"
      );
      console.log(response.data.data , 'TELECALLINGGG ID');
      setTellecallingID(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setErrors(error);
    }
  };


  useEffect(() => {
    if (tellecallingID.length > 0) {
      setFormData(prevFormData => ({
        ...prevFormData,
        TelecallingID: parseInt(tellecallingID[0].telecallingID) || '' // Use the first SubProjectID from the fetched data
      }));
    }
  }, [tellecallingID]);

  const handleSubmit = async (event) => {
    console.log("press");
    event.preventDefault();
  
    const url = editData
      ? "https://ideacafe-backend.vercel.app/api/proxy/api-update-telecalling.php"
      : "https://ideacafe-backend.vercel.app/api/proxy/api-insert-telecalling.php";
  
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.data.status === "Success") {
        setSubmitSuccess(true);
        setSubmitError(false);
        show(false);
      } else {
        setSubmitSuccess(false);
        setSubmitError(true);
      }
    } catch (error) {
      console.error("There was an error!", error);
      setSubmitSuccess(false);
      setSubmitError(true);
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSubmitSuccess(false);
    setSubmitError(false);
  };
  return (
    <Card>
      <CardContent>
       
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box>
              <Typography variant="body2" sx={{ marginTop: 5, fontWeight: "bold", fontSize: 20 }}>
                {editData ? 'Edit Telecalling Details' : 'Add Telecalling Details'}
              </Typography>
            </Box>
            </Grid>
            <form >
          <Grid container spacing={7}>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label="Party Name"
                  name="PartyName"
                  value={formData.PartyName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label="Mobile"
                  name="Mobile"
                  value={formData.Mobile}
                  onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="tel"
                name="AlternateMobileNo"
                label="Alternate Mobile Number"
                placeholder="Alternate Mobile Number"
                value={formData.AlternateMobileNo}
                onChange={handleChange}
              />
            </Grid>
       
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="tel"
                name="TelephoneNo"
                label="Telephone No"
                placeholder="Telephone No"
                value={formData.TelephoneNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="tel"
                name="AlternateTelephoneNo"
                label="Alternate Telephone No"
                placeholder="Alternate Telephone No"
                value={formData.AlternateTelephoneNo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="E-Mail"
                name="Email"
                placeholder="E-Mail "
                value={formData.Email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Project Name</InputLabel>
                  <Select
                    value={formData.ProjectID}
                    name="ProjectID"
                    onChange={handleChange}
                  label="Project Name"

                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {projectTypes.map((project) => (
                      <MenuItem key={project.ProjectID} value={project.ProjectID}>
                        {project.ProjectName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>


            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Unit Type Estimated Budget"
                name="UnitType"
                placeholder="Unit Type Estimated Budget"
                value={formData.UnitType}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" Estimated Budget"
                name="EstimatedBudget"
                placeholder=" Estimated Budget"
                value={formData.EstimatedBudget}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" Lead Status"
                name="LeadStatus"
                placeholder=" Lead Status"
                value={formData.LeadStatus}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" Location"
                name="Location"
                placeholder=" Location"
                value={formData.Location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" Comment"
                name="Comments"
                placeholder=" Comment"
                value={formData.Comments}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" Followup Through"
                name="FollowupThrough"
                placeholder=" Followup Through"
                value={formData.FollowupThrough}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" Source"
                name="Source"
                placeholder=" Source"
                value={formData.Source}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" source Name"
                name="SourceName"
                placeholder=" Source Name"
                value={formData.SourceName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" Source Description"
                placeholder=" Source Description"
                name="SourceDescription"
                value={formData.SourceDescription}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" Telecall Attended By"
                placeholder=" Telecall Attended By"
                name="TelecallAttendedBy"
                value={formData.TelecallAttendedBy}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ marginRight: 3.5 }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>

        <Snackbar open={submitSuccess} autoHideDuration={6000} onClose={handleAlertClose}>
          <MuiAlert onClose={handleAlertClose} severity="success" sx={{ width: "100%" }}>
            Data added successfully!
          </MuiAlert>
        </Snackbar>
        {/* Notification for submission error */}
        <Snackbar open={submitError} autoHideDuration={6000} onClose={handleAlertClose}>
          <MuiAlert onClose={handleAlertClose} severity="error" sx={{ width: "100%" }}>
            Error adding data. Please try again later.
          </MuiAlert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default AddTellecallingDetails;
