import {useNavigate} from "react-router-dom";
import {getUser, loadLoginUser} from "../../store/loginUser-slice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {useUser} from "@clerk/clerk-react";
import * as authService from "../../services/auth-service.ts";
import {ResponseObject} from "../../models/ResponseObject.ts";
import {LoginDO} from "../../models/LoginDO.ts";

export default function SignedInPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {isSignedIn, user} = useUser();
    const currentUser = useSelector(getUser());
    if (isSignedIn && user && !currentUser.id) {
        const data = {
            username: user.primaryEmailAddress.emailAddress
        }
        const token = localStorage.getItem('token');
        if (!token) {
            authService.login(data).then((response: ResponseObject<LoginDO>) => {
                if (response.data) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    dispatch(loadLoginUser(response.data.user));
                }
            });
        }
    }
    navigate('/');
    return <></>;
}