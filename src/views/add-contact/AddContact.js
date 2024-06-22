import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import GetAppIcon from '@mui/icons-material/GetApp';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Card from "@mui/material/Card";
import Swal from 'sweetalert2';
import {
  Snackbar,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const AddContact = ({ show, editData }) => {
  console.log(editData , 'Edit data aaya');
  const initialFormData = {
    titleprefixID: "",
    PartyName: "",
    Mobile: "",
    AlternateMobileNo: "",
    TelephoneNo: null,
    AlternateTelephoneNo: null,
    Email: "",
    ProjectID: "",
    EstimatedbudgetID: "",
    leadstatusID: "",
    Comments: "",
    Location: "",
    FollowupThrough: "",
    NextFollowUpDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    NextFollowUpTime:getCurrentTime(),
    SourceID: "",
    SourceName: "",
    SourceDescription: "",
    TelecallAttendedByID: "",
    SmsNotification: 0,
    EmailNotification: 0,
    ModifyUID: 1,
    Tid: "",
    UnittypeID: "",
    Countrycode: "",
    Status:1
  };

  const [formData, setFormData] = useState(initialFormData);
  const [titles, setTitles] = useState([]);
  const [errors, setErrors] = useState({});
  const [projectTypes, setProjectTypes] = useState([]);
  const [source, setSource] = useState([]);
  const [estimatedBudget, setEstimatedBudget] = useState([]);
  const [leadStatus, setLeadStatus] = useState([]);
  const [userMaster, setUserMaster] = useState([]);
  const [tellecallingID, setTellecallingID] = useState([]);
  const [bhkOptions, setBhkOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    fetchData();
    fetchDataBhk();
    fetchDataTellecalling();
    fetchDataTitle();
  }, []);

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        NextFollowUpDate: editData.NextFollowUpDate
          ? new Date(editData.NextFollowUpDate)
          : null,
        NextFollowUpTime: editData.NextFollowUpTime || "",
      });
    }
  }, [editData]);

  // Fetch source, estimated budget, lead status, and user master data (similar to your existing useEffects)

    useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-source.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setSource(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-dropdown-estimatedbudget.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setEstimatedBudget(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-leadstatus.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setLeadStatus(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-usermaster.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setUserMaster(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const fetchDataBhk = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-unittype.php"
      );
      setBhkOptions(response.data.data || []);
    } catch (error) {
      console.error("Error fetching Bhk data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-dropdown-projectmaster.php"
      );
      setProjectTypes(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataTellecalling = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-telecalling.php"
      );
      setTellecallingID(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataTitle = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-titleprefix.php"
      );
      setTitles(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNotificationChange = (event) => {
    const value = event.target.value === "sms" ? 1 : 0;
    setFormData({
      ...formData,
      SmsNotification: value,
      EmailNotification: value === 1 ? 0 : 1,
    });
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (
      [
        "Mobile",
        "AlternateMobileNo",
        "TelephoneNo",
        "AlternateTelephoneNo",
        "Countrycode",
      ].includes(name)
    ) {
      const numericValue = value.replace(/\D/g, "");
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  useEffect(() => {
    // Set the default value to current time when the component mounts
    setFormData((prev) => ({
      ...prev,
      NextFollowUpTime: getCurrentTime(),
    }));
  }, []);


  const handleBhkChange = (event) => {
    setFormData({
      ...formData,
      UnittypeID: event.target.value,
    });
  };

  const handleEstimatedBudget = (event) => {
    setFormData({
      ...formData,
      EstimatedbudgetID: event.target.value,
    });
  };

  const handleTelecaller = (event) => {
    setFormData({
      ...formData,
      TelecallAttendedByID: event.target.value,
    });
  };

  const handleSource = (event) => {
    setFormData({
      ...formData,
      SourceID: event.target.value,
    });
  };

  const handleLeadStatus = (event) => {
    setFormData({
      ...formData,
      leadstatusID: event.target.value,
    });
  };

  const handleTitleChange = (event) => {
    setFormData({
      ...formData,
      titleprefixID: event.target.value,
    });
  };

  useEffect(() => {
    if (tellecallingID.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Tid: parseInt(tellecallingID[0].Tid) || "",
      }));
    }
  }, [tellecallingID]);

  const handleSubmit = async (event) => {
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
        setFormData(initialFormData);
        setSubmitSuccess(true);
        setSubmitError(false);
        show(false);
  
        Swal.fire({
          icon: 'success',
          title: editData ? 'Data Updated Successfully' : 'Data Added Successfully',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        setSubmitSuccess(false);
        setSubmitError(true);
  
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    } catch (error) {
      console.error("There was an error!", error);
      setSubmitSuccess(false);
      setSubmitError(true);
  
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };
  

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSubmitSuccess(false);
    setSubmitError(false);
  };
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      NextFollowUpDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days ahead
    }));
  }, []);


  const handleDateChange = (date) => {
    setFormData({ ...formData, NextFollowUpDate: date });
  };

  return (
    <>


{/* <Grid container justifyContent="center" spacing={2} sx={{ marginBottom: 5 }}>
      <Grid item>
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={<EditIcon />}
          sx={{
            backgroundColor: "#f0f0f0", // Light gray background color
            color: "#333333", // Dark gray text color
            fontSize: "0.6rem",
            minWidth: "auto",
            minHeight: 20, // Decrease button height
            "&:hover": {
              backgroundColor: "#dcdcdc", // Darken background on hover
            },
          }}
        >
          Edit Details
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={<GetAppIcon />}
          sx={{
            backgroundColor: "#f0f0f0",
            color: "#333333",
            fontSize: "0.6rem",
            minWidth: "auto",
            minHeight: 20,
            "&:hover": {
              backgroundColor: "#dcdcdc",
            },
          }}
        >
          Download
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={<GroupIcon />}
          sx={{
            backgroundColor: "#f0f0f0",
            color: "#333333",
            fontSize: "0.6rem",
            minWidth: "auto",
            minHeight: 20,
            "&:hover": {
              backgroundColor: "#dcdcdc",
            },
          }}
        >
          Group Transfer
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={handleSubmit}
          startIcon={<PersonAddIcon />}
          sx={{
            backgroundColor: "#f0f0f0",
            color: "#333333",
            fontSize: "0.6rem",
            minWidth: "auto",
            minHeight: 20,
            "&:hover": {
              backgroundColor: "#dcdcdc",
            },
          }}
        >
          Convert to Lead
        </Button>
      </Grid>
    </Grid> */}

    <Card sx={{ height:"auto" }}>
   
      <CardContent>
        <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
          
          <Box>
            <Typography
              variant="body2"
              sx={{ marginTop: 5, fontWeight: "bold", fontSize: 20 }}
            >
              {editData
                ? "Edit Telecalling Details"
                : "Add Telecalling Details"}
            </Typography>

            
        
          </Box>
        </Grid>
        <form style={{ marginTop: "50px" }}>
          <Grid container spacing={7}>
            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Title</InputLabel>
                <Select
                  value={formData.titleprefixID}
                  onChange={handleTitleChange}
                  label="Title"
                >
                  {titles.map((title) => (
                    <MenuItem key={title.TitleID} value={title.TitleID}>
                      {title.TitleName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

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
                label="Country Code"
                type="tel"
                name="Countrycode"
                value={formData.Countrycode}
                onChange={handleChange}
                inputProps={{
                  pattern: "[0-9]*",
                }}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Mobile"
                type="tel"
                name="Mobile"
                value={formData.Mobile}
                onChange={handleChange}
                inputProps={{
                  pattern: "[0-9]*",
                }}
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
                inputProps={{
                  pattern: "[0-9]*",
                }}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="E-Mail"
                name="Email"
                placeholder="E-Mail"
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
              <FormControl fullWidth>
                <InputLabel>Unit Type</InputLabel>
                <Select
                  value={formData.UnittypeID}
                  onChange={handleBhkChange}
                  label="Unit Type"
                >
                  {bhkOptions.map((bhk) => (
                    <MenuItem key={bhk.UnittypeID} value={bhk.UnittypeID}>
                      {bhk.UnittypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Estimated Budget</InputLabel>
                <Select
                  value={formData.EstimatedbudgetID}
                  onChange={handleEstimatedBudget}
                  label="Estimated Budget"
                >
                  {estimatedBudget.map((bhk) => (
                    <MenuItem
                      key={bhk.EstimatedbudgetID}
                      value={bhk.EstimatedbudgetID}
                    >
                      {bhk.EstimatedbudgetName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Lead Status</InputLabel>
                <Select
                  value={formData.leadstatusID}
                  onChange={handleLeadStatus}
                  label="Lead Status"
                >
                  {leadStatus.map((project) => (
                    <MenuItem
                      key={project.leadstatusID}
                      value={project.leadstatusID}
                    >
                      {project.leadstatusName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Location"
                name="Location"
                placeholder="Location"
                value={formData.Location}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Source</InputLabel>
                <Select
                  value={formData.SourceID}
                  onChange={handleSource}
                  label="Source"
                >
                  {source.map((bhk) => (
                    <MenuItem key={bhk.SourceID} value={bhk.SourceID}>
                      {bhk.SourceName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Source Name"
                name="SourceName"
                placeholder="Source Name"
                value={formData.SourceName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Source Description"
                placeholder="Source Description"
                name="SourceDescription"
                value={formData.SourceDescription}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Telecall Attended By</InputLabel>
                <Select
                  value={formData.TelecallAttendedByID}
                  onChange={handleTelecaller}
                  label="TelecallAttendedBy"
                >
                  {userMaster.map((bhk) => (
                    <MenuItem key={bhk.UserID} value={bhk.UserID}>
                      {bhk.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8} sm={4}>
      <DatePicker
        selected={formData.NextFollowUpDate}
        onChange={handleDateChange}
        dateFormat="dd-MM-yyyy"
        className="form-control"
        customInput={
          <TextField
            fullWidth
            label="Next Follow Up Date"
            InputProps={{
              readOnly: true,
              sx: { width: '100%' },
            }}
          />
        }
      />
    </Grid>
    <Grid item xs={8} sm={4}>
      <TextField
        fullWidth
        label="Next Follow-Up Time"
        type="time"
        name="NextFollowUpTime"
        value={formData.NextFollowUpTime}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 minute intervals
        }}
      />
    </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Comment"
                name="Comments"
                placeholder="Comment"
                value={formData.Comments}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
  <FormControl component="fieldset">
    <FormLabel component="legend">
      Notification Preferences
    </FormLabel>
    <RadioGroup
      aria-label="notification"
      name="notification"
      value={formData.SmsNotification === 1 ? "sms" : "notification"}
      onChange={handleNotificationChange}
    >
      <FormControlLabel
        value="sms"
        control={<Radio />}
        label="Send on SMS"
      />
      <FormControlLabel
        value="notification"
        control={<Radio />}
        label="Send on Notification"
      />
    </RadioGroup>
  </FormControl>
</Grid>


            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  marginRight: 3.5,
                  marginTop: 5,
                  backgroundColor: "#9155FD",
                  color: "#FFFFFF",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>

        <Snackbar
          open={submitSuccess}
          autoHideDuration={6000}
          onClose={handleAlertClose}
        >
          <MuiAlert
            onClose={handleAlertClose}
            severity="success"
            sx={{
              width: "100%",
              backgroundColor: "green",
              color: "#ffffff",
            }}
          >
            {editData
              ? "Data Updated Successfully"
              : submitSuccess
              ? "Data Added Successfully"
              : ""}
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={submitError}
          autoHideDuration={6000}
          onClose={handleAlertClose}
        >
          <MuiAlert
            onClose={handleAlertClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {submitError.message}
          </MuiAlert>
        </Snackbar>
      </CardContent>
    </Card>
    </>
  );
};

export default AddContact;
