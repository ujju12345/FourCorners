// ** React Imports
import { useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
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
import { PrinterPosCheck } from "mdi-material-ui";
import Card from "@mui/material/Card";
import { useCookies } from "react-cookie";

const TabAccount = ({ show }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState("");
 
  const [remarks, setRemarks] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [companyStatus, setCompanyStatus] = useState([]);
  const [selectedCompanyStatus, setSelectedCompanyStatus] = useState("");



  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");

  // useEffect(() => {
  
  // }, []);


  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-statemaster.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setStates(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-companystatus.php")
      .then((response) => {
        if (response.data.status === "Success") {
          console.log(response.data.data, 'dataa aayaaaa');
          setCompanyStatus(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  


  const getCityData = (stateID) => {
    // debugger;
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-singel-citymaster.php?StateID= " + stateID)
      .then((response) => {
        // debugger;
        if (response.data.status === "Success") {
          console.log(response.data.data, "DATAA AAGAYAAAAAAAAAA");
          setCities(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      setErrors((prevErrors) => ({ ...prevErrors, date: "" }));
    }
  };
  const handleCompanyStatusChange = (event) => {
    setSelectedCompanyStatus(event.target.value);
  };


  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
    if (event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, companyName: "" }));
    }
  };

  const handleCompanyCodeChange = (event) => {
    setCompanyCode(event.target.value);
    if (event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, companyCode: "" }));
    }
  };

  const handleCompanyAddressChange = (event) => {
    setCompanyAddress(event.target.value);
    if (event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, companyAddress: "" }));
    }
  };

  const handleRegisteredAddressChange = (event) => {
    setRegisteredAddress(event.target.value);
    if (event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, registeredAddress: "" }));
    }
  };
  const handlePincode = (event) => {
    setPincode(event.target.value);
    if (event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, pincode: "" }));
    }
  };
  const handlePhone = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    setPhone(numericValue);
  };
  const handleMobilePhone = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    setMobilePhone(numericValue);
  };

  const handleEmail = (event) => {
    const value = event.target.value;
    const validEmailCharacters = value.replace(/[^a-zA-Z0-9@._-]/g, "");
    setEmail(validEmailCharacters);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
    if (event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, price: "" }));
    }
  };


  const handleRemarks = (event) => {
    setRemarks(event.target.value);
  };

  const handleCityChange = (event) => {
    // debugger;
    const selectedCityName = event.target.value;
    setSelectedCity(selectedCityName);

    // Find the CityID based on the selected CityName
    const selectedCityObject = cities.find(
      (city) => city.CityName === selectedCityName
    );
    // debugger;
    if (selectedCityObject) {
      setSelectedCityId(selectedCityObject.CityID);
    }
  };

  const handleStateChange = (event) => {
    // debugger;
    const selectedStateName = event.target.value;
    setSelectedState(selectedStateName);
    const selectedStateObject = states.find(
      (state) => state.StateName === selectedStateName
    );
    if (selectedStateObject) {
      setSelectedStateId(selectedStateObject.StateID);
      getCityData(selectedStateObject.StateID);
    }
  };
  const validateFields = () => {
    const newErrors = {};
    if (!companyName) {
      newErrors.companyName = "Company Name is required";
    }
    if (!companyCode) {
      newErrors.companyCode = "Company Code is required";
    }
    if (!companyAddress) {
      newErrors.companyAddress = "Company Address is required";
    }
    if (!registeredAddress) {
      newErrors.registeredAddress = "Registered Address is required";
    }
    if (!selectedDate) {
      newErrors.date = "Date is required";
    }
    if (!price) {
      newErrors.price = "Booking price is required";
    }
    if (!pincode) {
      newErrors.pincode = "Pincode is required";
    }
    return newErrors;
  };

  // const handleSubmit = () => {
  //   const newErrors = validateFields();
  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //   } else {
  //     setErrors({});

  //   }
  // };


  const handleNavigation = () => {
    show('list');
  };

  const [cookies, setCookie, removeCookie] = useCookies(["amr"]);

  const handleSubmit = (event) => {
    console.log("presss");
    event.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});

      const formData = {
        CreateUID: cookies.amr?.UserID || 1,
        CompanyName: companyName,
        CompanyCode: companyCode,
        CommAddress: companyAddress,
        CityID: selectedCityId,
        StateID: selectedStateId,
        CountryID: 1,
        Pincode: pincode,
        PhoneNo: phone,
        MobileNo: mobilePhone,
        Email: email,
        RegisteredAddress: registeredAddress,
        ERPLiveDate: selectedDate, // Ensure the date is in the correct format
        BookBeginingFrom: price, // Make sure to have this field set
        Status: 1,
        CompanyStatusID: selectedCompanyStatus,
        Remarks: remarks,
      };

      console.log(formData, "ALL DATAAAAAAA");

      axios
        .post(
          "https://ideacafe-backend.vercel.app/api/proxy/api-insert-companymaster.php",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.status === "Success") {
            setSubmitSuccess(true);
            show();
            setCompanyName("");
            setCompanyCode("");
            setCompanyAddress("");

            console.log("SUBMMITEDDD DATAAAA");
          } else {
            setSubmitSuccess(false);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
          setSubmitSuccess(false);
        });
    }
  };

  return (
    <Card>
      <CardContent>
        <form>
          <Grid container spacing={7}>
          <Grid item xs={12}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="body2"
          sx={{ fontWeight: 'bold', fontSize: 20 }}
        >
          Add Company Details
        </Typography>
        <Button
          variant="contained"
          onClick={handleNavigation}
          style={{ marginTop: 0 }}
        >
          List
        </Button>
      </Box>
    </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Company Name"
                placeholder="Company Name"
                value={companyName}
                onChange={handleCompanyNameChange}
                name="companyName"
                error={!!errors.companyName}
                helperText={errors.companyName}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Company Code"
                placeholder="Company Code"
                value={companyCode}
                onChange={handleCompanyCodeChange}
                name="companyCode"
                error={!!errors.companyCode}
                helperText={errors.companyCode}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="text"
                label="Company Address"
                placeholder="Address"
                value={companyAddress}
                onChange={handleCompanyAddressChange}
                error={!!errors.companyAddress}
                helperText={errors.companyAddress}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="text"
                label="Registered Address"
                placeholder="Registered Address"
                value={registeredAddress}
                onChange={handleRegisteredAddressChange}
                error={!!errors.registeredAddress}
                helperText={errors.registeredAddress}
              />
            </Grid>



            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Company Status</InputLabel>
                <Select
                  label="Company Status"
                  value={selectedCompanyStatus}
                  onChange={handleCompanyStatusChange}
                >
                  {companyStatus.map((status) => (
                    <MenuItem key={status.CompanyStatusID} value={status.CompanyStatusID}>
                      {status.CompanyStatusName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select label="State" defaultValue="India">
                  <MenuItem value="India">India</MenuItem>
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  label="State"
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  {states.map((state) => (
                    <MenuItem key={state.StateID} value={state.StateName}>
                      {state.StateName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <Select
                  label="City"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  {cities.map((city) => (
                    <MenuItem key={city.CityID} value={city.CityName}>
                      {city.CityName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

    
      

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="tel"
                label="Pincode"
                placeholder="Pincode"
                value={pincode}
                onChange={handlePincode}
                inputProps={{ maxLength: 6 }}
                error={!!errors.pincode}
                helperText={errors.pincode}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="tel"
                label="Phone Number"
                placeholder="Phone Number"
                value={phone}
                onChange={handlePhone}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="tel"
                label="Mobile Number"
                placeholder="Mobile Number"
                value={mobilePhone}
                onChange={handleMobilePhone}
                inputProps={{ maxLength: 10 }}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="text"
                label="Email"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
                required
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="tel"
                label="Book Beginning From"
                placeholder="Book Beginning From"
                value={price}
                onChange={handlePrice}
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>
            {/* <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="PanIT Number"
                placeholder="PanIT Number"
                value={panIt}
                onChange={handlePanIT}
              />
            </Grid> */}
            {/* <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="GSTIN Number"
                placeholder="GSTIN Number"
                value={gstinNumber}
                onChange={handleGstin}
              />
            </Grid> */}
            {/* <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="TAN Number"
                placeholder="TAN Number"
                value={tanNumber}
                onChange={handleTan}
              />
            </Grid> */}
            {/* <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="VATTIN Number"
                placeholder="VATTIN Number"
                value={vatTinNumber}
                onChange={handleVatTinNumber}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="CSTTIN Number"
                placeholder="CSTTIN Number"
                value={cstTinNumber}
                onChange={handleCSTTIN}
              />
            </Grid> */}
            {/* <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="Service Tax Number"
                placeholder="Service Tax Number"
                value={serviceTax}
                onChange={handleServicesTax}
              />
            </Grid> */}
            {/* <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="CESS Number"
                placeholder="CESS Number"
                value={cessNumber}
                onChange={handleCESS}
              />
            </Grid> */}
            {/* <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="number"
                label="CIN Number"
                placeholder="CIN Number"
                value={cinNumber}
                onChange={handleCIN}
              />
            </Grid> */}

            <Grid item xs={8} sm={4}>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                customInput={
                  <TextField
                    fullWidth
                    label="ERP Date"
                    error={!!errors.date}
                    helperText={errors.date}
                    InputProps={{
                      readOnly: true,
                      sx: { width: "100%" },
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={20} sm={12}>
              <TextField
                fullWidth
                type="text"
                label="Remarks"
                placeholder="Remarks"
                value={remarks}
                onChange={handleRemarks}
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
      </CardContent>
    </Card>
  );
};

export default TabAccount;
