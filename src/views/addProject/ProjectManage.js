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
import Card from '@mui/material/Card';

const ProjectManage = ({show}) => {
  // const classes = useStyles();
  const [projectName, setProjectName] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [message, setMessage] = useState('');
  const [projectTypes, setProjectTypes] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState('');
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [plotArea, setplotarea] = useState('');
  const [ctsNo, setCtsNumber] = useState('');
  const [unit, setUnit] = useState('');

  const [propertyTax, setProperty] = useState('');
  const [reraRegistration, setRera] = useState('');
  const [uom, setUom] = useState('');
  const [broucherLink, setBroucher] = useState('');
  const [managerName, setManagerName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [gstinNumber, setGstinNumber] = useState("");
  const [remarks, setRemarks] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateRera, setSelectedDateRera] = useState(null);

  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-companymaster.php');
      console.log('API Response:', response.data);
      setRows(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    }
  };




  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-projecttypemaster.php")
      .then((response) => {
        if (response.data.status === "Success") {
          console.log(response.data.data, "DATAA AAGAYAAAAAAAAAA PROJET TYPEEEE");
          setProjectTypes(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

 

  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-citymaster.php")
      .then((response) => {
        if (response.data.status === "Success") {
          console.log(response.data.data, "DATAA AAGAYAAAAAAAAAA");
          setCities(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-projecttypemaster.php")
      .then((response) => {
        if (response.data.status === "Success") {
          console.log(response.data.data , 'dataa aayaaaa Project type');
          setCompanyStatus(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      setErrors((prevErrors) => ({ ...prevErrors, date: "" }));
    }
  };

  const handleDateChangeRera = (date)=>{
    setSelectedDateRera(date)
  }

  const handleChangePlot = (event) => {
    setplotarea(event.target.value);
  };

  const handleCtsNumber = (event) => {
    setCtsNumber(event.target.value);
   
  };


  const handleChange = (event) => {
    
    console.log('Selected Company ID:', event.target.value); // Debugging log
    setSelectedCompany(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    setProjectName(event.target.value);
    if (event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, projectName: "" }));
    }
  };

  const handleMesage = (event) => {
    const value = event.target.value;
   
    setMessage(value);
  };

  const handleCompanyCodeChange = (event) => {
    setCompanyCode(event.target.value);
    if (event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, companyCode: "" }));
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

  const handleProjectManager = (event) => {
    const value = event.target.value;
    setManagerName(value);
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };
  const handleGstin = (event) => {
    setGstinNumber(event.target.value);
  };

  const handleRemarks = (event) => {
    setRemarks(event.target.value);
  };

  const handleCityChange = (event) => {
    const selectedCityName = event.target.value;
    setSelectedCity(selectedCityName);

    // Find the CityID based on the selected CityName
    const selectedCityObject = cities.find(
      (city) => city.CityName === selectedCityName
    );
    if (selectedCityObject) {
      setSelectedCityId(selectedCityObject.CityID);
    }
  };

  const handlePropertyTaxChange = (event) => {
    setProperty(event.target.value);
   
  };

  const handleUom = (event) => {
    const value = event.target.value;
    setUom(value);
  };

  const handleReraNumber = (event) => {
    setRera(event.target.value);
   
  };

  const handleBroucherLinkChange = (event) => {
    setBroucher(event.target.value);
   
  };

  const handleStateChange = (event) => {
    const selectedStateName = event.target.value;
    setSelectedState(selectedStateName);

    // Find the StateID based on the selected StateName
    const selectedStateObject = states.find(
      (state) => state.StateName === selectedStateName
    );
    if (selectedStateObject) {
      setSelectedStateId(selectedStateObject.StateID);
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!selectedCompany) {
      newErrors.companyName = "Company Name is required";
    }
    if (!projectName) {
      newErrors.projectName = "Project Name is required";
    }
    if (!companyCode) {
      newErrors.companyCode = "Project Code is required";
    }
  
    if (!registeredAddress) {
      newErrors.registeredAddress = "Project Address is required";
    }
    if (!selectedDate) {
      newErrors.date = "Date is required";
    }
    if (!price) {
      newErrors.price = "Bookin from price is required";
    }
    if (!pincode) {
      newErrors.pincode = "Pincode is required";
    }
    if (!selectedCity) {
      newErrors.pincode = "City is required";
    }
    if (!selectedState) {
      newErrors.pincode = "State is required";
    }
    return newErrors;
  };

  const handleChangeProjectTyoe = (event) => {
    setSelectedProjectType(event.target.value);
  };

  const handleUnit = (event) => {
    setUnit(event.target.value);
  };

  const handleSubmitData = (event) => {
    console.log("presss");
    // event.preventDefault();
    // const newErrors = validateFields();
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    // } else {
    //   setErrors({});

    

      const body = {
        projectname:projectName,
        CompanyID:selectedCompany ,
        city: selectedCityId,
        state: selectedStateId,
        country: 1,
        contactdetails: phone,
        projectmanager: managerName,
        projecttypeid: selectedProjectType,
        plotareainsqft:plotArea,
        brochurelink:broucherLink,
        ctsno:ctsNo,
        propertytaxnumber:propertyTax,
        reraregistrationnumber:reraRegistration,
        reraregistrationdate:selectedDateRera,
        UOM:uom,
        projectcode:companyCode,
        ContactNo:phone,
        gstinno: gstinNumber,
        pincode: pincode,
        projectaddress:registeredAddress,
        location: location,
        welcomemessage:message,
        remarks: remarks,
        createuid:1,
        status: 1,
        projectstartdate:selectedDate,
        unitofmeasurement:unit





      };

      console.log(body, "ALL DATAAAAAAA PROJECTTT MASTERERRER");

      axios
        .post(
          "https://ideacafe-backend.vercel.app/api/proxy/api-insert-projectmaster.php",
          body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.status === "Success") {
            // setSubmitSuccess(true);
            // setSubmitError(false);
            show(false)
            // setProjectName("");
            // setCompanyCode("");
            // // setCompanyAddress("");
            // setRegisteredAddress("");
            // setPincode("");
            // setPhone("");
            // setMobilePhone("");
            // setManagerName("");
            // setPrice("");
            // setLocation("");
            // setGstinNumber("");
            // setRemarks("");
            // setSelectedDate(null);
            // setSelectedCompany("");
            // setSelectedCity("");
            // setSelectedState("");
            // setSelectedCityId("");
            // setSelectedStateId("");

            console.log("BHAAIII DATAAAA");
          } else {
            setSubmitSuccess(false);
            setSubmitError(true);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
          // setSubmitSuccess(false);
          // setSubmitError(true);
        });
    // }
  };

  return (
    <Card>
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box>
              <Typography
                variant="body2"
                sx={{ marginTop: 5, fontWeight: "bold", fontSize: 20 }}
              >
                Manage Project Details
              </Typography>
            </Box>
          </Grid>

          {submitSuccess && (
            <Grid item xs={12}>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Project details submitted successfully!
              </Alert>
            </Grid>
          )}

          {submitError && (
            <Grid item xs={12}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                There was an error submitting the project details.
              </Alert>
            </Grid>
          )}

          <Grid item xs={8} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Company Name</InputLabel>
              <Select
                value={selectedCompany}
                onChange={handleChange}
                label="Company Name"
                error={!!errors.companyName}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {rows.map((company) => (
  <MenuItem key={company.CompanyID} value={company.CompanyID}>
    {company.CompanyName}
  </MenuItem>
))}
              </Select>
              {errors.companyName && (
                <Typography variant="caption" color="error">
                  {errors.companyName}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={8} sm={4}>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                label="City"
                value={selectedCity}
                onChange={handleCityChange}
                error={!!errors.city}
              >
                {cities.map((city) => (
                  <MenuItem key={city.CityID} value={city.CityName}>
                    {city.CityName}
                  </MenuItem>
                ))}
              </Select>
              {errors.city && (
                <Typography variant="caption" color="error">
                  {errors.city}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={8} sm={4}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select
                label="State"
                value={selectedState}
                onChange={handleStateChange}
                error={!!errors.state}
              >
                {states.map((state) => (
                  <MenuItem key={state.StateID} value={state.StateName}>
                    {state.StateName}
                  </MenuItem>
                ))}
              </Select>
              {errors.state && (
                <Typography variant="caption" color="error">
                  {errors.state}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={8} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select label="Country" placeholder="Country">
                <MenuItem value="Residential">India</MenuItem>
                {/* <MenuItem value='Commercial'>Commercial Building</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={8} sm={4}>
      <FormControl fullWidth>
        <InputLabel>Project Type</InputLabel>
        <Select
          value={selectedProjectType}
          onChange={handleChangeProjectTyoe}
          label="Project Type"
        >
          {projectTypes.map((project) => (
            <MenuItem key={project.ProjectTypeID} value={project.ProjectTypeID}>
              {project.ProjectTypeName || 'Unnamed Project Type'}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>




    <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              label="Unit of measurement"
              placeholder="Unit of measurement"
              value={unit}
              onChange={handleUnit}
              name="unit of measurement"
              error={!!errors.projectName}
              helperText={errors.projectName}
            />
          </Grid>



          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              label="Project Name"
              placeholder="Project Name"
              value={projectName}
              onChange={handleCompanyNameChange}
              name="Project Name"
              error={!!errors.projectName}
              helperText={errors.projectName}
            />
          </Grid>

          <Grid item xs={8} sm={4}>
          <TextField
            fullWidth
            label='Plot Area'
            placeholder='Plot Area'
            value={plotArea}
            onChange={handleChangePlot}
          
            // error={!!errors.companyCode}
            // helperText={errors.companyCode}
          />
        </Grid>

        
        <Grid item xs={8} sm={4}>
          <TextField
            fullWidth
            type='url'
            label='Broucher Link'
            placeholder='Broucher Link'
            value={broucherLink}
            onChange={handleBroucherLinkChange}

          
          />
        </Grid>

        <Grid item xs={8} sm={4}>
          <TextField
            fullWidth
            type='text'
            label='CTS No'
            placeholder='CTS No'
            value={ctsNo}
            onChange={handleCtsNumber}
          
            // error={!!errors.companyAddress}
            // helperText={errors.companyAddress}
          />
        </Grid>
        <Grid item xs={8} sm={4}>
          <TextField
            fullWidth
            type='text'
            label='Property Tax No'
            placeholder='Property Tax No'
            value={propertyTax}
            onChange={handlePropertyTaxChange}
            name = 'property-tax'
            error={!!errors.registeredAddress}
            helperText={errors.registeredAddress}
          />
        </Grid>
        <Grid item xs={8} sm={4}>
          <TextField
            fullWidth
            type='text'
            label='RERA Registration No'
            placeholder='RERA Registration No'
            value={reraRegistration}
            onChange={handleReraNumber}

            error={!!errors.pincode}
            helperText={errors.pincode}
          />
        </Grid>

 

        
        <Grid item xs={8} sm={4}>
          <TextField
            fullWidth
            type='text'
            label='UOM'
            placeholder='UOM'
            value={uom}
            onChange={handleUom}
           
          />
        </Grid>
          
          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              label="Project Code"
              placeholder="Project Code"
              value={companyCode}
              onChange={handleCompanyCodeChange}
              name="Project Code"
              error={!!errors.companyCode}
              helperText={errors.companyCode}
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="Project Manager"
              placeholder="Project Manager"
              value={managerName}
              onChange={handleProjectManager}
              required
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="tel"
              label="Contact Detail"
              placeholder="Contact Detail"
              value={phone}
              onChange={handlePhone}
              inputProps={{ maxLength: 10 }}
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="GSTIN Number"
              placeholder="GSTIN Number"
              value={gstinNumber}
              onChange={handleGstin}
            />
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
              type="text"
              label="Project Address"
              placeholder="Project Address"
              value={registeredAddress}
              onChange={handleRegisteredAddressChange}
              error={!!errors.registeredAddress}
              helperText={errors.registeredAddress}
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="Location"
              placeholder="Location"
              value={location}
              onChange={handleLocation}
            />
          </Grid>

          <Grid item xs={8} sm={4}>
          <TextField
            fullWidth
            type='text'
            label='Welcome Message'
            placeholder='Welcome Message'
            value={message}
            onChange={handleMesage}
          
          />
        </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="Remarks"
              placeholder="Remarks"
              value={remarks}
              onChange={handleRemarks}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              customInput={
                <TextField
                  fullWidth
                  label="Start Date"
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
          <Grid item xs={8} sm={4}>
            <DatePicker
              selected={selectedDateRera}
              onChange={handleDateChangeRera}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              customInput={
                <TextField
                  fullWidth
                  label="Rera Registration Date"
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

          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ marginRight: 3.5 }}
              onClick={handleSubmitData}
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

export default ProjectManage;