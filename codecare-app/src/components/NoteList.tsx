// components/NotesList.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { getNotes } from '../store/noteSlice';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
const NotesList = () => {
  const notes = useSelector(getNotes());  // Adjust the path according to your store configuration

  return (
    <Box sx={{ my: 4, p: 2, border: '2px solid grey', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
        <Table aria-label="simple notes table">
          <TableHead>
            <TableRow>
              <TableCell>Diagnosis</TableCell>
              <TableCell align="left">Treatment</TableCell>
              <TableCell align="left">Date of Treatment</TableCell>
              <TableCell align="left">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((note) => (
              <TableRow key={note.id}>
                <TableCell component="th" scope="row">
                  {note.diagnosis}
                </TableCell>
                <TableCell align="left">{note.treatment}</TableCell>
                <TableCell align="left">{dayjs(note.dateOfTreatment).format('YYYY-MM-DD')}</TableCell>
                <TableCell align="left">
                  <IconButton aria-label="edit" size="small">
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NotesList;
