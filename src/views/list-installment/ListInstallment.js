// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Table from '@mui/material/Table';
// import TableRow from '@mui/material/TableRow';
// import TableHead from '@mui/material/TableHead';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import Typography from '@mui/material/Typography';
// import TableContainer from '@mui/material/TableContainer';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import { format, parseISO } from 'date-fns';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Button from '@mui/material/Button';

// const ListInstallment = ({ rows, setRows, onEdit }) => {


//   // const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => {
//     console.log(rows , "data");
//   }, []);

//   // const fetchData = async () => {
//   //   try {
//   //     const response = await axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-installmentdetails.php');
//   //     setRows(response.data.data || []);
//   //     setLoading(false);
//   //   } catch (error) {
//   //     console.error('Error fetching data:', error);
//   //     setError(error);
//   //     setLoading(false);
//   //   }
//   // };

//   const handleDelete = async (installmentID) => {
//     try {
//       await axios.delete(`https://apiforcorners.cubisysit.com/api/api-delete-installmentdetails.php?id=${installmentID}`);
//       setRows(prevRows => prevRows.filter(row => row.InstallmentID !== installmentID));
//       console.log(`Deleted installment with ID ${installmentID}`);
//     } catch (error) {
//       console.error('Error deleting installment:', error);
//     }
//   };

//   const handleEdit = (rowData) => {
//     setShowTabAccount(rowData); // Pass selected row data to the parent component
//   };

//   if (loading) {
//     return <Typography>Loading...</Typography>;
//   }

//   if (error) {
//     return <Typography>Error fetching data: {error.message}</Typography>;
//   }

//   return (
//     <Card>
//       <TableContainer>
//         <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Project Name</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Sub Project</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Installment Type</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Particulars</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', fontSize: '2rem' }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.length > 0 ? (
//               rows.map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell sx={{ padding: '8px', fontSize: '0.75rem' }}>
//                     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//                       <Typography sx={{ padding: '8px', fontSize: '0.75rem' }}>{row.ProjectName}</Typography>
//                     </Box>
//                   </TableCell>
//                   <TableCell sx={{ padding: '15px', fontSize: '0.75rem' }}>{row.SubProject}</TableCell>
//                   <TableCell sx={{ padding: '15px', fontSize: '0.75rem' }}>{row.InstallmentType}</TableCell>
//                   <TableCell sx={{ padding: '15px', fontSize: '0.75rem' }}>{row.Particulars}</TableCell>
//                   <TableCell sx={{ padding: '15px', }}>
//                     <IconButton onClick={() => onEdit(row)} aria-label="edit" sx={{ color: 'blue' }}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton onClick={() => setDeleteId(row.InstallmentID)} aria-label="delete" sx={{ color: 'red' }}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={9} align="center">
//                   No data available
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Dialog
//         open={deleteId !== null}
//         onClose={() => setDeleteId(null)}
//       >
//         <DialogTitle>{"Confirm Delete"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this installment?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteId(null)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={() => handleDelete(deleteId)} color="primary" autoFocus>
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Card>
//   );
// };

// export default ListInstallment;


import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ListInstallment = ({ rows, setRows, setShowTabAccount  , onEdit}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async (InstallmentID) => {
    const body = {
      InstallmentID: InstallmentID,
      deleteuid: 1,
    };
    console.log(body , 'Installment delete');

    try {
      const response = await axios.post(
        "https://ideacafe-backend.vercel.app/api/proxy/api-delete-subprojectmaster.php",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "Success") {
        console.log("Deleted");
        setRows(prevRows => prevRows.filter(row => row.InstallmentID !== deleteId));
      } else {
        console.error("Failed to delete:", response.data);
      }
    } catch (error) {
      console.error("There was an error!", error);
    } finally {
      setOpen(false);
      setDeleteId(null);
    }
  };

  const handleEdit = (rowData) => {
    setShowTabAccount(rowData);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error fetching data: {error.message}</Typography>;
  }

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Sub Project</TableCell>
              <TableCell>Installment Type</TableCell>
              <TableCell>Particulars</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.ProjectName}</TableCell>
                  <TableCell>{row.SubProject}</TableCell>
                  <TableCell>{row.InstallmentType}</TableCell>
                  <TableCell>{row.Particulars}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => onEdit(row)} aria-label="edit"sx={{ color: 'blue' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => setDeleteId(row.InstallmentID)} aria-label="delete"sx={{ color: 'red' }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this installment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(deleteId)} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ListInstallment;
