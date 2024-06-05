import React, { useState, useEffect } from 'react';
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

const Listsubprojectdetails= () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-subprojectdetails.php');
  //     console.log('API Response:', response.data);
  //     setRows(response.data.data || []);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     setError(error);
  //     setLoading(false);
  //   }
  // };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  // if (error) {
  //   return <Typography>Error fetching data: {error.message}</Typography>;
  // }

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>ProjectID</TableCell>
              <TableCell>SubProjectID</TableCell>
              <TableCell>TotalCarParking</TableCell>
              <TableCell>DefaultCarParkingsPerUnit</TableCell>
              <TableCell>FinancePostingInstallmentLetter</TableCell>
              <TableCell>Favorof</TableCell>
              <TableCell>FloorRiseEntries</TableCell>
              <TableCell>AdditionSubtractionInBasicRate</TableCell>
              <TableCell>CCEntries</TableCell>
              <TableCell>Particulars</TableCell>
              <TableCell>ResponsiblePerson</TableCell>
              
              {/* Add more table headers here */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500 }}>sdf</Typography>
                     
                    </Box>
                  </TableCell>
                  <TableCell>sdf</TableCell>
                  {/* <TableCell>{row.SubProjectID}</TableCell>
                  <TableCell>{row.TotalCarParking}</TableCell>
                  <TableCell>{row.DefaultCarParkingsPerUnit}</TableCell>
                  <TableCell>{row.Favorof}</TableCell>
                  <TableCell>{row.FloorRiseEntries}</TableCell>
                  <TableCell>{row.AdditionSubtractionInBasicRate}</TableCell>
                  <TableCell>{row.CCEntries}</TableCell>
                  <TableCell>{row.Particulars}</TableCell>
                  <TableCell>{row.ResponsiblePerson}</TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default Listsubprojectdetails;