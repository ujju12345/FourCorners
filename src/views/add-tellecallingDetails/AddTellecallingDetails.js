import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
import Card from "@mui/material/Card";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const AddTellecallingDetails = ({ show, editData }) => {
  console.log(editData , 'DATA AAYA EDIT ');
  const initialFormData = {
    titleprefixID: "",
    PartyName: "",
    Mobile: "",
    AlternateMobileNo: "",
    TelephoneNo: "",
    AlternateTelephoneNo: "",
    Email: "",
    ProjectID: "",
    EstimatedBudget: "",
    LeadStatus: "",
    Comments: "",
    Location: "",
    FollowupThrough: "",
    Source: "",
    SourceName: "",
    SourceDescription: "",
    TelecallAttendedBy: "",
    CreateUID: 1,
    telecallingID: "",
    UnittypeID: "",
    Countrycode: ""
  };

  const [formData, setFormData] = useState(initialFormData);
  const [titles, setTitles] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});

  const [projectTypes, setProjectTypes] = useState([]);
  const [source, setSource] = useState([]);

  const [tellecallingID, setTellecallingID] = useState([]);
  const [bhkOptions, setBhkOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    fetchData();
    fetchDataBhk();
    fetchDataTellecalling();
    fetchDataTitle();
  }, []);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);


  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-source.php")
      .then((response) => {
        if (response.data.status === "Success") {
          console.log(response.data.data, 'dataa aayaaaa');
          setSource(response.data.data);
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (
      ["Mobile", "AlternateMobileNo", "TelephoneNo", "AlternateTelephoneNo", "Countrycode"].includes(name)
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
  };

  const handleBhkChange = (event) => {
    setFormData({
      ...formData,
      UnittypeID: event.target.value,
    });
  };

  const handleSource = (event) => {
    setFormData({
      ...formData,
      Source: event.target.value,
    });
  };

  const handleTitleChange = (event) => {
    setFormData({
      ...formData,
      titleprefixID: event.target.value,
    });
  };

  useEffect(() => {
    if (tellecallingID.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        telecallingID: parseInt(tellecallingID[0].telecallingID) || "", 
      }));
    }
  }, [tellecallingID]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = editData
      ? "https://ideacafe-backend.vercel.app/api/proxy/api-update-telecalling.php"
      : "https://ideacafe-backend.vercel.app/api/proxy/api-insert-telecalling.php";

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
        show();
      } else {
        setSubmitSuccess(false);
        setSubmitError(true);
      }
    } catch (error) {
      console.error("There was an error!", error);
      setSubmitSuccess(false);
      setSubmitError(true);
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSubmitSuccess(false);
    setSubmitError(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      setErrors((prevErrors) => ({ ...prevErrors, date: "" }));
    }
  };

  return (
    <Card>
      <CardContent>
        <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
          <Box>
            <Typography
              variant="body2"
              sx={{ marginTop: 5, fontWeight: "bold", fontSize: 20 }}
            >
              {editData ? "Edit Telecalling Details" : "Add Telecalling Details"}
            </Typography>
          </Box>
        </Grid>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Title</InputLabel>
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
              </FormControl>
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Party Name"
                name="PartyName"
                value={formData.PartyName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Country Code"
                type="tel"
                name="Countrycode"
                value={formData.Countrycode}
                onChange={handleChange}
                inputProps={{
                  pattern: "[0-9]*",
                }}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Mobile"
                type="tel"
                name="Mobile"
                value={formData.Mobile}
                onChange={handleChange}
                inputProps={{
                  pattern: "[0-9]*",
                }}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
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
                }}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="tel"
                name="TelephoneNo"
                label="Telephone No"
                placeholder="Telephone No"
                value={formData.TelephoneNo}
                onChange={handleChange}
                inputProps={{
                  pattern: "[0-9]*",
                }}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="tel"
                name="AlternateTelephoneNo"
                label="Alternate Telephone No"
                placeholder="Alternate Telephone No"
                value={formData.AlternateTelephoneNo}
                onChange={handleChange}
                inputProps={{
                  pattern: "[0-9]*",
                }}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="E-Mail"
                name="Email"
                placeholder="E-Mail "
                value={formData.Email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Project Name</InputLabel>
                <Select
                  value={formData.ProjectID}
                  name="ProjectID"
                  onChange={handleChange}
                  label="Project Name"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {projectTypes.map((project) => (
                    <MenuItem key={project.ProjectID} value={project.ProjectID}>
                      {project.ProjectName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Unit Type</InputLabel>
                <Select
                  value={formData.UnittypeID}
                  onChange={handleBhkChange}
                  label="Unit Type"
                >
                  {bhkOptions.map((bhk) => (
                    <MenuItem key={bhk.UnittypeID} value={bhk.UnittypeID}>
                      {bhk.UnittypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Estimated Budget"
                name="EstimatedBudget"
                placeholder="Estimated Budget"
                value={formData.EstimatedBudget}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Lead Status"
                name="LeadStatus"
                placeholder="Lead Status"
                value={formData.LeadStatus}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Location"
                name="Location"
                placeholder="Location"
                value={formData.Location}
                onChange={handleChange}
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
              <TextField
                fullWidth
                label="Followup Through"
                name="FollowupThrough"
                placeholder="Followup Through"
                value={formData.FollowupThrough}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Source</InputLabel>
                <Select
                  value={formData.Source}
                  onChange={handleSource}
                  label="Source"
                >
                  {source.map((bhk) => (
                    <MenuItem key={bhk.sourceID} value={bhk.sourceID}>
                      {bhk.sourceName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Source Name"
                name="SourceName"
                placeholder="Source Name"
                value={formData.SourceName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Source Description"
                placeholder="Source Description"
                name="SourceDescription"
                value={formData.SourceDescription}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Telecall Attended By"
                placeholder="Telecall Attended By"
                name="TelecallAttendedBy"
                value={formData.TelecallAttendedBy}
                onChange={handleChange}
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
                    label="Next follow up date"
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
    sx={{ width: "100%", backgroundColor: "green", color: "#ffffff" }}
  >
    {editData ? "Data Updated Successfully" : (submitSuccess ? "Data Added Successfully" : "")}
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
            Error adding data. Please try again later.
          </MuiAlert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default AddTellecallingDetails;
