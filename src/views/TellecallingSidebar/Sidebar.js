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
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Menu,
  ListItemIcon,
  Popover,
} from "@mui/material";
import axios from "axios";
import { Chip } from '@mui/material';
import PersonIcon from "@mui/icons-material/Person";
import { Divider } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GetAppIcon from "@mui/icons-material/GetApp";
import SortIcon from "@mui/icons-material/Sort";


const Sidebar = ({ onEdit, onItemClick, onCreate }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [anchorElDots, setAnchorElDots] = useState(null);
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

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
    setFilteredRows(rows);
  }, [rows]);

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
    setPage(0);
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
    setPage(0);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        "https://ideacafe-backend.vercel.app/api/proxy/api-delete-telecalling.php",
        {
          Tid: deleteId,
          DeleteUID: 1,
        }
      );
      if (response.data.status === "Success") {
        setRows(rows.filter((row) => row.Tid !== deleteId));
        console.log("Deleted successfully");
        setConfirmDelete(false);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      setError(error);
    }
  };

  const handleOpenConfirmDelete = (id) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  const handleListItemClick = (item) => {
    onItemClick(item);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDelete(false);
    setDeleteId(null);
  };

  const handleFilterMenuOpen = (event) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setAnchorElFilter(null);
  };

  const handleDotsMenuOpen = (event) => {
    setAnchorElDots(event.currentTarget);
  };

  const handleDotsMenuClose = () => {
    setAnchorElDots(null);
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
    setAnchorElFilter(null);
    sortData(option);
  };

  const sortData = (option) => {
    const sortedRows = [...filteredRows];
    switch (option) {
      case "asc":
        sortedRows.sort(
          (a, b) =>
            new Date(a.NextFollowUpDate) - new Date(b.NextFollowUpDate)
        );
        break;
      case "desc":
        sortedRows.sort(
          (a, b) =>
            new Date(b.NextFollowUpDate) - new Date(a.NextFollowUpDate)
        );
        break;
      case "a-z":
        sortedRows.sort((a, b) => a.PartyName.localeCompare(b.PartyName));
        break;
      case "z-a":
        sortedRows.sort((a, b) => b.PartyName.localeCompare(a.PartyName));
        break;
      default:
        break;
    }
    setFilteredRows(sortedRows);
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
    a.download = "Telecalling.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Card
      sx={{
        width: 330,
        padding: 5,
        height: 700,
        overflowY: "auto",
      }}
    >
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: 20 }}>
            All Telecaller
          </Typography>
          <Box display="flex" alignItems="center">
          <IconButton
              aria-label="filter"
              sx={{ color: "grey" }}
              onClick={onCreate}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              aria-label="filter"
              sx={{ color: "grey" }}
              onClick={handleFilterMenuOpen}
            >
              <SortIcon />
            </IconButton>
            <Popover
              id="sort-popover"
              open={Boolean(anchorElFilter)}
              anchorEl={anchorElFilter}
              onClose={handleFilterMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem onClick={() => handleSortOptionChange("asc")}>
                Date Asc
              </MenuItem>
              <MenuItem onClick={() => handleSortOptionChange("desc")}>
                Date Desc
              </MenuItem>
              <MenuItem onClick={() => handleSortOptionChange("a-z")}>
                Name A-Z
              </MenuItem>
              <MenuItem onClick={() => handleSortOptionChange("z-a")}>
                Name Z-A
              </MenuItem>
            </Popover>

            <IconButton
              aria-label="more"
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleDotsMenuOpen}
              sx={{ color: "grey" }}
            >
              <MoreVertIcon />
            </IconButton>
            <Popover
              id="menu"
              anchorEl={anchorElDots}
              open={Boolean(anchorElDots)}
              onClose={handleDotsMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleDownload}>
                <ListItemIcon>
                  <GetAppIcon fontSize="small" />
                </ListItemIcon>
                Download All Data
              </MenuItem>
            </Popover>
          </Box>
        </Box>
      </Grid>

      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={handleClearSearch}
                edge="end"
                sx={{ color: "grey" }}
              >
                <PersonIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
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
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onCreate}
            sx={{ mt: 2 }}
          >
            Create Contact
          </Button>
        </Box>
      ) : (
        <>
          <List>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <React.Fragment key={item.Tid}>
                  <Card sx={{marginBottom:2}}>
                   <ListItem disablePadding onClick={() => handleListItemClick(item)}>
                      <ListItemAvatar>
                        <Avatar
                          alt="John Doe"
                          sx={{ width: 40, height: 40, margin: 2 }}
                          src="/images/avatars/1.png"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                              variant="subtitle1"
                              style={{ fontWeight: 600, fontSize: 13 }}
                            >
                              {item.CName}
                            </Typography>
                            {item.leadstatusName && (
                              <Chip
                                label={item.leadstatusName}
                                size="small"
                                style={{
                                  fontSize:8  ,
                                  marginLeft: 8,
                                  height:12,
                                  p:3,
                                  backgroundColor: getChipColor(item.leadstatusName),
                                  color: "#000000", // Adjust text color for better contrast if needed
                                }}
                              />
                            )}
                          </div>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" style={{ fontSize: 10 }}>
                              Phone: {item.Mobile}
                            </Typography>
                            <Typography variant="body2" style={{ fontSize: 10 }}>
                              Next follow Up: {item.NextFollowUpDate}
                            </Typography>
                          </>
                        }
                        secondaryTypographyProps={{ variant: "body2" }}
                      />
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-end"
                      >
                        <IconButton
                          aria-label="edit"
                          onClick={(event) => {
                            event.stopPropagation();
                            onEdit(item);
                          }}
                          sx={{ color: "blue" }}
                        >
                          <EditIcon />
                        </IconButton>
                        {/* <IconButton
                          aria-label="delete"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleOpenConfirmDelete(item.Tid);
                          }}
                          sx={{ color: "red" }}
                        >
                          <DeleteIcon />
                        </IconButton> */}
                      </Box>
                    </ListItem>
                  </Card>
                </React.Fragment>
              ))}
          </List>
        </>
      )}

      <Dialog open={confirmDelete} onClose={handleCloseConfirmDelete}>
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

// Function to get chip color based on leadstatusName
const getChipColor = (leadstatusName) => {
  switch (leadstatusName) {
    case "Warm":
      return "#FFD700"; // Yellow
    case "Hot":
      return "#FF6347"; // Red
    case "Cold":
      return "#87CEEB"; // Blue
    default:
      return "#FFFFFF"; // Default color
  }
};
export default Sidebar;
