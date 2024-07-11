import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, styled } from '@mui/material';

const StyledTableCell = styled(TableCell)({
  border: '1px solid black',
  padding: '5px',
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
  color: '#555',
});

const Addreceipt = () => {
  return (
    <InvoiceBox>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <StyledTableCell colSpan={3}>
                <Typography variant="h1" style={{ textAlign: 'left', paddingLeft: '5px' }}>Sai Agro Engineers</Typography>
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>
                A/p- xyz, afk Chowk Tal: shirur , Dist: Pune 510511 <br />
                GST NO. 435653467347g VAT NO - 654773573fg <br />
                GSTIN/UIN:
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: 'right', paddingRight: '20px' }}>
                Mobile No. - 456456422 <br />
                State Name: Maharashtra, Code 27 <br />
                E-Mail : sai_ckn@rediffmail.com
              </StyledTableCell>
              <StyledTableCell>
                <img src="https://i.postimg.cc/PJfmZCRv/Untitled-design-2024-04-12-T161558-455.png" alt="200 * 200" width="70" height="70" />
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <StyledTableCell>
                <Typography variant="h4">
                  <b style={{ color: 'darkblue' }}>GSTIN : </b> 56757687gj543jg
                </Typography>
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: 'center', color: 'darkblue' }}>
                <Typography variant="h1">TAX INVOICE</Typography>
              </StyledTableCell>
              <StyledTableCell style={{ textAlign: 'right' }}>
                <Typography variant="h5">ORIGINAL FOR RECIPIENT</Typography>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <StyledTableCell style={{ textAlign: 'center', border: '1px solid' }} colSpan={2}>
                <Typography variant="h4">Customer Detail</Typography>
              </StyledTableCell>
              <StyledTableCell colSpan={4}>&nbsp;</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={2} style={{ borderRight: '1px solid' }}></StyledTableCell>
              <StyledTableCell>Invoice No.</StyledTableCell>
              <StyledTableCell>GST1657020</StyledTableCell>
              <StyledTableCell>Invoice Date</StyledTableCell>
              <StyledTableCell>xyz</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell><b>M/S</b></StyledTableCell>
              <StyledTableCell style={{ borderRight: '1px solid' }}>Kevin Motors</StyledTableCell>
              <StyledTableCell>Challan No</StyledTableCell>
              <StyledTableCell>865</StyledTableCell>
              <StyledTableCell>Challan Date</StyledTableCell>
              <StyledTableCell>03-Mar-20204</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell><b>Address</b></StyledTableCell>
              <StyledTableCell style={{ borderRight: '1px solid' }}>Chandani Chok, New Delhi, Opposite Statue, New Delhiq, Delhi - 110014</StyledTableCell>
              <StyledTableCell>P.O. No.</StyledTableCell>
              <StyledTableCell colSpan={3}>66</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell><b>PHONE</b></StyledTableCell>
              <StyledTableCell style={{ borderRight: '1px solid' }}>89786547476</StyledTableCell>
              <StyledTableCell>DELIVERY DATE</StyledTableCell>
              <StyledTableCell>04-Mar-20204</StyledTableCell>
              <StyledTableCell>Reverse Charge</StyledTableCell>
              <StyledTableCell>No</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell><b>GSTIN</b></StyledTableCell>
              <StyledTableCell style={{ borderRight: '1px solid' }}>dge554g36634</StyledTableCell>
              <StyledTableCell>Due Date</StyledTableCell>
              <StyledTableCell colSpan={3}>19-Mar-2020</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell><b>Place of Supply</b></StyledTableCell>
              <StyledTableCell style={{ borderRight: '1px solid' }}>Delhi ( 07 )</StyledTableCell>
              <StyledTableCell>E-Way No</StyledTableCell>
              <StyledTableCell colSpan={3}>657thtg3453</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table style={{ border: '1px solid black' }}>
          <TableBody>
            <TableRow>
              <StyledTableCell>&nbsp;</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table className="info-border">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr. No.</StyledTableCell>
              <StyledTableCell>Name of Product / Service</StyledTableCell>
              <StyledTableCell>HSN / SAC</StyledTableCell>
              <StyledTableCell>Qty</StyledTableCell>
              <StyledTableCell>Rate</StyledTableCell>
              <StyledTableCell>Taxable Value</StyledTableCell>
              <StyledTableCell colSpan={2}>IGST</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell style={{ borderBottom: '1px solid' }}>%</StyledTableCell>
              <StyledTableCell style={{ borderBottom: '1px solid' }}>Amount</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>1</StyledTableCell>
              <StyledTableCell>Automatic Saw</StyledTableCell>
              <StyledTableCell>8202</StyledTableCell>
              <StyledTableCell>1.00 PCS</StyledTableCell>
              <StyledTableCell>586.00</StyledTableCell>
              <StyledTableCell>586.00</StyledTableCell>
              <StyledTableCell>9.00</StyledTableCell>
              <StyledTableCell>52.74</StyledTableCell>
              <StyledTableCell>638.74</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>2</StyledTableCell>
              <StyledTableCell>Automatic Saw</StyledTableCell>
              <StyledTableCell>8202</StyledTableCell>
              <StyledTableCell>1.00 PCS</StyledTableCell>
              <StyledTableCell>586.00</StyledTableCell>
              <StyledTableCell>586.00</StyledTableCell>
              <StyledTableCell>9.00</StyledTableCell>
              <StyledTableCell>52.74</StyledTableCell>
              <StyledTableCell>638.74</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={3} style={{ textAlign: 'right', borderTop: '1px solid' }}>Total</StyledTableCell>
              <StyledTableCell>2</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>1,154.00</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>103.86</StyledTableCell>
              <StyledTableCell>1,257.86</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table style={{ border: '1px solid black' }}>
          <TableBody>
            <TableRow>
              <StyledTableCell colSpan={9}>&nbsp;</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={7} style={{ textAlign: 'right', borderBottom: '1px solid' }}>
                Total Invoice Amount:
              </StyledTableCell>
              <StyledTableCell colSpan={2} style={{ textAlign: 'right' }}>
                1,257.86
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table style={{ border: '1px solid black' }}>
          <TableBody>
            <TableRow>
              <StyledTableCell colSpan={2}>
                <Typography variant="h4"><b style={{ color: 'darkblue' }}>Tax Amount In Words:</b></Typography>
              </StyledTableCell>
              <StyledTableCell colSpan={7}>RUPEES ONE THOUSAND TWO HUNDRED FIFTY-SEVEN AND PAISE EIGHTY-SIX ONLY</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={9}>&nbsp;</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={3}>
                <Typography variant="h5"><b style={{ color: 'darkblue' }}>Company's PAN: GQOPS8995A</b></Typography>
              </StyledTableCell>
              <StyledTableCell colSpan={3}>&nbsp;</StyledTableCell>
              <StyledTableCell colSpan={3}>
                <Typography variant="h4" style={{ textAlign: 'center' }}>For Sai Agro Engineers</Typography>
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={6}>&nbsp;</StyledTableCell>
              <StyledTableCell colSpan={3}>
                <Typography variant="h5" style={{ textAlign: 'center' }}>Authorized Signatory</Typography>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </InvoiceBox>
  );
};

export default Addreceipt;