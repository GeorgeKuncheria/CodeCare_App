import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import {
    Box,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl,
    Grid,
    InputBase,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from '@mui/material';
import { searchEvents } from '../../services/event-service.ts';
import { useNavigate } from 'react-router-dom';
import { getAll, loadEvents } from '../../store/event-slice.ts';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import EventTile from "../../components/Event/EventTile.tsx";
import {alpha, experimentalStyled as styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import {Status} from "../../utils/status-enum.ts";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {useTranslation} from "react-i18next";
import Roles from "../../models/Roles.ts";
import * as authUtil from '../../utils/auth-util.ts'
import {getUser} from "../../store/loginUser-slice.ts";
import {InfinitySpin} from 'react-loader-spinner';
import * as eventService from "../../services/event-service.ts";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const sections = [
    { title: 'About CodeCare', url: `/signin` },
    { title: 'Events', url: `/events` },
    { title: 'Contact us', url: `/signin` }
];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '2px solid black',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function Events() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const events = useSelector(getAll());
    const [searchParams, setSearchParams] = useState({});
    const {t} = useTranslation('events');
    const user = useSelector(getUser());
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    const handleClickOpen = (open, id) => {
        setOpen(open);
        setDeleteId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        eventService.deleteEvent(deleteId).then(() => {
            eventService.searchEvents().then((event) => {
                dispatch(loadEvents(event));
            })
        });
        setOpen(false);
    }

    useEffect(() => {
        setIsDataLoading(true);
        searchEvents(searchParams).then((event) => {
            setIsDataLoading(false)
            dispatch(loadEvents(event));
        });
    }, [searchParams]);

    const divStyles = {
        display: 'flex',
        alignItems: 'center',
        padding: 20
    };

    const handleChange = (event: SelectChangeEvent) => {
        setSearchParams({...searchParams, eventStatus: event.target.value as string});
    };

    const handleTextChange =  (event: SelectChangeEvent) => {
        setSearchParams({...searchParams, keyword: event.target.value as string});
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Delete Event
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this event?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
            <main>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <div>
                        <Search onChange={handleTextChange}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder={t('filter.search')}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </div>
                    <div>
                        <FormControl sx={{width: 130}}>
                            <InputLabel>{t('filter.status')}</InputLabel>
                            <Select
                                id="eventStatus"
                                label="eventStatus"
                                onChange={handleChange}
                             >
                                <MenuItem value={Status.ALL}>{t('filter.status.all')}</MenuItem>
                                <MenuItem value={Status.UPCOMING}>{t('filter.status.upcoming')}</MenuItem>
                                <MenuItem value={Status.COMPLETE}>{t('filter.status.past')}</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {
                        authUtil.isUserInRole(user, [Roles.ADMIN]) ?
                            (<div>
                                <CardActions>
                                    <Button size="small" variant="contained"
                                            onClick={() => navigate(`/events/create`)}>Create</Button>
                                </CardActions>
                            </div>)
                            :
                            (<></>)
                    }
                </Box>
                {(isDataLoading)
                    ?
                    <div className="eventImageContainer">
                        <InfinitySpin/>
                    </div>
                    :
                    <Grid container spacing={4}>
                        {events.map((event, index) => (
                            <Grid item xs={12} md={6} sx={{cursor:'pointer'}} key={index} onClick={() => navigate(`/events/${event.id}`)}>
                                <Item>
                                    <EventTile event={event} eventID={event.id} deletePop={handleClickOpen}></EventTile>
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                }
            </main>
        </>
    )
}

export default Events;