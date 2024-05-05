import React, {useState} from 'react';
import Event from '../../models/Event.ts';
import {FormLabel, Input, MenuItem, OutlinedInput, Select, Snackbar} from "@mui/material";
import Button from "@mui/material/Button";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import * as eventService from '../../services/event-service.ts';
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";

const initialEventState: Event = {
    type: '',
    title: '',
    organizer: '',
    description: '',
    date: new Date(),
    contactInfo: '',
    eventImage: '',
    location: {
        latitude: 0,
        longitude: 0,
        name: 'Location Name',
        address: '',
        city: '',
        state: '',
        country: 'USA',
        postalCode: ''
    }
};

interface EventProps {
    editEvent: Event,
    id: string
}

const EditEvent = (props: EventProps) => {
    const [image, setImage] = useState();
    const [state, setState] = useState({open: false, message: ''});

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        initialEventState.type = formData.get('type') !== null ? formData.get('type') : '';
        initialEventState.title = formData.get('title') !== null ? formData.get('title') : '';
        initialEventState.description = formData.get('description') !== null ? formData.get('description') : '';
        initialEventState.organizer = formData.get('organizer') !== null ? formData.get('organizer') : '';
        initialEventState.contactInfo = formData.get('contactInfo') !== null ? formData.get('contactInfo') : '';
        initialEventState.date = formData.get('date') !== null ? formData.get('date') : '';
        initialEventState.location.address = formData.get('address') !== null ? formData.get('address') : '';
        initialEventState.location.city = formData.get('city') !== null ? formData.get('city') : '';
        initialEventState.location.state = formData.get('state') !== null ? formData.get('state') : '';
        initialEventState.location.postalCode = formData.get('postalCode') !== null ? formData.get('postalCode') : '';
        initialEventState.eventImage = image != null ? image : '';
        eventService.updateEvent('events', {...initialEventState, id: props.id})
            .then((response) => {
                if (response.status == 200) {
                    setState({open: true, message: "Event updated"});
                } else {
                    setState({open: true, message: "Event update failed"});
                }
            });
    };

    const handleClose = () => {
        setState({open: false, message: ''});
    };

    const handleFileUpload = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={state.open}
                onClose={handleClose}
                message={state.message}
                key={'bottomleft'}
            />
            <div className={"eventForm"}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <div>
                                <div>
                                    <FormLabel htmlFor="title" required>
                                        Title
                                    </FormLabel>
                                </div>
                                <div>
                                    <OutlinedInput
                                        id="title"
                                        name="title"
                                        type="text"
                                        placeholder="Title"
                                        defaultValue={props.editEvent.title}
                                        sx={{width: 350}}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <FormLabel htmlFor="description" required>
                                        Description
                                    </FormLabel>
                                </div>
                                <div>
                                    <OutlinedInput
                                        id="description"
                                        name="description"
                                        type="text"
                                        placeholder="Description"
                                        multiline={true}
                                        rows={6}
                                        defaultValue={props.editEvent.description}
                                        sx={{width: 350}}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <FormLabel htmlFor="organizer" required>
                                        Name of the Organizer
                                    </FormLabel>
                                </div>
                                <div>
                                    <OutlinedInput
                                        id="organizer"
                                        name="organizer"
                                        type="text"
                                        placeholder="Organizer"
                                        defaultValue={props.editEvent.organizer}
                                        sx={{width: 350}}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <FormLabel htmlFor="contactInfo" required>
                                        Contact
                                    </FormLabel>
                                </div>
                                <div>
                                    <OutlinedInput
                                        id="contactInfo"
                                        name="contactInfo"
                                        type="text"
                                        placeholder="Contact"
                                        defaultValue={props.editEvent.contactInfo}
                                        sx={{width: 350}}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <FormLabel htmlFor="eventImage" required>
                                        Add Flyer
                                    </FormLabel>
                                </div>
                                <Input type="file" accept="image/*" id="eventImage" name="eventImage"
                                       onChange={handleFileUpload}/>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div>
                                <div>
                                    <FormLabel htmlFor="type" required>
                                        Event Type
                                    </FormLabel>
                                </div>
                                <div>
                                    <Select
                                        id="type"
                                        label="Event Type"
                                        defaultValue={props.editEvent.type}
                                        sx={{width: 350}}
                                        required
                                    >
                                        <MenuItem value="General Health Checkup Camp">General Health Checkup
                                            Camp</MenuItem>
                                        <MenuItem value="Vaccination Camp">Vaccination Camp</MenuItem>
                                        <MenuItem value="Blood Donation Camp">Blood Donation Camp</MenuItem>
                                        <MenuItem value="Dental Camp">Dental Camp</MenuItem>
                                        <MenuItem value="Eye Care Camp">Eye Care Camp</MenuItem>
                                        <MenuItem value="Diabetes Screening Camp">Diabetes Screening Camp</MenuItem>
                                        <MenuItem value="Cancer Screening Camp">Cancer Screening Camp</MenuItem>
                                        <MenuItem value="Orthopedic Camp">Orthopedic Camp</MenuItem>
                                        <MenuItem value="Pediatric Camp">Pediatric Camp</MenuItem>
                                        <MenuItem value="Women's Health Camp">Women's Health Camp</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <FormLabel required>
                                        Date
                                    </FormLabel>
                                </div>
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DateTimePicker name="date" label="Event Date" defaultValue={dayjs(props.editEvent.date)} disablePast sx={{width: 350}}/>
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <FormLabel htmlFor="address" required>
                                        Address
                                    </FormLabel>
                                </div>
                                <div>
                                    <OutlinedInput
                                        id="address"
                                        name="address"
                                        type="text"
                                        placeholder="Address"
                                        defaultValue={props.editEvent.location.address}
                                        sx={{width: 350}}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <FormLabel htmlFor="city" required>
                                        City
                                    </FormLabel>
                                </div>
                                <div>
                                    <OutlinedInput
                                        id="city"
                                        name="city"
                                        type="text"
                                        placeholder="City"
                                        defaultValue={props.editEvent.location.city}
                                        sx={{width: 350}}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <FormLabel htmlFor="state" required>
                                        State
                                    </FormLabel>
                                </div>
                                <div>
                                    <OutlinedInput
                                        id="state"
                                        name="state"
                                        type="text"
                                        placeholder="State"
                                        defaultValue={props.editEvent.location.state}
                                        sx={{width: 350}}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div>
                                    <FormLabel htmlFor="postalCode" required>
                                        Postal Code
                                    </FormLabel>
                                </div>
                                <div>
                                    <OutlinedInput
                                        id="postalCode"
                                        name="postalCode"
                                        type="text"
                                        placeholder="Postal Code"
                                        defaultValue={props.editEvent.location.postalCode}
                                        sx={{width: 350}}
                                        required
                                    />
                                </div>
                            </div>
                        </Grid>
                        <br/>
                        <br/>
                        <Grid item xs={12}>
                            <div>
                                <Button type="submit" variant="contained" color="primary">Update Event</Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;
