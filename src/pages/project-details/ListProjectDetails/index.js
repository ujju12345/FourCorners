import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
// import ListProjectDetails from 'src/views/project-detailsList/ListProjectDetails';
import AddProjectDetails from 'src/views/project-detailsAdd/AddProjectDetails';
import UploadExcel from 'src/views/project-detailsAdd/UploadExcel/UploadExcel';
import ListProject from 'src/views/ListProjectDetails/ListProject';

const ListProjectDetails = () => {
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showUploadExcel, setShowUploadExcel] = useState(false);

//   useEffect(() => {
//     const shouldShowUploadExcel = localStorage.getItem('showUploadExcel') === 'true';
//     if (shouldShowUploadExcel) {
//       setShowUploadExcel(true);
//       localStorage.removeItem('showUploadExcel');
//     }
//   }, []);

  const handleNavigation = () => {
    setShowProjectDetails(true);
  };

  return (
    <>
      {/* {!showProjectDetails && (
        <>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Button
              variant="contained"
              sx={{ marginRight: 3.5, mt: -1 }}
              onClick={handleNavigation}
            >
              Add
            </Button>
          </Grid>

          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ListProjectDetails />
            </Grid>
          </Grid>
        </>
      )} */}

      {/* {showProjectDetails && ( */}
        <Grid item xs={12}>
          <ListProject
            show={setShowProjectDetails}
            setShowUploadExcel={setShowUploadExcel}
          />
        </Grid>
      {/* )} */}

      {/* {showUploadExcel && (
        <Grid sx={{ mt: 20 }}>
          <UploadExcel show={setShowUploadExcel} />
        </Grid>
      )} */}
    </>
  );
};

export default ListProjectDetails;
