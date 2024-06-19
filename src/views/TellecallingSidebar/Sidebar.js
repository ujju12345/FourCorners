import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  Avatar,
  Grid,
  Box,
  TextField,
  InputAdornment,
  ListItemAvatar,
  IconButton,
} from "@mui/material";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import TablePagination from "@mui/material/TablePagination";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Sidebar = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://apiforcorners.cubisysit.com/api/api-fetch-telecalling.php"
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

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    if (lowerCaseQuery === "") {
      setFilteredRows(rows);
    } else {
      const filteredData = rows.filter(
        (item) =>
          item.PartyName.toLowerCase().includes(lowerCaseQuery) ||
          item.Mobile.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredRows(filteredData);
    }
    setPage(0); // Reset page to first page when search query changes
  }, [searchQuery, rows]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredRows(rows);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  return (
    <Card sx={{ width: 400, padding: 5, height: "90vh" }}>
      <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
        <Box>
          <Typography
            variant="body2"
            sx={{ marginTop: 5, fontWeight: "bold", fontSize: 20 }}
          >
            All Telecaller
          </Typography>
        </Box>
      </Grid>
      {/* Search Input */}
      <TextField
        size="small"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {searchQuery && (
                <IconButton onClick={handleClearSearch} size="small">
                  &#x2715;
                </IconButton>
              )}
            </InputAdornment>
          ),
          sx: {
            borderRadius: "20px",
            "& fieldset": {
              borderRadius: "20px",
            },
          },
        }}
      />
      {filteredRows.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            mt: 2,
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 40, mb: 2 }} />
          <Typography variant="h6">No data found</Typography>
        </Box>
      ) : (
        <>
          <List>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <ListItem key={item.telecallingID} disablePadding>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#2563EB" }}>
                      <img src="/ManIcon.svg" alt="Man Icon" style={{ width: 24, height: 24 }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.PartyName}
                    secondary={
                      <Typography variant="body2">{item.Mobile}</Typography>
                    }
                    primaryTypographyProps={{ variant: "subtitle1" }}
                    secondaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
              ))}
          </List>
          <Box sx={{ ml: -3, mt: 2 }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ fontSize: "0.75rem" }}
            />
          </Box>
        </>
      )}
    </Card>
  );
};

export default Sidebar;
