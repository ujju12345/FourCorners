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
  Autocomplete,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useCookies } from "react-cookie";

const AddProjectDetails = ({ show, editData }) => {
  console.log(editData, "Edit data aaya");
  const [cookies, setCookie, removeCookie] = useCookies(["amr"]);
  const initialFormData = {
    reraregistration: "",
    CompanyID: "",
    ProjectID: "",
    address: "",
    WingName: "",
    Status: 1,
    CreateUID: cookies.amr?.UserID || 1,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [companyTypeData, setCompanyTypeData] = useState([]);
  const [projectTypeData, setProjectTypeData] = useState([]);
  const [wingsData, setWingsdata] = useState([]);

  const [errors, setErrors] = useState({});
  const [tellecallingID, setTellecallingID] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const RequiredIndicator = () => {
    return <span style={{ color: "red", marginLeft: "5px" }}>*</span>;
  };

  useEffect(() => {
    fetchCompany();
    fetchProject();
  }, []);

  const fetchCompany = () => {
    axios
      .get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-companymaster.php"
      )
      .then((response) => {
        console.warn("response of campaign type---->", response);
        if (response.data.status === "Success") {
          setCompanyTypeData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchProject = () => {
    axios
      .get(
        "https://apiforcorners.cubisysit.com/api/api-dropdown-projectinfo.php"
      )
      .then((response) => {
        console.warn("response of project type---->", response);
        if (response.data.status === "Success") {
          setProjectTypeData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchWings = (e) => {
    axios
      .get(
        ` https://apiforcorners.cubisysit.com/api/api-fetch-projectwings.php?ProjectID=${e}`
      )
      .then((response) => {
        console.warn("response of customers type---->", response);
        if (response.data.status === "Success") {
          setWingsdata(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleProjectChange = (e) => {
    const selectedProjectID = e.target.value;
    const selectedProject = projectTypeData.find(
      (project) => project.ProjectID === selectedProjectID
    );

    setFormData({
      ...formData,
      ProjectID: selectedProjectID,
      reraregistration: selectedProject ? selectedProject.reraregistration : "",
      address: selectedProject ? selectedProject.address : "",
    });

    fetchWings(selectedProjectID);
  };


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
      : "https://apiforcorners.cubisysit.com/api/api-insert-projectinfo.php";

    console.log(formData, "ALL the data of projectdetails");
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response, "ye res h ");
      if (response.data.status === "Success") {
        setFormData(initialFormData);

        setSubmitSuccess(true);
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
          title: "Oops...",
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
        text: "Something went wrong!",
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

  return (
    <>
      <Card sx={{ height: "auto" }}>
        <CardContent>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box>
              <Typography
                variant="body2"
                sx={{ marginTop: 5, fontWeight: "bold", fontSize: 20 }}
              >
                {editData ? "Edit Project Details" : "Add Project Details"}
              </Typography>
            </Box>
          </Grid>
          <form style={{ marginTop: "50px" }}>
            <Grid container spacing={7}>
              <Grid item xs={8} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>
                    Select Company
                    <RequiredIndicator />
                  </InputLabel>
                  <Select
                    value={formData.CompanyID}
                    name="campanyID"
                    onChange={(e) => {
                      console.log("hiiii");
                      setFormData({
                        ...formData,
                        CompanyID: e.target.value,
                      });
                    }}
                    label={<>Select Company</>}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {companyTypeData.map((project) => (
                      <MenuItem
                        key={project.CompanyID}
                        value={project.CompanyID}
                      >
                        {project.CompanyName}
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
                    Select Project
                    <RequiredIndicator />
                  </InputLabel>
                  <Select
                    value={formData.ProjectID}
                    name="ProjectID"
                    onChange={(e) => {
                      handleProjectChange(e);
                    }}
                    label={<>Select Project</>}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {projectTypeData.map((project) => (
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
                <TextField
                  fullWidth
                  label={<>RERA Registeration</>}
                  type="text"
                  name="RERA Registeration"
                  value={formData.reraregistration}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      reraregistration: event.target.value,
                    })
                  }
                  inputProps={{
                    pattern: "[0-9]*",
                  }}
                />
                {errors.Name && (
                  <Typography variant="caption" color="error">
                    {errors.Name}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Address</>}
                  type="text"
                  name="Address"
                  value={formData.address}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      address: event.target.value,
                    })
                  }
                  inputProps={{
                    pattern: "[0-9]*",
                  }}
                />
                {errors.Name && (
                  <Typography variant="caption" color="error">
                    {errors.Name}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={8} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Wings</InputLabel>
                  <Select
                    value={formData.WingName}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        WingName: event.target.value,
                      });
                    }}
                    label={
                      <>
                        Wings <RequiredIndicator />
                      </>
                    }
                  >
                    {wingsData.map((key) => (
                      <MenuItem key={key.WingID} value={key.WingName}>
                        {key?.WingName}
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

export default AddProjectDetails;
