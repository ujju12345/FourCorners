import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import AlertTitle from "@mui/material/AlertTitle";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Card from '@mui/material/Card';

const ProjectManage = ({ show }) => {
  const [projectName, setProjectName] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [message, setMessage] = useState('');
  const [projectTypes, setProjectTypes] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState('');
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [plotArea, setPlotArea] = useState('');
  const [ctsNo, setCtsNumber] = useState('');
  const [unit, setUnit] = useState('');
  const [propertyTax, setPropertyTax] = useState('');
  const [reraRegistration, setRera] = useState('');
  const [uom, setUom] = useState('');
  const [broucherLink, setBroucher] = useState('');
  const [managerName, setManagerName] = useState("");
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
      setRows(response.data.data || []);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios.get("https://apiforcorners.cubisysit.com/api/api-fetch-projecttypemaster.php")
      .then(response => {
        if (response.data.status === "Success") {
          setProjectTypes(response.data.data);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
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
    axios.get("https://apiforcorners.cubisysit.com/api/api-fetch-statemaster.php")
      .then(response => {
        if (response.data.status === "Success") {
          setStates(response.data.data);
        }
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleDateChange = (date) => setSelectedDate(date);

  const handleDateChangeRera = (date) => setSelectedDateRera(date);

  const handleChangePlot = (event) => setPlotArea(event.target.value);

  const handleCtsNumber = (event) => setCtsNumber(event.target.value);

  const handleChange = (event) => setSelectedCompany(event.target.value);

  const handleCompanyNameChange = (event) => setProjectName(event.target.value);

  const handleMesage = (event) => setMessage(event.target.value);

  const handleCompanyCodeChange = (event) => setCompanyCode(event.target.value);

  const handleRegisteredAddressChange = (event) => setRegisteredAddress(event.target.value);

  const handlePincode = (event) => setPincode(event.target.value);

  const handlePhone = (event) => setPhone(event.target.value.replace(/[^0-9]/g, ""));

  const handleProjectManager = (event) => setManagerName(event.target.value);

  const handleLocation = (event) => setLocation(event.target.value);

  const handleGstin = (event) => setGstinNumber(event.target.value);

  const handleRemarks = (event) => setRemarks(event.target.value);

  const handleCityChange = (event) => {
    const selectedCityName = event.target.value;
    setSelectedCity(selectedCityName);
    const selectedCityObject = cities.find(city => city.CityName === selectedCityName);
    if (selectedCityObject) setSelectedCityId(selectedCityObject.CityID);
  };

  const handlePropertyTaxChange = (event) => setPropertyTax(event.target.value);

  const handleUom = (event) => setUom(event.target.value);

  const handleReraNumber = (event) => setRera(event.target.value);

  const handleBroucherLinkChange = (event) => setBroucher(event.target.value);

  const handleStateChange = (event) => {
    const selectedStateName = event.target.value;
    setSelectedState(selectedStateName);
    const selectedStateObject = states.find(state => state.StateName === selectedStateName);
    if (selectedStateObject) setSelectedStateId(selectedStateObject.StateID);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!selectedCompany) newErrors.companyName = "Company Name is required";
    if (!projectName) newErrors.projectName = "Project Name is required";
    if (!companyCode) newErrors.companyCode = "Project Code is required";
    if (!registeredAddress) newErrors.registeredAddress = "Project Address is required";
    if (!selectedDate) newErrors.date = "Date is required";
    if (!pincode) newErrors.pincode = "Pincode is required";
    if (!selectedCity) newErrors.city = "City is required";
    if (!selectedState) newErrors.state = "State is required";
    return newErrors;
  };

  const handleChangeProjectType = (event) => setSelectedProjectType(event.target.value);

  const handleUnit = (event) => setUnit(event.target.value);

  const handleSubmitData = (event) => {
    event.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const body = {
        projectname: projectName,
        CompanyID: selectedCompany,
        city: selectedCityId,
        state: selectedStateId,
        country: 1,
        contactdetails: phone,
        projectmanager: managerName,
        projecttypeid: selectedProjectType,
        plotareainsqft: plotArea,
        brochurelink: broucherLink,
        ctsno: ctsNo,
        propertytaxnumber: propertyTax,
        reraregistrationnumber: reraRegistration,
        reraregistrationdate: selectedDateRera,
        UOM: uom,
        projectcode: companyCode,
        ContactNo: phone,
        gstinno: gstinNumber,
        pincode: pincode,
        projectaddress: registeredAddress,
        location: location,
        welcomemessage: message,
        remarks: remarks,
        projectstartdate: selectedDate
      };
      axios.post("https://ideacafe-backend.vercel.app/api/proxy/api-insert-projectmaster.php", body)
        .then(response => {
          if (response.data.status === "Success") {
            setSubmitSuccess(true);
            setSubmitError(false);
          } else {
            setSubmitSuccess(false);
            setSubmitError(true);
          }
        })
        .catch(error => {
          console.error("Error submitting data:", error);
          setSubmitSuccess(false);
          setSubmitError(true);
        });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <Card>
      <CardContent>
        <Box>
          <Typography variant="h5" align="center">Create Project</Typography>
        </Box>
        <Box>
          <form onSubmit={handleSubmitData}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Company Name</InputLabel>
                  <Select value={selectedCompany} onChange={handleChange}>
                    {rows.map((company) => (
                      <MenuItem key={company.CompanyID} value={company.CompanyID}>
                        {company.CompanyName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.companyName && <Alert severity="error">{errors.companyName}</Alert>}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Project Name" value={projectName} onChange={handleCompanyNameChange} />
                {errors.projectName && <Alert severity="error">{errors.projectName}</Alert>}
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Project Code" value={companyCode} onChange={handleCompanyCodeChange} />
                {errors.companyCode && <Alert severity="error">{errors.companyCode}</Alert>}
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Project Type</InputLabel>
                  <Select value={selectedProjectType} onChange={handleChangeProjectType}>
                    {projectTypes.map((projectType) => (
                      <MenuItem key={projectType.ProjectTypeID} value={projectType.ProjectTypeID}>
                        {projectType.ProjectTypeName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  customInput={<TextField fullWidth label="Project Start Date" />}
                />
                {errors.date && <Alert severity="error">{errors.date}</Alert>}
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Project Manager" value={managerName} onChange={handleProjectManager} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Contact Details" value={phone} onChange={handlePhone} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="GSTIN Number" value={gstinNumber} onChange={handleGstin} />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Country</InputLabel>
                  <Select value={1}>
                    <MenuItem value={1}>India</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select value={selectedState} onChange={handleStateChange}>
                    {states.map((state) => (
                      <MenuItem key={state.StateID} value={state.StateName}>
                        {state.StateName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.state && <Alert severity="error">{errors.state}</Alert>}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Project Address" value={registeredAddress} onChange={handleRegisteredAddressChange} />
                {errors.registeredAddress && <Alert severity="error">{errors.registeredAddress}</Alert>}
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Location" value={location} onChange={handleLocation} />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select value={selectedCity} onChange={handleCityChange}>
                    {cities.map((city) => (
                      <MenuItem key={city.CityID} value={city.CityName}>
                        {city.CityName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.city && <Alert severity="error">{errors.city}</Alert>}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Pincode" value={pincode} onChange={handlePincode} />
                {errors.pincode && <Alert severity="error">{errors.pincode}</Alert>}
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Remarks" value={remarks} onChange={handleRemarks} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Unit of Measurement" value={uom} onChange={handleUom} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Plot Area in Sqft" value={plotArea} onChange={handleChangePlot} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="CTS Number" value={ctsNo} onChange={handleCtsNumber} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Property Tax Number" value={propertyTax} onChange={handlePropertyTaxChange} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="RERA Registration Number" value={reraRegistration} onChange={handleReraNumber} />
              </Grid>
              <Grid item xs={12} md={4}>
                <DatePicker
                  selected={selectedDateRera}
                  onChange={handleDateChangeRera}
                  dateFormat="yyyy-MM-dd"
                  customInput={<TextField fullWidth label="RERA Registration Date" />}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Brochure Link" value={broucherLink} onChange={handleBroucherLinkChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Welcome Message" value={message} onChange={handleMesage} />
              </Grid>
            </Grid>
            <Box mt={3} textAlign="center">
              <Button variant="contained" color="primary" type="submit">Submit</Button>
            </Box>
          </form>
        </Box>
        {submitSuccess && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Project Created Successfully.
          </Alert>
        )}
        {submitError && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Error Creating Project. Please try again.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectManage;
