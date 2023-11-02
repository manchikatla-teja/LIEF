import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import MainPage from "./pages/MainPage/MainPage";
import ExistingPatient from "./pages/ExistingPatient/ExistingPatient";

function App() {
  return (
        
        <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/mainpage' element={<MainPage/>}></Route>
          <Route path='/existpatient' element={<ExistingPatient/>}></Route>
        </Routes>
        </BrowserRouter>
  );
}

export default App;
