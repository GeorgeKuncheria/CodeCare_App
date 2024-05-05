import Event from "../../models/Event.ts";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import * as authUtil from "../../utils/auth-util.ts";
import Roles from "../../models/Roles.ts";
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../../store/loginUser-slice.ts";
import {AppDispatch} from "../../store";
import React from "react";

interface Eventprops {
    event: Event,
    eventID: string,
    deletePop: (open: boolean, id) => void
}

export default function EventTile(props: Eventprops) {
    const event = props.event
    const user = useSelector(getUser());

    const handleDelete = (e: MouseEvent, id) => {
        e.stopPropagation();
        props.deletePop(true, id);
    }

    // Function to truncate content to maximum 10 words followed by "..."
    const truncateContent = (content: string) => {
        const words = content.split(" ");
        if (words.length > 10) {
            return words.slice(0, 10).join(" ") + "...";
        } else {
            return content;
        }
    }

    return (
        <CardActionArea>
            {
                authUtil.isUserInRole(user, [Roles.ADMIN]) ?
                    (<IconButton aria-label="delete" size="large" onClick={(e) => handleDelete(e, props.eventID)}>
                        <DeleteIcon />
                    </IconButton>)
                    :
                    (<></>)
            }
            <Card sx={{ display: 'flex', height: 350 }}>
                <CardContent sx={{ flex: 1 }}>
                    <div className="eventTileImgContainer">
                        <img src={event.eventImage}/>
                    </div>
                    <div>
                        <Typography component="h2" variant="h5">
                            {event.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {new Date(event.date).toLocaleString()}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {truncateContent(event.description)}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            Continue reading...
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </CardActionArea>
    );
}