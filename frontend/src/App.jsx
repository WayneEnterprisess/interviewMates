import Signin from "./components/authentication/Signin"
import Signup from "./components/authentication/Signup"
import  SignUpMultiStep  from "./components/authentication/SignUpMultiStep"
import Footer from "./components/global/Footer"
import Navbar from "./components/global/Navbar"
import LandingPage from "./components/pages/LandingPage"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { UserProfile } from "./components/pages/UserProfile"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkAuth } from "./utils/utils.js"
import PublicRoute from "./utils/publicRoute.jsx"
import ProtectedRoute from "./utils/protectedRoute.jsx"



function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    checkAuth(dispatch);
  }, [dispatch])
  

  return (
    <>
    
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<PublicRoute> <Signin /> </PublicRoute>} />
        {/* <Route path="/signup" element={<Signup/>} /> */}
        <Route path="/signupmulti" element={<PublicRoute>  <SignUpMultiStep /> </PublicRoute>} />
        <Route path="/userprofile" element={<ProtectedRoute> <UserProfile/> </ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
