import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { City } from "mdi-material-ui";

const AddOpportunityDetails = ({ show }) => {
  const [date, setDate] = useState(null);
  const [nextFollowupDate, setNextFollowupDate] = useState(null);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [mobile, setMobile] = useState("");
  const [alternateMobileNo, setAlternateMobile] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [cityID, setCityID] = useState("");
  const [state, setState] = useState("");
  const [leadStatus, setLeadStatus] = useState("");
  const [pincode, setPincode] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [projectName, setProjectName] = useState("");
  const [subProject, setSubProject] = useState("");
  const [flatType1, setFlatType1] = useState("");
  const [noOfFlatsRequired, setNoOfFlatsRequired] = useState("");
  const [desiredFloor, setDesiredFloor] = useState("");
  const [possessionPreference, setPossessionPreference] = useState("");
  const [estimatedBudgetID, setEstimatedBudgetID] = useState("");
  const [areaFrom, setAreaFrom] = useState("");
  const [areaTo, setAreaTo] = useState("");
  const [scaleID, setScaleID] = useState("");
  const [lookingForID, setLookingForID] = useState("");
  const [scheduleDate, setScheduleDate] = useState(null);
  const [scheduleTime, setScheduleTime] = useState("");
  const [sourceID, setSourceID] = useState("");
  const [sourceTypeID, setSourceTypeID] = useState("");
  const [opportunityAttendedByID, setOpportunityAttendedByID] = useState("");
  const [description, setDescription] = useState("");

  const [lookingTypes, setLookingTypes] = useState([]);
  const [estimatedBudgets, setEstimatedBudgets] = useState([]);
  const [cities, setCities] = useState([]);
  const [unitTypes, setUnitTypes] = useState([]);
  const [sources, setSources] = useState([]);
  const [sourceTypes, setSourceTypes] = useState([]);

  useEffect(() => {
    // Fetch data for dropdowns when component mounts
    fetchLookingTypes();
    fetchEstimatedBudgets();
    fetchCities();
    fetchUnitTypes();
    fetchSources();
  }, []);

  const fetchLookingTypes = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-lookingtype.php"
      );
      setLookingTypes(response.data.data);
    } catch (error) {
      console.error("Error fetching Looking Types:", error);
    }
  };

  const fetchEstimatedBudgets = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-dropdown-estimatedbudget.php"
      );
      setEstimatedBudgets(response.data.data);
    } catch (error) {
      console.error("Error fetching Estimated Budgets:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-citymaster.php"
      );
      setCities(response.data.data);
    } catch (error) {
      console.error("Error fetching Cities:", error);
    }
  };

  const fetchUnitTypes = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-unittype.php"
      );
      setUnitTypes(response.data.data);
    } catch (error) {
      console.error("Error fetching Unit Types:", error);
    }
  };

  const fetchSources = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-source.php"
      );
      setSources(response.data.data);
    } catch (error) {
      console.error("Error fetching Sources:", error);
    }
  };

  const handleSourceChange = async (sourceID) => {
    // Fetch source types based on selected sourceID
    try {
      const response = await axios.get(
        `https://apiforcorners.cubisysit.com/api/api-fetch-sourcetype.php?SourceID=${sourceID}`
      );
      setSourceTypes(response.data.data);
    } catch (error) {
      console.error("Error fetching Source Types:", error);
    }
  };

  const handleSubmitData = async (event) => {
    event.preventDefault();

    const body = {
      Date: date,
      Title: title,
      Name: name,
      CountryCode: countryCode,
      Mobile: mobile,
      AlternateMobileNo: alternateMobileNo,
      Address: address,
      Location: location,
      CityID: cityID,
      State: state,
      LeadStatus: leadStatus,
      Pincode: pincode,
      Email: email,
      Profession: profession,
      ProjectName: projectName,
      SubProject: subProject,
      FlatType1: flatType1,
      NoOfFlatsRequired: noOfFlatsRequired,
      DesiredFloor: desiredFloor,
      PossessionPreference: possessionPreference,
      EstimatedBudgetID: estimatedBudgetID,
      LookingForID: lookingForID,
      AreaFrom: areaFrom,
      AreaTo: areaTo,
      ScaleID: scaleID,
      ScheduleDate: scheduleDate,
      ScheduleTime: scheduleTime,
      SourceID: sourceID,
      SourceTypeID: sourceTypeID,
      OpportunityAttendedByID: opportunityAttendedByID,
      Description: description,
    };

    try {
      const response = await axios.post(
        "https://ideacafe-backend.vercel.app/api/proxy/api-insert-opportunitydetails.php",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "Success") {
        show(false);
        // Clear form fields
        setDate(null);
        setNextFollowupDate(null);
        setTitle("");
        setName("");
        setCountryCode("");
        setMobile("");
        setAlternateMobile("");
        setAddress("");
        setLocation("");
        setCityID("");
        setState("");
        setLeadStatus("");
        setPincode("");
        setEmail("");
        setProfession("");
        setProjectName("");
        setSubProject("");
        setFlatType1("");
        setNoOfFlatsRequired("");
        setDesiredFloor("");
        setPossessionPreference("");
        setEstimatedBudgetID("");
        setLookingForID("");
        setAreaFrom("");
        setAreaTo("");
        setScaleID("");
        setScheduleDate(null);
        setScheduleTime("");
        setSourceID("");
        setSourceTypeID("");
        setOpportunityAttendedByID("");
        setDescription("");
      } else {
        // Handle submit error
      }
    } catch (error) {
      console.error("There was an error!", error);
      // Handle submit error
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmitData}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="yyyy-MM-dd"
                customInput={
                  <TextField
                    fullWidth
                    label="Date"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Country Code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Alternate Mobile"
                value={alternateMobileNo}
                onChange={(e) => setAlternateMobile(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="City"
                select
                value={cityID}
                onChange={(e) => setCityID(e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.CityID} value={city.CityID}>
                    {city.CityName}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Lead Status"
                value={leadStatus}
                onChange={(e) => setLeadStatus(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Profession"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Sub Project"
                value={subProject}
                onChange={(e) => setSubProject(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Flat Type 1"
                value={flatType1}
                onChange={(e) => setFlatType1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="No. of Flats Required"
                value={noOfFlatsRequired}
                onChange={(e) => setNoOfFlatsRequired(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Desired Floor"
                value={desiredFloor}
                onChange={(e) => setDesiredFloor(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Possession Preference"
                value={possessionPreference}
                onChange={(e) => setPossessionPreference(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Estimated Budget"
                select
                value={estimatedBudgetID}
                onChange={(e) => setEstimatedBudgetID(e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select Estimated Budget</option>
                {estimatedBudgets.map((budget) => (
                  <option key={budget.EstimatedbudgetID} value={budget.EstimatedbudgetID}>
                    {budget.EstimatedbudgetName}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Looking For"
                select
                value={lookingForID}
                onChange={(e) => setLookingForID(e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select Looking For</option>
                {lookingTypes.map((type) => (
                  <option key={type.LookingTypeID} value={type.LookingTypeID}>
                    {type.LookingTypeName}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Area From"
                value={areaFrom}
                onChange={(e) => setAreaFrom(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Area To"
                value={areaTo}
                onChange={(e) => setAreaTo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Scale ID"
                value={scaleID}
                onChange={(e) => setScaleID(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePicker
                selected={scheduleDate}
                onChange={(date) => setScheduleDate(date)}
                dateFormat="yyyy-MM-dd"
                customInput={
                  <TextField
                    fullWidth
                    label="Schedule Date"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Schedule Time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Source"
                select
                value={sourceID}
                onChange={(e) => {
                  setSourceID(e.target.value);
                  handleSourceChange(e.target.value);
                }}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select Source</option>
                {sources.map((source) => (
                  <option key={source.SourceID} value={source.SourceID}>
                    {source.SourceName}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Source Type"
                select
                value={sourceTypeID}
                onChange={(e) => setSourceTypeID(e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Select Source Type</option>
                {sourceTypes.map((sourceType) => (
                  <option key={sourceType.SourceTypeID} value={sourceType.SourceTypeID}>
                    {sourceType.SourceTypeName}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Opportunity Attended By"
                value={opportunityAttendedByID}
                onChange={(e) => setOpportunityAttendedByID(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddOpportunityDetails;
