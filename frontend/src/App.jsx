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
import { InterviewRequests } from "./components/pages/InterviewRequests.jsx"
import { YourInterviews } from "./components/pages/YourInterviews.jsx"



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
        <Route path="/signup" element={<PublicRoute>  <SignUpMultiStep /> </PublicRoute>} />
        <Route path="/userprofile" element={<ProtectedRoute> <UserProfile/> </ProtectedRoute>} />
        <Route path="/interview-requests" element={<ProtectedRoute> <InterviewRequests/> </ProtectedRoute>} />
        <Route path="/your-interviews" element={<ProtectedRoute> <YourInterviews/> </ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
