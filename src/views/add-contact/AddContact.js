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
import Swal from 'sweetalert2';
import Card from "@mui/material/Card";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useCookies } from "react-cookie";
import {
  Snackbar,
} from "@mui/material";

const AddContact = ({ show, editData }) => {
  const initialFormData = {
    TitleID: "",
    CName: "",
    CustomerTypeID: "",
    ContactTypeID: "",
    CountryCodeID: "",
    Mobile: "",
    OtherNumbers: "",
    Email: "",
    CityID: "",
    LocationID: "",
    PinCode: "",
    KeyWordID: 1,
    SourceID: "",
    SourceTypeID: "",
    UserID: "",
    Status: 1,
    CreateUID: 1, // Initial value, can be overridden
    Cid: "",
    ModifyUID: 1,
  };

  const [cookies, setCookie] = useCookies(["amr"]);
  const userName = cookies.amr?.FullName || 'User'; // Assuming the name is stored in the "amr" cookie
  const roleName = cookies.amr?.RoleName || 'Admin'; // Assuming the role name is stored in the "amr" cookie
  const userid = cookies.amr?.UserID || 'Role';
  console.log(userName, 'ye dekh username');
  console.log(roleName, 'ye dekh rolname');
  console.log(userid, 'ye dekh roleide');
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
  const [customerType, setCustomerType] = useState([]);
  const [errors, setErrors] = useState({});
  const [source, setSource] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    fetchData();
    fetchDataBhk();
    fetchDataTitle();
    fetchDataCustomerType();
  }, []);

  useEffect(() => {
    if (editData) {
      const { TitleID, CName, CustomerTypeID, ContactTypeID, CountryCodeID, Mobile, OtherNumbers, Email, CityID, LocationID, PinCode, SourceID, SourceTypeID, UserID, Status, CreateUID, Cid, ModifyUID } = editData;
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

      if (CustomerTypeID) {
        fetchContactTypes(CustomerTypeID);
      }

      if (SourceID) {
        setDynamicSourceID(SourceID);
      }
    }
  }, [editData]);

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
      .catch(error => console.error("Error fetching cities:", error));
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
        console.error("Error fetching sources:", error);
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
        console.error("Error fetching user master data:", error);
      });
  }, []);

  const fetchDataBhk = async () => {
    try {
      const response = await axios.get("https://apiforcorners.cubisysit.com/api/api-fetch-unittype.php");
      setBhkOptions(response.data.data || []);
    } catch (error) {
      console.error("Error fetching Bhk data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://apiforcorners.cubisysit.com/api/api-dropdown-projectmaster.php");
      setProjectTypes(response.data.data || []);
    } catch (error) {
      console.error("Error fetching project types:", error);
    }
  };

  const fetchDataCustomerType = async () => {
    try {
      const response = await axios.get("https://apiforcorners.cubisysit.com/api/api-fetch-customertype.php");
      if (response.data.status === "Success") {
        setCustomerType(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching customer types:", error);
    }
  };

  const fetchContactTypes = async (customerTypeID) => {
    try {
      const response = await axios.get(`https://apiforcorners.cubisysit.com/api/api-fetch-contacttype.php?CustomerTypeID=${customerTypeID}`);
      if (response.data.status === "Success") {
        setContactTypes(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching contact types:", error);
    }
  };

  useEffect(() => {
    if (dynamicSourceID) {
      axios.get(`https://apiforcorners.cubisysit.com/api/api-fetch-sourcetype.php?SourceID=${dynamicSourceID}`)
        .then((response) => {
          if (response.data.status === "Success") {
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
      const response = await axios.get("https://apiforcorners.cubisysit.com/api/api-fetch-titleprefix.php");
      setTitles(response.data.data || []);
    } catch (error) {
      console.error("Error fetching titles:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors({
      ...errors,
      [name]: "",
    });
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'SourceID') {
      setDynamicSourceID(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;x  
    }

    const url = editData
      ? "https://ideacafe-backend.vercel.app/api/proxy/api-update-contacts.php"
      : "https://ideacafe-backend.vercel.app/api/proxy/api-insert-contacts.php";

    // Set CreateUID only when adding a new contact
    const dataToSend = editData
      ? formData
      : {
          ...formData,
          CreateUID: cookies.amr?.UserID || 1, // Fallback to 1 if UserID is not found in cookies
        };

    try {
      const response = await axios.post(url, dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === "Success") {
        setFormData(initialFormData);
        setErrors({});
        setSubmitSuccess(true);
        setSubmitError(false);
        show(false);

        Swal.fire({
          icon: "success",
          title: editData ? "Data Updated Successfully" : "Data Added Successfully",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.reload();
        });

      } else {
        setSubmitError(true);
        setSubmitSuccess(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(true);
      setSubmitSuccess(false);
    }
  };

  const validateForm = (formData) => {
    let errors = {};

    if (!formData.TitleID) {
      errors.TitleID = "Title is required";
    }
    if (!formData.CName) {
      errors.CName = "Name is required";
    }
    if (!formData.CustomerTypeID) {
      errors.CustomerTypeID = "Customer Type is required";
    }
    if (!formData.ContactTypeID) {
      errors.ContactTypeID = "Contact Type is required";
    }
    // if (!formData.CountryCodeID) {
    //   errors.CountryCodeID = "Country Code is required";
    // }
    if (!formData.Mobile) {
      errors.Mobile = "Mobile number is required";
    }
    if (!formData.Email) {
      errors.Email = "Email is required";
    }
    if (!formData.CityID) {
      errors.CityID = "City is required";
    }

    return errors;
  };

  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            {editData ? "Edit Contact" : "Add New Contact"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.TitleID}>
                  <InputLabel>Title</InputLabel>
                  <Select
                    name="TitleID"
                    value={formData.TitleID}
                    onChange={handleChange}
                  >
                    {titles.map((title) => (
                      <MenuItem key={title.TitleID} value={title.TitleID}>
                        {title.TitleName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.TitleID && (
                    <MuiAlert severity="error">{errors.TitleID}</MuiAlert>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="CName"
                  label="Name"
                  value={formData.CName}
                  onChange={handleChange}
                  error={!!errors.CName}
                  helperText={errors.CName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.CustomerTypeID}>
                  <InputLabel>Customer Type</InputLabel>
                  <Select
                    name="CustomerTypeID"
                    value={formData.CustomerTypeID}
                    onChange={(e) => {
                      handleChange(e);
                      fetchContactTypes(e.target.value);
                    }}
                  >
                    {customerType.map((type) => (
                      <MenuItem key={type.CustomerTypeID} value={type.CustomerTypeID}>
                        {type.CustomerTypeName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.CustomerTypeID && (
                    <MuiAlert severity="error">{errors.CustomerTypeID}</MuiAlert>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.ContactTypeID}>
                  <InputLabel>Contact Type</InputLabel>
                  <Select
                    name="ContactTypeID"
                    value={formData.ContactTypeID}
                    onChange={handleChange}
                  >
                    {contactTypes.map((type) => (
                      <MenuItem key={type.ContactTypeID} value={type.ContactTypeID}>
                        {type.ContactName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.ContactTypeID && (
                    <MuiAlert severity="error">{errors.ContactTypeID}</MuiAlert>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.CountryCodeID}>
                  <InputLabel>Country Code</InputLabel>
                  <Select
                    name="CountryCodeID"
                    value={formData.CountryCodeID}
                    onChange={handleChange}
                  >
                    {countryCodes.map((code) => (
                      <MenuItem key={code.CountryCodeID} value={code.CountryCodeID}>
                        {code.CountryCode}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* {errors.CountryCodeID && (
                    <MuiAlert severity="error">{errors.CountryCodeID}</MuiAlert>
                  )} */}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="Mobile"
                  label="Mobile"
                  value={formData.Mobile}
                  onChange={handleChange}
                  error={!!errors.Mobile}
                  helperText={errors.Mobile}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="Email"
                  label="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  error={!!errors.Email}
                  helperText={errors.Email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.CityID}>
                  <InputLabel>City</InputLabel>
                  <Select
                    name="CityID"
                    value={formData.CityID}
                    onChange={(e) => {
                      handleChange(e);
                      setSelectedCity(e.target.value);
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.CityID} value={city.CityID}>
                        {city.CityName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.CityID && (
                    <MuiAlert severity="error">{errors.CityID}</MuiAlert>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="LocationID"
                  label="Location ID"
                  value={formData.LocationID}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="PinCode"
                  label="Pin Code"
                  value={formData.PinCode}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.SourceID}>
                  <InputLabel>Source</InputLabel>
                  <Select
                    name="SourceID"
                    value={formData.SourceID}
                    onChange={handleChange}
                  >
                    {source.map((source) => (
                      <MenuItem key={source.SourceID} value={source.SourceID}>
                        {source.SourceName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.SourceID && (
                    <MuiAlert severity="error">{errors.SourceID}</MuiAlert>
                  )}
                </FormControl>
              </Grid>
              {sourceTypes.length > 0 && (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Source Type</InputLabel>
                    <Select
                      name="SourceTypeID"
                      value={formData.SourceTypeID}
                      onChange={handleChange}
                    >
                      {sourceTypes.map((type) => (
                        <MenuItem key={type.SourceTypeID} value={type.SourceTypeID}>
                          {type.SourceType}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  {editData ? "Update Contact" : "Add Contact"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Snackbar
        open={submitSuccess}
        autoHideDuration={6000}
        onClose={() => setSubmitSuccess(false)}
      >
        <MuiAlert elevation={6} variant="filled" onClose={() => setSubmitSuccess(false)} severity="success">
          {editData ? "Contact updated successfully!" : "Contact added successfully!"}
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={submitError}
        autoHideDuration={6000}
        onClose={() => setSubmitError(false)}
      >
        <MuiAlert elevation={6} variant="filled" onClose={() => setSubmitError(false)} severity="error">
          Failed to {editData ? "update contact" : "add contact"}. Please try again later.
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default AddContact;
