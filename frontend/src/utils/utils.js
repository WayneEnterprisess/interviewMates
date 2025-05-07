import axios from "axios"
import { logout, setCredentials } from "../redux/slices/authSlice";
import { BASE_URL } from "./url";

// const dispatch = useDispatch();

export const checkAuth = async (dispatch)=>{
    try {
        const res = await axios.get(`${BASE_URL}/api/users/me`, {
            withCredentials:true
        });
        console.log("From utils : ",res)
        dispatch(setCredentials({user:res.data.data}));
        localStorage.setItem("user", JSON.stringify(res.data.data));

    } catch (err) {
        console.warn("User is not authenticated:", err.response?.status);
        dispatch(logout());

    }
}