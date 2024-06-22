import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import DatePicker from "react-datepicker";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

const AddOpportunityDetails = ({ show }) => {
  const [lookingForOptions, setLookingForOptions] = useState([]);
  const [estimatedBudgets, setEstimatedBudgets] = useState([]);
  const [cities, setCities] = useState([]);
  const [units, setUnits] = useState([]);
  const [sources, setSources] = useState([]);
  const [sourceTypes, setSourceTypes] = useState([]);
  const [propertyAges, setPropertyAges] = useState([]);
  const [purposes, setpurposes] = useState([]);



  const [lookingForId, setLookingForId] = useState("");
  const [estimatedBudgetId, setEstimatedBudgetId] = useState("");
  const [areaFrom, setAreaFrom] = useState("");
  const [areaTo, setAreaTo] = useState("");
  const [scaleId, setScaleId] = useState("");
  const [cityId, setCityId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [unitTypeId, setUnitTypeId] = useState("");
  const [propertyAgeId, setPropertyAgeId] = useState("");
  const [purposeId, setPurposeId] = useState("");
  const [scheduleDate, setScheduleDate] = useState(null);
  const [scheduleTime, setScheduleTime] = useState("");
  const [keywordId, setKeywordId] = useState("");
  const [sourceId, setSourceId] = useState("");
  const [sourceTypeId, setSourceTypeId] = useState("");
  const [opportunityAttendedById, setOpportunityAttendedById] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});

  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-lookingtype.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setLookingForOptions(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-scale.php")
      .then((response) => {
        if (response.data.status === "Success") {
            setPropertyAges(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-purpose.php")
      .then((response) => {
        if (response.data.status === "Success") {
            setpurposes(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);



  useEffect(() => {
    axios
      .get(
        "https://apiforcorners.cubisysit.com/api/api-dropdown-estimatedbudget.php"
      )
      .then((response) => {
        if (response.data.status === "Success") {
          setEstimatedBudgets(response.data.data);
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
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-unittype.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setUnits(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-fetch-source.php")
      .then((response) => {
        if (response.data.status === "Success") {
          setSources(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSourceChange = (event) => {
    const selectedSourceId = event.target.value;
    setSourceId(selectedSourceId);

    // Fetch source types based on selected source id
    axios
      .get(
        `https://apiforcorners.cubisysit.com/api/api-fetch-sourcetype.php?SourceID=${selectedSourceId}`
      )
      .then((response) => {
        if (response.data.status === "Success") {
          setSourceTypes(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleDateChange = (date) => {
    setScheduleDate(date);
    if (date) {
      setErrors((prevErrors) => ({ ...prevErrors, scheduleDate: "" }));
    }
  };

  const validateFields = () => {
    const newErrors = {};
    // Add validation rules for each field
    if (!lookingForId) {
      newErrors.lookingForId = "Looking For is required";
    }
    if (!estimatedBudgetId) {
      newErrors.estimatedBudgetId = "Estimated Budget is required";
    }
    if (!cityId) {
      newErrors.cityId = "City is required";
    }
    // Add more validations as per your requirement

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});

      // Prepare formData with all field values
      const formData = {
        LookingForID: lookingForId,
        EstimatedbudgetID: estimatedBudgetId,
        AreaFrom: areaFrom,
        AreaTo: areaTo,
        ScaleID: scaleId,
        CityID: cityId,
        LocationID: locationId,
        UnittypeID: unitTypeId,
        PropertyAgeID: propertyAgeId,
        PurposeID: purposeId,
        ScheduleDate: scheduleDate, // Make sure to format date correctly
        ScheduleTime: scheduleTime,
        KeywordID: keywordId,
        SourceID: sourceId,
        SourceTypeID: sourceTypeId,
        OpportunityAttendedByID: opportunityAttendedById,
        Description: description,
      };

      // Example of posting formData to an API endpoint
      axios
        .post(
          "https://your-api-endpoint-for-saving-opportunity-details",
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
            show(); // Close or navigate away from the form
            // Reset all state values after successful submission if needed
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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5">Add Opportunity Details</Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={!!errors.lookingForId}>
                <InputLabel>Looking For</InputLabel>
                <Select
                 label="Looking for"
                  value={lookingForId}
                  onChange={(e) => setLookingForId(e.target.value)}
                >
                  {lookingForOptions.map((option) => (
                    <MenuItem key={option.LookingTypeID} value={option.LookingTypeID}>
                      {option.LookingTypeName}
                    </MenuItem>
                  ))}
                </Select>
                {!!errors.lookingForId && (
                  <Typography variant="caption" color="error">
                    {errors.lookingForId}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={!!errors.estimatedBudgetId}>
                <InputLabel>Estimated Budget</InputLabel>
                <Select
                 label="Estimated Budget"
                  value={estimatedBudgetId}
                  onChange={(e) => setEstimatedBudgetId(e.target.value)}
                >
                  {estimatedBudgets.map((budget) => (
                    <MenuItem key={budget.EstimatedbudgetID} value={budget.EstimatedbudgetID}>
                      {budget.EstimatedbudgetName}
                    </MenuItem>
                  ))}
                </Select>
                {!!errors.estimatedBudgetId && (
                  <Typography variant="caption" color="error">
                    {errors.estimatedBudgetId}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Area From"
                value={areaFrom}
                onChange={(e) => setAreaFrom(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Area To"
                value={areaTo}
                onChange={(e) => setAreaTo(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Scale</InputLabel>
                <Select
                  value={scaleId}
                  onChange={(e) => setScaleId(e.target.value)}
                  >
                  {/* Populate Scale options */}
                  {/* Assuming `scales` is a state variable containing scale data }
                  {scales.map((scale) => (
                    <MenuItem key={scale.ScaleID} value={scale.ScaleID}>
                      {scale.ScaleName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={4}>
              <FormControl fullWidth error={!!errors.cityId}>
                <InputLabel>City</InputLabel>
                <Select
                 label="City"
                  value={cityId}
                  onChange={(e) => setCityId(e.target.value)}
                >
                  {cities.map((city) => (
                    <MenuItem key={city.CityID} value={city.CityID}>
                      {city.CityName}
                    </MenuItem>
                  ))}
                </Select>
                {!!errors.cityId && (
                  <Typography variant="caption" color="error">
                    {errors.cityId}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Location"
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Unit Type</InputLabel>
                <Select
                  label="Unit Type"
                  value={unitTypeId}
                  onChange={(e) => setUnitTypeId(e.target.value)}
                >
                  {units.map((unit) => (
                    <MenuItem key={unit.UnittypeID} value={unit.UnittypeID}>
                      {unit.UnittypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
             <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Property Age</InputLabel>
                <Select
                  value={propertyAgeId}
                  onChange={(e) => setPropertyAgeId(e.target.value)}
                >
                 {propertyAges.map((age) => (
                    <MenuItem key={age.PropertyAgeID} value={age.PropertyAgeID}>
                      {age.PropertyAgeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Purpose</InputLabel>
                <Select
                  value={purposeId}
                  onChange={(e) => setPurposeId(e.target.value)}
                >
                  {purposes.map((purpose) => (
                    <MenuItem key={purpose.PurposeID} value={purpose.PurposeID}>
                      {purpose.PurposeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> 
            <Grid item xs={4}>
               <TextField
                fullWidth
                label="Schedule Time"
                dateFormat="yyyy/MM/dd"
                placeholderText="Schedule Date"
                selected={scheduleDate}
                onChange={handleDateChange}
                type="Date"
              />
              {!!errors.scheduleDate && (
                <Typography variant="caption" color="error">
                  {errors.scheduleDate}
                </Typography>
              )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Schedule Time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                type="time"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Keyword"
                value={keywordId}
                onChange={(e) => setKeywordId(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Source</InputLabel>
                <Select
                   label="Source"
                  value={sourceId}
                  onChange={handleSourceChange}
                >
                  {sources.map((source) => (
                    <MenuItem key={source.SourceID} value={source.SourceID}>
                      {source.SourceName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Source Type</InputLabel>
                <Select
                label="Source Type"
                  value={sourceTypeId}
                  onChange={(e) => setSourceTypeId(e.target.value)}
                >
                  {sourceTypes.map((sourceType) => (
                    <MenuItem key={sourceType.SourceTypeID} value={sourceType.SourceTypeID}>
                      {sourceType.SourceTypename}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Opportunity Attended By"
                value={opportunityAttendedById}
                onChange={(e) => setOpportunityAttendedById(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              {submitSuccess && (
                <Typography variant="caption" color="success">
                  Form submitted successfully!
                </Typography>
              )}
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddOpportunityDetails;
