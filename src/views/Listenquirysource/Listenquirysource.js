import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import Table  from '@mui/material/Table';
import Box  from '@mui/material/Table';

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

const Listenquirysource = ({ rows, onEdit, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    setFilteredRows(rows);
  }, [rows]);

  useEffect(() => {
    const filteredData = rows.filter((row) => {
      return (
        String(row.PartyName).toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(row.Mobile).toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(row.ProjectID).toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(row.Source).toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(row.SourceName).toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(row.SourceDescription).toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredRows(filteredData);
  }, [searchQuery, rows]);

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

  const handleEditButtonClick = (row) => {
    onEdit(row);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <TableCell>NameOfCompany</TableCell>
              <TableCell>ProjectName</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>FromDate</TableCell>
              <TableCell>ToDate</TableCell>
              <TableCell>SourceName</TableCell>
              <TableCell>ActiveTillDate</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length > 0 ? (
              filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
            
                  <TableCell>{row.NameOfCompany}</TableCell>
                  <TableCell>{row.ProjectName}</TableCell>
                  <TableCell>{row.Source}</TableCell>
                  <TableCell>{row.FromDate}</TableCell>
                  <TableCell>{row.ToDate}</TableCell>
                  <TableCell>{row.SourceName}</TableCell>
                  <TableCell>{row.ActiveTillDate}</TableCell>
                  <TableCell sx={{ padding: '15px' }}>
                    <IconButton onClick={() => handleEditButtonClick(row)} aria-label="edit" sx={{ color: 'blue' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete(row.EnquirySourceID)} aria-label="delete" sx={{ color: 'red' }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {/* SVG image */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path fill="#757575" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM4 17V7h16v10H4zm12-6h2v2h-2v-2zm-4 0h2v2h-2v-2zm-4 0h2v2H8v-2z"/>
                  </svg>
                  {/* Optional message */}
                  <Typography variant="body1">Data not found</Typography>
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

export default Listenquirysource;
