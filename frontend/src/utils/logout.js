
import { BASE_URL } from "./url";
import axios from 'axios';



export const handleLogout = async (dispatch, navigate)=>{
    try {
      const res = await axios.post(`${BASE_URL}/api/users/logout`, {}, {
        withCredentials: true,
      })
      dispatch(logout()); 
      localStorage.clear();
      console.log("user logged out",res)
      navigate('/login')
    } catch (error) {
      throw new Error("error while logout");
      
    }
  }