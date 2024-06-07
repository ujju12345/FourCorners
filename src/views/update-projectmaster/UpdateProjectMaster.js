import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UpdateProjectMaster = ({ show, rowData }) => {
  const [projectData, setProjectData] = useState(null);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    projectCode: "",
    projectStartDate: "",
    projectManager: "",
    contactDetails: "",
    gstInNo: "",
    location: "",
    selectedCity: "",
    selectedState: "",
    country: "India",
    pincode: "",
    projectAddress: "",
    remarks: "",
    companyName: "",
    plotArea: "",
    broucherLink: "",
    ctsNo: "",
    propertyTax: "",
    reraRegistration: "",
    uom: "",
    projectType: "",
    unit: "",
    message: "",
    selectedDate: null,
    selectedDateRera: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-companymaster.php"
      );
      console.log("API Response:", response.data);
      setRows(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    axios
      .get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-projecttypemaster.php"
      )
      .then((response) => {
        if (response.data.status === "Success") {
          console.log(
            response.data.data,
            "DATAA AAGAYAAAAAAAAAA PROJET TYPEEEE"
          );
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
          setCities(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
      });

    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-statemaster.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setStates(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching states:", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectId = rowData?.ProjectID;
        const apiUrl = `https://apiforcorners.cubisysit.com/api/api-singel-projectmaster.php?ProjectID=${projectId}`;

        const response = await axios.get(apiUrl);
        if (response.data.status === "Success") {
          const project = response.data.data[0];
          setProjectData(project);
          setFormData({
            projectName: project.ProjectName,
            projectCode: project.ProjectCode,
            projectStartDate: new Date(project.projectstartdate)
              .toISOString()
              .split("T")[0],
            projectManager: project.ProjectManager,
            contactDetails: project.ContactDetails,
            gstInNo: formData.gstInNo,
            location: project.Location,
            selectedCity: project.cityID,
            selectedState: project.StateID,
            pincode: project.Pincode,
            projectAddress: project.ProjectAddress,
            remarks: project.Remarks,
            companyName: project.CompanyName,
            plotArea: project.PlotAreaInSqft,
            broucherLink: project.BrochureLink,
            ctsNo: project.CtsNo,
            propertyTax: project.PropertyTaxNumber,
            reraRegistration: project.ReraRegistrationNumber,
            // uom: project.UOM,
            projectType: project.ProjectType,
            unitofmeasurement: project.unit,
            message: project.WelcomeMessage,
            selectedDate: project.projectstartdate
              ? new Date(project.projectstartdate)
              : null,
            selectedDateRera: project.ReraRegistrationDate
              ? new Date(project.ReraRegistrationDate)
              : null,
          });
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
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

    const selectedCityObject = cities.find(
      (city) => city.CityName === selectedCityName
    );
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

    const selectedStateObject = states.find(
      (state) => state.StateName === selectedStateName
    );
    if (selectedStateObject) {
      setSelectedStateId(selectedStateObject.StateID);
    }
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      selectedDate: date,
    });
  };

  const handleDateChangeRera = (date) => {
    setFormData({
      ...formData,
      selectedDateRera: date,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const newErrors = validateFields();
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    // } else {
    //   setErrors({});

    const submitData = {
      createuid: 1,
      projecttypeid: formData.projectType,
      ProjectID: 2,
      projectname: formData.projectName,
      projectcode: formData.projectCode,
      ProjectStartDate: formData.projectStartDate,
      projectmanager: formData.projectManager,
      ContactNo: formData.contactDetails,
      gstinno: formData.gstInNo,
      location: formData.location,
      city: selectedCityId,
      state: selectedStateId,
      country: 1,
      pincode: formData.pincode,
      projectaddress: formData.projectAddress,
      remarks: formData.remarks,
      CompanyID: formData.companyName,
      plotareainsqft: formData.plotArea,
      ctsno: formData.ctsNo,
      propertytaxnumber: formData.propertyTax,
      reraregistrationnumber: formData.reraRegistration,
      unitofmeasurement: "sdf",
      ProjectType: formData.projectType,
      // Unit: formData.unit,
      brochurelink: formData.broucherLink,
      welcomemessage: formData.message,

      ...(formData.selectedDate && {
        projectstartdate: formData.selectedDate.toISOString().split("T")[0],
      }),
      ...(formData.selectedDateRera && {
        reraregistrationdate: formData.selectedDateRera
          .toISOString()
          .split("T")[0],
      }),
      status: 1,
    };

    console.log(submitData, "AAGAAAYAAAAAA");

    axios
      .post(
        "https://ideacafe-backend.vercel.app/api/proxy/api-update-projectmaster.php",
        JSON.stringify(submitData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.status === "Success") {
          setSubmitSuccess(true);
          setSubmitError(false);
          show(false);
          setFormData({
            projectName: "",
            projectCode: "",
            projectStartDate: "",
            projectManager: "",
            contactDetails: "",
            gstInNo: "",
            location: "",
            selectedCity: "",
            selectedState: "",
            country: "India",
            pincode: "",
            projectAddress: "",
            remarks: "",
            companyName: "",
            plotArea: "",
            broucherLink: "",
            ctsNo: "",
            propertyTax: "",
            reraRegistration: "",
            // uom: '',
            projectType: "",
            unit: "",
            message: "",
            selectedDate: null,
            selectedDateRera: null,
          });
        } else {
          setSubmitSuccess(false);
          setSubmitError(true);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setSubmitSuccess(false);
        setSubmitError(true);
      });
    // }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const submitData = {
  //     CreateUID: 1,
  //     ...(formData.projectName && { ProjectName: formData.projectName }),
  //     ...(formData.projectCode && { ProjectCode: formData.projectCode }),
  //     ...(formData.projectStartDate && { ProjectStartDate: formData.projectStartDate }),
  //     ...(formData.projectManager && { ProjectManager: formData.projectManager }),
  //     ...(formData.contactDetails && { ContactDetails: formData.contactDetails }),
  //     ...(formData.gstInNo && { GstInNo: formData.gstInNo }),
  //     ...(formData.location && { Location: formData.location }),
  //     ...(selectedCityId && { CityID: selectedCityId }),
  //     ...(selectedStateId && { StateID: selectedStateId }),
  //     CountryID: 1,
  //     ...(formData.pincode && { Pincode: formData.pincode }),
  //     ...(formData.projectAddress && { ProjectAddress: formData.projectAddress }),
  //     ...(formData.remarks && { Remarks: formData.remarks }),
  //     ...(formData.companyName && { CompanyName: formData.companyName }),
  //     ...(formData.plotArea && { PlotArea: formData.plotArea }),
  //     ...(formData.broucherLink && { BroucherLink: formData.broucherLink }),
  //     ...(formData.ctsNo && { CTSNo: formData.ctsNo }),
  //     ...(formData.propertyTax && { PropertyTax: formData.propertyTax }),
  //     ...(formData.reraRegistration && { ReraRegistration: formData.reraRegistration }),
  //     ...(formData.uom && { UOM: formData.uom }),
  //     ...(formData.projectType && { ProjectType: formData.projectType }),
  //     ...(formData.unit && { Unit: formData.unit }),

  //     ...(formData.message && { Message: formData.message }),
  //     ...(formData.selectedDate && { ProjectStartDate: formData.selectedDate.toISOString().split('T')[0] }),
  //     ...(formData.selectedDateRera && { ReraRegistrationDate: formData.selectedDateRera.toISOString().split('T')[0] }),
  //     Status: 1
  //   };

  //   axios.post('https://ideacafe-backend.vercel.app/api/proxy/api-update-projectmaster.php', JSON.stringify(submitData), {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => {
  //       if (response.data.status === 'Success') {
  //         setSubmitSuccess(true);
  //         setSubmitError(false);
  //         show(false);
  //         setFormData({
  //           projectName: '',
  //           projectCode: '',
  //           projectStartDate: '',
  //           projectManager: '',
  //           contactDetails: '',
  //           gstInNo: '',
  //           location: '',
  //           selectedCity: '',
  //           selectedState: '',
  //           country: 'India',
  //           pincode: '',
  //           projectAddress: '',
  //           remarks: '',
  //           companyName: '',
  //           plotArea: '',
  //           broucherLink: '',
  //           ctsNo: '',
  //           propertyTax: '',
  //           reraRegistration: '',
  //           uom: '',
  //           projectType: '',
  //           unit: '',
  //           message: '',
  //           selectedDate: null,
  //           selectedDateRera: null,
  //         });
  //       } else {
  //         setSubmitSuccess(false);
  //         setSubmitError(true);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('There was an error!', error);
  //       setSubmitSuccess(false);
  //       setSubmitError(true);
  //     });
  // };

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box>
              <Typography
                variant="body2"
                sx={{ marginTop: 5, fontWeight: "bold", fontSize: 20 }}
              >
                Update Project Details
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
                value={formData.companyName}
                onChange={handleInputChange}
                name="companyName"
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
                value={formData.selectedCity}
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
                value={formData.selectedState}
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
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={8} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Project Type</InputLabel>
              <Select
                value={formData.projectType}
                onChange={handleInputChange}
                name="projectType"
                label="Project Type"
              >
                {projectTypes.map((project) => (
                  <MenuItem
                    key={project.ProjectTypeID}
                    value={project.ProjectTypeID}
                  >
                    {project.ProjectTypeName || "Unnamed Project Type"}
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
              value={formData.unit} // Update this line
              onChange={handleInputChange}
              name="unit" // Update this line
              error={!!errors.unit}
              helperText={errors.unit}
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              label="Project Name"
              placeholder="Project Name"
              value={formData.projectName}
              onChange={handleInputChange}
              name="projectName"
              error={!!errors.projectName}
              helperText={errors.projectName}
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              label="Plot Area In Sqft"
              placeholder="Plot Area In Sqft"
              value={formData.plotArea} // Add this line
              onChange={handleInputChange}
              name="plotAreaInSqft" // Add this line
              error={!!errors.plotAreaInSqft}
              helperText={errors.plotAreaInSqft}
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="url"
              label="Broucher Link"
              placeholder="Broucher Link"
              value={formData.broucherLink}
              onChange={handleInputChange}
              name="broucherLink"
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="CTS No"
              placeholder="CTS No"
              value={formData.ctsNo}
              onChange={handleInputChange}
              name="ctsNo"
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="Property Tax No"
              placeholder="Property Tax No"
              value={formData.propertyTax}
              onChange={handleInputChange}
              name="propertyTax"
              error={!!errors.propertyTax}
              helperText={errors.propertyTax}
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="RERA Registration No"
              placeholder="RERA Registration No"
              value={formData.reraRegistration}
              onChange={handleInputChange}
              name="reraRegistration"
              error={!!errors.reraRegistration}
              helperText={errors.reraRegistration}
            />
          </Grid>

          {/* <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type='text'
              label='UOM'
              placeholder='UOM'
              value={formData.uom}
              onChange={handleInputChange}
              name="uom"
            />
          </Grid> */}

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              label="Project Code"
              placeholder="Project Code"
              value={formData.projectCode}
              onChange={handleInputChange}
              name="projectCode"
              error={!!errors.projectCode}
              helperText={errors.projectCode}
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="Project Manager"
              placeholder="Project Manager"
              value={formData.projectManager}
              onChange={handleInputChange}
              name="projectManager"
              required
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="tel"
              label="Contact Detail"
              placeholder="Contact Detail"
              value={formData.contactDetails}
              onChange={handleInputChange}
              name="contactDetails"
              inputProps={{ maxLength: 10 }}
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="GSTIN Number"
              placeholder="GSTIN Number"
              value={formData.gstInNo}
              onChange={handleInputChange}
              name="gstInNo"
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="tel"
              label="Pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              name="pincode"
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
              value={formData.projectAddress}
              onChange={handleInputChange}
              name="projectAddress"
              error={!!errors.projectAddress}
              helperText={errors.projectAddress}
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="Location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              name="location"
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="Welcome Message"
              placeholder="Welcome Message"
              value={formData.message}
              onChange={handleInputChange}
              name="message"
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="Remarks"
              placeholder="Remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              name="remarks"
            />
          </Grid>

          <Grid item xs={8} sm={4}>
            <DatePicker
              selected={formData.selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              customInput={
                <TextField
                  fullWidth
                  label="Start Date"
                  error={!!errors.startDate}
                  helperText={errors.startDate}
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
              selected={formData.selectedDateRera}
              onChange={handleDateChangeRera}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              customInput={
                <TextField
                  fullWidth
                  label="Rera Registration Date"
                  error={!!errors.reraRegistrationDate}
                  helperText={errors.reraRegistrationDate}
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
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default UpdateProjectMaster;
