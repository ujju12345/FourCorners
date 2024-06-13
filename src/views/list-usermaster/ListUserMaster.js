import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const ListUserMaster = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  useEffect(() => {
    const filteredData = rows.filter((row) =>
      String(row.UserRoleID).toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(row.Name).toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(row.MobileNo).toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(row.email).toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(row.username).toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(row.password).toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRows(filteredData);
  }, [searchQuery, rows]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiforcorners.cubisysit.com/api/api-fetch-usermaster.php');
      setRows(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    }
  };

  const handleDelete = (userID) => {
    
  };

  const handleEdit = (rowData) => {
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (sortBy) => {
    const isAsc = orderBy === sortBy && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(sortBy);
    const sortedData = filteredRows.slice().sort(getComparator(isAsc ? 'desc' : 'asc', sortBy));
    setFilteredRows(sortedData);
  };

  const getComparator = (order, sortBy) => {
    return (a, b) => {
      if (a[sortBy] < b[sortBy]) return order === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return order === 'asc' ? 1 : -1;
      return 0;
    };
  };

  const SortableTableCell = ({ label, sortBy }) => (
    <TableCell onClick={() => handleSort(sortBy)} sx={{ fontWeight: 'bold', cursor: 'pointer' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <span>{label}</span>
        {orderBy === sortBy ? (
          order === 'asc' ? (
            <span>&#9650;</span> // Up arrow
          ) : (
            <span>&#9660;</span> // Down arrow
          )
        ) : (
          <span>&#8597;</span> // Up and down arrow
        )}
      </Box>
    </TableCell>
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error fetching data: {error.message}</Typography>;
  }

  return (
    <Card>
      <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'flex-end' }}>
        <TextField
          size="small"
          placeholder="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '20px',
              "& fieldset": {
                borderRadius: '20px',
              },
            },
          }}
        />
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <SortableTableCell label="User Role ID" sortBy="UserRoleID" />
              <SortableTableCell label="Name" sortBy="Name" />
              <SortableTableCell label="Mobile Number" sortBy="MobileNo" />
              <SortableTableCell label="Email" sortBy="email" />
              <SortableTableCell label="Username" sortBy="username" />
              <SortableTableCell label="Password" sortBy="password" />
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length > 0 ? (
              filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{row.UserRoleID}</TableCell>
                  <TableCell align="left">{row.Name}</TableCell>
                  <TableCell align="left">{row.MobileNo}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.username}</TableCell>
                  <TableCell align="left">{row.password}</TableCell>
                  <TableCell align="left">
                    <IconButton onClick={() => handleEdit(row)} aria-label="edit" sx={{ color: 'blue' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.UserID)} aria-label="delete" sx={{ color: 'red' }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ padding: '12px' }}>
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default ListUserMaster;