import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from '@mui/material';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @media print {
    body * {
      visibility: hidden;
    }
    .printableArea, .printableArea * {
      visibility: visible;
    }
    .printableArea {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
  }
`;

const StyledTableCell = styled(TableCell)({
  border: '2px solid black',
  padding: '4px', // Reduced padding
  textAlign: 'center',
});


const InvoiceBox = styled(Box)({
  maxWidth: '1500px', // Increased width
  margin: 'auto',
  padding: '20px', // Increased padding to give more space
  border: '1px solid #eee',
  fontSize: '11px',
  lineHeight: '18px',
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
});


const OpenpaymentTemplate = ({ item  }) => {
  const printRef = useRef();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState(null);

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload the page to reset the original contents
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!item) return; // Exit if no item is provided
      try {
        const apiUrl = `https://apiforcorners.cubisysit.com/api/api-fetch-projectbooking.php?BookingID=${item?.BookingID}`;

        // const apiUrl = `https://apiforcorners.cubisysit.com/api/api-fetch-backlogreminder.php?UserID=${item.BookingID}`;
        const response = await axios.get(apiUrl);

        if (response.data.status === "Success") {
            console.log(response.data , 'data aaya deh');
          setData(response.data.data);
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [item]);
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading data</Typography>;
  }

  return (
    <>
      <GlobalStyle />
      {/* <Button variant="contained" color="primary" onClick={handlePrint} style={{ marginBottom: '10px' }}>
        Print
      </Button> */}

      <InvoiceBox className="printableArea" ref={printRef}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
            <TableRow sx={{ padding: 0 }}>
                <StyledTableCell colSpan={3} sx={{ height: '10px', padding: 0 }}>
                  <Typography style={{ textAlign: 'center', fontSize: 20, fontWeight: 900 }}>QUOTATION</Typography>
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell colSpan={3} sx={{ padding: 0 }}>
                  <Typography style={{ textAlign: 'center', fontSize: 20, fontWeight: 700 }}>RERA NO.</Typography>
                  <Typography style={{ float: 'left', fontSize: 15, fontWeight: 200 }}>Date: {data.BookingDate}</Typography>
                  <Typography style={{ float: 'right', fontSize: 15, fontWeight: 200 }}>Booked By: {data.BookedBy}</Typography>
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell style={{ textAlign: 'center', padding: 0 }}>
                  <img src="{images}" alt="Logo" width="70" height="100" />
                </StyledTableCell>
                <StyledTableCell sx={{ padding: 0 }}>
                  <img src="https://i.postimg.cc/PJfmZCRv/Untitled-design-2024-04-12-T161558-455.png" alt="200 * 200" width="30" height="100" />
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell style={{ textAlign: 'left', width: '20%', padding: 0 }} colSpan={2}>
                  <Typography>Name Of Purchase</Typography>
                </StyledTableCell>
                <StyledTableCell style={{ width: '80%', padding: 0 }} colSpan={10}>
                  {data.Name}
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell style={{ textAlign: 'left', padding: 0 }} colSpan={2}>
                  <Typography>Address</Typography>
                </StyledTableCell>
                <StyledTableCell colSpan={10} style={{ textAlign: 'center', padding: 0 }}>{data.Address}</StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell style={{ textAlign: 'left', padding: 0 }} colSpan={2}>
                  <Typography>MOBILE No.</Typography>
                </StyledTableCell>
                <StyledTableCell colSpan={10} style={{ textAlign: 'center', padding: 0 }}>{data.Mobile}</StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell style={{ textAlign: 'left', padding: 0 }} colSpan={2}>
                  <Typography>PAN Card No.</Typography>
                </StyledTableCell>
                <StyledTableCell colSpan={10} style={{ textAlign: 'center', padding: 0 }}>{data.Pancard}</StyledTableCell>
              </TableRow>
              {/* <TableRow sx={{ padding: 0 }}>
                <StyledTableCell colSpan={2} style={{ textAlign: 'left', padding: 0 }}>
                  <Typography>AADHAR No.</Typography>
                </StyledTableCell>
                <StyledTableCell colSpan={10} style={{ textAlign: 'center', padding: 0 }}>{data.Aadhar}</StyledTableCell>
              </TableRow> */}
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell style={{ textAlign: 'left', padding: 0 }} colSpan={2}>
                  <Typography>EMAIL ID.</Typography>
                </StyledTableCell>
                <StyledTableCell colSpan={10} style={{ textAlign: 'center', padding: 0 }}>{data.Email}</StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table style={{ border: '1px solid black' }}>
            <TableBody>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell style={{ width: '40%', padding: 0 }} colSpan={10}>
                  <Typography>Project</Typography>
                </StyledTableCell>
                <StyledTableCell style={{ width: '15%', padding: 0 }} colSpan={10}>
                  <Typography>Wing</Typography>
                </StyledTableCell>
                <StyledTableCell style={{ width: '15%', padding: 0 }} colSpan={10}>
                  <Typography>Floor</Typography>
                </StyledTableCell>
                <StyledTableCell style={{ width: '15%', padding: 0 }} colSpan={10}>
                  <Typography>Flat No.</Typography>
                </StyledTableCell>
                <StyledTableCell style={{ width: '15%', padding: 0 }} colSpan={10}>
                  <Typography>Type</Typography>
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell style={{ width: '40%', padding: 0 }} colSpan={10}>
                  {data.ProjectName}
                </StyledTableCell>
                <StyledTableCell style={{ width: '15%', padding: 0 }} colSpan={10}>
                  {data.WingID}
                </StyledTableCell>
                <StyledTableCell style={{ width: '15%', padding: 0 }} colSpan={10}>
                  {data.FloorNo}
                </StyledTableCell>
                <StyledTableCell style={{ width: '15%', padding: 0 }} colSpan={10}>
                  {data.FlatNo}
                </StyledTableCell>
                <StyledTableCell style={{ width: '15%', padding: 0 }} colSpan={10}>
                  {data.UnittypeID}
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
  <Table className="info-border">
    <TableBody>
    <TableRow sx={{ padding: 0 }}>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Type of Booking</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.BookingType}</StyledTableCell>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>GST* (As per Govt.Notification)</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.Gst}</StyledTableCell>
</TableRow>
<TableRow sx={{ padding: 0 }}>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Area in Building (in Sq.Ft)</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.Area}</StyledTableCell>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Stamp Duty* (As per Govt.Notification)</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.StampDuty}</StyledTableCell>
</TableRow>
<TableRow sx={{ padding: 0 }}>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Rate Sq.Ft</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.RatePerSqFt}</StyledTableCell>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Registration* (As per Govt.Notification)</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.Registration}</StyledTableCell>
</TableRow>
<TableRow sx={{ padding: 0 }}>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>TTL Amount As Per Builtup</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.TtlAmount}</StyledTableCell>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Advocate* (At time of registration)</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.Advocate}</StyledTableCell>
</TableRow>
<TableRow sx={{ padding: 0 }}>
        <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Payment Schedule</StyledTableCell>
        <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>&nbsp;</StyledTableCell>
        <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Extra Cost (B)</StyledTableCell>
        <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>&nbsp;</StyledTableCell>
      </TableRow>
      <TableRow sx={{ padding: 0 }}>
        <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Parking Facility</StyledTableCell>
        <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.ParkingFacility}</StyledTableCell>
        <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Total (A + B)</StyledTableCell>
        <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.TotalCost}</StyledTableCell>
      </TableRow>
      <TableRow sx={{ padding: 0 }}>
        <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Gross Flat Cost (A)</StyledTableCell>
        <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>&nbsp;</StyledTableCell>
        <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Booking Ref.Code (T & C)</StyledTableCell>
        <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>&nbsp;</StyledTableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>

<TableContainer component={Paper}>
  <Table className="info-border">
    <TableBody>
      <TableRow style={{ border: '1px solid black', padding: 0 }}>
        <StyledTableCell style={{ textAlign: 'left', padding: 0 }} colSpan={10}>Rupees in words : {data.FlatCostInWords}</StyledTableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>

<TableContainer component={Paper}>
  <Table className="info-border">
    <TableBody>
    <TableRow sx={{ padding: 0 }}>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Usable Area in Sq.Ft</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.UnsableArea}</StyledTableCell>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Agreement Carpet (RERA) in Sq.Ft</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.AgreementCarpet}</StyledTableCell>
</TableRow>

      <TableRow sx={{ padding: 0 }}>
  <StyledTableCell style={{ textAlign: 'left', fontSize: 15, fontWeight: 500, padding: 0 }} colSpan={10}>REMARKS :</StyledTableCell>
</TableRow>

{/* Map over remarks array */}
{data.remarks && data.remarks.map((remark, index) => (
  <TableRow key={index} sx={{ padding: 0 }}>
    <StyledTableCell style={{ textAlign: 'left', padding: 0 }} colSpan={10}>
      {index + 1}. {remark.RemarkName} - {remark.RemarkDate}
    </StyledTableCell>
  </TableRow>
))}

    </TableBody>
  </Table>
</TableContainer>

<TableContainer component={Paper}>
  <Table className="info-border">
    <TableBody>
      <TableRow style={{ border: '1px solid black', padding: 0 }}>
        <StyledTableCell colSpan={4} style={{ padding: 0 }}>Verified By</StyledTableCell>
        <StyledTableCell colSpan={4} style={{ padding: 0 }}>Maked By</StyledTableCell>
        <StyledTableCell colSpan={4} style={{ padding: 0 }}>Purchaser Signature & Date</StyledTableCell>
      </TableRow>
      {/* Add rows for signatures */}
      <TableRow style={{ padding: 0 }}>
        <StyledTableCell colSpan={4} style={{ height: '90px', padding: 0 }}></StyledTableCell>
        <StyledTableCell colSpan={4} style={{ height: '90px', padding: 0 }}></StyledTableCell>
        <StyledTableCell colSpan={4} style={{ height: '90px', padding: 0 }}></StyledTableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>

      </InvoiceBox>
    </>
  );
};

export default OpenpaymentTemplate;
