import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  CircularProgress,
  Avatar,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from 'sweetalert2';

const NoDataIcon = () => (
  <Avatar
    alt="No Data"
    sx={{ width: 500, height: "auto" }}
    src="/images/avatars/nodata.svg"
  />
);

const ListAvailabiltyList = ({ item }) => {
  const router = useRouter();
  const [wings, setWings] = useState([]);
  const [selectedWing, setSelectedWing] = useState(null);
  const [wingDetails, setWingDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [dataAvailable, setDataAvailable] = useState(true);
  const [maxFlats, setMaxFlats] = useState(0);
  const [editingCell, setEditingCell] = useState(null); // New state for tracking which cell is being edited
  const [skuOptions, setSkuOptions] = useState([]); // New state for dropdown options

  useEffect(() => {
    const fetchData = async () => {
      if (!item) return;
      try {
        const apiUrl = `https://apiforcorners.cubisysit.com/api/api-fetch-projectwings.php?ProjectID=${item.ProjectID}`;
        const response = await axios.get(apiUrl);
        if (response.data.status === "Success") {
          setWings(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching wings data:", error);
      }
    };
    fetchData();
  }, [item]);

  const handleWingClick = async (wing) => {
    try {
      setLoading(true);
      const apiUrl = `https://apiforcorners.cubisysit.com/api/api-fetch-avilability.php?WingID=${wing.WingID}&ProjectID=${item.ProjectID}`;
      const response = await axios.get(apiUrl);

      if (response.data.status === "Success") {
        const wingData = response.data.data;
        setWingDetails(wingData);
        setSelectedWing(wing);

        const maxFlats = Math.max(...Object.values(wingData).map(flats => flats.length));
        setMaxFlats(maxFlats);
        setDataAvailable(true);
      } else {
        setDataAvailable(false);
      }
    } catch (error) {
      console.error("Error fetching wing details:", error);
      setDataAvailable(false);
    } finally {
      setLoading(false);
    }
  };

  const getCellBackgroundColor = (skuID) => {
    switch (skuID) {
      case 1:
        return '#d4edda'; // Light green
      case 2:
        return '#fff3cd'; // Light yellow
      case 3:
        return '#f8d7da'; // Light red
      case 4:
        return '#d6d6d6'; // Light grey
      default:
        return '#ffffff'; // Default color (white)
    }
  };

  const getStatusText = (skuID) => {
    switch (skuID) {
      case 1:
        return 'Avl'; // Available
      case 2:
        return 'HLD'; // Hold
      case 3:
        return 'SLD'; // Sold
      default:
        return 'RFG'; // Remaining/For Sale
    }
  };

  const fetchSkuOptions = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-singel-projectskuid.php"
      );
      if (response.data.status === "Success") {
        setSkuOptions(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching SKU options:", error);
    }
  };

  const handleCellClick = (floorNo, flatNo) => {
    setEditingCell({ floorNo, flatNo });
    fetchSkuOptions(); // Fetch SKU options when a cell is clicked
  };

  const handleSkuChange = async (event) => {
    const newSkuID = event.target.value;
    const { floorNo, flatNo } = editingCell;

    // Determine the skuID to be sent based on the current cell status
    const currentFlat = wingDetails[floorNo] && wingDetails[floorNo][flatNo - 1];
    const statusSkuID = currentFlat.skuID === 1 ? 2 : 1;

    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to update?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          "https://ideacafe-backend.vercel.app/api/proxy/api-update-projectsku.php",
          {
            skuID: statusSkuID,
            ModifyUID: 1, // Assuming the ModifyUID is 5, replace with actual value
            ProjectID: item.ProjectID,
            WingID: selectedWing.WingID,
            FloorNo: floorNo,
            FlatNo: flatNo,
          }
        );

        if (response.data.status === "Success") {
          // Update the local state with the new SKU ID
          setWingDetails((prevDetails) => ({
            ...prevDetails,
            [floorNo]: prevDetails[floorNo].map((flat, index) =>
              index === flatNo - 1 ? { ...flat, skuID: statusSkuID } : flat
            ),
          }));
          Swal.fire(
            'Updated!',
            'The Availiblity List has been updated successfully.',
            'success'
          );
          setEditingCell(null); // Exit editing mode after a successful update
        } else {
          Swal.fire(
            'Failed!',
            'There was an issue updating the SKU ID.',
            'error'
          );
        }
      } catch (error) {
        console.error("Error updating SKU ID:", error);
        Swal.fire(
          'Error!',
          'An error occurred while updating the SKU ID.',
          'error'
        );
      }
    }
  };

  const ProjectRoomTable = ({ data, maxFlats }) => {
    const headers = Array.from({ length: maxFlats }, (_, i) => `FlatNo ${i + 1}`);

    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid black' }}>
            <th style={{ border: '1px solid black', padding: '8px' }}>FloorNo</th>
            {headers.map((header) => (
              <th key={header} style={{ border: '1px solid black', padding: '8px' }}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((floorNo) => {
            const flats = data[floorNo];
            return (
              <tr key={floorNo}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{floorNo}</td>
                {Array.from({ length: maxFlats }).map((_, i) => {
                  const flat = flats[i] || {};
                  const isEditing = editingCell && editingCell.floorNo === floorNo && editingCell.flatNo === i + 1;
                  return (
                    <td
                      key={i}
                      style={{
                        border: '1px solid black',
                        padding: '8px',
                        backgroundColor: getCellBackgroundColor(flat.skuID),
                        textAlign: 'center',
                        cursor: flat.skuID === 1 || flat.skuID === 2 ? 'pointer' : 'default',
                      }}
                      onClick={() => (flat.skuID === 1 || flat.skuID === 2) && handleCellClick(floorNo, i + 1)}
                    >
                      {isEditing ? (
                        <FormControl>
                          <Select
                            value={flat.skuID}
                            onChange={handleSkuChange}
                            autoWidth
                          >
                            {skuOptions.map((option) => (
                              <MenuItem key={option.skuID} value={option.skuID}>
                                {option.skuName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <>
                          {flat.Area}<br />
                          <span style={{ color: '#000000' }}>{getStatusText(flat.skuID)}</span>
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <>
      <Grid container justifyContent="center" spacing={2} sx={{ marginBottom: 5 }}>
        {wings.map((wing) => (
          <Grid item key={wing.WingID}>
            <Button
              variant="contained"
              onClick={() => handleWingClick(wing)}
              sx={{
                color: "#333333",
                fontSize: "0.6rem",
                backgroundColor: "#f0f0f0",
                minWidth: "auto",
                minHeight: 20,
                "&:hover": {
                  backgroundColor: "#dcdcdc",
                },
              }}
            >
              {wing.WingName}
            </Button>
          </Grid>
        ))}
      </Grid>

      {loading && <CircularProgress />}

      {selectedWing && (
        <div>
          <h2>Details for {selectedWing.WingName}</h2>
          {dataAvailable ? (
            <ProjectRoomTable data={wingDetails} maxFlats={maxFlats} />
          ) : (
            <NoDataIcon />
          )}
        </div>
      )}
    </>
  );
};

export default ListAvailabiltyList;
