import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import axios from 'axios';
import Button from '@mui/material/Button';

import EditIcon from '@mui/icons-material/Edit';
import GetAppIcon from '@mui/icons-material/GetApp';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {  Modal ,TextField , IconButton } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
const ListTellecalling  = ({ item, onDelete ,onEdit }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    NextFollowUpDate: '',
    NextFollowUpTime: '',
  });

  const [ setRowDataToUpdate] = useState(null);
  
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Handle saving the selected date and time
    console.log(formData);
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  useEffect(() => {
    const fetchData = async () => {
      if (!item) return; // Exit if no item is provided
      try {
        const apiUrl ='https://apiforcorners.cubisysit.com/api/api-singel-telecalling.php?Tid=${item.Tid}';

        const response = await axios.get(apiUrl);
        
        if (response.data.status === "Success") {
          console.log(response.data.data[0], 'Single telecalling data fetched');
          // Update item state with fetched data
          setRowDataToUpdate(response.data.data[0]);
        }
      } catch (error) {
        console.error('Error fetching single telecalling data:', error);
      }
    };
    fetchData();
  }, [item]);

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = onEdit
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

  const handleDelete = () => {
    if (onDelete) {
      onDelete(item.Tid); // Pass Tid to parent component for deletion
    }
  };

  return (
    <>
    <Grid container justifyContent="center" spacing={2} sx={{ marginBottom: 5 }}>
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
          onClick={handleSubmit}
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
        <>
      <Grid item>
        <Button
          variant="contained"
          onClick={handleOpen}
          startIcon={<PersonAddIcon />}
          sx={{
            mr:30,
            backgroundColor: '#f0f0f0',
            color: '#333333',
            fontSize: '0.6rem',
            minWidth: 'auto',
            minHeight: 20,
            '&:hover': {
              backgroundColor: '#dcdcdc',
            },
          }}
        >
          Next FollowUp 
        </Button>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            minWidth: 400,
            maxWidth: 500,
            mt: 5,
            mx: 2,
          }}

        >
           <IconButton
            aria-label="cancel"
            onClick={handleClose}
            sx={{ position: 'absolute', top: 6, right:10 , }}
          >
            <CancelIcon sx={{color:'red'}}/>
          </IconButton>
          <Typography id="modal-modal-title" variant="h7" component="h3" gutterBottom>
            Select Next Follow-Up Date and Time
          </Typography>

          <TextField
            fullWidth
            // label="Next Follow-Up Date"
            type="date"
            name="NextFollowUpDate"
            value={formData.NextFollowUpDate}
            onChange={handleChange}
            sx={{ mt: 3 }}
            InputLabelProps={{ sx: { mb: 1 } }}
          />
          <TextField
            fullWidth
            // label="Next Follow-Up Time"
            type="time"
            name="NextFollowUpTime"
            value={formData.NextFollowUpTime}
            onChange={handleChange}
            sx={{ mt: 3 }}
            InputLabelProps={{ sx: { mb: 1 } }}
          />
           <TextField
            fullWidth
            // label="Next Follow-Up Time"
            type="text"
            name="comment"
            label="Remark"
            value={formData.comment}
            onChange={handleChange}
            sx={{ mt: 3 }}
            InputLabelProps={{ sx: { mb: 1 } }} 
          />
          <Box sx={{ textAlign: 'left' }}>
          <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  marginRight: 3.5,
                  marginTop: 5,
                  backgroundColor: "#9155FD",
                  color: "#FFFFFF",
                }}
                // onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
    </Grid>
    <Card sx={{  }}>
      <Paper  sx={{ padding:5 }}>
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
              sx={{ fontWeight: 600, fontSize: "1.5rem" }}
            >
              {item?.PartyName}
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
          <div style={{ mr:5}}>
            <Typography
              variant="body2"
              sx={{  backgroundColor: "#f0f0f0",
                color: "#333333",
                fontSize: "0.7rem",
                minWidth: "auto",
                padding: "5px",
                borderRadius:2,
                minHeight: 20,
                marginLeft:2,
                "&:hover": {
                  backgroundColor: "#dcdcdc",
                
                },}}
            >
              Source Name: {item?.SourceName}
            </Typography>
          </div>
          <div style={{ marginRight: 5 }}>
            <Typography
              variant="body2"
              sx={{  backgroundColor: "#f0f0f0",
                color: "#333333",
                fontSize: "0.7rem",
                minWidth: "auto",
                padding: "5px",
                borderRadius:2,
                minHeight: 20,
                marginLeft:2,

                "&:hover": {
                  backgroundColor: "#dcdcdc",
                }, }}
            >
              Location: {item?.Location}
            </Typography>
          </div>
          <div style={{ marginRight: 5 }}>
            <Typography
              variant="body2"
              sx={{  backgroundColor: "#f0f0f0",
                color: "#333333",
                fontSize: "0.7rem",
                minWidth: "auto",
                padding: "5px",
                borderRadius:2,
                minHeight: 20,
                marginLeft:2,

                "&:hover": {
                  backgroundColor: "#dcdcdc",
                }, }}
            >
              Attended By: {item?.TelecallAttendedByName}
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
                <Typography variant="body2">{item?.Email}</Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                >
                  Project Name
                </Typography>
                <Typography variant="body2">{item?.ProjectName}</Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                >
                  Unit Type
                </Typography>
                <Typography variant="body2">{item?.UnittypeName}</Typography>
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
                  Estimated Budget
                </Typography>
                <Typography variant="body2">{item?.EstimatedbudgetName}</Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                >
                  Lead Status
                </Typography>
                <Typography variant="body2">{item?.leadstatusName}</Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                >
                  Next Follow Up-Date
                </Typography>
                <Typography variant="body2">{item?.NextFollowUpDate}</Typography>
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
                  Source Description
                </Typography>
                <Typography variant="body2">{item?.SourceDescription}</Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                >
                  Telecall Attended By
                </Typography>
                <Typography variant="body2">{item?.TelecallAttendedByName}</Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                >
                  Alternate Mobile Number
                </Typography>
                <Typography variant="body2">{item?.AlternateMobileNo}</Typography>
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
                  Comments
                </Typography>
                <Typography variant="body2">{item?.Comments}</Typography>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Card>
    </>
  );
};

export default ListTellecalling;
