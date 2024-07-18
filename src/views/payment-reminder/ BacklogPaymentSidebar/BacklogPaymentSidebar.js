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
  MenuItem,
  IconButton,
  Popover,
  ListItemAvatar,
  Modal,
  Button,
  Chip

} from "@mui/material";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
// import  Chip from '@mui/material';
import SortIcon from "@mui/icons-material/Sort";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GetAppIcon from "@mui/icons-material/GetApp";
import { useCookies } from "react-cookie";

const BacklogPaymentSidebar = ({ onItemClick, onCreate }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [anchorElDots, setAnchorElDots] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [cookies, setCookie] = useCookies(["amr"]);
  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [cashPaid, setCashPaid] = useState('');
  const [chequePaid, setChequePaid] = useState('');
  const userid = cookies.amr?.UserID || 'Role';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://apiforcorners.cubisysit.com/api/api-fetch-backlogreminder.php?UserID=15`,
        // https://apiforcorners.cubisysit.com/api/api-fetch-backlog.php?UserID=${userid}
      );
      console.log("BACKLOG PAYEMent DTAA", response.data);
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
          item?.CName?.toLowerCase().includes(lowerCaseQuery) ||
          item?.Mobile?.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredRows(filteredData);
    }
  }, [searchQuery, rows]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredRows(rows);
  };
  const getDateStatus = (contactCreateDate) => {
    const date = new Date(contactCreateDate);
    const now = new Date();
    
    const isCurrentMonth = date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    const isPreviousMonth = date.getMonth() === now.getMonth() - 1 && date.getFullYear() === now.getFullYear();
  
    if (isCurrentMonth) {
      return "New";
    } else if (isPreviousMonth) {
      return "In Progress";
    } else {
      return null;
    }
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
        sortedRows.sort((a, b) => a.CName.localeCompare(b.CName));
        break;
      case "z-a":
        sortedRows.sort((a, b) => b.CName.localeCompare(a.CName));
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

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleAddition = () => {
    const cashPaidNumber = parseFloat(cashPaid) || 0;
    const chequePaidNumber = parseFloat(chequePaid) || 0;
    return cashPaidNumber + chequePaidNumber;
  };



  return (
    <Card
      sx={{
        width: 450,
        padding: 5,
        height: 700,
        overflowY: "auto",
      }}
    >
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: 20 }}>
           Backlog Payment Reminder
          </Typography>
          <Box display="flex" alignItems="center">
            {/* <IconButton
              aria-label="filter"
              sx={{ color: "grey" }}
              onClick={onCreate}
            >
              <AddIcon />
            </IconButton> */}
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

            {/* <IconButton
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
                Download All Data
              </MenuItem>
            </Popover> */}
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
          <Typography variant="h6">No data found</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Try adjusting your search or filters.
          </Typography>
        </Box>
      ) : (
        <List>
        {filteredRows.map((item) => (
          <React.Fragment key={item.Tid}>
            <Card sx={{ marginBottom: 2 }}>
              <ListItem key={item.Tid} disablePadding onClick={() => onItemClick(item)}>
                <ListItemAvatar>
                  <Avatar
                    alt={item.CName}
                    sx={{ width: 40, height: 40, margin: 2 }}
                    src="/images/avatars/1.png"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" style={{ fontSize: 15 }}>
                      Name: {item.Name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" style={{ fontSize: 12 }}>
                        Remark: {item.RemarkName}
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 10 }}>
                        Date: {item.RemarkDate}
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: 10 }}>
                        Flat Cost: {item.FlatCost}
                      </Typography>
                    </>
                  }
                />
                <Box display="flex" flexDirection="column" alignItems="flex-end">
                  <IconButton
                    aria-label="edit"
                    sx={{ color: 'blue' }}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent ListItem click propagation
                      handleModalOpen();
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  {getDateStatus(item.ContactCreateDate) && (
                    <Chip
                      label={getDateStatus(item.ContactCreateDate)}
                      size="small"
                      color={getDateStatus(item.ContactCreateDate) === 'New' ? 'warning' : 'default'}
                      style={{
                        fontSize: 8,
                        marginLeft: 8,
                        height: 20,
                      }}
                    />
                  )}
                </Box>
              </ListItem>
            </Card>
          </React.Fragment>
        ))}
  
        {/* Modal */}
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" id="modal-title" gutterBottom>
              Add Payment Details
            </Typography>
           
            <TextField
              fullWidth
              label="Cash Paid"
              value={cashPaid}
              onChange={(e) => setCashPaid(e.target.value)}
              type="number"
              style={{ marginTop: 16 }}
            />
            <TextField
              fullWidth
              label="Cheque Paid"
              value={chequePaid}
              onChange={(e) => setChequePaid(e.target.value)}
              type="number"
              style={{ marginTop: 16 }}
            />
            <TextField
              fullWidth
              label="Total Payment"
              value={handleAddition()}
              disabled
              style={{ marginTop: 16 }}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleModalClose} variant="contained" color="primary" sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={handleModalClose}>
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
      </List>
      )}
    </Card>
  );
};

export default BacklogPaymentSidebar;