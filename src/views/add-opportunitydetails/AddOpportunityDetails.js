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
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import DatePicker from "react-datepicker";
import axios from "axios";
import Swal from "sweetalert2";

import "react-datepicker/dist/react-datepicker.css";
import { HandExtended } from "mdi-material-ui";
import { status } from "nprogress";

const AddOpportunityDetails = ({ show, editData }) => {
  console.log(editData , 'opportunity data for edit');
  const [formData, setFormData] = useState({
    lookingForId: "",
    estimatedBudgetId: "",
    areaFrom: "",
    areaTo: "",
    scaleId: "",
    cityId: "",
    locationId: "",
    unitTypeId: "",
    propertyAgeId: "",
    purposeId: "",
    scheduleDate: null,
    scheduleTime: "",
    keywordId: "",
    sourceId: "",
    sourceTypeId: "",
    opportunityAttendedById: "",
    description: "",
    Cid: "",
    Status: 1,
    ModifyUID: 1,
    Oid:""
  });


  const [rows, setRows] = useState([]);

  const [lookingForOptions, setLookingForOptions] = useState([]);
  const [estimatedBudgets, setEstimatedBudgets] = useState([]);
  const [cities, setCities] = useState([]);
  const [units, setUnits] = useState([]);
  const [scales, setScales] = useState([]);
  const [sources, setSources] = useState([]);
  const [sourceTypes, setSourceTypes] = useState([]);
  const [propertyAges, setPropertyAges] = useState([]);
  const [purposes, setPurposes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [submitError, setSubmitError] = useState(false);
  const [errors, setErrors] = useState({});

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  


  useEffect(() => {
    if (editData) {
      // Destructure editData to access necessary properties
      const { lookingForId, estimatedBudgetId, areaFrom, areaTo, scaleId, cityId, locationId, unitTypeId, propertyAgeId, purposeId, scheduleDate, scheduleTime, keywordId, sourceId, sourceTypeId, opportunityAttendedById, description, Cid ,Status, ModifyUID ,Oid} = editData;
  
      // Set the form data using editData values
      setFormData({
        lookingForId: lookingForId || "",
        estimatedBudgetId: estimatedBudgetId || "",
        areaFrom: areaFrom || "",
        areaTo: areaTo || "",
        scaleId: scaleId || "",
        cityId: cityId || "",
        locationId: locationId || "",
        unitTypeId: unitTypeId || "",
        propertyAgeId: propertyAgeId || "",
        purposeId: purposeId || "",
        scheduleDate: scheduleDate || "",
        scheduleTime: scheduleTime || "",
        keywordId: keywordId || "",
        sourceId: sourceId || "",
        sourceTypeId: sourceTypeId || "",
        opportunityAttendedById: opportunityAttendedById || "",
        description: description || "",
        Oid: Oid || "",
        Status: Status || 1,
        // CreateUID: CreateUID || 1,
        Cid: Cid || "",
        ModifyUID: ModifyUID || 1,
       
      });
  
      // Fetch contact types based on customer type if CustomerTypeID is available
      // if (CustomerTypeID) {
      //   fetchContactTypes(CustomerTypeID);
      // }
  
      // // Fetch source types based on source if SourceID is available
      // if (SourceID) {
      //   setDynamicSourceID(SourceID);
      // }
    }
  }, [editData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lookingForRes = await axios.get(
          "https://apiforcorners.cubisysit.com/api/api-fetch-lookingtype.php"
        );
        const estimatedBudgetsRes = await axios.get(
          "https://apiforcorners.cubisysit.com/api/api-dropdown-estimatedbudget.php"
        );
        const citiesRes = await axios.get(
          "https://apiforcorners.cubisysit.com/api/api-fetch-citymaster.php"
        );
        const unitsRes = await axios.get(
          "https://apiforcorners.cubisysit.com/api/api-fetch-unittype.php"
        );
        const scalesRes = await axios.get(
          "https://apiforcorners.cubisysit.com/api/api-fetch-scale.php"
        );
        const propertyAgesRes = await axios.get(
          "https://apiforcorners.cubisysit.com/api/api-fetch-propertyage.php"
        );
        const purposesRes = await axios.get(
          "https://apiforcorners.cubisysit.com/api/api-fetch-purpose.php"
        );
        const contactsRes = await axios.get(
          "https://apiforcorners.cubisysit.com/api/api-fetch-contacts.php"
        );
        const sourcesRes = await axios.get(
          "https://apiforcorners.cubisysit.com/api/api-fetch-source.php"
        );

        setLookingForOptions(lookingForRes.data.data);
        setEstimatedBudgets(estimatedBudgetsRes.data.data);
        setCities(citiesRes.data.data);
        setUnits(unitsRes.data.data);
        setScales(scalesRes.data.data);
        setPropertyAges(propertyAgesRes.data.data);
        setPurposes(purposesRes.data.data);
        setContacts(contactsRes.data.data);
        setSources(sourcesRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    fetchDataOpportunity();
  }, []);

  const fetchDataOpportunity = async () => {
    setLoading(true);
    // setError(null);
    try {
      const response = await axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-opportunity.php');
      setRows(response.data.data || []);
    } catch (error) {
      // setError(error);
      console.log('err');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rows.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Oid: parseInt(rows[0].Oid) || "",
      }));
    }
  }, [rows]);


  const handleSourceChange = (event) => {
    const selectedSourceId = event.target.value;
    setFormData({ ...formData, sourceId: selectedSourceId });

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
    setFormData({ ...formData, scheduleDate: date });
    if (date) {
      setErrors((prevErrors) => ({ ...prevErrors, scheduleDate: "" }));
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.contactId) {
      newErrors.contactId = "Contact is required";
    }
    if (!formData.lookingForId) {
      newErrors.lookingForId = "Looking For is required";
    }
    if (!formData.estimatedBudgetId) {
      newErrors.estimatedBudgetId = "Estimated Budget is required";
    }
    if (!formData.cityId) {
      newErrors.cityId = "City is required";
    }
    if (!formData.scheduleDate) {
      newErrors.scheduleDate = "Schedule Date is required";
    }
    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Clear error for the field when it's being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));

    if (["areaFrom", "areaTo"].includes(name)) {
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

  const RequiredIndicator = () => {
    return <span style={{ color: "red", marginLeft: "5px" }}>*</span>;
  };

  const handleSubmit = async (event) => {
    console.log("press");
    event.preventDefault();
    // const newErrors = validateFields();
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   return;
    // }

    console.log(formData, "all data of opportunity");

    try {
      const url = editData
        ? "https://ideacafe-backend.vercel.app/api/proxy/api-update-opportunity.php"
        : "https://ideacafe-backend.vercel.app/api/proxy/api-insert-opportunity.php";
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.status === "Success") {
        setSubmitSuccess(true);
        setSubmitError(false);
        show(false);
        console.log("data submitted");
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

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5">Add Opportunity Details</Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={!!errors.contactId}>
                <InputLabel>Contact</InputLabel>
                <Select
                  label="Contact"
                  value={formData.Cid}
                  onChange={(e) =>
                    setFormData({ ...formData, Cid: e.target.value })
                  }
                >
                  {contacts.map((contact) => (
                    <MenuItem key={contact.Cid} value={contact.Cid}>
                      {contact.CName}
                    </MenuItem>
                  ))}
                </Select>
                {!!errors.contactId && (
                  <Typography variant="caption" color="error">
                    {errors.contactId}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            {/* Add rest of the form fields similarly */}
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Schedule Time"
                type="time"
                value={formData.scheduleTime}
                onChange={(e) =>
                  setFormData({ ...formData, scheduleTime: e.target.value })
                }
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth error={!!errors.lookingForId}>
                <InputLabel>Looking For</InputLabel>
                <Select
                  label="Looking For"
                  value={formData.lookingForId}
                  onChange={(e) =>
                    setFormData({ ...formData, lookingForId: e.target.value })
                  }
                >
                  {lookingForOptions.map((option) => (
                    <MenuItem
                      key={option.LookingTypeID}
                      value={option.LookingTypeID}
                    >
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
                  value={formData.estimatedBudgetId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estimatedBudgetId: e.target.value,
                    })
                  }
                >
                  {estimatedBudgets.map((budget) => (
                    <MenuItem
                      key={budget.EstimatedbudgetID}
                      value={budget.EstimatedbudgetID}
                    >
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

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Area From"
                value={formData.areaFrom}
                 name="areaFrom"
                onChange={(e) =>
                  setFormData({ ...formData, areaFrom: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Area To"
                value={formData.areaTo}
                onChange={(e) =>
                  setFormData({ ...formData, areaTo: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Scale</InputLabel>
                <Select
                  label="Scale"
                  value={formData.scaleId}
                  onChange={(e) =>
                    setFormData({ ...formData, scaleId: e.target.value })
                  }
                >
                  {scales.map((scale) => (
                    <MenuItem key={scale.ScaleID} value={scale.ScaleID}>
                      {scale.ScaleName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth error={!!errors.cityId}>
                <InputLabel>City</InputLabel>
                <Select
                  label="City"
                  value={formData.cityId}
                  onChange={(e) =>
                    setFormData({ ...formData, cityId: e.target.value })
                  }
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
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.locationId}
                onChange={(e) =>
                  setFormData({ ...formData, locationId: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Unit Type</InputLabel>
                <Select
                  label="Unit Type"
                  value={formData.unitTypeId}
                  onChange={(e) =>
                    setFormData({ ...formData, unitTypeId: e.target.value })
                  }
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
                  label="Property Age"
                  value={formData.propertyAgeId}
                  onChange={(e) =>
                    setFormData({ ...formData, propertyAgeId: e.target.value })
                  }
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
                  label="Purpose"
                  value={formData.purposeId}
                  onChange={(e) =>
                    setFormData({ ...formData, purposeId: e.target.value })
                  }
                >
                  {purposes.map((purpose) => (
                    <MenuItem key={purpose.PurposeID} value={purpose.PurposeID}>
                      {purpose.PurposeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label={
                  <>
                    Schedule Date <RequiredIndicator />
                  </>
                }
                type="date"
                name="scheduleDate"
                value={formData.scheduleDate}
                onChange={(e) =>
                  setFormData({ ...formData, scheduleDate: e.target.value })
                }
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 minute intervals
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Keyword"
                value={formData.keywordId}
                onChange={(e) =>
                  setFormData({ ...formData, keywordId: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Source</InputLabel>
                <Select
                  label="Source"
                  value={formData.sourceId}
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
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Source Type</InputLabel>
                <Select
                  label="Source Type"
                  value={formData.sourceTypeId}
                  onChange={(e) =>
                    setFormData({ ...formData, sourceTypeId: e.target.value })
                  }
                >
                  {sourceTypes.map((sourceType) => (
                    <MenuItem
                      key={sourceType.SourceTypeID}
                      value={sourceType.SourceTypeID}
                    >
                      {sourceType.SourceTypename}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Opportunity Attended By</InputLabel>
                <Select
                  label="Opportunity Attended By"
                  value={formData.opportunityAttendedById}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      opportunityAttendedById: e.target.value,
                    })
                  }
                >
                  {contacts.map((contact) => (
                    <MenuItem key={contact.Cid} value={contact.Cid}>
                      {contact.CName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                {editData ? "Update" : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={submitSuccess}
          autoHideDuration={6000}
          onClose={() => setSubmitSuccess(false)}
        >
          <MuiAlert
            onClose={() => setSubmitSuccess(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {editData ? "Data Updated Successfully" : "Data Added Successfully"}
          </MuiAlert>
        </Snackbar>
        <Snackbar
          open={submitError}
          autoHideDuration={6000}
          onClose={() => setSubmitError(false)}
        >
          <MuiAlert
            onClose={() => setSubmitError(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            Something went wrong!
          </MuiAlert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default AddOpportunityDetails;
