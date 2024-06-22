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
  console.log(editData , 'Edit data aaya contact ka');
  const initialFormData = {
    TitleID: "",
    CName:"",
    CustomerTypeID:"",
    ContactTypeID: "",
    CountryCodeID:"",
    Mobile: "",
    OtherNumbers: "",
    Email: "",
    CityID:"",
    LocationID:"",
    PinCode:"",
    KeyWordID:1,
    SourceID:"",
    SourceTypeID: "",
    UserID: "",
    Status:1,
    CreateUID:1,
    Cid:"",
    ModifyUID: 1,

    
  };


  
  const [rows, setRows] = useState([]);


  const [contactTypes, setContactTypes] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [sourceTypes, setSourceTypes] = useState([]);
  const [dynamicSourceID, setDynamicSourceID] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [titles, setTitles] = useState([]);
  const [errors, setErrors] = useState({});
  const [projectTypes, setProjectTypes] = useState([]);
  const [customerType, setCustomerType] = useState([]);

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
  
    fetchDataTitle();
  }, []);

  useEffect(() => {
    if (editData) {
      // Destructure editData to access necessary properties
      const { TitleID, CName, CustomerTypeID, ContactTypeID, CountryCodeID, Mobile, OtherNumbers, Email, CityID, LocationID, PinCode, SourceID, SourceTypeID, UserID, Status, CreateUID, Cid, ModifyUID } = editData;
  
      // Set the form data using editData values
      setFormData({
        TitleID: TitleID || "",
        CName: CName || "",
        CustomerTypeID: CustomerTypeID || "",
        ContactTypeID: ContactTypeID || "",
        CountryCodeID: CountryCodeID || "",
        Mobile: Mobile || "",
        OtherNumbers: OtherNumbers || "",
        Email: Email || "",
        CityID: CityID || "",
        LocationID: LocationID || "",
        PinCode: PinCode || "",
        SourceID: SourceID || "",
        SourceTypeID: SourceTypeID || "",
        UserID: UserID || "",
        Status: Status || 1,
        CreateUID: CreateUID || 1,
        Cid: Cid || "",
        ModifyUID: ModifyUID || 1,
       
      });
  
      // Fetch contact types based on customer type if CustomerTypeID is available
      if (CustomerTypeID) {
        fetchContactTypes(CustomerTypeID);
      }
  
      // Fetch source types based on source if SourceID is available
      if (SourceID) {
        setDynamicSourceID(SourceID);
      }
    }
  }, [editData]);
  

  useEffect(() => {
    fetchDataCustomerType();
    // fetchCountryCodes();
  }, []);

  const fetchDataCustomerType = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-customertype.php"
      );
      if (response.data.status === "Success") {
        setCustomerType(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchContactTypes = async (customerTypeID) => {
    try {
      const response = await axios.get(
        `https://apiforcorners.cubisysit.com/api/api-fetch-contacttype.php?CustomerTypeID=${customerTypeID}`
      );
      if (response.data.status === "Success") {
        setContactTypes(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-countrycode.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setCountryCodes(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching country codes:", error);
      });
  }, []);
  

  useEffect(() => {
    axios.get("https://apiforcorners.cubisysit.com/api/api-fetch-citymaster.php")
      .then(response => {
        if (response.data.status === "Success") {
          setCities(response.data.data);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);



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


  useEffect(() => {
    fetchId();
  }, []);

  const fetchId = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-contacts.php"
      );
      console.log("API Response:", response.data);
      setRows(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dynamicSourceID) {
      axios.get(`https://apiforcorners.cubisysit.com/api/api-fetch-sourcetype.php?SourceID=${dynamicSourceID}`)
        .then((response) => {
          if (response.data.status === "Success") {
            console.log(response.data.data , 'Source name');
            setSourceTypes(response.data.data);
          } else {
            console.error("Failed to fetch source types:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching source types:", error);
        });
    }
  }, [dynamicSourceID]);


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
        "OtherNumbers",
        "TelephoneNo",
        "AlternateTelephoneNo",
        "Countrycode",
        "PinCode"
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
    if (name === 'SourceID') {
      setDynamicSourceID(value);
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


 





  const handleContactType = (event) => {
    const contactTypeID = event.target.value;
    setFormData({
      ...formData,
      ContactTypeID: contactTypeID,
    });
  };

  const handleCustomerType = (event) => {
    const customerTypeID = event.target.value;
    setFormData({
      ...formData,
      CustomerTypeID: customerTypeID,
      ContactTypeID: "", // Reset Contact Type when Customer Type changes
    });
    fetchContactTypes(customerTypeID);
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
      TitleID: event.target.value,
    });
  };

  useEffect(() => {
    if (rows.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Cid: parseInt(rows[0].Cid) || "",
      }));
    }
  }, [rows]);



  const handleSubmit = async (event) => {
    event.preventDefault();


  console.log(formData , 'aagaya data contact');
    const url = editData
      ? "https://ideacafe-backend.vercel.app/api/proxy/api-update-contacts.php"
      : "https://ideacafe-backend.vercel.app/api/proxy/api-insert-contacts.php";
  
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
        window.location.reload();
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


  const RequiredIndicator = () => {
    return (
      <span style={{ color: 'red', marginLeft: '5px' }}>*</span>
    );
  };
  const handleCountryCode = (event) => {
    setFormData({
      ...formData,
      CountryCodeID: event.target.value,
    });
  };

  const handleCityChange = (event) => {
    setFormData({
      ...formData,
      CityID: event.target.value,
    });
  };
  

  const handleTelecaller = (event) => {
    setFormData({
      ...formData,
      UserID: event.target.value,
    });
  };


  return (
    <>




    <Card sx={{ height:"auto" }}>
   
      <CardContent>
        <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
          
          <Box>
            <Typography
              variant="body2"
              sx={{ marginTop: 5, fontWeight: "bold", fontSize: 20 }}
            >
              {editData
                ? "Edit Contact Details"
                : "Add Contact Details"}
            </Typography>

            
        
          </Box>
        </Grid>
        <form style={{ marginTop: "50px" }}>
          <Grid container spacing={7}>
            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Title <RequiredIndicator /></InputLabel>
                <Select
                  value={formData.TitleID}
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
                label={
                  <>
                    First Name <RequiredIndicator />
                  </>
                }
                type="text"
                name="CName"
                value={formData.CName}
                onChange={handleChange}
              
              />
            </Grid>

     
      <Grid item xs={8} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Customer Type <RequiredIndicator /></InputLabel>
          <Select
            value={formData.CustomerTypeID}
            onChange={handleCustomerType}
            label="Customer Type"
          >
            {customerType.map((type) => (
              <MenuItem key={type.CustomerTypeID} value={type.CustomerTypeID}>
                {type.CustomerTypeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={8} sm={4}>
        <FormControl fullWidth>
          <InputLabel>Contact Type <RequiredIndicator /></InputLabel>
          <Select
            value={formData.ContactTypeID}
            onChange={handleContactType}
            label="Contact Type"
          >
            {contactTypes.map((type) => (
              <MenuItem key={type.ContactTypeID} value={type.ContactTypeID}>
                {type.ContactName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={8} sm={4}>
  <FormControl fullWidth>
    <InputLabel>Country Code <RequiredIndicator /></InputLabel>
    <Select
      value={formData.CountryCodeID}
      onChange={handleCountryCode}
      label="Country Code"
      name="CountryCodeID"
    >
      {countryCodes.map((country) => (
        <MenuItem key={country.CountryCode} value={country.CountryCode}>
          {country.CountryName}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>


            <Grid item xs={8} sm={4}>
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
                  maxLength: 10
                }}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="tel"
                name="OtherNumbers"
                label="Alternate Mobile Number"
                placeholder="Alternate Mobile Number"
                value={formData.OtherNumbers}
                onChange={handleChange}
                inputProps={{
                  pattern: "[0-9]*",
                 maxLength: 10

                }}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
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
            </Grid>

            <Grid item xs={8} md={4}>
                <FormControl fullWidth>
                  <InputLabel>City <RequiredIndicator /></InputLabel>
                  <Select name="CityID" value={formData.CityID} label='City' onChange={handleCityChange}>
                    {cities.map((city) => (
                      <MenuItem key={city.CityID} value={city.CityID}>
                        {city.CityName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.city && <Alert severity="error">{errors.city}</Alert>}
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
                name="LocationID"
                placeholder="Location"
                value={formData.LocationID}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
  <TextField
    fullWidth
    label={
      <>
        Pincode <RequiredIndicator />
      </>
    }
    name="PinCode"
    placeholder="Pincode"
    value={formData.PinCode}
    onChange={handleChange}
    inputProps={{
      pattern: "[0-9]*",
    }}
  />
</Grid>


        {/* Other form elements */}
        <Grid item xs={8} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Source <RequiredIndicator /></InputLabel>
            <Select
              value={formData.SourceID}
              name="SourceID"
              onChange={handleChange}
              label="Source"
            >
              {source.map((source) => (
                <MenuItem key={source.SourceID} value={source.SourceID}>
                  {source.SourceName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={8} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Source Type <RequiredIndicator /></InputLabel>
            <Select
              value={formData.SourceTypeID} // Assuming SourceName is the selected source type
              name="SourceTypeID"
              onChange={handleChange}
              label="Source Type"
            >
              {sourceTypes.map((sourceType) => (
                <MenuItem key={sourceType.SourceTypeID} value={sourceType.SourceTypeID}>
                  {sourceType.SourceTypename}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        {/* Other form elements */}
  
      

            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Telecall Attended By <RequiredIndicator /></InputLabel>
                <Select
                  value={formData.UserID}
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
