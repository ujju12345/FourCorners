// ** React Imports
import { useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { PrinterPosCheck } from "mdi-material-ui";
import Card from '@mui/material/Card';

const AddInstallment = ({ show }) => {
  const [projectName, setProjectName] = useState("");
  const [nameofcompany, setNameOfCompany] = useState("");
  const [subproject, setSubProject] = useState("");
  const [installmenttype, setInstallmentType] = useState("");
  const [code, setCode] = useState("");
  const [paymentscheduleSlabwise, setPaymentScheduleSlabWise] = useState("");
  const [particulars, setParticulars] = useState("");
  const [percent, setPercent] = useState("");
  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState({});

  const [selectedProject, setSelectedProject] = useState('');




  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-projectmaster.php');
      console.log('API Response:', response.data);
      setRows(response.data.data || []);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrors(error);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const projectId = event.target.value;
    const selectedProj = rows.find((project) => project.ProjectID === projectId);
    setSelectedProject(projectId);
    setProjectName(selectedProj ? selectedProj.ProjectName : '');
  };

  const validateFields = () => {
    const newErrors = {};
    if (!projectName) {
      newErrors.projectname = " Project Name is required";
    }
    if (!nameofcompany) {
      newErrors.nameofcompany = "Name of Company is required";
    }
    if (!subproject) {
      newErrors.subproject = "Sub Project is required";
    }
    if (!installmenttype) {
      newErrors.installmenttype = "Installment Type is required";
    }
    if (!code) {
      newErrors.code = "Code is required";
    }
    if (!paymentscheduleSlabwise) {
      newErrors.paymentscheduleSlabwise =
        "Payment ScheduleS lab Wise is required";
    }
    if (!particulars) {
      newErrors.particulars = "Particulars is required";
    }
    if (!percent) {
      newErrors.percent = "Percent is required";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    console.log("presss");
    // event.preventDefault();
    // const newErrors = validateFields();
    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    // } else {
    //   setErrors({});

      const formData = {
        CreateUID: 1,
        ProjectName: projectName,
        NameOfCompany: nameofcompany,
        SubProject: subproject,
        InstallmentType: installmenttype,
        Code: code,
        PaymentScheduleSlabWise: paymentscheduleSlabwise,
        Particulars: particulars,
        Percent: percent,
      };


      console.log(formData, "ALL DATAAAAAAA Installment");

      axios
        .post(
          "https://ideacafe-backend.vercel.app/api/proxy/api-insert-installmentdetails.php",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.status === "Success") {
            // setSubmitSuccess(true);
            show(false);
            setProjectName("");
            setNameOfCompany("")
            setSubProject("");
            setInstallmentType("")
            setCode("")
            setPaymentScheduleSlabWise("")
            setParticulars("")
            setPercent("")


            console.log("SUBMMITEDDD DATAAAA");
          } else {
            // setSubmitSuccess(false);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
          // setSubmitSuccess(false);
        });
    // }
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
                Installment Company Details
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={8} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Project Name</InputLabel>
              <Select
                value={selectedProject}
                onChange={handleChange}
                label="Project Name"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {rows.map((project) => (
                  <MenuItem key={project.ProjectID} value={project.ProjectID}>
                    {project.ProjectName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="Name of Company"
              placeholder="Name of Company"
              value={nameofcompany}
              onChange={(e) => setNameOfCompany(e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="Sub Project"
              placeholder="Sub Project"
              value={subproject}
              onChange={(e) => setSubProject(e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="Installment Type"
              placeholder="Installment Type"
              value={installmenttype}
              onChange={(e) => setInstallmentType(e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="Code"
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="Payment Schedules Lab Wise"
              placeholder="Payment Schedules Lab Wise"
              value={paymentscheduleSlabwise}
              onChange={(e) => setPaymentScheduleSlabWise(e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="Particulars"
              placeholder="Particulars"
              value={particulars}
              onChange={(e) => setParticulars(e.target.value)}
            />
          </Grid>
          <Grid item xs={8} sm={4}>
            <TextField
              fullWidth
              type="text"
              label="Percent"
              placeholder="Percent"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
          <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleSubmit}>
            Submit
          </Button>
      
        </Grid>
        </Grid>
      </form>
    </CardContent>
    </Card>
  );
};

export default AddInstallment;
