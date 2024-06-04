// ** React Imports
import { useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Card from '@mui/material/Card';

const Addsubprojectdetails = ({ show }) => {
  const [selectedProject, setSelectedProject] = useState("");
  const [subProjectId, setSubProjectId] = useState("");
  const [subProjectCode, setSubProjectCode] = useState("");
  const [companyName, setCompanyName] = useState('')
  const [totalCarParking, setTotalCarParking] = useState("");
  const [defaultCarParkingsPerUnit, setDefaultCarParkingsPerUnit] = useState("");
  const [hsnCodeInstallmentLetter, setHsnCodeInstallmentLetter] = useState("");
  const [taxCodeInstallmentLetter, setTaxCodeInstallmentLetter] = useState("");
  const [loadingPercent, setLoadingPercent] = useState("");
  const [floorsDescription, setFloorsDescription] = useState("");
  const [separateAgreements, setSeparateAgreements] = useState("");
  const [salesGoLiveDate, setSalesGoLiveDate] = useState(null);
  const [financePostingInstallmentLetter, setFinancePostingInstallmentLetter] = useState("");
  const [totalUnits, setTotalUnits] = useState("");
  const [totalSaleAreaUnits, setTotalSaleAreaUnits] = useState("");
  const [totalShopsOffices, setTotalShopsOffices] = useState("");
  const [basicRatePerSqft, setBasicRatePerSqft] = useState("");
  const [unitCancellationCharges, setUnitCancellationCharges] = useState("");
  const [brokeragePercentage, setBrokeragePercentage] = useState("");
  const [brokerageDueAfterAmtReceivedPercentage, setBrokerageDueAfterAmtReceivedPercentage] = useState("");
  const [bankName, setBankName] = useState("");
  const [favorOf, setFavorOf] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [floorRiseEntries, setFloorRiseEntries] = useState("");
  const [fromFloor, setFromFloor] = useState("");
  const [toFloor, setToFloor] = useState("");
  const [floorRiseRate, setFloorRiseRate] = useState("");
  const [additionSubtractionInBasicRate, setAdditionSubtractionInBasicRate] = useState("");
  const [ccEntries, setCcEntries] = useState("");
  const [particulars, setParticulars] = useState("");
  const [date, setDate] = useState(null);
  const [responsiblePerson, setResponsiblePerson] = useState("");

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetchsubprojectdetails.php"
      );
      console.log("API Response:", response.data);
      setRows(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmitData = async (event) => {
    event.preventDefault();

    const body = {
      ProjectID: selectedProject,
      SubProjectID: subProjectId,
      TotalCarParking: totalCarParking,
      DefaultCarParkingsPerUnit: defaultCarParkingsPerUnit,
      HSNCodeInstallmentLetter: hsnCodeInstallmentLetter,
      TaxCodeInstallmentLetter: taxCodeInstallmentLetter,
      LoadingPercent: loadingPercent,
      FloorsDescription: floorsDescription,
      SeparateAgreementsConstructionLand: separateAgreements,
      SalesGoLiveDate: salesGoLiveDate,
      FinancePostingInstallmentLetter: financePostingInstallmentLetter,
      TotalUnits: totalUnits,
      TotalSaleAreaUnits: totalSaleAreaUnits,
      TotalShopsOffices: totalShopsOffices,
      BasicRatePerSqft: basicRatePerSqft,
      UnitCancellationCharges: unitCancellationCharges,
      BrokeragePercentage: brokeragePercentage,
      BrokerageDueAfterAmtReceivedPercentage: brokerageDueAfterAmtReceivedPercentage,
      BankName: bankName,
      Favorof: favorOf,
      IFSCCode: ifscCode,
      AccountNo: accountNo,
      FloorRiseEntries: floorRiseEntries,
      FromFloor: fromFloor,
      ToFloor: toFloor,
      FloorRiseRate: floorRiseRate,
      AdditionSubtractionInBasicRate: additionSubtractionInBasicRate,
      CCEntries: ccEntries,
      Particulars: particulars,
      Date: date,
      ResponsiblePerson: responsiblePerson,
    };

    try {
      const response = await axios.post(
        "https://ideacafe-backend.vercel.app/api/proxy/api-insert-subprojectdetails.php",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "Success") {
        setSubmitSuccess(true);
        setSubmitError(false);
        show(false);
        // Clear form fields
        setSelectedProject("");
        setSubProjectId("");
        setTotalCarParking("");
        setDefaultCarParkingsPerUnit("");
        setHsnCodeInstallmentLetter("");
        setTaxCodeInstallmentLetter("");
        setLoadingPercent("");
        setFloorsDescription("");
        setSeparateAgreements("");
        setSalesGoLiveDate(null);
        setFinancePostingInstallmentLetter("");
        setTotalUnits("");
        setTotalSaleAreaUnits("");
        setTotalShopsOffices("");
        setBasicRatePerSqft("");
        setUnitCancellationCharges("");
        setBrokeragePercentage("");
        setBrokerageDueAfterAmtReceivedPercentage("");
        setBankName("");
        setFavorOf("");
        setIfscCode("");
        setAccountNo("");
        setFloorRiseEntries("");
        setFromFloor("");
        setToFloor("");
        setFloorRiseRate("");
        setAdditionSubtractionInBasicRate("");
        setCcEntries("");
        setParticulars("");
        setDate(null);
        setResponsiblePerson("");
      } else {
        setSubmitSuccess(false);
        setSubmitError(true);
      }
    } catch (error) {
      console.error("There was an error!", error);
      setSubmitSuccess(false);
      setSubmitError(true);
    }
  };

  return (
    <Card>
      <CardContent>
        <form>
          <Grid container spacing={7}>
            <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
              <Box>
                <Typography
                  variant="body2"
                  sx={{ marginTop: 5, fontWeight: "bold", fontSize: 20 }}
                >
                  Manage Sub Project Details
                </Typography>
              </Box>
            </Grid>

            {/* <Grid item xs={8} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Project Name</InputLabel>
              <Select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                label="Project Name"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {rows.map((project) => (
                  <MenuItem key={project.ProjectID} value={project.ProjectID}>
                    {project.ProjectName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}


            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Company Name "
                placeholder=" Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Project Name"
                placeholder=" Project Name"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              />
            </Grid>


            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Sub Project "
                placeholder="Sub Project "
                value={subProjectId}
                onChange={(e) => setSubProjectId(e.target.value)}
              />
            </Grid>


            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Sub Project Code"
                placeholder="Sub Project Code"
                value={subProjectCode}
                onChange={(e) => setSubProjectCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Total Car Parking"
                placeholder="Total Car Parking"
                value={totalCarParking}
                onChange={(e) => setTotalCarParking(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Default Car Parkings Per Unit"
                placeholder="Default Car Parkings Per Unit"
                value={defaultCarParkingsPerUnit}
                onChange={(e) => setDefaultCarParkingsPerUnit(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="HSN Code Installment Letter"
                placeholder="HSN Code Installment Letter"
                value={hsnCodeInstallmentLetter}
                onChange={(e) => setHsnCodeInstallmentLetter(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Tax Code Installment Letter"
                placeholder="Tax Code Installment Letter"
                value={taxCodeInstallmentLetter}
                onChange={(e) => setTaxCodeInstallmentLetter(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Loading Percent"
                placeholder="Loading Percent"
                value={loadingPercent}
                onChange={(e) => setLoadingPercent(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Floors Description"
                placeholder="Floors Description"
                value={floorsDescription}
                onChange={(e) => setFloorsDescription(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Separate Agreements Construction Land"
                placeholder="Separate Agreements Construction Land"
                value={separateAgreements}
                onChange={(e) => setSeparateAgreements(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <DatePicker
                selected={salesGoLiveDate}
                onChange={(date) => setSalesGoLiveDate(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                customInput={
                  <TextField
                    fullWidth
                    label="Sales Go Live Date"
                    InputProps={{
                      readOnly: true,
                      sx: { width: "100%" },
                    }}
                  />
                }
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Finance Posting Installment Letter"
                placeholder="Finance Posting Installment Letter"
                value={financePostingInstallmentLetter}
                onChange={(e) =>
                  setFinancePostingInstallmentLetter(e.target.value)
                }
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Total Units"
                placeholder="Total Units"
                value={totalUnits}
                onChange={(e) => setTotalUnits(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Total Sale Area Units"
                placeholder="Total Sale Area Units"
                value={totalSaleAreaUnits}
                onChange={(e) => setTotalSaleAreaUnits(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Total Shops Offices"
                placeholder="Total Shops Offices"
                value={totalShopsOffices}
                onChange={(e) => setTotalShopsOffices(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Basic Rate Per Sqft"
                placeholder="Basic Rate Per Sqft"
                value={basicRatePerSqft}
                onChange={(e) => setBasicRatePerSqft(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Unit Cancellation Charges"
                placeholder="Unit Cancellation Charges"
                value={unitCancellationCharges}
                onChange={(e) => setUnitCancellationCharges(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Brokerage Percentage"
                placeholder="Brokerage Percentage"
                value={brokeragePercentage}
                onChange={(e) => setBrokeragePercentage(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Brokerage Due After Amt Received Percentage"
                placeholder="Brokerage Due After Amt Received Percentage"
                value={brokerageDueAfterAmtReceivedPercentage}
                onChange={(e) =>
                  setBrokerageDueAfterAmtReceivedPercentage(e.target.value)
                }
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Bank Name"
                placeholder="Bank Name"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Favor Of"
                placeholder="Favor Of"
                value={favorOf}
                onChange={(e) => setFavorOf(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="IFSC Code"
                placeholder="IFSC Code"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Account No"
                placeholder="Account No"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Floor Rise Entries"
                placeholder="Floor Rise Entries"
                value={floorRiseEntries}
                onChange={(e) => setFloorRiseEntries(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="From Floor"
                placeholder="From Floor"
                value={fromFloor}
                onChange={(e) => setFromFloor(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="To Floor"
                placeholder="To Floor"
                value={toFloor}
                onChange={(e) => setToFloor(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Floor Rise Rate"
                placeholder="Floor Rise Rate"
                value={floorRiseRate}
                onChange={(e) => setFloorRiseRate(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Addition Subtraction In Basic Rate"
                placeholder="Addition Subtraction In Basic Rate"
                value={additionSubtractionInBasicRate}
                onChange={(e) =>
                  setAdditionSubtractionInBasicRate(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="CC Entries"
                placeholder="CC Entries"
                value={ccEntries}
                onChange={(e) => setCcEntries(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Particulars"
                placeholder="Particulars"
                value={particulars}
                onChange={(e) => setParticulars(e.target.value)}
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                customInput={
                  <TextField
                    fullWidth
                    label="Date"
                    InputProps={{
                      readOnly: true,
                      sx: { width: "100%" },
                    }}
                  />
                }
              />
            </Grid>

            <Grid item xs={8} sm={4}>
              <TextField
                fullWidth
                label="Responsible Person"
                placeholder="Responsible Person"
                value={responsiblePerson}
                onChange={(e) => setResponsiblePerson(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ marginRight: 3.5 }}
                onClick={handleSubmitData}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default Addsubprojectdetails;
