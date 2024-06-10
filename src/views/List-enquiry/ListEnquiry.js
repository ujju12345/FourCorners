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

const ListEnquiry = ({ rows, onEdit, onDelete }) => {
  console.log(rows , 'TELLECALLING DELETE SET');
  if (rows.length === 0) {
    return <Typography>No data available</Typography>;
  }

  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Country Code</TableCell>
              <TableCell align="left">Mobile</TableCell>
              <TableCell align="left">Pincode</TableCell>
              <TableCell align="left">E-Mail</TableCell>
              
              <TableCell align="left">Source</TableCell>
              <TableCell align="left">Source Name</TableCell>
              <TableCell align="left">Source Description</TableCell>

              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left">
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500 }}>{row.PartyName}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="left">{row.Date}</TableCell>
                <TableCell align="left">{row.Title}</TableCell>
                <TableCell align="left">{row.Name}</TableCell>
                <TableCell align="left">{row.CountryCode}</TableCell>
                <TableCell align="left">{row.Mobile}</TableCell>
                <TableCell align="left">{row.Pincode}</TableCell>
                <TableCell align="left">{row.E-Mail}</TableCell>
                <TableCell align="left">{row.Source}</TableCell>
                <TableCell align="left">{row.SourceName}</TableCell>
                <TableCell align="left">{row.SourceDescription}</TableCell>
                <TableCell sx={{ padding: '15px' }}>
                  <IconButton onClick={() => onEdit(row)} aria-label="edit" sx={{ color: 'blue' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(row.telecallingID)} aria-label="delete" sx={{ color: 'red' }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default ListEnquiry;
