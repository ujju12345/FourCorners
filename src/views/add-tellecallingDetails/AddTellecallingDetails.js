import { useEffect, useState } from "react";

// ** MUI Imports
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

const AddTellecallingDetails = ({ show }) => {
  const [date, setDate] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [partyName, setPartyName] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const [Mobile, setMobile] = useState("");
  const [Alternate, setAlternate] = useState("");
  const [MobileNo, setMobileNo] = useState("");
  const [TelephoneNo, setTelephoneNo] = useState("");
  const [AlternateTelephoneNo, setAlternateTelephoneNo] = useState("");
  const [EMailProjectName, setEMailProjectName] = useState("");
  const [UnitTypeEstimatedBudget, setUnitTypeEstimatedBudget] = useState("");
  const [LeadStatus, setLeadStatus] = useState("");
  const [Location, setLocation] = useState("");
  const [FollowupThrough, setFollowupThrough] = useState("");
  const [Source, setSource] = useState("");
  const [SourceName, setSourceName] = useState("");
  const [TelecallAttendedBy, setTelecallAttendedBy] = useState("");
  const [comment, setComment] = useState("");

  const [SourceDescription, setSourceDescription] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-projectmaster.php"
      );
      setRows(response.data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrors(error);
    }
  };

  const handleChange = (event) => {
    const projectId = event.target.value;
    const selectedProj = rows.find(
      (project) => project.ProjectID === projectId
    );
    setSelectedProject(projectId);
    setProjectName(selectedProj ? selectedProj.ProjectName : "");
  };

  const handleSubmitData = async (event) => {
    event.preventDefault();

    const body = {
      titleprefixID: 1,
      PartyName: partyName,
      Mobile: Mobile,
      AlternateMobileNo: Alternate,
      TelephoneNo: MobileNo,
      AlternateTelephoneNo: TelephoneNo,
      Email: EMailProjectName,
      ProjectID: selectedProject, // You need to define projectID
      UnitType: UnitTypeEstimatedBudget,
      EstimatedBudget: LeadStatus, // Assuming LeadStatus represents the EstimatedBudget
      LeadStatus: LeadStatus,
      Comments: comment,
      Location: Location,
      FollowupThrough: FollowupThrough,
      Source: Source,
      SourceName: SourceName,
      SourceDescription: SourceDescription,
      TelecallAttendedBy: TelecallAttendedBy,
      CreateUID: 1,
    };

    console.log(body);

    try {
      const response = await axios.post(
        "https://apiforcorners.cubisysit.com/api/api-insert-telecalling.php",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "Success") {
        console.log("HOGAYAYAYAYAY");
        // setSubmitSuccess(true);
        // setSubmitError(false);
        show(false);
        // Clear form fields
        setDate(null);
        setProjectName("");
        setNameOfCompany("");
        setProjectCode("");
        setSubProject("");
        setCarParkingType("");
        setManualParkingNumber("");
        setParkingLevel("");
        setComment("");
      } else {
        // setSubmitSuccess(false);
        // setSubmitError(true);
      }
    } catch (error) {
      console.error("There was an error!", error);
      //   setSubmitSuccess(false);
      //   setSubmitError(true);
    }
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
                  Add Tellecalling Details
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Party Name"
                placeholder="Party Name"
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="tel"
                label="Mobile"
                placeholder="Mobile"
                value={Mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="tel"
                label="Alternate Mobile Number"
                placeholder="Alternate Mobile Number"
                value={Alternate}
                onChange={(e) => setAlternate(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="tel"
                label="Mobile No"
                placeholder="Mobile No"
                value={MobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="tel"
                label="Telephone No"
                placeholder="Telephone No"
                value={TelephoneNo}
                onChange={(e) => setTelephoneNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                type="tel"
                label="Alternate Telephone No"
                placeholder="Alternate Telephone No"
                value={AlternateTelephoneNo}
                onChange={(e) => setAlternateTelephoneNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="E-Mail"
                placeholder="E-Mail "
                value={EMailProjectName}
                onChange={(e) => setEMailProjectName(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Project Name</InputLabel>
                <Select
                  value={selectedProject}
                  onChange={handleChange}
                  label="Project Name"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {rows.map((project) => (
                    <MenuItem key={project.ProjectID} value={project.ProjectID}>
                      {project.ProjectName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Unit Type Estimated Budget"
                placeholder="Unit Type Estimated Budget"
                value={UnitTypeEstimatedBudget}
                onChange={(e) => setUnitTypeEstimatedBudget(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" Lead Status"
                placeholder=" Lead Status"
                value={LeadStatus}
                onChange={(e) => setLeadStatus(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" Location"
                placeholder=" Location"
                value={Location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" Comment"
                placeholder=" Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" Followup Through"
                placeholder=" Followup Through"
                value={FollowupThrough}
                onChange={(e) => setFollowupThrough(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" Source"
                placeholder=" Source"
                value={Source}
                onChange={(e) => setSource(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" source Name"
                placeholder=" Source Name"
                value={SourceName}
                onChange={(e) => setSourceName(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" Source Description"
                placeholder=" Source Description"
                value={SourceDescription}
                onChange={(e) => setSourceDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label=" Telecall Attended By"
                placeholder=" Telecall Attended By"
                value={TelecallAttendedBy}
                onChange={(e) => setTelecallAttendedBy(e.target.value)}
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

export default AddTellecallingDetails;
