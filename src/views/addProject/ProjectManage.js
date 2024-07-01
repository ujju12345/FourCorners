import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Alert,
  Select,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  CardContent,
  FormControl,
  Button,
  Card
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";

const ProjectManage = ({ show, editData }) => {
  console.log(editData , 'lo bhai ');
  const [formData, setFormData] = useState({
    ProjectName: "",
    CompanyID: "",
    ProjectCode: "",
    WelcomeMessage: "",
    ProjectTypeID: "",
    ProjectAddress: "",
    Pincode: "",
    ContactDetails: "",
    PlotAreaInSqft: "",
    CtsNo: "",
    UnitOfMeasurement: "",
    PropertyTaxNumber: "",
    ReraRegistrationNumber: "",
    ReraRegistrationDate: null,
    BrochureLink: "",
    ProjectManager: "",
    Location: "",
    GstInNo: "",
    Remarks: "",
    projectstartdate: null,
    cityID: "",
    StateID: "",

  });


  

  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    fetchData();
    if (editData) {

      const { ProjectID ,  ProjectName, CompanyID, ProjectCode, WelcomeMessage, ProjectTypeID, ProjectAddress, Pincode , ContactDetails , PlotAreaInSqft , CtsNo , UnitOfMeasurement , PropertyTaxNumber  , ReraRegistrationNumber , BrochureLink ,ProjectManager , Location , GstInNo , Remarks , projectstartdate , ReraRegistrationDate , cityID , StateID , ModifyUID} = editData;

      setFormData({
        ProjectID:ProjectID || "",
        ProjectName:ProjectName || "",
        CompanyID: CompanyID || "",
        ProjectCode: ProjectCode || "",
        WelcomeMessage: WelcomeMessage || "",
        ProjectTypeID: ProjectTypeID || "",
        ProjectAddress: ProjectAddress || "",
        Pincode: Pincode || "",
        ContactDetails: ContactDetails || "",
        PlotAreaInSqft: PlotAreaInSqft || "",
        CtsNo: CtsNo || "",
        UnitOfMeasurement: UnitOfMeasurement || "",
        PropertyTaxNumber: PropertyTaxNumber || "",
        ReraRegistrationNumber: ReraRegistrationNumber || "",
        BrochureLink: BrochureLink || "",
        ProjectManager: ProjectManager || "",
        Location: Location || "",
        GstInNo: GstInNo || "",
        Remarks: Remarks || "",
        projectstartdate: new Date(projectstartdate) || "",
        ReraRegistrationDate: new Date(ReraRegistrationDate) || "",
        cityID: cityID || "",
        StateID: StateID || "",
        ModifyUID:1
      });
    }
  }, [editData]);


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

  

  const fetchProjectData = async (editData) => {
    try {
      const response = await axios.get("https://apiforcorners.cubisysit.com/api/api-fetch-projectmaster.php");
      if (response.data.status === "Success") {
        const project = response.data.data[0];
        setFormData({
          ProjectName: project.ProjectName,
          CompanyID: project.CompanyID,
          ProjectCode: project.ProjectCode,
          WelcomeMessage: project.WelcomeMessage,
          ProjectTypeID: project.ProjectTypeID,
          ProjectAddress: project.ProjectAddress,
          Pincode: project.Pincode,
          ContactDetails: project.ContactDetails,
          PlotAreaInSqft: project.PlotAreaInSqft,
          CtsNo: project.CtsNo,
          UnitOfMeasurement: project.UnitOfMeasurement,
          PropertyTaxNumber: project.PropertyTaxNumber,
          ReraRegistrationNumber: project.ReraRegistrationNumber,

          BrochureLink: project.BrochureLink,
          ProjectManager: project.ProjectManager,
          Location: project.Location,
          GstInNo: project.GstInNo,
          Remarks: project.Remarks,
          projectstartdate: new Date(project.projectstartdate),
          ReraRegistrationDate: new Date(project.ReraRegistrationDate),
          cityID: project.cityID,
          StateID: project.StateID,
        });
        setIsEditMode(true);
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date, name) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };
  
  
  const validateFields = () => {
    const newErrors = {};
    if (!formData.selectedCompany) newErrors.selectedCompany = "Company Name is required";
    if (!formData.ProjectName) newErrors.ProjectName = "Project Name is required";
    if (!formData.ProjectCode) newErrors.ProjectCode = "Project Code is required";
    if (!formData.ProjectAddress) newErrors.ProjectAddress = "Project Address is required";
    // if (!formData.projectstartdate) newErrors.projectstartdate = "Date is required";
    if (!formData.Pincode) newErrors.Pincode = "Pincode is required";
    if (!formData.cityID) newErrors.cityID = "City is required";
    if (!formData.StateID) newErrors.StateID = "State is required";
    return newErrors;
  };

  const handleSubmitData = (event) => {
    console.log('press');
    event.preventDefault();
    // const newErrors = validateFields();
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    // } else {
      // setErrors({});
      const body = {
        ...formData,
        CountryID: 1,
        Status: 1,
        CreateUID: 1,
      };

    

      const url = editData
        ? "https://ideacafe-backend.vercel.app/api/proxy/api-update-projectmaster.php"
        : "https://ideacafe-backend.vercel.app/api/proxy/api-insert-projectmaster.php";
        console.log(body , 'data ayaa');

      axios.post(url, body)

        .then(response => {
          if (response.data.status === "Success") {
            setFormData(""); // Reset form data after successful submission
        setErrors({});
        setSubmitSuccess(true);
        setSubmitError(false);
        show(false); // Hide the modal or close form
  
        Swal.fire({
          icon: "success",
          title: editData ? "Data Updated Successfully" : "Data Added Successfully",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          window.location.reload();
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
        })
        .catch(error => {
          console.error("Error submitting data:", error);
          setSubmitSuccess(false);
          setSubmitError(true);
        });
    // }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <Card>
      <CardContent>
      <Box>
            <Typography
              variant="body2"
              sx={{ marginTop: 5, fontWeight: "bold", fontSize: 20 }}
            >
              {editData
                ? "Edit Project Master"
                : "Add Project Master "}
            </Typography>

            
        
          </Box>
        <Box>
          <form onSubmit={handleSubmitData}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Company Name</InputLabel>
                  <Select
                    name="CompanyID"
                    value={formData.CompanyID}
                    onChange={handleInputChange}
                  >
                    {rows.map((company) => (
                      <MenuItem key={company.CompanyID} value={company.CompanyID}>
                        {company.CompanyName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.CompanyID && <Alert severity="error">{errors.CompanyID}</Alert>}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Project Name"
                  name="ProjectName"
                  value={formData.ProjectName}
                  onChange={handleInputChange}
                />
                {errors.ProjectName && <Alert severity="error">{errors.ProjectName}</Alert>}
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Project Code"
                  name="ProjectCode"
                  value={formData.ProjectCode}
                  onChange={handleInputChange}
                />
                {errors.ProjectCode && <Alert severity="error">{errors.ProjectCode}</Alert>}
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Project Type</InputLabel>
                  <Select
                    name="ProjectTypeID"
                    value={formData.ProjectTypeID}
                    onChange={handleInputChange}
                  >
                    {projectTypes.map((projectType) => (
                      <MenuItem key={projectType.ProjectTypeID} value={projectType.ProjectTypeID}>
                        {projectType.ProjectTypeName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Registered Address"
                  name="ProjectAddress"
                  value={formData.ProjectAddress}
                  onChange={handleInputChange}
                />
                {errors.ProjectAddress && <Alert severity="error">{errors.ProjectAddress}</Alert>}
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Pincode"
                  name="Pincode"
                  value={formData.Pincode}
                  onChange={handleInputChange}
                />
                {errors.Pincode && <Alert severity="error">{errors.Pincode}</Alert>}
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="ContactDetails"
                  value={formData.ContactDetails}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Plot Area"
                  name="PlotAreaInSqft"
                  value={formData.PlotAreaInSqft}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="CTS No"
                  name="CtsNo"
                  value={formData.CtsNo}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Unit"
                  name="UnitOfMeasurement"
                  value={formData.UnitOfMeasurement}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Property Tax"
                  name="PropertyTaxNumber"
                  value={formData.PropertyTaxNumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="RERA Registration Number"
                  name="ReraRegistrationNumber"
                  value={formData.ReraRegistrationNumber}
                  onChange={handleInputChange}
                />
              </Grid>
             
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Brochure Link"
                  name="BrochureLink"
                  value={formData.BrochureLink}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Manager Name"
                  name="ProjectManager"
                  value={formData.ProjectManager}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Location"
                  name="Location"
                  value={formData.Location}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="GSTIN Number"
                  name="GstInNo"
                  value={formData.GstInNo}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Remarks"
                  name="Remarks"
                  value={formData.Remarks}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select
                    name="cityID"
                    value={formData.cityID}
                    onChange={handleInputChange}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.CityID} value={city.CityID}>
                        {city.CityName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.cityID && <Alert severity="error">{errors.cityID}</Alert>}
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select
                    name="StateID"
                    value={formData.StateID}
                    onChange={handleInputChange}
                  >
                    {states.map((state) => (
                      <MenuItem key={state.StateID} value={state.StateID}>
                        {state.StateName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.StateID && <Alert severity="error">{errors.StateID}</Alert>}
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} md={4}>
              <DatePicker
  selected={formData.projectstartdate}
  onChange={(date) => handleDateChange(date, 'selectedDate')}
  placeholderText="Select Start Date"
  dateFormat="yyyy-MM-dd"
  className="form-control"
/>

                {errors.projectstartdate && <Alert severity="error">{errors.projectstartdate}</Alert>}
              </Grid> */}



<Grid item xs={8} sm={4}>
<DatePicker
  selected={formData.projectstartdate}
  onChange={(date) => handleDateChange(date, 'projectstartdate')}
  dateFormat="dd-MM-yyyy"
  className="form-control"
  customInput={
    <TextField
      fullWidth
      label="Project start date"
      value={formData.projectstartdate ? formData.projectstartdate.toLocaleDateString() : ''}
      InputProps={{
        readOnly: true,
        sx: { width: "100%" },
      }}
    />
  }
/>

              </Grid>


{/* 
              <Grid item xs={12} md={4}>
              <DatePicker
  selected={formData.selectedDateRera}
  onChange={(date) => handleDateChange(date, 'selectedDateRera')}
  placeholderText="Select RERA Registration Date"
  dateFormat="yyyy-MM-dd"
  className="form-control"
/>

              </Grid> */}

<Grid item xs={8} sm={4}>
  <DatePicker
    selected={formData.ReraRegistrationDate}
    onChange={(date) => handleDateChange(date, 'ReraRegistrationDate')}
    dateFormat="dd-MM-yyyy"
    className="form-control"
    customInput={
      <TextField
        fullWidth
        label="Rera Registration Date"
        value={formData.ReraRegistrationDate ? formData.ReraRegistrationDate.toLocaleDateString() : ''}
        InputProps={{
          readOnly: true,
          sx: { width: "100%" },
        }}
      />
    }
  />
</Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Welcome Message"
                  name="WelcomeMessage"
                  value={formData.WelcomeMessage}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  {editData ? 'Update Project' : 'Create Project'}
                </Button>
              </Grid>
              <Grid item xs={12}>
                {submitSuccess && <Alert severity="success">Project submitted successfully!</Alert>}
                {submitError && <Alert severity="error">Error submitting project. Please try again.</Alert>}
              </Grid>
            </Grid>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectManage;
