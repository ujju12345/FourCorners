import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  CircularProgress,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

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

        // Calculate the maximum number of flats per floor
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
                  return (
                    <td
                      key={i}
                      style={{
                        border: '1px solid black',
                        padding: '8px',
                        backgroundColor: getCellBackgroundColor(flat.skuID),
                        textAlign: 'center',
                      }}
                    >
              {flat.Area}<br />
                      <span style={{ color: '#000000' }}>{getStatusText(flat.skuID)}</span>
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
            <p>No data available for this wing.</p>
          )}
        </div>
      )}
    </>
  );
}

export default ListAvailabiltyList;
