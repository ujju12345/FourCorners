import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import axios from 'axios';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {  Modal ,TextField , IconButton } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';
const ListTellecalling  = ({ item, onDelete }) => {
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
        
      }
    };
    fetchData();
  }, [item]);



  return (
    

      <Card sx={{ mt: 8 }}>
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
          Convert to Lead
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
        {/* {filteredRows.map((row, index) => ( */}
        <Paper>
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
              <Typography  sx={{ fontSize: "0.9rem" }}>
                {item?.Mobile}
              </Typography>
            </Box>
          </Box>
          {/* Source and its number */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
            
              alignItems: "center",
              ml: 20,
              mt: 5,
            }}
          >
            <Card sx={{ marginRight: 3 }}>
              <Typography
                
                sx={{ fontSize: "0.9rem", marginLeft: 2 }}
              >
                • {item?.SourceName}
              </Typography>
            </Card>
            <Card sx={{ marginRight: 5 }}>
              <Typography
                
                sx={{ fontSize: "0.9rem", marginLeft: 2 }}
              >
               • {item?.Location}
              </Typography>
            </Card>
            <Card sx={{ marginRight: 5 }}>
              <Typography
                
                sx={{ fontSize: "0.9rem", marginLeft: 2 }}
              >
               • {item?.TelecallAttendedByName}
              </Typography>
            </Card>
          </Box>
          {/* Email and API email data */}
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
              {/* Email text */}
              <Grid item xs={4}>
                <Card>
                  <Typography
                    
                    sx={{ fontWeight: 600, fontSize: "1.0rem" }}
                  >
                    Email 
                  </Typography>
                  {/* Render email data from API below */}
                  <Typography variant="body2">{item?.Email}</Typography>
                </Card>
              </Grid>
              {/* API email data */}
              <Grid item xs={4}>
                <Card>
                  <Typography
                    
                    sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                  >
                    Project Name
                  </Typography>
                  {/* Render email data from API below */}
                  <Typography variant="body2">{item?.ProjectName}</Typography>
                </Card>
              </Grid>
              {/* Another API email data */}
              <Grid item xs={4}>
                <Card>
                  <Typography
                    
                    sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                  >
                    Unit Type
                  </Typography>
                  {/* Render email data from API below */}
                  <Typography variant="body2">{item?.UnittypeName}</Typography>
                </Card>
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
              {/* Email text */}
              <Grid item xs={4}>
                <Card>
                  <Typography
                    
                    sx={{ fontWeight: 600, fontSize: "1.0rem" }}
                  >
                    Estimated budget 
                  </Typography>
                  {/* Render email data from API below */}
                  <Typography variant="body2">{item?.EstimatedbudgetName}</Typography>
                </Card>
              </Grid>
              {/* API email data */}
              <Grid item xs={4}>
                <Card>
                  <Typography
                    
                    sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                  >
                    Lead Status
                  </Typography>
                  {/* Render email data from API below */}
                  <Typography variant="body2">{item?.leadstatusName}</Typography>
                </Card>
              </Grid>
              {/* Another API email data */}
              <Grid item xs={4}>
                <Card>
                  <Typography
                    
                    sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                  >
                   Next Follow Up-Date
                  </Typography>
                  {/* Render email data from API below */}
                  <Typography variant="body2">{item?.NextFollowUpDate}</Typography>
                </Card>
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
              {/* Email text */}
              <Grid item xs={4}>
                <Card>
                  <Typography
                    
                    sx={{ fontWeight: 600, fontSize: "1.0rem" }}
                  >
                   Source Description
                  </Typography>
                  {/* Render email data from API below */}
                  <Typography variant="body2">{item?.SourceDescription}</Typography>
                </Card>
              </Grid>
              {/* API email data */}
              <Grid item xs={4}>
                <Card>
                  <Typography
                    
                    sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                  >
                    Telecall Attended By
                  </Typography>
                  {/* Render email data from API below */}
                  <Typography variant="body2">{item?.TelecallAttendedByName}</Typography>
                </Card>
              </Grid>
              {/* Another API email data */}
              <Grid item xs={4}>
                <Card>
                  <Typography
                    
                    sx={{ fontSize: "1.0rem", fontWeight: 600 }}
                  >
                  Alternate Mobile Number
                  </Typography>
                  {/* Render email data from API below */}
                  <Typography variant="body2">{item?.AlternateMobileNo}</Typography>
                </Card>
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
              {/* Email text */}
              <Grid item xs={4}>
                <Card>
                  <Typography
                    
                    sx={{ fontWeight: 600, fontSize: "1.0rem" }}
                  >
                    Comments
                  </Typography>
                  {/* Render email data from API below */}
                  <Typography variant="body2">{item?.Comments}</Typography>
                </Card>
              </Grid>
              {/* API email data */}
           
            </Grid>
          </Box>
      
        </Paper>
        {/* ))} */}
        {/* <CardContent sx={{ pt: theme => ${theme.spacing(2.25)} !important }}>
        <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
          <Typography variant='h4' sx={{ fontWeight: 600, fontSize: '2.125rem !important' }}>
            $24,895
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
            <MenuUp sx={{ fontSize: '1.875rem', verticalAlign: 'middle' }} />
            <Typography variant='body2' sx={{ fontWeight: 600, color: 'success.main' }}>
              10%
            </Typography>
          </Box>
        </Box>

        <Typography component='p' variant='caption' sx={{ mb: 10 }}>
          Compared to $84,325 last year
        </Typography>

        {data.map((item, index) => {
          return (
            <Box
              key={item.title}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ...(index !== data.length - 1 ? { mb: 8.5 } : {})
              }}
            >
              <Avatar
                variant='rounded'
                sx={{
                  mr: 3,
                  width: 40,
                  height: 40,
                  backgroundColor: theme => rgba(${theme.palette.customColors.main}, 0.04)
                }}
              >
                <img src={item.imgSrc} alt={item.title} height={item.imgHeight} />
              </Avatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant='caption'>{item.subtitle}</Typography>
                </Box>

                <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                    {item.amount}
                  </Typography>
                  <LinearProgress color={item.color} value={item.progress} variant='determinate' />
                </Box>
              </Box>
            </Box>
          )
        })}
      </CardContent> */}
      </Card>

   
  );
};

export default ListTellecalling;
