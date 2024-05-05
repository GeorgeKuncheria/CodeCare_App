import {useUser} from "@clerk/clerk-react";
import {useNavigate} from "react-router-dom";
import {Register} from "../../models/Register.ts";
import * as authService from "../../services/auth-service.ts";
import {getUser, loadLoginUser} from "../../store/loginUser-slice.ts";
import {useDispatch, useSelector} from "react-redux";
import {ResponseObject} from "../../models/ResponseObject.ts";
import {LoginDO} from "../../models/LoginDO.ts";
import {AppDispatch} from "../../store";
import {HttpStatusCode} from "axios";

export default function SignedUpPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {isSignedIn, user} = useUser();
    const currentUser = useSelector(getUser());

    if (isSignedIn && user && !currentUser.id) {
        const getData = {
            username: user.primaryEmailAddress.emailAddress
        }
        const count = localStorage.getItem('count');
        if (!count) {
            localStorage.setItem('count', '1');
            authService.getUser(getData).then(async (response: ResponseObject<LoginDO>) => {
                if (response.status === HttpStatusCode.InternalServerError) {
                    const data: Register = {
                        username: user.primaryEmailAddress.emailAddress,
                        firstname: user.firstName,
                        lastname: user.lastName,
                    }
                    await authService.register(data).then(async (response: ResponseObject<LoginDO>) => {
                        if (response.data) {
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('user', JSON.stringify(response.data.user));
                            dispatch(loadLoginUser(response.data.user));
                        }
                    });
                }
            });
        } else {
            localStorage.removeItem('count');
        }
    }
    navigate('/');
    return <></>;
}