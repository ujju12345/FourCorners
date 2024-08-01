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
import EditIcon from "@mui/icons-material/Edit";
import GetAppIcon from "@mui/icons-material/GetApp";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {Checkbox ,FormGroup } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Card from "@mui/material/Card";
import Swal from "sweetalert2";
import {
  Snackbar,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Autocomplete
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useCookies } from "react-cookie";

const AddTellecallingDetails = ({ show, editData , onDashboardClick}) => {
  console.log(editData, "Edit data aaya");
  const initialFormData = {
    titleprefixID: "",
    Cid: "",
    CName: "",
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
    NextFollowUpTime: getCurrentTime(),
    SourceID: "",
    SourceName: "",
    SourceDescription: "",
    TelecallAttendedByID: "",
    SmsNotification: 0,
    EmailNotification: 0,
    ModifyUID: 1,
    Tid: "",
    CreateUID: 1,
    UnittypeID: "",
    Countrycode: "",
    Status: 1,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [titles, setTitles] = useState([]);
  const [errors, setErrors] = useState({});
  const [projectTypes, setProjectTypes] = useState([]);
  const [source, setSource] = useState([]);
const [cNames, setCNames] = useState([]);
  const [selectedCid, setSelectedCid] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState([]);
  const [leadStatus, setLeadStatus] = useState([]);
  const [userMaster, setUserMaster] = useState([]);
  const [tellecallingID, setTellecallingID] = useState([]);
  const [bhkOptions, setBhkOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [cookies, setCookie] = useCookies(["amr"]);

  const [item, setItem] = useState(null);
  const [rowDataToUpdate, setRowDataToUpdate] = useState(null);

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
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-cid.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setCNames(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://apiforcorners.cubisysit.com/api/api-dropdown-estimatedbudget.php"
      )
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

  const handleSelectChange = async (event) => {
    const selectedCid = event.target.value;
    setSelectedCid(selectedCid);

    try {
      const apiUrl =`https://apiforcorners.cubisysit.com/api/api-singel-contacts.php?Cid=${selectedCid}`;
      const response = await axios.get(apiUrl);

      if (response.data.status === "Success") {
        console.log(
          "Single telecalling data fetched for telecalling:",
          response.data
        );
        const fetchedData = response.data.data;
        console.log(fetchedData , 'see this cc');

        // Update formData state with all fetched data
        setFormData({
          titleprefixID: fetchedData.TitleID || "",
          Cid: fetchedData.Cid || "",
          CName: fetchedData.CName || "",
          Mobile: fetchedData.Mobile || "",
          AlternateMobileNo: fetchedData.OtherNumbers || "",
          TelephoneNo: null, // Set as null if not available in fetched data
          AlternateTelephoneNo: null, // Set as null if not available in fetched data
          Email: fetchedData.Email || "",
          ProjectID: "", // Assuming ProjectID is not available in fetched data
          EstimatedbudgetID: "", // Assuming EstimatedbudgetID is not available in fetched data
          leadstatusID: "", // Assuming leadstatusID is not available in fetched data
          Comments: "", // Assuming Comments are not available in fetched data
          Location: fetchedData.LocationName || "",
          FollowupThrough: "", // Assuming FollowupThrough is not available in fetched data
          NextFollowUpDate: new Date(
            new Date().getTime() + 2 * 24 * 60 * 60 * 1000
          ),
          NextFollowUpTime: getCurrentTime(),
          SourceID: fetchedData.SourceID || "",
          SourceName: fetchedData.SourceName || "",
          SourceDescription: "", // Assuming SourceDescription is not available in fetched data
          TelecallAttendedByID: cookies.amr?.UserID || 1 ,
          SmsNotification: 0, // Assuming SmsNotification default value
          EmailNotification: 0, // Assuming EmailNotification default value
          ModifyUID: cookies.amr?.UserID || 1 , // Assuming ModifyUID is constant
          Tid: "", // Assuming Tid is not available in fetched data
          UnittypeID: "", // Assuming UnittypeID is not available in fetched data
          Countrycode: fetchedData.CountryCode || "",
          Status: 1, // Assuming Status default value
        });
      } else {
        console.error("API response status not success:", response.data);
      }
    } catch (error) {
      console.error("Error fetching single telecalling data:", error);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!item) return; // Exit if no item is provided
  //     try {
  //       const apiUrl = https://apiforcorners.cubisysit.com/api/api-singel-contacts.php?Cid=${item.Cid};
  //       const response = await axios.get(apiUrl);

  //       console.log("seee this", response.data); // Log the API response to debug

  //       if (response.data.status === "Success") {
  //         console.log(
  //           response.data,
  //           "Single telecalling data fetched for telecalling"
  //         );
  //         // Update item state with fetched data
  //         setRowDataToUpdate(response.data);
  //       } else {
  //         console.error("API response status not success:", response.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching single telecalling data:", error);
  //     }
  //   };
  //   fetchData();
  // }, [item]);

  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked ? 1 : 0,
    }))};

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Clear error for the field when it's being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));

    // Update formData state based on the field name
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Handle specific formatting or validation logic if needed
    if (name === "Mobile" || name === "AlternateMobileNo") {
      const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: numericValue,
      }));
    }
  };

  const RequiredIndicator = () => {
    return <span style={{ color: "red", marginLeft: "5px" }}>*</span>;
  };

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
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
    const { value } = event.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      TelecallAttendedByID: undefined,
    }));

    setFormData({
      ...formData,
      TelecallAttendedByID: value,
    });
  };

  const handleSource = (event) => {
    const { value } = event.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      SourceID: undefined,
    }));

    setFormData({
      ...formData,
      SourceID: value,
    });
  };

  const handleLeadStatus = (event) => {
    const { value } = event.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      leadstatusID: undefined,
    }));

    setFormData({
      ...formData,
      leadstatusID: value,
    });
  };

  const handleTitleChange = (event) => {
    const { value } = event.target;

    // Update form data with the new value
    setFormData({
      ...formData,
      titleprefixID: value,
    });

    // Clear error message for titseprefixID
    setErrors((prevErrors) => ({
      ...prevErrors,
      titleprefixID: undefined,
    }));
  };

  useEffect(() => {
    if (tellecallingID.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Tid: parseInt(tellecallingID[0].Tid) || "",
      }));
    }
  }, [tellecallingID]);

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "titleprefixID",
      "PartyName",
      "Mobile",
      "Countrycode",
      "Email",
      "ProjectID",
      "UnittypeID",
      "leadstatusID",
      "Location",
      "SourceID",
      "TelecallAttendedByID",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    // const isValid = validateForm();

    // if (isValid) {
    const url = editData
      ? "https://ideacafe-backend.vercel.app/api/proxy/api-update-telecalling.php"
      : "https://ideacafe-backend.vercel.app/api/proxy/api-insert-telecalling.php";


      const dataToSend = editData
      ? {
          ...formData,
          ModifyUID: cookies.amr?.UserID || 1
        }
      : {
          ...formData,
          CreateUID: cookies.amr?.UserID || 1 
        };
    
    console.log(dataToSend, "ALL the data of telecalling");
    try {
      const response = await axios.post(url, dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

    console.log(dataToSend, "ALL the data of telecalling");

      if (response.data.status === "Success") {
        setFormData(initialFormData);

        // setSubmitSuccess(true);
        setSubmitError(false);
        show(false);

        setErrors({});

        Swal.fire({
          icon: "success",
          title: editData
            ? "Data Updated Successfully"
            : "Data Added Successfully",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.reload();
        });
      } else {
        setSubmitSuccess(false);
        setSubmitError(true);

        Swal.fire({
          icon: "error",
          title: "Oopsii...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("There was an error!", error);
      setSubmitSuccess(false);
      setSubmitError(true);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Mobile number is already Exits!",
      });
    }
    // } else {
    //   // Handle validation errors if any
    //   console.log("Form validation failed");
    // }
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
      NextFollowUpDate: new Date(
        new Date().getTime() + 2 * 24 * 60 * 60 * 1000
      ), // 2 days ahead
    }));
  }, []);

  const handleDateChange = (date) => {
    setFormData({ ...formData, NextFollowUpDate: date });
  };

  return (
    <>
      <Card sx={{ height: "auto" }}>
        <CardContent>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography
                variant="body2"
                sx={{ marginTop: 5, fontWeight: "bold", fontSize: 20 }}
              >
                {editData
                  ? "Edit Lead Details"
                  : "Add Lead Details"}
              </Typography>
              <Button
          variant="contained"
          onClick={onDashboardClick}
          style={{ marginTop: 0 }}
        >
          Dashboard
        </Button>
            </Box>
           
          </Grid>
          <form style={{ marginTop: "50px" }}>
            <Grid container spacing={7}>
              <Grid item xs={8} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>
                    Title <RequiredIndicator />
                  </InputLabel>
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
                  {errors.titleprefixID && (
                    <Typography variant="caption" color="error">
                      {errors.titleprefixID}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={8} sm={4}>
                <FormControl fullWidth>
                  {editData ? (
                    // Display full name as a non-editable text when in edit mode
                    <Box
                      sx={{
                        padding: "16px",
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        color: "rgba(0, 0, 0, 0.87)",
                      }}
                    >
                      {formData.CName}
                    </Box>
                  ) : (
                    // Display Select component when not in edit mode
                    <>
                      <InputLabel id="select-cname-label">Full name</InputLabel>
                      <Select
                        labelId="select-cname-label"
                        id="select-cname"
                        value={selectedCid}
                        onChange={handleSelectChange}
                      >
                        {cNames.map((item) => (
                          <MenuItem key={item.Cid} value={item.Cid}>
                            {item.CName || ""}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={
                    <>
                      Country Code <RequiredIndicator />
                    </>
                  }
                  type="tel"
                  name="Countrycode"
                  value={formData.Countrycode}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "[0-9]*",
                  }}
                />
                {errors.Countrycode && (
                  <Typography variant="caption" color="error">
                    {errors.Countrycode}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label="Mobile"
                  name="Mobile"
                  value={formData.Mobile || ""}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "[0-9]*",
                    maxLength: 10,
                  }}
                />
                {/* Add error handling for Mobile if needed */}
              </Grid>

              {/* <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={
                    <>
                      Mobile <RequiredIndicator />
                    </>
                  }
                  type="tel"
                  name="Mobile"
                  value={formData.Mobile}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "[0-9]*",
                    maxLength: 10,
                  }}
                />
                {errors.Mobile && (
                  <Typography variant="caption" color="error">
                    {errors.Mobile}
                  </Typography>
                )}
              </Grid> */}

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label="Alternate Mobile Number"
                  name="AlternateMobileNo"
                  value={formData.AlternateMobileNo || ""}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "[0-9]*",
                    maxLength: 10,
                  }}
                />
                {/* Add error handling for Alternate Mobile Number if needed */}
              </Grid>

              {/* <Grid item xs={8} sm={4}>
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
                    maxLength: 10,
                  }}
                />
              </Grid> */}

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label="Email"
                  name="Email"
                  value={formData.Email || ""}
                  onChange={handleChange}
                />
                {/* Add error handling for Email if needed */}
              </Grid>

              {/* <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={
                    <>
                      Email <RequiredIndicator />
                    </>
                  }
                  name="Email"
                  placeholder="E-Mail"
                  value={formData.Email}
                  onChange={handleChange}
                />
                {errors.Email && (
                  <Typography variant="caption" color="error">
                    {errors.Email}
                  </Typography>
                )}
              </Grid> */}

              <Grid item xs={8} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>
                    Project Name <RequiredIndicator />
                  </InputLabel>
                  <Select
                    value={formData.ProjectID}
                    name="ProjectID"
                    onChange={handleChange}
                    label={<>Project Name</>}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {projectTypes.map((project) => (
                      <MenuItem
                        key={project.ProjectID}
                        value={project.ProjectID}
                      >
                        {project.ProjectName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.ProjectID && (
                    <Typography variant="caption" color="error">
                      {errors.ProjectID}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={8} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>
                    Unit Type <RequiredIndicator />
                  </InputLabel>
                  <Select
                    value={formData.UnittypeID}
                    onChange={handleBhkChange}
                    label={
                      <>
                        Unit Type <RequiredIndicator />
                      </>
                    }
                  >
                    {bhkOptions.map((bhk) => (
                      <MenuItem key={bhk.UnittypeID} value={bhk.UnittypeID}>
                        {bhk.UnittypeName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.UnittypeID && (
                    <Typography variant="caption" color="error">
                      {errors.ProjectID}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={8} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Estimated Budget</InputLabel>
                  <Select
                    value={formData.EstimatedbudgetID}
                    onChange={handleEstimatedBudget}
                    label={
                      <>
                        Estimated Budget <RequiredIndicator />
                      </>
                    }
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
                  {errors.EstimatedbudgetID && (
                    <Typography variant="caption" color="error">
                      {errors.EstimatedbudgetID}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={8} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>
                    Lead Status <RequiredIndicator />
                  </InputLabel>
                  <Select
                    value={formData.leadstatusID}
                    onChange={handleLeadStatus}
                    label={
                      <>
                        Lead Status <RequiredIndicator />
                      </>
                    }
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
                  {errors.leadstatusID && (
                    <Typography variant="caption" color="error">
                      {errors.leadstatusID}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={
                    <>
                      Location <RequiredIndicator />
                    </>
                  }
                  name="Location"
                  placeholder="Location"
                  value={formData.Location}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>
                    Source <RequiredIndicator />
                  </InputLabel>
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
                  {errors.SourceID && (
                    <Typography variant="caption" color="error">
                      {errors.SourceID}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={
                    <>
                      Source Name <RequiredIndicator />
                    </>
                  }
                  name="SourceName"
                  placeholder="Source Name"
                  value={formData.SourceName}
                  onChange={handleChange}
                />
              </Grid>

              {/* <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Source Description"
                placeholder="Source Description"
                name="SourceDescription"
                value={formData.SourceDescription}
                onChange={handleChange}
            
            </Grid>

            <Grid item xs={8} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>
                    Telecall Attended By
                    <RequiredIndicator />
                  </InputLabel>
                  <Select
                    value={formData.TelecallAttendedByID}
                    onChange={handleTelecaller}
                    label="Telecall Attended By"
                  >
                    {userMaster.map((bhk) => (
                      <MenuItem key={bhk.UserID} value={bhk.UserID}>
                        {bhk.Name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.TelecallAttendedByID && (
                    <Typography variant="caption" color="error">
                      {errors.TelecallAttendedByID}
                    </Typography>
                  )}
                </FormControl>
              </Grid> */ }

              <Grid item xs={8} sm={4}>
                <DatePicker
                  selected={formData.NextFollowUpDate}
                  onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  className="form-control"
                  customInput={
                    <TextField
                      fullWidth
                      label={
                        <>
                          Next follow up-date <RequiredIndicator />
                        </>
                      }
                      InputProps={{
                        readOnly: true,
                        sx: { width: "100%" },
                      }}
                    />
                  }
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={
                    <>
                      Next Follow Up-Time <RequiredIndicator />
                    </>
                  }
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
        <FormLabel component="legend">Notification Preferences</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.SmsNotification === 1}
                onChange={handleNotificationChange}
                name="SmsNotification"
                value="sms"
              />
            }
            label="Send on SMS"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.Notification === 1}
                onChange={handleNotificationChange}
                name="Notification"
                value="notification"
              />
            }
            label="Send on Notification"
          />
        </FormGroup>
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

export default AddTellecallingDetails;