import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Addreceipt = () => {
  const [receiptDate, setReceiptDate] = useState(null);
  const [accountingDate, setAccountingDate] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [memberCode, setMemberCode] = useState("");
  const [memberName, setMemberName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [chequeInstrumentNumber, setChequeInstrumentNumber] = useState("");
  const [chequeInstrumentDate, setChequeInstrumentDate] = useState(null);
  const [bankName, setBankName] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [tdsChallan, setTdsChallan] = useState("");
  const [tdsCinNo, setTdsCinNo] = useState("");
  const [bsrCode, setBsrCode] = useState("");
  const [tdsChallanDate, setTdsChallanDate] = useState(null);
  const [tdsLedgerAccount, setTdsLedgerAccount] = useState("");
  const [receiptEntries, setReceiptEntries] = useState("");
  const [unitCode, setUnitCode] = useState("");
  const [voucherType, setVoucherType] = useState("");
  const [particulars, setParticulars] = useState("");
  const [amount, setAmount] = useState("");
  const [bankCashAccount, setBankCashAccount] = useState("");

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      ReceiptDate: receiptDate,
      AccountingDate: accountingDate,
      ProjectName: projectName,
      MemberCode: memberCode,
      MemberName: memberName,
      TotalAmount: totalAmount,
      PaymentMode: paymentMode,
      ChequeInstrumentNumber: chequeInstrumentNumber,
      ChequeInstrumentDate: chequeInstrumentDate,
      BankName: bankName,
      BankBranch: bankBranch,
      TDSChallan: tdsChallan,
      TDSCINNo: tdsCinNo,
      BSRCode: bsrCode,
      TDSChallanDate: tdsChallanDate,
      TDSLedgerAccount: tdsLedgerAccount,
      ReceiptEntries: receiptEntries,
      UnitCode: unitCode,
      VoucherType: voucherType,
      Particulars: particulars,
      Amount: amount,
      BankCashAccount: bankCashAccount,
    };

    axios
      .post(
        "https://ideacafe-backend.vercel.app/api/proxy/api-insert-receipt.php",
        formData
      )
      .then((response) => {
        if (response.data.status === "Success") {
          setSubmitSuccess(true);
          resetForm();
        } else {
          setSubmitSuccess(false);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setSubmitSuccess(false);
      });
  };

  const resetForm = () => {
    setReceiptDate(null);
    setAccountingDate(null);
    setProjectName("");
    setMemberCode("");
    setMemberName("");
    setTotalAmount("");
    setPaymentMode("");
    setChequeInstrumentNumber("");
    setChequeInstrumentDate(null);
    setBankName("");
    setBankBranch("");
    setTdsChallan("");
    setTdsCinNo("");
    setBsrCode("");
    setTdsChallanDate(null);
    setTdsLedgerAccount("");
    setReceiptEntries("");
    setUnitCode("");
    setVoucherType("");
    setParticulars("");
    setAmount("");
    setBankCashAccount("");
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Receipt Date"
                type="date"
                value={receiptDate}
                onChange={(e) => setReceiptDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Accounting Date"
                type="date"
                value={accountingDate}
                onChange={(e) => setAccountingDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Member Code"
                value={memberCode}
                onChange={(e) => setMemberCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Member Name"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Amount"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Payment Mode"
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cheque Instrument Number"
                value={chequeInstrumentNumber}
                onChange={(e) => setChequeInstrumentNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cheque Instrument Date"
                type="date"
                value={chequeInstrumentDate}
                onChange={(e) => setChequeInstrumentDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bank Branch"
                value={bankBranch}
                onChange={(e) => setBankBranch(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="TDS Challan"
                value={tdsChallan}
                onChange={(e) => setTdsChallan(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="TDS CIN No"
                value={tdsCinNo}
                onChange={(e) => setTdsCinNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="BSR Code"
                value={bsrCode}
                onChange={(e) => setBsrCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="TDS Challan Date"
                type="date"
                value={tdsChallanDate}
                onChange={(e) => setTdsChallanDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="TDS Ledger Account"
                value={tdsLedgerAccount}
                onChange={(e) => setTdsLedgerAccount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Receipt Entries"
                value={receiptEntries}
                onChange={(e) => setReceiptEntries(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Unit Code"
                value={unitCode}
                onChange={(e) => setUnitCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Voucher Type"
                value={voucherType}
                onChange={(e) => setVoucherType(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Particulars"
                value={particulars}
                onChange={(e) => setParticulars(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bank Cash Account"
                value={bankCashAccount}
                onChange={(e) => setBankCashAccount(e.target.value)}
              />
            </Grid>
  
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
  
};

export default Addreceipt;
