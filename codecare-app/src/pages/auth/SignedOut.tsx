import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {getUser, loadLoginUser} from "../../store/loginUser-slice.ts";
import * as authService from "../../services/auth-service.ts";
import {ResponseObject} from "../../models/ResponseObject.ts";

export default function SignedOutPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(getUser());

    if (user) {
        authService.logout().then((response: ResponseObject<any>) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            dispatch(loadLoginUser(undefined));
            navigate('/');
        });
    }
    navigate('/');
    return <></>;
}