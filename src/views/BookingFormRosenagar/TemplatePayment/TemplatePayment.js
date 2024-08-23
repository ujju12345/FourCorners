import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { useRouter } from "next/router";
import CancelIcon from "@mui/icons-material/Cancel";
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

const TemplatePayment = ({ bookingID, handleCancel }) => {
  const router = useRouter();
  console.log(bookingID, "row data aaayaa<<<<>>>>>>>>>>> ");
  const printRef = useRef();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOption, setFilterOption] = useState("remarksWithCreateDate");
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchData();
  }, [bookingID]);

  const fetchData = async (selectedFilter) => {
    try {
      const response = await axios.get(
        `https://apiforcorners.cubisysit.com/api/api-fetch-projectbooking.php?BookingID=${bookingID}&filter=${selectedFilter}`
      );
      console.log("data aaya dekh<<<<<>>>>>>>>>>>>>", response.data);
      setData(response.data.data);
      setPayments(response.data.data.payments); // Assuming you need to set payments here
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const filteredRemarks =
    filterOption === "remarksWithCreateDate"
      ? data?.remarksWithCreateDate
      : data?.otherRemarks;

  const totalCash = payments.reduce(
    (sum, payment) => sum + (payment.Cash || 0),
    0
  );
  const totalCheque = payments.reduce(
    (sum, payment) => sum + (payment.ChequeAmount || 0),
    0
  );
  const totalAPlusB = totalCash + totalCheque;
  const balance = data?.TotalCost - totalAPlusB;

  const rows = payments.map((payment) => ({
    Date: payment.Date,
    Cash: payment.Cash || 0,
    ChequeAmount: payment.ChequeAmount || 0,
    TotalAPlusB: (payment.Cash || 0) + (payment.ChequeAmount || 0),
    Balance:
      (data?.TotalCost || 0) -
      ((payment.Cash || 0) + (payment.ChequeAmount || 0)),
    Wing: data?.WingName || "",
    Floor: data?.FloorNo || "",
    FlatNo: data?.FlatNumber || "",
    Type: data?.Type || "",
  }));

  // Ensure there are always 15 rows displayed
  const totalRows = 25;
  const defaultRowsCount = Math.max(totalRows - rows.length, 0);
  const defaultRows = new Array(defaultRowsCount).fill({
    Date: "",
    Cash: "",
    ChequeAmount: "",
    TotalAPlusB: "",
    Balance: "",
    Wing: "",
    Floor: "",
    FlatNo: "",
    Type: "",
  });

  // Combine actual and default rows
  const finalRows = [...rows, ...defaultRows];

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading data</Typography>;
  }

  return (
    <>
      <GlobalStyle />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={2}
      >
        <FormControl style={{ minWidth: 150, marginRight: 20 }}>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select"
            label="Filter"
            value={filterOption}
            onChange={handleFilterChange}
          >
            <MenuItem value="remarksWithCreateDate">Original Remark</MenuItem>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="otherRemarks">Updated Remark</MenuItem>
          </Select>
        </FormControl>

        <IconButton onClick={handleCancel}>
          <CancelIcon style={{ color: "red" }} />
        </IconButton>
      </Box>
      {/* )} */}

      <InvoiceBox className="printableArea" ref={printRef}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow sx={{ height: "10px", padding: 0 }}>
                <StyledTableCell
                  colSpan={3}
                  sx={{ height: "10px", padding: 0 }}
                >
                  <Typography
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: 900,
                    }}
                  >
                    QUOTATION
                  </Typography>
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell colSpan={3} sx={{ padding: 0 }}>
                  <Typography
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: 700,
                    }}
                  >
                    RERA NO. {data.reraregistration}
                  </Typography>
                  <Typography
                    style={{ float: "left", fontSize: 15, fontWeight: 200 }}
                  >
                    Date: {data.BookingDate}
                  </Typography>
                  <Typography
                    style={{ float: "right", fontSize: 15, fontWeight: 200 }}
                  >
                    Booked By: {data.UserName}
                  </Typography>
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell style={{ textAlign: "center", padding: 0 }}>
                  <img src="{images}" alt="Logo" width="70" height="100" />
                </StyledTableCell>
                <StyledTableCell sx={{ padding: 0 }}>
                  <img
                    src="https://i.postimg.cc/PJfmZCRv/Untitled-design-2024-04-12-T161558-455.png"
                    alt="200 * 200"
                    width="30"
                    height="100"
                  />
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ textAlign: "left", width: "20%", padding: 0 }}
                  colSpan={2}
                >
                  <Typography>Name Of Purchase</Typography>
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "80%", padding: 0 }}
                  colSpan={10}
                >
                  {data.BookingName}
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ textAlign: "left", padding: 0 }}
                  colSpan={2}
                >
                  <Typography>Address</Typography>
                </StyledTableCell>
                <StyledTableCell
                  colSpan={10}
                  style={{ textAlign: "center", padding: 0 }}
                >
                  {data.Address}
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ textAlign: "left", padding: 0 }}
                  colSpan={2}
                >
                  <Typography>MOBILE No.</Typography>
                </StyledTableCell>
                <StyledTableCell
                  colSpan={10}
                  style={{ textAlign: "center", padding: 0 }}
                >
                  {data.Mobile}
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ textAlign: "left", padding: 0 }}
                  colSpan={2}
                >
                  <Typography>PAN Card No.</Typography>
                </StyledTableCell>
                <StyledTableCell
                  colSpan={10}
                  style={{ textAlign: "center", padding: 0 }}
                >
                  {data.Pancard}
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  colSpan={2}
                  style={{ textAlign: "left", padding: 0 }}
                >
                  <Typography>Aadhar No.</Typography>
                </StyledTableCell>
                <StyledTableCell
                  colSpan={10}
                  style={{ textAlign: "center", padding: 0 }}
                >
                  {data.Aadhar}
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ textAlign: "left", padding: 0 }}
                  colSpan={2}
                >
                  <Typography>EMAIL ID.</Typography>
                </StyledTableCell>
                <StyledTableCell
                  colSpan={10}
                  style={{ textAlign: "center", padding: 0 }}
                >
                  {data.Email}
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table style={{ border: "1px solid black" }}>
            <TableBody>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ width: "40%", padding: 0 }}
                  colSpan={10}
                >
                  <Typography>Project</Typography>
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "15%", padding: 0 }}
                  colSpan={10}
                >
                  <Typography>Wing</Typography>
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "15%", padding: 0 }}
                  colSpan={10}
                >
                  <Typography>Floor</Typography>
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "15%", padding: 0 }}
                  colSpan={10}
                >
                  <Typography>Flat No.</Typography>
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "15%", padding: 0 }}
                  colSpan={10}
                >
                  <Typography>Type</Typography>
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ width: "40%", padding: 0 }}
                  colSpan={10}
                >
                  {data.ProjectName}
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "15%", padding: 0 }}
                  colSpan={10}
                >
                  {data.WingName}
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "15%", padding: 0 }}
                  colSpan={10}
                >
                  {data.FloorNo}
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "15%", padding: 0 }}
                  colSpan={10}
                >
                  {data.FlatNo}
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "15%", padding: 0 }}
                  colSpan={10}
                >
                  {data.UnittypeName}
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table className="info-border">
            <TableBody>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  Type of Booking
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.BookingTypeName}
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  GST* (As per Govt.Notification)
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.Gst}
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  Area in Building (in Sq.Ft)
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.Area}
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  Stamp Duty* (As per Govt.Notification)
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.StampDuty}
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  Rate Sq.Ft
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.Ratesqft}
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  Registration* (As per Govt.Notification)
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.Registration}
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  TTL Amount As Per Builtup
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.TtlAmount}
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  Advocate* (At time of registration)
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.Advocate}
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  Development Charges
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.Charges}
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  Extra Cost (B)
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.ExtraCost}
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  Parking Facility
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.ParkingFacility}
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  Total (A + B)
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.TotalCost}
                </StyledTableCell>
              </TableRow>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  Gross Flat Cost (A)
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.FlatCost}
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  Booking Ref.Code (T & C)
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.BookingRef}
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
                  style={{ textAlign: "left", padding: 0 }}
                  colSpan={10}
                >
                  Rupees in words : {data.FlatCostInWords}
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table className="info-border">
            <TableBody>
              <TableRow sx={{ padding: 0 }}>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  Usable Area in Sq.Ft
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.UsableArea}
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "30%", padding: 0 }}
                  colSpan={4}
                >
                  Agreement Carpet (RERA) in Sq.Ft
                </StyledTableCell>
                <StyledTableCell
                  style={{ width: "20%", padding: 0 }}
                  colSpan={1}
                >
                  {data.AgreementCarpet}
                </StyledTableCell>
              </TableRow>

              {filterOption === "remarksWithCreateDate" && (
                <>
                  <TableRow sx={{ padding: 0 }}>
                    <StyledTableCell
                      style={{
                        textAlign: "left",
                        fontSize: 15,
                        fontWeight: "bolder",
                        padding: 0,
                      }}
                      colSpan={10}
                    >
                      Original Remarks:
                    </StyledTableCell>
                  </TableRow>
                  {filteredRemarks &&
                    filteredRemarks.map((remark, index) => (
                      <TableRow
                        key={`remarksWithCreateDate-${index}`}
                        sx={{ padding: 0 }}
                      >
                        <StyledTableCell
                          style={{ textAlign: "left", padding: 0 }}
                          colSpan={10}
                        >
                          {index + 1}. Rs. {remark.Remarkamount}{" "}
                          {remark.RemarkName} {remark.RemarkDate}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                </>
              )}

              {filterOption === "otherRemarks" && (
                <>
                  <TableRow sx={{ padding: 0 }}>
                    <StyledTableCell
                      style={{
                        textAlign: "left",
                        fontSize: 15,
                        fontWeight: "bolder",
                        padding: 0,
                      }}
                      colSpan={10}
                    >
                      Updated Remarks:
                    </StyledTableCell>
                  </TableRow>
                  {filteredRemarks &&
                    filteredRemarks.map((remark, index) => (
                      <TableRow
                        key={`otherRemarks-${index}`}
                        sx={{ padding: 0 }}
                      >
                        <StyledTableCell
                          style={{ textAlign: "left", padding: 0 }}
                          colSpan={10}
                        >
                          {index + 1}. Rs. {remark.Remarkamount}{" "}
                          {remark.RemarkName} {remark.RemarkDate}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                </>
              )}

              {filterOption === "all" && (
                <>
                  <TableRow sx={{ padding: 0 }}>
                    <StyledTableCell
                      style={{
                        textAlign: "left",
                        fontSize: 15,
                        fontWeight: "bolder",
                        padding: 0,
                      }}
                      colSpan={10}
                    >
                      Original Remarks:
                    </StyledTableCell>
                  </TableRow>
                  {data?.remarksWithCreateDate &&
                    data?.remarksWithCreateDate.map((remark, index) => (
                      <TableRow
                        key={`remarksWithCreateDate-${index}`}
                        sx={{ padding: 0 }}
                      >
                        <StyledTableCell
                          style={{ textAlign: "left", padding: 0 }}
                          colSpan={10}
                        >
                          {index + 1}. Rs. {remark.Remarkamount}{" "}
                          {remark.RemarkName} {remark.RemarkDate}
                        </StyledTableCell>
                      </TableRow>
                    ))}

                  <TableRow sx={{ padding: 0 }}>
                    <StyledTableCell
                      style={{
                        textAlign: "left",
                        fontSize: 15,
                        fontWeight: "bolder",
                        padding: 0,
                      }}
                      colSpan={10}
                    >
                      UPDATED REMARKS:
                    </StyledTableCell>
                  </TableRow>
                  {data?.otherRemarks &&
                    data?.otherRemarks.map((remark, index) => (
                      <TableRow
                        key={`otherRemarks-${index}`}
                        sx={{ padding: 0 }}
                      >
                        <StyledTableCell
                          style={{ textAlign: "left", padding: 0 }}
                          colSpan={10}
                        >
                          {index + 1}. {remark.Remarkamount} {remark.RemarkName}{" "}
                          {remark.RemarkDate}
                        </StyledTableCell>
                      </TableRow>
                    ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          <Table className="info-border">
            <TableBody>
              <TableRow style={{ border: "1px solid black", padding: 0 }}>
                <StyledTableCell colSpan={4} style={{ padding: 0 }}>
                  Verified By
                </StyledTableCell>
                <StyledTableCell colSpan={4} style={{ padding: 0 }}>
                  Maked By
                </StyledTableCell>
                <StyledTableCell colSpan={4} style={{ padding: 0 }}>
                  Purchaser Signature & Date
                </StyledTableCell>
              </TableRow>
              {/* Add rows for signatures */}
              <TableRow style={{ padding: 0 }}>
                <StyledTableCell
                  colSpan={4}
                  style={{ height: "90px", padding: 0 }}
                ></StyledTableCell>
                <StyledTableCell
                  colSpan={4}
                  style={{ height: "90px", padding: 0 }}
                ></StyledTableCell>
                <StyledTableCell
                  colSpan={4}
                  style={{ height: "90px", padding: 0 }}
                ></StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </InvoiceBox>
      <InvoiceBox>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {/* Payment Summary Row */}

              {/* Table Headers */}
              <TableRow>
                <StyledTableCell
                  colSpan={5}
                  style={{ textAlign: "center", borderBottom: "none" }}
                >
                  <Typography style={{ fontSize: 20, fontWeight: 700 }}>
                    PROJECT
                  </Typography>
                  <Typography style={{ fontSize: 20, fontWeight: 700 }}>
                    {data.ProjectName}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: "center" }}>
                  WING
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: "center" }}>
                  FLOOR
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: "center" }}>
                  FLAT NO.
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: "center" }}>
                  TYPE
                </StyledTableCell>
              </TableRow>

              <TableRow>
                <StyledTableCell style={{ textAlign: "center" }}>
                  DATE
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: "center" }}>
                  A
                </StyledTableCell>
                <StyledTableCell colSpan={4} style={{ textAlign: "center" }}>
                  B
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: "center" }}>
                  A + B
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: "center" }}>
                  Balance
                </StyledTableCell>
                <StyledTableCell style={{ textAlign: "center" }}>
                  Sign.
                </StyledTableCell>
              </TableRow>

              {/* Render Rows */}
              {finalRows.map((row, index) => (
                <TableRow key={index}>
                  <StyledTableCell style={{ textAlign: "center" }}>
                    {row.Date}
                  </StyledTableCell>
                  <StyledTableCell style={{ textAlign: "center" }}>
                    {row.Cash}
                  </StyledTableCell>
                  <StyledTableCell colSpan={4} style={{ textAlign: "center" }}>
                    {row.ChequeAmount}
                  </StyledTableCell>
                  <StyledTableCell style={{ textAlign: "center" }}>
                    {row.TotalAPlusB}
                  </StyledTableCell>
                  <StyledTableCell style={{ textAlign: "center" }}>
                    {row.Balance}
                  </StyledTableCell>
                  <StyledTableCell style={{ textAlign: "center" }}>
                    {" "}
                    {/* Signature here */}{" "}
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: 20 }}>
          Note: All payments are subject to receipt and realization.
        </Typography>
      </InvoiceBox>
    </>
  );
};

export default TemplatePayment;
