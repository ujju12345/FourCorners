// ** React Imports
import React, { useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import axios from "axios";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

const TabAccount = ({ show }) => {
  const [companyName, setCompanyName] = useState("");
  const [errors, setErrors] = useState({});
  const [cookies] = useCookies(["amr"]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});

      const formData = {
        CreateUID: cookies.amr?.UserID || 1,
        CompanyName: companyName,
        Status: 1,
      };

      axios
        .post(
          "https://ideacafe-backend.vercel.app/api/proxy/api-insert-companymaster.php",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.status === "Success") {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Company details added successfully",
            });
            setCompanyName(""); // Clear input after successful submission
            show(); // Assuming this function handles hiding the form or navigating away
          } else {
            Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Failed to add company details",
            });
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "An error occurred while submitting the form",
          });
        });
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!companyName) {
      newErrors.companyName = "Company Name is required";
    }
    return newErrors;
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
    if (event.target.value) {
      setErrors((prevErrors) => ({ ...prevErrors, companyName: "" }));
    }
  };

  const handleNavigation = () => {
    show("list"); // Assuming this function handles navigating to a different view
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: 20 }}>
                  Add Company Details
                </Typography>
             
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                placeholder="Company Name"
                value={companyName}
                onChange={handleCompanyNameChange}
                name="companyName"
                error={!!errors.companyName}
                helperText={errors.companyName}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default TabAccount;
