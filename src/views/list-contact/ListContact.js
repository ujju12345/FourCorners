import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import HistoryIcon from "@mui/icons-material/History";
import EditIcon from "@mui/icons-material/Edit";
import GetAppIcon from "@mui/icons-material/GetApp";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Modal, TextField, IconButton, Menu, MenuItem , FormControl , InputLabel , Select} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Swal from 'sweetalert2';

const ListContact = ({ item, onDelete, onEdit , onHistoryClick }) => {

  const intialName = {
    Tid: "",
    CurrentUpdateID: "",
    NextFollowUpDate: "",
    NextFollowUpTime: "",
    Interest: "",
    Note: "",
    CreateUID: 1,
  }




  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(intialName);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [bhkOptions, setBhkOptions] = useState([]);
  const [currentUpdate, setCurrentUpdate] = useState([]);

  const [setRowDataToUpdate] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleCurrentUpdate = (event) => {
    setFormData({
      ...formData,
      CurrentUpdateID: event.target.value,
    });
  };

  useEffect(() => {
    fetchDataCurrent();
  }, []);

  const fetchDataCurrent = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-currentupdate.php"
      );
      setCurrentUpdate(response.data.data || []);
    } catch (error) {
      console.error("Error fetching Bhk data:", error);
    }
  };




  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleAddFollowUpClick = () => {
    handleDropdownClose();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log(formData);
    setOpen(false);
  };

  const handleHistoryClick = () => {
    if (onHistoryClick) {
      // toggleSidebar(false);
      onHistoryClick(item); // Pass item to parent component for showing history
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!item) return; // Exit if no item is provided
      try {
        const apiUrl = `https://apiforcorners.cubisysit.com/api/api-singel-contacts.php?Cid=${item.Cid}`;

        const response = await axios.get(apiUrl);

        if (response.data.status === "Success") {
          console.log(response.data.data[0], "Single telecalling data fetched");
          // Update item state with fetched data
          setRowDataToUpdate(response.data.data[0]);
        }
      } catch (error) {
        console.error("Error fetching single telecalling data:", error);
      }
    };
    fetchData();
  }, [item]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Ensure item and Tid are available
    if (!item || !item.Tid) {
      console.error('No valid item or Tid found.');
      return;
    }
  
    // Add Tid to formData
    const formDataWithTid = {
      ...formData,
      Tid: item.Tid
    };
  
    const url = "https://ideacafe-backend.vercel.app/api/proxy/api-insert-nextfollowup.php";
  
    try {
      const response = await axios.post(url, formDataWithTid, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.data.status === "Success") {
        setFormData(intialName);
        setOpen(false);
        setSubmitSuccess(true);
        setSubmitError(false);
        // Show success message using SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Follow-up details saved successfully.',
        });
      } else {
        setSubmitSuccess(false);
        setSubmitError(true);
        // Show error message using SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again later.',
        });
      }
    } catch (error) {
      console.error("There was an error!", error);
      setSubmitSuccess(false);
      setSubmitError(true);
      // Show error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again later.',
      });
    }
  };
  

  const jsonToCSV = (json) => {
    const header = Object.keys(json[0]).join(",");
    const values = json.map((obj) => Object.values(obj).join(",")).join("\n");
    return `${header}\n${values}`;
  };

  const downloadCSV = () => {
    const csvData = [
      {
        "Party Name": item.PartyName,
        Mobile: item.Mobile,
        Email: item.Email,
        "Project Name": item.ProjectName,
        "Unit Type": item.UnittypeName,
        "Estimated Budget": item.EstimatedbudgetName,
        "Lead Status": item.leadstatusName,
        "Next Follow Up-Date": item.NextFollowUpDate,
        "Source Description": item.SourceDescription,
        "Telecall Attended By": item.TelecallAttendedByName,
        "Alternate Mobile Number": item.AlternateMobileNo,
        Comments: item.Comments,
        "Source Name": item.SourceName,
        Location: item.Location,
        "Attended By": item.TelecallAttendedByName,
      },
    ];

    const csv = jsonToCSV(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Telecalling.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(item); // Pass item to parent component for editing
    }
  };



  return (
    <>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{ marginBottom: 5 }}
      >
        <Grid item>
          <Button
            variant="contained"
            onClick={handleEdit}
            startIcon={<EditIcon />}
            sx={{
              backgroundColor: "#f0f0f0", // Light gray background color
              color: "#333333", // Dark gray text color
              fontSize: "0.6rem",
              minWidth: "auto",
              minHeight: 20, // Decrease button height
              "&:hover": {
                backgroundColor: "#dcdcdc", // Darken background on hover
              },
            }}
          >
            Edit Details
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={downloadCSV}
            startIcon={<GetAppIcon />}
            sx={{
              backgroundColor: "#f0f0f0",
              color: "#333333",
              fontSize: "0.6rem",
              minWidth: "auto",
              minHeight: 20,
              "&:hover": {
                backgroundColor: "#dcdcdc",
              },
            }}
          >
            Download
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            // onClick={handleSubmit}
            startIcon={<GroupIcon />}
            sx={{
              backgroundColor: "#f0f0f0",
              color: "#333333",
              fontSize: "0.6rem",
              minWidth: "auto",
              minHeight: 20,
              "&:hover": {
                backgroundColor: "#dcdcdc",
              },
            }}
          >
            Group Transfer
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleDropdownClick}
            startIcon={<PersonAddIcon />}
            sx={{
              mr: 30,
              backgroundColor: "#f0f0f0",
              color: "#333333",
              fontSize: "0.6rem",
              minWidth: "auto",
              minHeight: 20,
              "&:hover": {
                backgroundColor: "#dcdcdc",
              },
            }}
          >
            Next FollowUp
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleDropdownClose}
          >
            <MenuItem onClick={handleAddFollowUpClick}>
              <AddIcon sx={{ mr: 1 }} />
              Add Follow Up
            </MenuItem>
            <MenuItem onClick={handleHistoryClick}>
              <HistoryIcon sx={{ mr: 1 }} />
              History
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 500,
            maxWidth: 700, // Adjust the maxWidth to accommodate two text fields in a row
            mt: 5,
            mx: 2,
            minHeight: 400, // Adjust the minHeight to increase the height of the modal
            height: 'auto', 
          }}
        >
          <IconButton
            aria-label="cancel"
            onClick={handleClose}
            sx={{ position: "absolute", top: 6, right: 10 }}
          >
            <CancelIcon sx={{ color: "red" }} />
          </IconButton>
          <Typography
            id="modal-modal-title"
            variant="h7"
            component="h3"
            gutterBottom
          >
            Select Next Follow-Up Date and Time
          </Typography>

          <Grid container spacing={2} mt={8}>
     

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Current Update</InputLabel>
                <Select
                  value={formData.CurrentUpdateID}
                  onChange={handleCurrentUpdate}
                  label="Current Update"
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 180, // Adjust as needed
                      },
                    },
                  }}
                  
                >
                  {currentUpdate.map((bhk) => (
                    <MenuItem  key={bhk.CurrentUpdateID} value={bhk.CurrentUpdateID}>
                      {bhk.CurrentUpdateName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>


            <Grid item xs={6}>
              <TextField
                fullWidth
                // label="Next Follow-Up Date"
                type="date"
                name="NextFollowUpDate"
                value={formData.NextFollowUpDate}
                onChange={handleChange}
                InputLabelProps={{ sx: { mb: 1 } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                // label="Next Follow-Up Time"
                type="time"
                name="NextFollowUpTime"
                value={formData.NextFollowUpTime}
                onChange={handleChange}
                InputLabelProps={{ sx: { mb: 1 } }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Interest In"
                type="text"
                name="Interest"
                value={formData.Interest}
                onChange={handleChange}
                InputLabelProps={{ sx: { mb: 1 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Note"
                type="text"
                name="Note"
                value={formData.Note}
                onChange={handleChange}
                InputLabelProps={{ sx: { mb: 1 } }}
              />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "left" }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  marginRight: 3.5,
                  marginTop: 15,
                  backgroundColor: "#9155FD",
                  color: "#FFFFFF",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Box>
        </Box>
      </Modal>
      <Card sx={{}}>
        <Paper sx={{ padding: 5 }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: 5,
            }}
          >
            <Avatar
              alt="Ujjawal"
              src="/images/avatars/4.png"
              sx={{ width: 60, height: 60, mr: 6 }}
            />
            <Box sx={{ flex: "1 1" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 500, fontSize: "1.0rem" }}
              >
                {item?.CName}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem" }}>
                {item?.Mobile}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              ml: 20,
            }}
          >
            <div style={{ mr: 5 }}>
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: "#f0f0f0",
                  color: "#333333",
                  fontSize: "0.7rem",
                  minWidth: "auto",
                  padding: "5px",
                  borderRadius: 2,
                  minHeight: 20,
                  marginLeft: 2,
                  "&:hover": {
                    backgroundColor: "#dcdcdc",
                  },
                }}
              >
                Source: {item?.SourceName}
              </Typography>
            </div>
             <div style={{ marginRight: 5 }}>
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: "#f0f0f0",
                  color: "#333333",
                  fontSize: "0.7rem",
                  minWidth: "auto",
                  padding: "5px",
                  borderRadius: 2,
                  minHeight: 20,
                  marginLeft: 2,

                  "&:hover": {
                    backgroundColor: "#dcdcdc",
                  },
                }}
              >
                City: {item?.CityName}
              </Typography>
            </div> 
            <div style={{ marginRight: 5 }}>
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: "#f0f0f0",
                  color: "#333333",
                  fontSize: "0.7rem",
                  minWidth: "auto",
                  padding: "5px",
                  borderRadius: 2,
                  minHeight: 20,
                  marginLeft: 2,

                  "&:hover": {
                    backgroundColor: "#dcdcdc",
                  },
                }}
              >
                Attended By: {item?.Name}
              </Typography>
            </div>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              ml: 12,
              mt: 15,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <div>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, fontSize: "1.0rem" }}
                  >
                    Email
                  </Typography>
                  <Typography variant="body2" sx={{  fontSize: "0.8rem" }}>{item?.Email}</Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                  >
                    Customer Type
                  </Typography>
                  <Typography variant="body2" sx={{  fontSize: "0.8rem" }}>{item?.CustomerTypeName}</Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                  >
                    Contact Type
                  </Typography>
                  <Typography variant="body2" sx={{  fontSize: "0.8rem" }}>{item?.ContactName}</Typography>
                </div>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              ml: 12,
              mt: 12,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <div>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, fontSize: "1.0rem" }}
                  >
                    Alternate Mobile Number
                  </Typography>
                  <Typography variant="body2" sx={{  fontSize: "0.8rem" }}>
                    {item?.OtherNumbers}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                  >
                    Country Code
                  </Typography>
                  <Typography variant="body2" sx={{  fontSize: "0.8rem" }}>
                    {item?.CountryName}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                  >
                   City Name
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                    {item?.CityName}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              ml: 12,
              mt: 12,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <div>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, fontSize: "1.0rem" }}
                  >
                    Source 
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                    {item?.SourceName}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                  >
                    Source Type
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                    {item?.SourceTypename}
                  </Typography>
                </div>
              </Grid>
              {/* <Grid item xs={4}>
                <div>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                  >
                    Alternate Mobile Number
                  </Typography>
                  <Typography variant="body2">
                    {item?.AlternateMobileNo}
                  </Typography>
                </div>
              </Grid> */}
            </Grid>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              ml: 12,
              mt: 12,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <div>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, fontSize: "1.0rem" }}
                  >
                    Telecall Attended By 
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>{item?.Name}</Typography>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Card>
    </>
  );
};

export default ListContact;
