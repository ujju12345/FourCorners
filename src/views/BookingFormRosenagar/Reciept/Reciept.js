import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
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
  Grid,
  TableHead,
} from "@mui/material";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

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
  border: "2px solid black",
  padding: "0px", // Removed padding
  textAlign: "center",
});

const InvoiceBox = styled(Box)({
  maxWidth: "890px",
  margin: "auto",
  padding: "10px",
  border: "1px solid #eee",
  fontSize: "11px",
  lineHeight: "18px",
  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
});

const Reciept = ({ bookingID }) => {
  console.log(bookingID, 'id bookinggg<<>>>> ayaa');
  const printRef = useRef();
  const [data, setData] = useState([]);
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
    if (bookingID) {
      fetchData(bookingID);
    }
  }, [bookingID]);

  const fetchData = async (id) => {
    try {
      const response = await axios.get(
        `https://apiforcorners.cubisysit.com/api/api-fetch-chequereceipt.php?BookingID=${id}`
      );
      console.log("data aaya dekh", response.data);
      setData(response.data.data || []); // Ensure data is an array
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
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
        onClick={handlePrint}
        style={{ marginBottom: "10px" }}
      >
        Print
      </Button>

      <InvoiceBox className="printableArea" ref={printRef}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow sx={{ height: "10px", padding: 0 }}>
                <StyledTableCell
                  colSpan={3}
                  sx={{ height: "10px", padding: 0 }}
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-around"
                    spacing={1}
                  >
                    <Grid item>
                      <img
                        src="https://i.postimg.cc/PJfmZCRv/Untitled-design-2024-04-12-T161558-455.png"
                        alt="200 * 200"
                        width="80"
                        height="80"
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        style={{
                          textAlign: "center",
                          fontSize: 50,
                          fontWeight: 900,
                          color: "#ffbf15",
                        }}
                      >
                        ALMANTASHA REALTY
                      </Typography>
                      <Typography
                        style={{
                          textAlign: "center",
                          fontSize: 30,
                          fontWeight: "bold",
                        }}
                      >
                        Builders & Developers
                      </Typography>
                    </Grid>
                  </Grid>
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <StyledTableCell colSpan={12}>
            <Grid container spacing={0} sx={{ width: "100%" }}>
              <Grid item xs={9}>
                <StyledTableCell
                  sx={{ textAlign: "center", padding: 0, border: 0 }}
                >
                  <Typography style={{ fontSize: 14, padding: 5 }}>
                    Head Office: Plot No.102, Near Kalsekar Hospital & College
                    Main Gate, Kausa, Mumbra 400612. Contact No. 72082 77770.
                    GST No. 27AIVPK6218R1Z8 Website: www.almantasharealty.com,
                    Email: info@almantasharealty.com Site Address: Survey No.
                    121/1B/1, 121/1B/2, 121/1/E, 121/1/F, 123/1, 86/G &
                    123/3/1/B, Opp. Khan Compound, Shil, Thane 400612. MahaRera
                    No. P51700020942
                  </Typography>
                </StyledTableCell>
              </Grid>
              <Grid item xs={3}>
                <div style={{ minWidth: "100%", borderWidth: 1 }}>
                  <div>
                    <h4 style={{}}>Receipt</h4>
                    <TableContainer component={Paper}>
                      <Table style={{ border: "1px solid black" }}>
                        <TableBody>
                          <TableRow sx={{ padding: 0 }}>
                            <StyledTableCell
                              style={{ width: "20%", padding: 0 }}
                              colSpan={10}
                            >
                              <Typography>R.No.:</Typography>
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ width: "30%", padding: 0 }}
                              colSpan={10}
                            >
                              <Typography>{data[0]?.paymentID || ""}</Typography>
                            </StyledTableCell>
                          </TableRow>
                          <TableRow sx={{ padding: 0 }}>
                            <StyledTableCell
                              style={{ width: "20%", padding: 0 }}
                              colSpan={10}
                            >
                              <Typography>Date:</Typography>
                            </StyledTableCell>
                            <StyledTableCell
                              style={{ width: "30%", padding: 0 }}
                              colSpan={10}
                            >
                              <Typography>{data[0]?.BookingDate || ""}</Typography>
                            </StyledTableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </Grid>
            </Grid>
          </StyledTableCell>
        </div>
        <div
          style={{
            width: "100%",
            borderWidth: 1,
            borderStyle: "solid",
            paddingLeft: 10,
            display: "flex",
          }}
        >
          <div>
            <Typography style={{ fontWeight: "bold" }}>Received</Typography>
            <Typography>With Thanks from:</Typography>
          </div>
          <div
            style={{ marginLeft: 20, alignItems: "center", display: "flex" }}
          >
            <Typography style={{ fontSize: 26 }}>Mr {data[0]?.Name || ""}</Typography>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            borderWidth: 1,
            borderStyle: "solid",
            paddingLeft: 10,
            display: "flex",
          }}
        >
          <div style={{ width: "20%" }}>
            <Typography>Part</Typography>
            <Typography style={{ fontWeight: "bold" }}>TYPE : 1BHK</Typography>
          </div>
          <div
            style={{ marginLeft: 20, alignItems: "center", display: "flex" }}
          >
            <Typography style={{ fontSize: 17 }}>
              Payment Against Flat No. {data[0]?.FlatNo || ""} On {data[0]?.FloorNo || ""} Floor Of the Building Known as
              "THE HEAVEN'S PALACE"
            </Typography>
          </div>
        </div>

        <TableContainer component={Paper}>
  <Table style={{ border: "1px solid black" }}>
    <TableHead>
      <TableRow>
        <TableCell>Cheque Date</TableCell>
        <TableCell>Bank Name</TableCell>
        <TableCell>Cheque Number</TableCell>
        <TableCell>Cheque Amount</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map(payment => (
        <TableRow key={payment.paymentID}>
          <StyledTableCell>{payment.ChequeDate}</StyledTableCell>
          <StyledTableCell>{payment.BankName}</StyledTableCell>
          <StyledTableCell>{payment.ChequeNumber}</StyledTableCell>
          <StyledTableCell>{payment.ChequeAmount}</StyledTableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>


        <TableContainer component={Paper}>
          <Table style={{ border: "1px solid black" }}>
            <TableBody>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ width: "75%", padding: 0 }}
                  colSpan={10}
                >
                  <Typography style={{ textAlign: "left", marginLeft: 10 }}>
                    Total
                  </Typography>
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "25%", padding: 0 }}
                  colSpan={10}
                >
                  <Typography>{data[0]?.TotalCost}</Typography>
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table className="info-border">
            <TableBody>
              <TableRow style={{ border: "1px solid black", padding: 0 }}>
                <StyledTableCell
                  style={{
                    textAlign: "left",
                    padding: 0,
                    paddingLeft: 10,
                    fontSize: 22,
                  }}
                  colSpan={10}
                >
                  In Words :{data[0]?.FlatCostInWords}
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              paddingTop: 10,
              width: "50%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StyledTableCell
              style={{
                marginTop: 10,
                textAlign: "center",
                color: "#000",
                fontSize: 25,
                fontWeight: 500,
                padding: 0,
                width: "100%",
                paddingTop: 5,
                paddingBottom: 5,
                marginBottom: 10,
              }}
              colSpan={10}
            >
              ₹ {data[0].TotalCost } /-
            </StyledTableCell>
            <StyledTableCell
              style={{
                textAlign: "center",
                color: "#000",
                fontSize: 16,
                fontWeight: 500,
                padding: 0,
                width: "100%",
                marginBottom: 10,
                paddingTop: 5,
                paddingBottom: 5,
              }}
              colSpan={10}
            >
              T&C: Subject to Realisation of Cheque*
            </StyledTableCell>
          </div>
          <div
            style={{
              marginLeft: 10,
              minWidth: "25%",
            }}
          >
            <StyledTableCell
              style={{
                marginTop: 10,
                textAlign: "center",
                color: "#000",
                fontSize: 25,
                fontWeight: 500,
                padding: 0,
                width: "25%",
                minWidth: "25%",
                marginBottom: 10,
              }}
              colSpan={10}
            >
              <img
                src="https://i.postimg.cc/PJfmZCRv/Untitled-design-2024-04-12-T161558-455.png"
                alt="200 * 200"
                width="80"
                height="100%"
              />
            </StyledTableCell>
          </div>
          <div
            style={{
              marginLeft: 10,
              minWidth: "25%",
            }}
          >
            <StyledTableCell
              style={{
                marginTop: 10,
                textAlign: "center",
                color: "#000",
                fontSize: 25,
                fontWeight: 500,
                padding: 0,
                width: "25%",
                minWidth: "50%",
                marginBottom: 10,
              }}
              colSpan={10}
            >
              <img
                src="https://i.postimg.cc/PJfmZCRv/Untitled-design-2024-04-12-T161558-455.png"
                alt="200 * 200"
                width="80"
                height="100%"
              />
            </StyledTableCell>
          </div>
        </div>

        <TableContainer component={Paper}>
          <Table className="info-border">
            <TableBody>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{
                    textAlign: "center",
                    color: "#000",
                    fontSize: 25,
                    fontWeight: 500,
                    padding: 0,
                  }}
                  colSpan={10}
                >
                  Thank You
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </InvoiceBox>
    </>
  );
};

export default Reciept;
