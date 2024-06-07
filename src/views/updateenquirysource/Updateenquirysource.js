import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UpdateEnquirySource = ({ show, rowData }) => {
  const id = rowData?.EnquirySourceID;
  const [enquiryData, setEnquiryData] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    NameOfCompany: '',
    ProjectName: '',
    Source: '',
    FromDate: '',
    ToDate: '',
    SourceName: '',
    SourceAddress: '',
    ActiveTillDate: '',
    ContactNumber: '',
    TotalCost: '',
    Status: 1, // Assuming status is always 1
    CreateUID: 1, // Assuming a default value for CreateUID
    CreateDate: '', // Assuming this will be set automatically
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enquiryId = rowData?.EnquirySourceID;
        const apiUrl = `https://apiforcorners.cubisysit.com/api/api-fetch-enquirysource.php?enquirysourceid=${enquiryId}`;
        const response = await axios.get(apiUrl);
        if (response.data.status === 'Success') {
          const enquiry = response.data.data[0];
          setEnquiryData(enquiry);
          setFormData({
            NameOfCompany: enquiry['NameOfCompany'],
            ProjectName: enquiry['ProjectName'],
            Source: enquiry['Source'],
            FromDate: enquiry['FromDate'],
            ToDate: enquiry['ToDate'],
            SourceName: enquiry['SourceName'],
            SourceAddress: enquiry['SourceAddress'],
            ActiveTillDate: enquiry['ActiveTillDate'],
            ContactNumber: enquiry['ContactNumber'],
            TotalCost: enquiry['TotalCost'],
            Status: 1, // Assuming status is always 1
            CreateUID: 1, // Assuming a default value for CreateUID
            CreateDate: '', // Assuming this will be set automatically
          });
        }
      } catch (error) {
        console.error('Error fetching enquiry data:', error);
      }
    };
    if (rowData) {
      fetchData();
    }
  }, [rowData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateFields = () => {
    const newErrors = {};
    // Validate fields as required
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});

      const submitData = {
        ...formData,
        EnquirySourceID: id,
        CreateDate: new Date().toISOString(), // Set current date as CreateDate
      };

      axios.post('https://apiforcorners.cubisysit.com/api/api-update-enquirysource.php', submitData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (response.data.status === 'Success') {
            console.log("UPDATED");
            setSubmitSuccess(true);
            show('list');
            setFormData({
              NameOfCompany: '',
              ProjectName: '',
              Source: '',
              FromDate: '',
              ToDate: '',
              SourceName: '',
              SourceAddress: '',
              ActiveTillDate: '',
              ContactNumber: '',
              TotalCost: '',
              Status: 1,
              CreateUID: 1, 
              CreateDate: '',
            });
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
    <Card>
      <CardContent>
        <form>
          <Typography variant='body2' sx={{ marginTop: 5, fontWeight: 'bold', fontSize: 20 }}>
            Edit Enquiry Source Details
          </Typography>

          {enquiryData && (
            <>
              <TextField
                fullWidth
                label='Name of Company'
                placeholder='Name of Company'
                value={formData.NameOfCompany}
                onChange={handleInputChange}
                name="NameOfCompany"
              />
              <TextField
                fullWidth
                label='Project Name'
                placeholder='Project Name'
                value={formData.ProjectName}
                onChange={handleInputChange}
                name="ProjectName"
              />
              <TextField
                fullWidth
                label='Source'
                placeholder='Source'
                value={formData.Source}
                onChange={handleInputChange}
                name="Source"
              />
              <TextField
                fullWidth
                type="date"
                label='From Date'
                placeholder='From Date'
                value={formData.FromDate}
                onChange={handleInputChange}
                name="FromDate"
              />
              <TextField
                fullWidth
                type="date"
                label='To Date'
                placeholder='To Date'
                value={formData.ToDate}
                onChange={handleInputChange}
                name="ToDate"
              />
              <TextField
                fullWidth
                label='Source Name'
                placeholder='Source Name'
                value={formData.SourceName}
                onChange={handleInputChange}
                name="SourceName"
              />
              <TextField
                fullWidth
                label='Source Address'
                placeholder='Source Address'
                value={formData.SourceAddress}
                onChange={handleInputChange}
                name="SourceAddress"
              />
              <TextField
                fullWidth
                type="date"
                label='Active Till Date'
                placeholder='Active Till Date'
                value={formData.ActiveTillDate}
                onChange={handleInputChange}
                name="ActiveTillDate"
              />
              <TextField
                fullWidth
                label='Contact Number'
                placeholder='Contact Number'
                value={formData.ContactNumber}
                onChange={handleInputChange}
                name="ContactNumber"
              />
              <TextField
                fullWidth
                label='Total Cost'
                placeholder='Total Cost'
                value={formData.TotalCost}
                onChange={handleInputChange}
                name="TotalCost"
              />
            </>
          )}

          <Button variant='contained' color='primary' onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdateEnquirySource;
