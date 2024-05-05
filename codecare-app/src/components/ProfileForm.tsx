import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Box, IconButton } from '@mui/material';
import { AppState } from '../store/index';
import { updateProfile, addVaccination } from '../store/ProfileSlice';
import VaccinationItem from './VaccinationItem';
import SaveIcon from '@mui/icons-material/Save';

const ProfileForm: React.FC = () => {
  const profile = useSelector((state: AppState) => state.profile);
  const dispatch = useDispatch();

  const handleInputChange = (field: keyof typeof profile, value: any) => {
      dispatch(updateProfile({ field, value }));
  };

  return (
      <Box sx={{ padding: 2 }}>
          <TextField
              label="Age"
              type="number"
              value={profile.age || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('age', parseInt(e.target.value, 10))}
              margin="normal"
              fullWidth
              inputProps={{ min: 1, max: 100 }}
          />
          <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                  row
                  value={profile.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
              >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Other" control={<Radio />} label="Other" />
              </RadioGroup>
          </FormControl>
          <br />
          <Button onClick={() => dispatch(addVaccination())} variant="contained" color="primary">
              Add Vaccination
          </Button>
          {profile.vaccinations.map((vaccination, index) => (
              <VaccinationItem key={vaccination.id} vaccination={vaccination} index={index} />
          ))}
          <IconButton
              color="primary"
              sx={{ position: 'fixed', top: 16, right: 16 }}
              onClick={() => console.log('Save functionality to be implemented')}
          >
              <SaveIcon />
          </IconButton>
      </Box>
  );
};

export default ProfileForm;