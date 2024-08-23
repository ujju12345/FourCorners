import React, { useState, useEffect } from "react";
import { Button, Grid, CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import TabInfo from "src/views/manage-companydetail/TabInfo";
import TabAccount from "src/views/account-settings/TabAccount";
import UpdateCompanyMaster from "src/views/update-companyMaster/UpdateCompanyMaster";

const AccountSettings = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(); // 'list', 'account', 'update'
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-companymaster.php"
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

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">Error fetching data: {error.message}</Alert>;
  }

  const handleNavigation = () => {
    setActiveTab('account'); // Show TabAccount component
  };

  const handleEdit = (row) => {
    setEditData(row);
   
  };
  const handleSubmissionSuccess = () => {
    setActiveTab('list'); // Show TabInfo component after successful submission
    fetchData(); // Fetch updated data to display in TabInfo
  };

      const jsonToCSV = (json) => {
        const header = Object.keys(json[0]).join(",");
        const values = json
          .map((obj) => Object.values(obj).join(","))
          .join("\n");
        return `${header}\n${values}`;
      };

      const handleDownload = () => {
        const csv = jsonToCSV(rows);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "data.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };


      const handleBack = () => {
        // setEditData(null);
        fetchData(); // Refetch data after adding or editing details
      };
  return (
    <>
      {/* {activeTab === "list" && ( */}
        <>
  


         
        
        <TabAccount
          show={handleBack}
          onSubmitSuccess={handleSubmissionSuccess}
          editData={editData}
        />

           <Grid item xs={12}>
        

           
          </Grid>
     

          <Grid container spacing={6}>
            <Grid item xs={12}>
           
              <TabInfo   onEdit={handleEdit} />
            </Grid>
          </Grid>
        </>
     

     

      
    </>
  );
};

export default AccountSettings;
