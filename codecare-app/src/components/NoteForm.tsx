import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Note } from '../models/Note';
import { useTranslation } from 'react-i18next';

interface NoteFormProps {
  note: Note | null;
  onSave: (note: Note) => void;
  open: boolean;
  onClose: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, onSave, open, onClose }) => {
  const [id, setId] = useState<string>('');
  const [diagnosis, setDiagnosis] = useState<string>('');
  const [treatment, setTreatment] = useState<string>('');
  const [dateOfTreatment, setDateOfTreatment] = React.useState<Dayjs | null>(dayjs(new Date()));
  const {t} = useTranslation('noteform');

  useEffect(() => {
    if (note) {
      setId(note.id);
      setDiagnosis(note.diagnosis);
      setTreatment(note.treatment);
      setDateOfTreatment(dayjs(note.dateOfTreatment));
    } else {
      // Reset form when note is null
      setId('');
      setDiagnosis('');
      setTreatment('');
      setDateOfTreatment(dayjs(new Date()));
    }
  }, [note]);

  const handleSaveClick= () => {
    onSave({
      id,
      diagnosis,
      treatment,
      dateOfTreatment: dateOfTreatment?.toDate().toISOString() || new Date().toISOString(),
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{id ? 'Edit Diagnosis' : 'Add New Diagnosis'}</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
          <TextField
            fullWidth
            required
            label={t('noteform.textfield.diagnosis')}
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label={t('noteform.textfield.treatment')}
            multiline
            rows={4}
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            margin="normal"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={t('noteform.textfield.dateoftreatment')}
              value={dateOfTreatment}
              onChange={setDateOfTreatment}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSaveClick} color="primary">{t('noteform.button.save')}</Button>
        <Button onClick={onClose} color="secondary">{t('noteform.button.cancel')}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteForm;
