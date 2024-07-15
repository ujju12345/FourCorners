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
  InputAdornment,
  IconButton,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useCookies } from "react-cookie";
import { toWords } from "number-to-words";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
const FormRosenagar = ({ show, editData }) => {
  console.log(editData, "Edit data aaya");
  const initialFormData = {
    BookingDate: null,
    BookedBy: "",
    imageFile: null,
    Mobile: "",
    Name: "",
    Address: "",
    pancard: "",
    Email: "",
    bookingType: "",
    area: "",
    ttlamount: "",
    charges: "",
    parkingFacility: "",
    flatCost: "",
    flatCostInWords: "",
    gst: "",
    stampduty: "",
    registration: "",
    advocate: "",
    extracost: "",
    totalCost: "",
    unsableArea: "",
    agreementcarpet: "",
    remark: "",
    remarkDate: "",
    ProjectID: "",
    WingID: "",
    flatNo: "",
    FlatNumber: "",
  };
  const [remarks, setRemarks] = useState([{ remark: "", date: null }]);
  const [projectMaster, setProjectMaster] = useState([]);
  const [floor, setFloor] = useState([]);
  const [flatNoData, setFlatNoData] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [titles, setTitles] = useState([]);
  const [errors, setErrors] = useState({});
  const [wingData, setWingData] = useState([]);

  const [tellecallingID, setTellecallingID] = useState([]);
  const [bhkOptions, setBhkOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [cookies, setCookie] = useCookies(["amr"]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const numberToWordsIndian = (num) => {
    const singleDigits = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const twoDigits = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];
    const tenToNineteen = [
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];

    const convertTwoDigits = (n) => {
      if (n < 10) return singleDigits[n];
      if (n < 20) return tenToNineteen[n - 10];
      return (
        twoDigits[Math.floor(n / 10)] +
        (n % 10 ? " " + singleDigits[n % 10] : "")
      );
    };

    const convertThreeDigits = (n) => {
      return (
        (n >= 100 ? singleDigits[Math.floor(n / 100)] + " hundred " : "") +
        convertTwoDigits(n % 100)
      );
    };

    if (num === 0) return "zero";

    let result = "";
    let crore = Math.floor(num / 10000000);
    let lakh = Math.floor((num % 10000000) / 100000);
    let thousand = Math.floor((num % 100000) / 1000);
    let hundred = num % 1000;

    if (crore > 0) result += convertTwoDigits(crore) + " crore ";
    if (lakh > 0) result += convertTwoDigits(lakh) + " lakh ";
    if (thousand > 0) result += convertTwoDigits(thousand) + " thousand ";
    if (hundred > 0) result += convertThreeDigits(hundred);

    return result.trim();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleNotificationChange = (event) => {
    const value = event.target.value === "sms" ? 1 : 0;
    setFormData({
      ...formData,
      SmsNotification: value,
      EmailNotification: value === 1 ? 0 : 1,
    });
  };

  const handleChange = (event, index, field) => {
    const { name, value } = event.target;

    if (index !== undefined && field !== undefined) {
      // Handling changes in remarks array (dynamic fields)
      const newRemarks = [...remarks];
      newRemarks[index][field] = value;
      setRemarks(newRemarks);
    } else {
      // Handling changes in main form fields
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));

      if (name === "Mobile" || name === "AlternateMobileNo") {
        const numericValue = value.replace(/\D/g, "");
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: numericValue,
        }));
      } else if (name === "flatCost") {
        const numericValue = value.replace(/,/g, "");
        const formattedValue = formatNumber(numericValue);
        const flatCostInWords = numberToWordsIndian(
          parseInt(numericValue || 0)
        );

        setFormData((prevFormData) => ({
          ...prevFormData,
          flatCost: formattedValue,
          flatCostInWords:
            flatCostInWords.charAt(0).toUpperCase() + flatCostInWords.slice(1),
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
    }
  };

  const formatNumber = (value) => {
    if (isNaN(value)) return value;
    return new Intl.NumberFormat().format(value);
  };

  useEffect(() => {
    if (formData.WingID) {
      axios
        .get(
          `https://apiforcorners.cubisysit.com/api/api-booking-floor.php?WingID=${formData.WingID}`
        )
        .then((response) => {
          if (response.data.status === "Success") {
            setFloor(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching wing data:", error);
        });
    }
  }, [formData.WingID]);

  useEffect(() => {
    axios
      .get(
        "https://apiforcorners.cubisysit.com/api/api-dropdown-projectinfo.php"
      )
      .then((response) => {
        if (response.data.status === "Success") {
          setProjectMaster(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching project master data:", error);
      });
  }, []);

  useEffect(() => {
    if (formData.ProjectID) {
      axios
        .get(
          `https://apiforcorners.cubisysit.com/api/api-fetch-projectwings.php?ProjectID=${formData.ProjectID}`
        )
        .then((response) => {
          if (response.data.status === "Success") {
            setWingData(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching wing data:", error);
        });
    }
  }, [formData.ProjectID]);
  useEffect(() => {
    if (formData.WingID && formData.ProjectID && formData.FloorNo) {
      axios
        .get(
          `https://apiforcorners.cubisysit.com/api/api-booking-flat.php?WingID=${formData.WingID}&ProjectID=${formData.ProjectID}&FloorNo=${formData.FloorNo}`
        )
        .then((response) => {
          if (response.data.status === "Success") {
            console.log("Flat No Data:", response.data.data); // Log the fetched data
            setFlatNoData(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching flat number data:", error);
        });
    }
  }, [formData.WingID, formData.ProjectID, formData.FloorNo]);

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

  const handleAddRemark = () => {
    setRemarks([...remarks, { remark: "", date: null }]);
  };

  const handleRemoveRemark = (index) => {
    const newRemarks = remarks.filter((_, i) => i !== index);
    setRemarks(newRemarks);
  };

  //   const handleAddRemark = () => {
  //     setRemarks([...remarks, { remark: "", date: null }]);
  //   };

  //   const handleRemoveRemark = (index) => {
  //     setRemarks(remarks.filter((_, i) => i !== index));
  //   };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    // const isValid = validateForm();

    // if (isValid) {
    const url = editData
      ? "https://ideacafe-backend.vercel.app/api/proxy/api-update-telecalling.php"
      : "https://ideacafe-backend.vercel.app/api/proxy/api-insert-telecalling.php";

    const dataToSend = editData
      ? {
          ...formData,
          ModifyUID: cookies.amr?.UserID || 1,
        }
      : {
          ...formData,
          CreateUID: cookies.amr?.UserID || 1, // Fallback to 1 if UserID is not found in cookies
        };

    console.log(dataToSend, "ALL the data of telecalling");
    try {
      const response = await axios.post(url, dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(dataToSend, "ALL the data of telecalling");

      if (response.data.status === "Success") {
        setFormData(initialFormData);

        // setSubmitSuccess(true);
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
    // } else {
    //   // Handle validation errors if any
    //   console.log("Form validation failed");
    // }
  };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();

  //     try {
  //       // Filter out remarks with empty values
  //       const validRemarks = remarks.filter(remark => remark.remark.trim() !== '' && remark.date !== null);

  //       if (validRemarks.length === 0) {
  //         setErrors(['At least one remark must have both text and date.']);
  //         return;
  //       }

  //       // Send valid remarks to your API
  //       const response = await axios.post('/your-api-endpoint', validRemarks);
  //       console.log('API response:', response.data);

  //       // Reset form after successful submission
  //       setRemarks([{ remark: '', date: null }]);
  //       setErrors([]);
  //     } catch (error) {
  //       console.error('Error submitting remarks:', error);
  //     }
  //   };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSubmitSuccess(false);
    setSubmitError(false);
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, BookingDate: date });
  };

  const handleDateRemarks = (date, index) => {
    const newRemarks = [...remarks];
    newRemarks[index].date = date;
    console.log(newRemarks, "date of remakrs");
    setRemarks(newRemarks);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      imageFile: file,
    });
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
                {editData
                  ? "Edit Rose Nagar Details"
                  : "Add Rose Nagar Details"}
              </Typography>
            </Box>
          </Grid>
          <form style={{ marginTop: "50px" }}>
            <Grid container spacing={7}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Project Name</InputLabel>
                  <Select
                    value={formData.ProjectID}
                    onChange={handleChange}
                    name="ProjectID"
                    label="Project Name"
                  >
                    {projectMaster.map((project) => (
                      <MenuItem
                        key={project.ProjectID}
                        value={project.ProjectID}
                      >
                        {project.ProjectName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Wings</InputLabel>
                  <Select
                    value={formData.WingID} // Corrected: Changed WingData to WingID
                    onChange={handleChange}
                    name="WingID" // Corrected: Changed WingData to WingID
                    label="Wings"
                  >
                    {wingData.map((wing) => (
                      <MenuItem key={wing.WingID} value={wing.WingID}>
                        {wing.WingName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Flat Floor</InputLabel>
                  <Select
                    value={formData.flatNo} // Corrected: Changed WingData to WingIDs
                    onChange={handleChange}
                    name="flatNo" // Corrected: Changed WingData to WingID
                    label="Floor Floor"
                  >
                    {floor.map((wing) => (
                      <MenuItem key={wing.FloorNo} value={wing.FloorNo}>
                        {wing.FloorNo}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <FormControl fullWidth>
                <InputLabel>Flat Number</InputLabel>
                <Select
                  value={formData.FlatNumber}
                  onChange={handleChange}
                  name="FlatNumber"
                  label="Flat Number"
                >
                  {flatNoData.map((flat) => (
                    <MenuItem key={flat.No} value={flat.No}>
                      {flat.No}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Grid item xs={8} sm={4}>
                <DatePicker
                  selected={formData.BookingDate}
                  onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  className="form-control"
                  customInput={
                    <TextField
                      fullWidth
                      label={<>Booking Date</>}
                      InputProps={{
                        readOnly: true,
                        sx: { width: "100%" },
                      }}
                    />
                  }
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Booked By</>}
                  //   type="tel"
                  name="BookedBy"
                  value={formData.BookedBy}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <input
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <label htmlFor="contained-button-file">
                  <Typography variant="body1" component="span">
                    Choose Image File
                  </Typography>
                </label>
                {formData.imageFile && (
                  <Typography variant="body1">
                    {formData.imageFile.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Name of Purchaser</>}
                  name="Name"
                  placeholder="Name of Purchaser"
                  value={formData.Name}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Address</>}
                  name="Address"
                  placeholder="Address"
                  value={formData.Address}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Pan Card Number</>}
                  name="pancard"
                  placeholder="Pan Card Number"
                  value={formData.pancard}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label="Mobile"
                  name="Mobile"
                  value={formData.Mobile || ""}
                  onChange={handleChange}
                  inputProps={{
                    pattern: "[0-9]*",
                    maxLength: 10,
                  }}
                />
                {/* Add error handling for Mobile if needed */}
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label="Email"
                  name="Email"
                  value={formData.Email || ""}
                  onChange={handleChange}
                />
                {/* Add error handling for Email if needed */}
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label="Type of Booking"
                  name="bookingType"
                  value={formData.bookingType || ""}
                  onChange={handleChange}
                />
                {/* Add error handling for Email if needed */}
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Area in Builtup</>}
                  name="area"
                  placeholder="Area in Builtup "
                  value={formData.area}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Rate per Sqft</>}
                  name="area"
                  placeholder="Area in Builtup "
                  value={formData.area}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>TTL Amount As Per Builtup</>}
                  name="ttlamount"
                  placeholder="TTL Amount as per Builtup "
                  value={formData.ttlamount}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Development Charges</>}
                  name="charges"
                  placeholder="Development Charges"
                  value={formData.charges}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Parking Facility</>}
                  name="parkingFacility"
                  placeholder="Parking Facility"
                  value={formData.parkingFacility}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label="Gross Flat Cost"
                  name="flatCost"
                  placeholder="Flat Cost"
                  value={formData.flatCost}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                    inputProps: { style: { textAlign: "left" } },
                  }}
                  type="text"
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label="Amount in Words"
                  name="flatCostInWords"
                  value={formData.flatCostInWords}
                  InputProps={{
                    readOnly: true,
                  }}
                  type="text"
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>GST</>}
                  name="gst"
                  placeholder="GST As per Govt. Notification"
                  value={formData.gst}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Stamp Duty</>}
                  name="stampduty"
                  placeholder="Stamp Duty"
                  value={formData.stampduty}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Registration</>}
                  name="registration"
                  placeholder="Registration"
                  value={formData.registration}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Advocate</>}
                  name="advocate"
                  placeholder="Advocate"
                  value={formData.advocate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label="Extra Cost "
                  name="extracost"
                  placeholder="Extra Cost"
                  value={formData.extracost}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                    inputProps: { style: { textAlign: "left" } },
                  }}
                  type="text"
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label="Total Cost"
                  name="totalCost"
                  placeholder="Total Cost"
                  value={formData.totalCost}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                    inputProps: { style: { textAlign: "left" } },
                  }}
                  type="text"
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Unsable Area in Sqft</>}
                  name="unsableArea"
                  placeholder="Unsable Area in sqft"
                  value={formData.unsableArea}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Agreemnent carpet (RERA) in Sqft</>}
                  name="agreementcarpet"
                  placeholder="Agreement Carpet "
                  value={formData.agreementcarpet}
                  onChange={handleChange}
                />
              </Grid>
              {remarks.map((remark, index) => (
                <Grid container item spacing={2} key={index}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label={`Remark ${index + 1}`}
                      name={`remark${index}`}
                      value={remark.remark}
                      onChange={(e) => handleChange(e, index, "remark")}
                    />
                  </Grid>
                  <Grid item xs={8} sm={4}>
                    <DatePicker
                      selected={remark.date}
                      onChange={(date) => handleDateRemarks(date, index)}
                      dateFormat="dd-MM-yyyy"
                      className="form-control"
                      customInput={
                        <TextField
                          fullWidth
                          label={<>Expected Date</>}
                          InputProps={{
                            readOnly: true,
                            sx: { width: "100%" },
                          }}
                        />
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      color="primary"
                      sx={{ color: "#1976d2" }} // Change color to your desired primary color
                      onClick={handleAddRemark}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      sx={{ color: "#f44336" }} // Change color to your desired secondary color
                      onClick={() => handleRemoveRemark(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      sx={{ color: "#4caf50" }} // Change color to your desired color
                    >
                      <EditIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              {/* <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddRemark}
                >
                  Add Remark
                </Button>
              </Grid> */}

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

export default FormRosenagar;
