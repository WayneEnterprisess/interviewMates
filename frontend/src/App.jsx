import Signin from "./components/authentication/Signin"
import Signup from "./components/authentication/Signup"
import  SignUpMultiStep  from "./components/authentication/SignUpMultiStep"
import Footer from "./components/global/Footer"
import Navbar from "./components/global/Navbar"
import LandingPage from "./components/pages/LandingPage"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { UserProfile } from "./components/pages/UserProfile"


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signupmulti" element={<SignUpMultiStep/>} />
        <Route path="/userprofile" element={<UserProfile/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
