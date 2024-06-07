import React, { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InsertEnquirySource = ({ show }) => {
  const [formData, setFormData] = useState({
    NameOfCompany: '',
    ProjectName: '',
    Source: '',
    FromDate: null,
    ToDate: null,
    SourceName: '',
    SourceAddress: '',
    ActiveTillDate: null,
    ContactNumber: '',
    TotalCost: '',
    Status: 1, // Assuming status is always 1
    CreateUID: 1, // Assuming a default value for CreateUID
    CreateDate: '', // Assuming this will be set automatically
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.NameOfCompany) newErrors.NameOfCompany = "Name of Company is required";
    if (!formData.FromDate) newErrors.FromDate = "From Date is required";
    if (!formData.ToDate) newErrors.ToDate = "To Date is required";
    if (!formData.SourceName) newErrors.SourceName = "Source Name is required";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const body = {
      ...formData,
      CreateDate: new Date().toISOString(), // Set current date as CreateDate
    };

    try {
      const response = await axios.post(
        "https://ideacafe-backend.vercel.app/api/proxy/api-insert-enquirysource.php",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
    }
      );

      if (response.data.status === "Success") {
        setSubmitSuccess(true);
        setSubmitError(false);
        show(false);
        // Clear form fields
        setFormData({
          NameOfCompany: '',
          ProjectName: '',
          Source: '',
          FromDate: null,
          ToDate: null,
          SourceName: '',
          SourceAddress: '',
          ActiveTillDate: null,
          ContactNumber: '',
          TotalCost: '',
          Status: 1,
          CreateUID: 1,
          CreateDate: '',
        });
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
                  Insert Enquiry Source Details
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Name of Company"
                placeholder="Name of Company"
                value={formData.NameOfCompany}
                onChange={handleInputChange}
                name="NameOfCompany"
                error={!!errors.NameOfCompany}
                helperText={errors.NameOfCompany}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Project Name"
                placeholder="Project Name"
                value={formData.ProjectName}
                onChange={handleInputChange}
                name="ProjectName"
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Source"
                placeholder="Source"
                value={formData.Source}
                onChange={handleInputChange}
                name="Source"
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <DatePicker
                selected={formData.FromDate}
                onChange={(date) => handleDateChange("FromDate", date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                customInput={
                  <TextField
                    fullWidth
                    label="From Date"
                    InputProps={{
                      readOnly: true,
                      sx: { width: "100%" },
                    }}
                    error={!!errors.FromDate}
                    helperText={errors.FromDate}
                  />
                }
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <DatePicker
                selected={formData.ToDate}
                onChange={(date) => handleDateChange("ToDate", date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                customInput={
                  <TextField
                    fullWidth
                    label="To Date"
                    InputProps={{
                      readOnly: true,
                      sx: { width: "100%" },
                    }}
                    error={!!errors.ToDate}
                    helperText={errors.ToDate}
                  />
                }
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Source Name"
                placeholder="Source Name"
                value={formData.SourceName}
                onChange={handleInputChange}
                name="SourceName"
                error={!!errors.SourceName}
                helperText={errors.SourceName}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Source Address"
                placeholder="Source Address"
                value={formData.SourceAddress}
                onChange={handleInputChange}
                name="SourceAddress"
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <DatePicker
                selected={formData.ActiveTillDate}
                onChange={(date) => handleDateChange("ActiveTillDate", date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                customInput={
                  <TextField
                    fullWidth
                    label="Active Till Date"
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
                label="Contact Number"
                placeholder="Contact Number"
                value={formData.ContactNumber}
                onChange={handleInputChange}
                name="ContactNumber"
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Total Cost"
                placeholder="Total Cost"
                value={formData.TotalCost}
                onChange={handleInputChange}
                name="TotalCost"
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
      </CardContent>
    </Card>
  );
};

export default InsertEnquirySource;
