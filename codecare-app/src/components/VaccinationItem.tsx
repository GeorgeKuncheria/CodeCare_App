import { useDispatch } from 'react-redux';
import { Box, IconButton, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateVaccination, removeVaccination } from '../store/ProfileSlice';

interface VaccinationItemProps {
    vaccination: { id: string; name: string; date: string };
    index: number;
}
const vaccines = [
    "COVID-19",
    "Influenza",
    "Hepatitis B",
    "Hepatitis A",
    "MMR (Measles, Mumps, Rubella)",
    "Varicella (Chickenpox)",
    "HPV (Human Papillomavirus)",
    "DTaP (Diphtheria, Tetanus, Pertussis)",
    "Shingles",
    "Pneumococcal"
];


const VaccinationItem: React.FC<VaccinationItemProps> = ({ vaccination, index }) => {
    const dispatch = useDispatch();

    const handleVaccinationChange = (field: 'name' | 'date', value: string) => {
        dispatch(updateVaccination({ index, field, value }));
    };

    return (
        <Box display="flex" alignItems="center" gap={2} marginTop={2}>
            <FormControl fullWidth>
                <InputLabel id="vaccination-select-label">Vaccination Name</InputLabel>
                <Select
                    labelId="vaccination-select-label"
                    required
                    value={vaccination.name}
                    onChange={(e) => handleVaccinationChange('name', e.target.value)}
                    label="Vaccination Name"
                >
                    {vaccines.map((vaccine, index) => (
                        <MenuItem key={index} value={vaccine}>
                            {vaccine}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label=""
                type="date"
                value={vaccination.date}
                onChange={(e) => handleVaccinationChange('date', e.target.value)}
                fullWidth
            />
            <IconButton onClick={() => dispatch(removeVaccination(index))} color="secondary">
                <DeleteIcon />
            </IconButton>
        </Box>
    );
};

export default VaccinationItem;
