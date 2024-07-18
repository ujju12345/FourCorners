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
import { useRouter } from 'next/router';

const FormRosenagar = ({ onFormSubmitSuccess ,  show, editData }) => {
  const router = useRouter();

  console.log(editData, "Edit data aaya");
  const initialRemark = { RemarkName: '', RemarkDate: null, Remarkamount: '' };
  const initialFormData = {
    BookingDate: null,
    BookedByID: "",
    Mobile: "",
    Name: "",
    Address: "",
    Pancard: "",
    Email: "",
    BookingType: "",
    area: "",
    TtlAmount: "",
    Charges: "",
    ParkingFacility: "",
    FlatCost: "",
    FlatCostInWords: "",
    Remarkamount:"",
    Gst: "",
    StampDuty: "",
    Registration: "",
    UnittypeID: "",
    Advocate: "",
    ExtraCost: "",
    TotalCost: "",
    UnsableArea: "",
    AgreementCarpet: "",
    Area: "",
    Remark: "",
    ProjectID: "",
    WingID: "",
    FlatNo: "",
    FlatNumber: "",
    FloorNo: "",
    Status: 1,
    CreateUID: 1,
  };

  const [remarks, setRemarks] = useState([{ ...initialRemark }]);
  const [formData, setFormData] = useState(initialFormData);
  const [projectMaster, setProjectMaster] = useState([]);
  const [floor, setFloor] = useState([]);
  const [flatNoData, setFlatNoData] = useState([]);
  const [unitTypeData, setUnitTypeData] = useState([]);
  // const [showForm, setShowForm] = useState(true);
  const [titles, setTitles] = useState([]);
  const [errors, setErrors] = useState({});
  const [wingData, setWingData] = useState([]);
  const [bookedByOptions, setBookedByOptions] = useState([]);
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
      } else if (name === "FlatCost" || name === "Amount") {
        const numericValue = value.replace(/,/g, "");
        const formattedValue = formatNumber(numericValue);
        const FlatCostInWords = numberToWordsIndian(
          parseInt(numericValue || 0)
        );

        setFormData((prevFormData) => ({
          ...prevFormData,
          FlatCost: formattedValue,
          FlatCostInWords:
            FlatCostInWords.charAt(0).toUpperCase() + FlatCostInWords.slice(1),
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
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-usersales.php');
        if (response.data && response.data.data) {
          setBookedByOptions(response.data.data); // Use response.data.data to set the options
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

  useEffect(() => {
    const fetchUnitTypeData = async () => {
      try {
        const response = await axios.get(
          `https://apiforcorners.cubisysit.com/api/api-booking-type.php`,
          {
            params: {
              WingID: formData.WingID,
              ProjectID: formData.ProjectID,
              FloorNo: formData.FloorNo,
              FlatNo: formData.FlatNo,
            },
          }
        );

        if (response.data.status === "Success") {
          console.log("Unit Type Data:", response.data.data);
          setUnitTypeData(response.data.data);
        } else {
          console.error(
            "API request failed with status:",
            response.data.status
          );
        }
      } catch (error) {
        console.error("Error fetching unit type data:", error);
      }
    };

    if (formData.FlatNo) {
      fetchUnitTypeData();
    }
  }, [formData.FlatNo, formData.WingID, formData.ProjectID, formData.FloorNo]);

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
    setRemarks([...remarks, { ...initialRemark }]);
  };

  const handleRemoveRemark = (index) => {
    const updatedRemarks = [...remarks];
    updatedRemarks.splice(index, 1);
    setRemarks(updatedRemarks);
  };

  //   const handleAddRemark = () => {
  //     setRemarks([...remarks, { remark: "", date: null }]);
  //   };

  //   const handleRemoveRemark = (index) => {
  //     setRemarks(remarks.filter((_, i) => i !== index));
  //   };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const url = editData
      ? "https://ideacafe-backend.vercel.app/api/proxy/api-update-telecalling.php"
      : "https://ideacafe-backend.vercel.app/api/proxy/api-insert-projectbooking.php";
  
    const dataToSend = editData
      ? {
          ...formData,
          ModifyUID: cookies.amr?.UserID || 1,
          remarks: remarks.map(({ RemarkName, RemarkDate, Status }) => ({
            RemarkName,
            RemarkDate: RemarkDate.toISOString().split("T")[0],
            Status,
          })),
        }
      : {
          ...formData,
          CreateUID: cookies.amr?.UserID || 1,
          remarks: remarks.map(({ RemarkName, RemarkDate, Status }) => ({
            RemarkName,
            RemarkDate: RemarkDate.toISOString().split("T")[0],
            Status,
          })),
        };
  
    try {
      const response = await axios.post(url, dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.data.status === "Success") {
        const { BookingID } = response.data; // Extract BookingID from response
        onFormSubmitSuccess(BookingID); 
        setFormData(initialFormData);
        setRemarks([{ ...initialRemark }]);
        // show(false);
  
        // Optionally show success message
        Swal.fire({
          icon: "success",
          title: editData ? "Data Updated Successfully" : "Data Added Successfully",
          showConfirmButton: false,
          timer: 1000,
        });
  
        // Navigate to the desired page with BookingID
        // window.location.href = `/TemplateRosenagar?BookingID=${BookingID}`;
  
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.error("There was an error!", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
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
    const updatedRemarks = [...remarks];
    updatedRemarks[index] = { ...updatedRemarks[index], RemarkDate: date };
    setRemarks(updatedRemarks);
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
                    {projectMaster.map((project, index) => (
                      <MenuItem
                        key={`${project.ProjectID}-${index}`}
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
                    value={formData.WingID}
                    onChange={handleChange}
                    name="WingID"
                    label="Wings"
                  >
                    {wingData.map((wing, index) => (
                      <MenuItem
                        key={`${wing.WingID}-${index}`}
                        value={wing.WingID}
                      >
                        {wing.WingName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Floor</InputLabel>
                  <Select
                    value={formData.FloorNo}
                    onChange={handleChange}
                    name="FloorNo"
                    label="Floor"
                  >
                    {floor.map((wing, index) => (
                      <MenuItem
                        key={`${wing.FloorNo}-${index}`}
                        value={wing.FloorNo}
                      >
                        {wing.FloorNo}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Flat Number</InputLabel>
                  <Select
                    value={formData.FlatNo}
                    onChange={handleChange}
                    name="FlatNo"
                    label="Flat Number"
                  >
                    {flatNoData.map((flat, index) => (
                      <MenuItem
                        key={`${flat.FlatNo}-${index}`}
                        value={flat.FlatNo}
                      >
                        {flat.FlatNo}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Unit Type</InputLabel>
                  <Select
                    value={formData.UnittypeID}
                    onChange={handleChange}
                    name="UnittypeID"
                    label="Unit Type"
                  >
                    {unitTypeData.map((unit) => (
                      <MenuItem key={unit.UnittypeID} value={unit.UnittypeID}>
                        {unit.UnittypeName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

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
      <FormControl fullWidth>
        <InputLabel>Booked By</InputLabel>
        <Select
          name="BookedByID"
          value={formData.BookedByID}
          onChange={handleChange}
          label="Booked By"
        >
          {bookedByOptions?.map((option) => (
            <MenuItem key={option.UserID} value={option.UserID}>
              {option.Name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

              {/* <Grid item xs={12} sm={4}>
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
              </Grid> */}
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
                  name="Pancard"
                  placeholder="Pan Card Number"
                  value={formData.Pancard}
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
                  name="BookingType"
                  value={formData.BookingType || ""}
                  onChange={handleChange}
                />
                {/* Add error handling for Email if needed */}
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Area in Builtup</>}
                  name="Area"
                  placeholder="Area in Builtup "
                  value={formData.Area}
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
                  name="TtlAmount"
                  placeholder="TTL Amount as per Builtup "
                  value={formData.TtlAmount}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Development Charges</>}
                  name="Charges"
                  placeholder="Development Charges"
                  value={formData.Charges}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Parking Facility</>}
                  name="ParkingFacility"
                  placeholder="Parking Facility"
                  value={formData.ParkingFacility}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label="Gross Flat Cost"
                  name="FlatCost"
                  placeholder="Flat Cost"
                  value={formData.FlatCost}
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
                  name="FlatCostInWords"
                  value={formData.FlatCostInWords}
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
                  name="Gst"
                  placeholder="GST As per Govt. Notification"
                  value={formData.Gst}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Stamp Duty</>}
                  name="StampDuty"
                  placeholder="Stamp Duty"
                  value={formData.StampDuty}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Registration</>}
                  name="Registration"
                  placeholder="Registration"
                  value={formData.Registration}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Advocate</>}
                  name="Advocate"
                  placeholder="Advocate"
                  value={formData.Advocate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label="Extra Cost "
                  name="ExtraCost"
                  placeholder="Extra Cost"
                  value={formData.ExtraCost}
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
                  name="TotalCost"
                  placeholder="Total Cost"
                  value={formData.TotalCost}
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
                  name="UnsableArea"
                  placeholder="Unsable Area in sqft"
                  value={formData.UnsableArea}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={8} sm={4}>
                <TextField
                  fullWidth
                  label={<>Agreemnent carpet (RERA) in Sqft</>}
                  name="AgreementCarpet"
                  placeholder="Agreement Carpet "
                  value={formData.AgreementCarpet}
                  onChange={handleChange}
                />
              </Grid>
              {remarks.map((remark, index) => (
        <Grid container item spacing={2} key={index}>
          <Grid item xs={2}>
            <TextField
              fullWidth
              label={`Amount ${index + 1}`}
              value={remark.Remarkamount}
              onChange={(e) => handleChange(e, index, 'Remarkamount')}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                inputProps: { style: { textAlign: 'left' } },
              }}
              type="text"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label={`Remark ${index + 1}`}
              value={remark.RemarkName}
              onChange={(e) => handleChange(e, index, 'RemarkName')}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <DatePicker
              selected={remark.RemarkDate}
              onChange={(date) => handleDateRemarks(date, index)}
              dateFormat="dd-MM-yyyy"
              className="form-control"
              customInput={<TextField fullWidth label={<>Expected Date</>} />}
            />
          </Grid>
          <IconButton color="primary" sx={{ color: '#1976d2' }} onClick={handleAddRemark}>
            <AddIcon />
          </IconButton>
          <IconButton color="primary" sx={{ color: '#f44336' }} onClick={() => handleRemoveRemark(index)}>
            <DeleteIcon />
          </IconButton>
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
