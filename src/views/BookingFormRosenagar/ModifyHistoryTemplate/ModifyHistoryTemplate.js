import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { useRouter } from 'next/router';

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
  padding: '0px',
  textAlign: 'center',
});

const InvoiceBox = styled(Box)({
  maxWidth: '890px',
  margin: 'auto',
  padding: '10px',
  border: '1px solid #eee',
  fontSize: '11px',
  lineHeight: '18px',
  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
});

const ModifyHistoryTemplate = ({ bookingID, onGoBack }) => {
  const router = useRouter();
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
    window.location.reload();
  };

  useEffect(() => {
    fetchData();
  }, [bookingID]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://apiforcorners.cubisysit.com/api/api-singel-historybooking.php?BookingID=${bookingID}`
      );
      console.log('data fetched:', response.data);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading data</Typography>;
  }

  return (
    <>
      <GlobalStyle />
      <Button
        variant="contained"
        color="primary"
        onClick={onGoBack}
        style={{ marginBottom: '10px' }}
      >
        Go back
      </Button>

      <InvoiceBox className="printableArea" ref={printRef}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow sx={{ height: '10px', padding: 0 }}>
                <StyledTableCell colSpan={3} sx={{ height: '10px', padding: 0 }}>
                  <Typography
                    style={{ textAlign: 'center', fontSize: 20, fontWeight: 900 }}
                  >
                    QUOTATION
                  </Typography>
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell colSpan={3} sx={{ padding: 0 }}>
                  <Typography
                    style={{ textAlign: 'center', fontSize: 20, fontWeight: 700 }}
                  >
                    RERA NO. {data.historybooking.reraregistration}
                  </Typography>
                  <Typography
                    style={{ float: 'left', fontSize: 15, fontWeight: 200 }}
                  >
                    Date: {data.historybooking.BookingDate}
                  </Typography>
                  <Typography
                    style={{ float: 'right', fontSize: 15, fontWeight: 200 }}
                  >
                    Booked By: {data.historybooking.UserName}
                  </Typography>
                </StyledTableCell>
              </TableRow>
              {/* Additional rows for other data */}
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell colSpan={2} sx={{ textAlign: 'left', padding: 0 }}>
                  <Typography>Name Of Purchaser</Typography>
                </StyledTableCell>
                <StyledTableCell colSpan={10} sx={{ padding: 0 }}>
                  {data.historybooking.Name}
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell colSpan={2} sx={{ textAlign: 'left', padding: 0 }}>
                  <Typography>Address</Typography>
                </StyledTableCell>
                <StyledTableCell colSpan={10} sx={{ padding: 0 }}>
                  {data.historybooking.Address}
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell colSpan={2} sx={{ textAlign: 'left', padding: 0 }}>
                  <Typography>Mobile No.</Typography>
                </StyledTableCell>
                <StyledTableCell colSpan={10} sx={{ padding: 0 }}>
                  {data.historybooking.Mobile}
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell style={{ textAlign: 'left', padding: 0 }} colSpan={2}>
                  <Typography>PAN Card No.</Typography>
                </StyledTableCell>
                <StyledTableCell colSpan={10} style={{ textAlign: 'center', padding: 0 }}>{data.historybooking.Pancard}</StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell colSpan={2} style={{ textAlign: 'left', padding: 0 }}>
                  <Typography>Aadhar No.</Typography>
                </StyledTableCell>
                <StyledTableCell colSpan={10} style={{ textAlign: 'center', padding: 0 }}>{data.historybooking.Aadhar}</StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell style={{ textAlign: 'left', padding: 0 }} colSpan={2}>
                  <Typography>Email Id.</Typography>
                </StyledTableCell>
                <StyledTableCell colSpan={10} style={{ textAlign: 'center', padding: 0 }}>{data.historybooking.Email}</StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell style={{ textAlign: 'left', padding: 0 }} colSpan={2}>
                  <Typography>Source Name.</Typography>
                </StyledTableCell>
                <StyledTableCell colSpan={10} style={{ textAlign: 'center', padding: 0 }}>{data.historybooking.SourceName}</StyledTableCell>
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
                  {data.historybooking.ProjectName}
                </StyledTableCell>
                <StyledTableCell style={{ width: '15%', padding: 0 }} colSpan={10}>
                  {data.historybooking.WingName}
                </StyledTableCell>
                <StyledTableCell style={{ width: '15%', padding: 0 }} colSpan={10}>
                  {data.historybooking.FloorNo}
                </StyledTableCell>
                <StyledTableCell style={{ width: '15%', padding: 0 }} colSpan={10}>
                  {data.historybooking.FlatNo}
                </StyledTableCell>
                <StyledTableCell style={{ width: '15%', padding: 0 }} colSpan={10}>
                  {data.historybooking.UnittypeName}
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
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.BookingTypeName}</StyledTableCell>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>GST* (As per Govt.Notification)</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.Gst}</StyledTableCell>
</TableRow>
<TableRow sx={{ padding: 0 }}>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Area in Building (in Sq.Ft)</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.Area}</StyledTableCell>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Stamp Duty* (As per Govt.Notification)</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.StampDuty}</StyledTableCell>
</TableRow>
<TableRow sx={{ padding: 0 }}>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Rate Sq.Ft</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.Ratesqft}</StyledTableCell>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Registration* (As per Govt.Notification)</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.Registration}</StyledTableCell>
</TableRow>
<TableRow sx={{ padding: 0 }}>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>TTL Amount As Per Builtup</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.TtlAmount}</StyledTableCell>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Advocate* (At time of registration)</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.Advocate}</StyledTableCell>
</TableRow>
<TableRow sx={{ padding: 0 }}>
        <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Development Charges</StyledTableCell>
        <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.Charges}</StyledTableCell>
        <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Extra Cost (B)</StyledTableCell>
        <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.ExtraCost}</StyledTableCell>
      </TableRow>
      <TableRow sx={{ padding: 0 }}>
        <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Parking Facility</StyledTableCell>
        <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.ParkingFacility}</StyledTableCell>
        
        <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Total (A + B)</StyledTableCell>
        <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.TotalCost}</StyledTableCell>
      </TableRow>
      <TableRow sx={{ padding: 0 }}>
        <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Gross Flat Cost (A)</StyledTableCell>
        <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.FlatCost}</StyledTableCell>
        <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Booking Ref.Code (T & C)</StyledTableCell>
        <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.BookingRef}</StyledTableCell>
        
        
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>

<TableContainer component={Paper}>
  <Table className="info-border">
    <TableBody>
      <TableRow style={{ border: '1px solid black', padding: 0 }}>
        <StyledTableCell style={{ textAlign: 'left', padding: 0 }} colSpan={10}>Rupees in words : {data.historybooking.FlatCostInWords}</StyledTableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>

<TableContainer component={Paper}>
  <Table className="info-border">
    <TableBody>
    <TableRow sx={{ padding: 0 }}>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Usable Area in Sq.Ft</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.UsableArea}</StyledTableCell>
  <StyledTableCell style={{ width: '30%', padding: 0 }} colSpan={4}>Agreement Carpet (RERA) in Sq.Ft</StyledTableCell>
  <StyledTableCell style={{ width: '20%', padding: 0 }} colSpan={1}>{data.historybooking.AgreementCarpet}</StyledTableCell>
</TableRow>

      <TableRow sx={{ padding: 0 }}>
  <StyledTableCell style={{ textAlign: 'left', fontSize: 15, fontWeight: 500, padding: 0 }} colSpan={10}>REMARKS :</StyledTableCell>
</TableRow>
              {data.remarks.map((remark, index) => (
                <TableRow key={index} sx={{ padding: 0 }}>
                  <StyledTableCell colSpan={2} sx={{ padding: 0 }}>
                    <Typography>Remark {index + 1}</Typography>
                  </StyledTableCell>
                  <StyledTableCell colSpan={10} sx={{ padding: 0 }}>
                    {remark.RemarkName} - {remark.Remarkamount} ({remark.RemarkDate})
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </InvoiceBox>
    </>
  );
};

export default ModifyHistoryTemplate;
