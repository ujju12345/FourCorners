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
  Card,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";

const ProjectManage = ({ show, editData }) => {
  console.log(editData, "lo bhai ");
  const [formData, setFormData] = useState({
    projectstartdate: null,
    completiondate: null,
    possessiondate: null,
    ProjectName: "",
    ProjectCode: "",
    PlotAreaInSqft: "",
    ReraRegistrationNumber: "",
    approvedby: "",
    specification: "",
    WelcomeMessage: "",
    ProjectTypeID: "",
    amenitiesIDs: [],
    video: "",
    virtualvideo: "",
    keyword: "",
    ProjectAddress: "",
    cityID: "",
    Location: "",
    landmark: "",
    Pincode: "",
    assignebyID: "",
    ProjectManager: "",
  });

  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [projectTypes, setProjectTypes] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [userMaster, setUserMaster] = useState([]);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    if (editData) {
      const {
        ProjectID,
        projectstartdate,
        completiondate,
        possessiondate,
        ProjectName,
        ProjectCode,
        PlotAreaInSqft,
        ReraRegistrationNumber,
        approvedby,
        specification,
        WelcomeMessage,
        ProjectTypeID,
        amenitiesIDs,
        video,
        virtualvideo,
        keyword,
        ProjectAddress,
        cityID,
        Location,
        landmark,
        Pincode,
        assignebyID,
        ProjectManager,
        ModifyUID,
      } = editData;

      setFormData({
        ProjectID: ProjectID || "",
        projectstartdate: projectstartdate ? new Date(projectstartdate) : null,
        completiondate: completiondate ? new Date(completiondate) : null,
        possessiondate: possessiondate ? new Date(possessiondate) : null,
        ProjectName: ProjectName || "",
        ProjectCode: ProjectCode || "",
        PlotAreaInSqft: PlotAreaInSqft || "",
        ReraRegistrationNumber: ReraRegistrationNumber || "",
        approvedby: approvedby || "",
        specification: specification || "",
        WelcomeMessage: WelcomeMessage || "",
        ProjectTypeID: ProjectTypeID || "",
        amenitiesIDs: Array.isArray(amenitiesIDs) ? amenitiesIDs : [amenitiesIDs],
        video: video || "",
        virtualvideo: virtualvideo || "",
        keyword: keyword || "",
        ProjectAddress: ProjectAddress || "",
        cityID: cityID || "",
        Location: Location || "",
        landmark: landmark || "",
        Pincode: Pincode || "",
        assignebyID: assignebyID || "",
        ProjectManager: ProjectManager || "",
        ModifyUID: 1 || "",
      });
    }
  }, [editData]);

  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-usermaster.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setUserMaster(response.data.data);
          setLoading(false); // Set loading to false when data is fetched
        }
      })
      .catch((error) => {
        console.error("Error fetching user master data:", error);
        setLoading(false); // Also set loading to false on error
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-transactiontype.php"
      )
      .then((response) => {
        if (response.data.status === "Success") {
          setProjectTypes(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-amenities.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setAmenities(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-citymaster.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setCities(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-statemaster.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setStates(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
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

  const handleTelecaller = (event) => {
    const { value } = event.target;

    setFormData({
      ...formData,
      assignebyID: event.target.value,
    });
  };


  const handleAmenitiesChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      amenitiesIDs: Array.isArray(value) ? value : [value],
    });
  };
  
  
  // const validateFields = () => {
  //   const newErrors = {};
  //   if (!formData.selectedCompany)
  //     newErrors.selectedCompany = "Company Name is required";
  //   if (!formData.ProjectName)
  //     newErrors.ProjectName = "Project Name is required";
  //   if (!formData.ProjectCode)
  //     newErrors.ProjectCode = "Project Code is required";
  //   if (!formData.ProjectAddress)
  //     newErrors.ProjectAddress = "Project Address is required";
  //   // if (!formData.projectstartdate) newErrors.projectstartdate = "Date is required";
  //   if (!formData.Pincode) newErrors.Pincode = "Pincode is required";
  //   if (!formData.cityID) newErrors.cityID = "City is required";
  //   if (!formData.StateID) newErrors.StateID = "State is required";
  //   return newErrors;
  // };

  const handleSubmitData = (event) => {
    console.log("press");
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
    console.log(body, "data ayaa project ke");

    axios
      .post(url, body)

      .then((response) => {
        if (response.data.status === "Success") {
          console.log(';xsees');
          setFormData(""); // Reset form data after successful submission
          setErrors({});
          setSubmitSuccess(true);
          setSubmitError(false);
          show(false); // Hide the modal or close form

          // Swal.fire({
          //   icon: "success",
          //   title: editData
          //     ? "Data Updated Successfully"
          //     : "Data Added Successfully",
          //   showConfirmButton: false,
          //   timer: 1000,
          // }).then(() => {
          //   window.location.reload();
          // });
        } else {
          setSubmitSuccess(false);
          setSubmitError(true);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      })
      .catch((error) => {
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
            {editData ? "Edit Project Master" : "Add Project Master "}
          </Typography>
        </Box>
        <Box>
          <form style={{ marginTop: "30px" }} onSubmit={handleSubmitData}>
            <Grid container spacing={7}>
              <Grid item xs={8} sm={4}>
                <DatePicker
                  selected={formData.projectstartdate}
                  onChange={(date) =>
                    handleDateChange(date, "projectstartdate")
                  }
                  dateFormat="dd-MM-yyyy"
                  className="form-control"
                  customInput={
                    <TextField
                      fullWidth
                      label="Launch date"
                      value={
                        formData.projectstartdate
                          ? formData.projectstartdate.toLocaleDateString()
                          : ""
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
                <DatePicker
                  selected={formData.completiondate}
                  onChange={(date) => handleDateChange(date, "completiondate")}
                  dateFormat="dd-MM-yyyy"
                  className="form-control"
                  customInput={
                    <TextField
                      fullWidth
                      label="Completion date"
                      value={
                        formData.completiondate
                          ? formData.completiondate.toLocaleDateString()
                          : ""
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
                <DatePicker
                  selected={formData.possessiondate}
                  onChange={(date) => handleDateChange(date, "possessiondate")}
                  dateFormat="dd-MM-yyyy"
                  className="form-control"
                  customInput={
                    <TextField
                      fullWidth
                      label="Possession date"
                      value={
                        formData.possessiondate
                          ? formData.possessiondate.toLocaleDateString()
                          : ""
                      }
                      InputProps={{
                        readOnly: true,
                        sx: { width: "100%" },
                      }}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Project Name"
                  name="ProjectName"
                  value={formData.ProjectName}
                  onChange={handleInputChange}
                />
                {errors.ProjectName && (
                  <Alert severity="error">{errors.ProjectName}</Alert>
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Project Code"
                  name="ProjectCode"
                  value={formData.ProjectCode}
                  onChange={handleInputChange}
                />
                {errors.ProjectCode && (
                  <Alert severity="error">{errors.ProjectCode}</Alert>
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="project Manager"
                  name="ProjectManager"
                  value={formData.ProjectManager}
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
                  label="Project Area"
                  name="PlotAreaInSqft"
                  value={formData.PlotAreaInSqft}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Transcation Type</InputLabel>
                  <Select
                    name="ProjectTypeID"
                    label="Transcation Type"
                    value={formData.ProjectTypeID}
                    onChange={handleInputChange}
                  >
                    {projectTypes.map((projectType) => (
                      <MenuItem
                        key={projectType.transactionID}
                        value={projectType.transactionID}
                      >
                        {projectType.transactionName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Approved By"
                  name="approvedby"
                  value={formData.approvedby}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Specification"
                  name="specification"
                  value={formData.specification}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={8} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Amenities</InputLabel>
                  <Select
  name="amenitiesIDs"
  label="Amenities"
  multiple
  value={formData.amenitiesIDs}
  onChange={handleAmenitiesChange}
>

                    {amenities.map((amenity) => (
                      <MenuItem
                        key={amenity.amenitiesIDs}
                        value={amenity.amenitiesIDs}
                      >
                        {amenity.amenitiesName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Video Link"
                  name="video"
                  value={formData.video}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Virtual Video Link"
                  name="virtualvideo"
                  value={formData.virtualvideo}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Website Keyword"
                  name="keyword"
                  value={formData.keyword}
                  onChange={handleInputChange}
                />
                {errors.Pincode && (
                  <Alert severity="error">{errors.Pincode}</Alert>
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Project Address"
                  name="ProjectAddress"
                  value={formData.ProjectAddress}
                  onChange={handleInputChange}
                />
                {errors.ProjectAddress && (
                  <Alert severity="error">{errors.ProjectAddress}</Alert>
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Pincode"
                  name="Pincode"
                  value={formData.Pincode}
                  onChange={handleInputChange}
                />
                {errors.Pincode && (
                  <Alert severity="error">{errors.Pincode}</Alert>
                )}
              </Grid>

              <Grid item xs={8} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Assigned By</InputLabel>
                  <Select
                    value={formData.assignebyID}
                    onChange={handleTelecaller}
                    label="Assign By"
                    // error={!!errors.UserID}
                    // helperText={errors.UserID}
                  >
                    {userMaster.map((bhk) => (
                      <MenuItem key={bhk.UserID} value={bhk.UserID}>
                        {bhk.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Locality"
                  name="Location"
                  value={formData.Location}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>City</InputLabel>
                  <Select
                    name="cityID"
                    label="City"
                    value={formData.cityID}
                    onChange={handleInputChange}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city.CityID} value={city.CityID}>
                        {city.CityName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.cityID && (
                    <Alert severity="error">{errors.cityID}</Alert>
                  )}
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} md={4}>
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
                  {errors.StateID && (
                    <Alert severity="error">{errors.StateID}</Alert>
                  )}
                </FormControl>
              </Grid> */}
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

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Remarks"
                  name="WelcomeMessage"
                  value={formData.WelcomeMessage}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {editData ? "Update Project" : "Create Project"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                {submitSuccess && (
                  <Alert severity="success">
                    Project submitted successfully!
                  </Alert>
                )}
                {submitError && (
                  <Alert severity="error">
                    Error submitting project. Please try again.
                  </Alert>
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectManage;
