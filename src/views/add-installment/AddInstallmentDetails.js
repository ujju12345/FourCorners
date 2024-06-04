// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { PrinterPosCheck } from 'mdi-material-ui'





const AddInstallmentDetails = ({ show }) => {

    const [nameofcompany, setNameOfCompany] = useState('')
    const [subproject, setSubProject] = useState('')
    const [installmenttype, setInstallmentType] = useState('')
    const [code, setCode] = useState('')
    const [paymentscheduleSlabwise, setPaymentScheduleSlabWise] = useState('')
    const [particulars, setParticulars] = useState('')
    const [percent, setPercent] = useState('')
    const [projectName, setProjectName] = useState("");
    const [selectedProject, setSelectedProject] = useState('');



    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-projectmaster.php');
            console.log('API Response:', response.data);
            setRows(response.data.data || []);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error);
            setLoading(false);
        }
    };




    const handleDateChange = date => {
        setSelectedDate(date)
        if (date) {
            setErrors((prevErrors) => ({ ...prevErrors, date: '' }));
        }
    }

    const handleCompanyNameChange = event => {
        setCompanyName(event.target.value)
        if (event.target.value) {
            setErrors((prevErrors) => ({ ...prevErrors, companyName: '' }));
        }
    }
    const handleChange = (event) => {
        setSelectedProject(event.target.value);
    };

    const handleCompanyAddressChange = event => {
        setCompanyAddress(event.target.value)
        if (event.target.value) {
            setErrors((prevErrors) => ({ ...prevErrors, companyAddress: '' }));
        }
    }

    const handleRegisteredAddressChange = event => {
        setRegisteredAddress(event.target.value)
        if (event.target.value) {
            setErrors((prevErrors) => ({ ...prevErrors, registeredAddress: '' }));
        }
    }
    const handlePincode = event => {
        setPincode(event.target.value)
        if (event.target.value) {
            setErrors((prevErrors) => ({ ...prevErrors, pincode: '' }));
        }
    }
    const handlePhone = event => {
        const value = event.target.value
        const numericValue = value.replace(/[^0-9]/g, '')
        setPhone(numericValue)
    }
    const handleMobilePhone = event => {
        const value = event.target.value
        const numericValue = value.replace(/[^0-9]/g, '')
        setMobilePhone(numericValue)
    }

    const handleEmail = event => {
        const value = event.target.value
        const validEmailCharacters = value.replace(/[^a-zA-Z0-9@._-]/g, '')
        setEmail(validEmailCharacters)
    }

    const handlePrice = event => {
        setPrice(event.target.value)
        if (event.target.value) {
            setErrors((prevErrors) => ({ ...prevErrors, price: '' }));
        }
    }
    const handlePanIT = event => {
        setPanIt(event.target.value)
    }
    const handleGstin = event => {
        setGstinNumber(event.target.value)
    }
    const handleTan = event => {
        setTanNumber(event.target.value)
    }

    const handleVatTinNumber = event => {
        setVatTinNumber(event.target.value)
    }

    const handleCSTTIN = event => {
        setCsttinNumber(event.target.value)
    }
    const handleServicesTax = event => {
        setServiceTax(event.target.value)
    }

    const handleCESS = event => {
        setCessNumber(event.target.value)
    }
    const handleCIN = event => {
        setCinNumber(event.target.value)
    }

    const handleRemarks = event => {
        setRemarks(event.target.value)
    }

    const handleCityChange = (event) => {
        const selectedCityName = event.target.value;
        setSelectedCity(selectedCityName);

        // Find the CityID based on the selected CityName
        const selectedCityObject = cities.find(city => city.CityName === selectedCityName);
        if (selectedCityObject) {
            setSelectedCityId(selectedCityObject.CityID);
        }
    };

    const handleStateChange = (event) => {
        const selectedStateName = event.target.value;
        setSelectedState(selectedStateName);

        // Find the StateID based on the selected StateName
        const selectedStateObject = states.find(state => state.StateName === selectedStateName);
        if (selectedStateObject) {
            setSelectedStateId(selectedStateObject.StateID);
        }
    };
    const validateFields = () => {
        const newErrors = {};
        if (!projectname) {
            newErrors.projectname = ' Project Name is required';
        }
        if (!nameofcompany) {
            newErrors.nameofcompany = 'Name of Company is required';
        }
        if (!subproject) {
            newErrors.subproject = 'Sub Project is required';
        }
        if (!installmenttype) {
            newErrors.installmenttype = 'Installment Type is required';
        }
        if (!code) {
            newErrors.code = 'Code is required';
        }
        if (!paymentscheduleSlabwise) {
            newErrors.paymentscheduleSlabwise = 'Payment ScheduleS lab Wise is required';
        }
        if (!particulars) {
            newErrors.particulars = 'Particulars is required';
        }
    }
    if (!percent) {
        newErrors.percent = 'Percent is required';
    }

    return newErrors;

};




// const handleSubmit = () => {
//   const newErrors = validateFields();
//   if (Object.keys(newErrors).length > 0) {
//     setErrors(newErrors);
//   } else {
//     setErrors({});


//   }
// };


const handleSubmit = (event) => {
    console.log('presss');
    event.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
    } else {
        setErrors({});

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

        console.log(formData, 'ALL DATAAAAAAA');


        axios.post('https://ideacafe-backend.vercel.app/api/proxy/api-insert-companymaster.php', formData, {

            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.data.status === 'Success') {
                    setSubmitSuccess(true);
                    show(false);
                    setCompanyName('');
                    setCompanyCode('');
                    setCompanyAddress('');


                    console.log('SUBMMITEDDD DATAAAA');
                } else {
                    setSubmitSuccess(false);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                setSubmitSuccess(false);
            });
    }
};

return (
    <CardContent>
        <form>
            <Grid container spacing={7}>
                <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
                    <Box>
                        <Typography variant='body2' sx={{ marginTop: 5, fontWeight: 'bold', fontSize: 20 }}>
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
                        type='text'
                        label='Name of Company'
                        placeholder='Name of Company'
                        value={nameofcompany}
                        onChange={handlenameofcompanyChange}

                    />
                </Grid>
                <Grid item xs={8} sm={4}>
                    <TextField
                        fullWidth
                        type='text'
                        label='Sub Project'
                        placeholder='Sub Project'
                        value={subproject}
                        onChange={handlesubprojectChange}

                    />
                </Grid>
                <Grid item xs={8} sm={4}>
                    <TextField
                        fullWidth
                        type='text'
                        label='Installment Type'
                        placeholder='Installment Type'
                        value={installmenttype}
                        onChange={handleinstallmenttypeChange}

                    />
                </Grid>
                <Grid item xs={8} sm={4}>
                    <TextField
                        fullWidth
                        type='text'
                        label='code'
                        placeholder='code'
                        value={code}
                        onChange={handlecodechange}


                    />
                </Grid>
                <Grid item xs={8} sm={4}>
                    <TextField
                        fullWidth
                        type='text'
                        label='Payment Schedules Lab Wise'
                        placeholder='Payment Schedules Lab Wise'
                        value={paymentscheduleslabwise}
                        onChange={handlepaymentscheduleslabwisechange}

                    />
                </Grid>
                <Grid item xs={8} sm={4}>
                    <TextField
                        fullWidth
                        type='text'
                        label='Particulars'
                        placeholder='Particulars'
                        value={particulars}
                        onChange={handleparticularschange}

                    />
                </Grid>
                <Grid item xs={8} sm={4}>
                    <TextField
                        fullWidth
                        type='text'
                        label='Percent'
                        placeholder='Percent'
                        value={percent}
                        onChange={handlepercentchange}

                    />
                </Grid>








            </Grid>
        </form>
    </CardContent>
)


export default AddInstallmentDetails