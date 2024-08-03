import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";

const UploadExcel = ({ show, rowData }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [parkingFile, setParkingFile] = useState(null);
  const [projectMaster, setProjectMaster] = useState([]);
  const [formData, setFormData] = useState({
    ProjectID: "",
    WingID: "",
    Status: 1,
    CreateUID: 1,
  });

  const [wingData, setWingData] = useState([]);

  useEffect(() => {
    axios
      .get("https://apiforcorners.cubisysit.com/api/api-dropdown-projectinfo.php")
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
        .get(`https://apiforcorners.cubisysit.com/api/api-fetch-projectwings.php?ProjectID=${formData.ProjectID}`)
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleParkingFileChange = (e) => {
    setParkingFile(e.target.files[0]);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitFile = async (event) => {
    event.preventDefault();
  
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formDataFile = new FormData();
    formDataFile.append("file", file);
    formDataFile.append("ParkingAvilability", parkingFile);
    formDataFile.append("ProjectID", formData.ProjectID);
    formDataFile.append("WingID", formData.WingID);
    formDataFile.append("Status", formData.Status);
    formDataFile.append("CreateUID", formData.CreateUID);

    try {
      setLoading(true);

      const response = await axios.post(
        "https://apiforcorners.cubisysit.com/api/api-excel.php",
        formDataFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.data.status === "Success") {
        Swal.fire({
          icon: "success",
          title: "File uploaded successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        show(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to upload file.",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to upload file.",
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: 20 }}>
              Upload Excel File to Insert Data
            </Typography>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Project Name</InputLabel>
              <Select
                value={formData.ProjectID}
                onChange={handleInputChange}
                name="ProjectID"
                label="Project Name"
              >
                {projectMaster.map((project) => (
                  <MenuItem key={project.ProjectID} value={project.ProjectID}>
                    {project.ProjectName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Wings</InputLabel>
              <Select
                value={formData.WingID}
                onChange={handleInputChange}
                name="WingID"
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

          <Grid item xs={12} md={2}>
            <Box display="flex" alignItems="center">
              <input
                type="file"
                accept=".xls,.xlsx"
                name="Project File"
                onChange={handleFileChange}
                style={{ marginRight: "10px" }}
              />
          
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            <Box display="flex" alignItems="center">
            <input
                type="file"
                 name="Parking File"
                accept=".xls,.xlsx"
                onChange={handleParkingFileChange}
                style={{ marginRight: "10px" }}
              />

            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center">
            <Button
                variant="contained"
                onClick={handleSubmitFile}
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload File"}
              </Button>
          
            </Box>
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default UploadExcel;
