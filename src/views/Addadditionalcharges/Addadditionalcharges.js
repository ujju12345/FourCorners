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

const InsertAdditionalCharges = ({ show }) => {
  const [formData, setFormData] = useState({
    ProjectName: "",
    SubProject: "",
    StartDate: null,
    EndDate: null,
    VoucherType: "",
    ParticularsOfAdditionalCharges: "",
    IncludeInPaymentSchedule: "",
    TypeOfAdditionalCharges: "",
    SaleArea: "",
    RatePerUOM: "",
    UnitType: "",
    UnitTypeAmount: "",
    FixedAmount: "",
    NoOfMonths: "",
    Status: 1,
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
    if (!formData.ProjectName) newErrors.ProjectName = "Project Name is required";
    if (!formData.SubProject) newErrors.SubProject = "Sub Project is required";
    if (!formData.StartDate) newErrors.StartDate = "Start Date is required";
    if (!formData.EndDate) newErrors.EndDate = "End Date is required";
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
    };

    try {
      const response = await axios.post(
        "https://ideacafe-backend.vercel.app/api/proxy/api-insert-additionalcharges.php",
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
          ProjectName: "",
          SubProject: "",
          StartDate: null,
          EndDate: null,
          VoucherType: "",
          ParticularsOfAdditionalCharges: "",
          IncludeInPaymentSchedule: "",
          TypeOfAdditionalCharges: "",
          SaleArea: "",
          RatePerUOM: "",
          UnitType: "",
          UnitTypeAmount: "",
          FixedAmount: "",
          NoOfMonths: "",
          Status: 1,
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
                  Insert Additional Charges
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Project Name"
                placeholder="Project Name"
                value={formData.ProjectName}
                onChange={handleInputChange}
                name="ProjectName"
                error={!!errors.ProjectName}
                helperText={errors.ProjectName}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Sub Project"
                placeholder="Sub Project"
                value={formData.SubProject}
                onChange={handleInputChange}
                name="SubProject"
                error={!!errors.SubProject}
                helperText={errors.SubProject}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <DatePicker
                selected={formData.StartDate}
                onChange={(date) => handleDateChange("StartDate", date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                customInput={
                  <TextField
                    fullWidth
                    label="Start Date"
                    InputProps={{
                      readOnly: true,
                      sx: { width: "100%" },
                    }}
                    error={!!errors.StartDate}
                    helperText={errors.StartDate}
                  />
                }
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <DatePicker
                selected={formData.EndDate}
                onChange={(date) => handleDateChange("EndDate", date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                customInput={
                  <TextField
                    fullWidth
                    label="End Date"
                    InputProps={{
                      readOnly: true,
                      sx: { width: "100%" },
                    }}
                    error={!!errors.EndDate}
                    helperText={errors.EndDate}
                  />
                }
              />
            </Grid>

            {/* Add other fields here */}

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

export default InsertAdditionalCharges;
