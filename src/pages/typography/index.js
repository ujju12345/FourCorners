// import React, { useState, useEffect } from 'react';
// import { Button, Grid, CircularProgress, Alert } from '@mui/material';
// import axios from 'axios';
// import ProjectMasterDetails from 'src/views/project-manager/ProjectMasterDetails';
// import ProjectManage from 'src/views/addProject/ProjectManage';

// const TypographyPage = () => {
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showProjectManage, setShowProjectManage] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-projectmaster.php');
//       console.log('API Response:', response.data);
//       setRows(response.data.data || []);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError(error);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <CircularProgress />;
//   }

//   if (error) {
//     return <Alert severity="error">Error fetching data: {error.message}</Alert>;
//   }

//   const handleNavigation = () => {
//     setShowProjectManage(true); // Show ProjectManage component
//   };

//   return (
//     <>
//       {!showProjectManage && (
//         <>
//           <Grid item xs={12}>
//             <Button
//               variant="contained"
//               sx={{ marginRight: 3.5 }}
//               onClick={handleNavigation}
//             >
//               Add
//             </Button>
//           </Grid>

//           <Grid container spacing={6}>
//             <Grid item xs={12}>
//               {rows.length > 0 ? <ProjectMasterDetails /> : <ProjectManage />}
//             </Grid>
//           </Grid>
//         </>
//       )}

//       {showProjectManage && <ProjectManage show={setShowProjectManage} />}
//     </>
//   );
// };

// export default TypographyPage;


import React, { useState, useEffect } from 'react';
import { Button, Grid, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import ProjectMasterDetails from 'src/views/project-manager/ProjectMasterDetails';
import ProjectManage from 'src/views/addProject/ProjectManage';
import UpdateProjectMaster from 'src/views/update-projectmaster/UpdateProjectMaster';

const TypographyPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'manage', 'update'
  const [rowDataToUpdate, setRowDataToUpdate] = useState(null);

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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Error fetching data: {error.message}</Alert>;
  }

  const handleNavigation = () => {
    setActiveTab('manage'); // Show ProjectManage component
  };

  const handleEdit = (rowData) => {
    setActiveTab('update'); // Show UpdateProjectMaster component
    setRowDataToUpdate(rowData); // Pass the selected row data
  };

  const handleSubmissionSuccess = () => {
    setActiveTab('list'); // Show ProjectMasterDetails component after successful submission
    fetchData(); // Fetch updated data to display in ProjectMasterDetails
  };

  return (
    <>
      {activeTab === 'list' && (
        <>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Button
              variant="contained"
              sx={{ marginRight: 3.5 }}
              onClick={handleNavigation}
            >
              Add
            </Button>
          </Grid>

          <Grid container spacing={6}>
            <Grid item xs={12}>
              <ProjectMasterDetails onEdit={handleEdit} />
            </Grid>
          </Grid>
        </>
      )}

      {activeTab === 'manage' && <ProjectManage show={setActiveTab} onSubmitSuccess={handleSubmissionSuccess} />}

      {activeTab === 'update' && (
        <UpdateProjectMaster show={setActiveTab} rowData={rowDataToUpdate} onSubmitSuccess={handleSubmissionSuccess} />
      )}
    </>
  );
};

export default TypographyPage;
