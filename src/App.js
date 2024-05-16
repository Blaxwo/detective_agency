
import './App.css';
import RequireAuth from './Components/RequireAuthor';
import Header from "./Components/Header/Headers/Header";
import Main from "./Components/Main/Main";
import Footer from "./Components/Footer/Footer";
import {Route, Routes} from "react-router-dom";
import HeaderDetective from "./Components/Header/Headers/HeaderDetective";
import HeaderClient from "./Components/Header/Headers/HeaderClient";
import HeaderManager from "./Components/Header/Headers/HeaderManager";
import MainMyCasesClient from "./Components/Main/Client/MyCasesClient";
import MainHome from "./Components/Main/AllUsers/Home/Home";
import MainAboutUs from "./Components/Main/AllUsers/AboutUs/AboutUs";
import MainServices from "./Components/Main/AllUsers/Services/Services";
import MainDetectives from "./Components/Main/AllUsers/Detectives/Detectives";
import Comments from "./Components/Main/AllUsers/Comments/Comments";
import MainLogin from "./Components/Main/AllUsers/Login/Login";
import MainRegister from "./Components/Main/AllUsers/Register/Register";
import MainAlreadyAuthorized from "./Components/Main/AllUsers/AlreadyAuthorized/AlreadyAuthorized";
import MainMyCasesDetective from "./Components/Main/Detective/MyCases/MyCasesDetective";
import MainMyClients from "./Components/Main/Detective/MyClients/MyClients";
import MainAllClients from "./Components/Main/Manager/AllClients/AllClients";
import MainCases from "./Components/Main/Manager/Cases/Cases";
import MainDoneCases from "./Components/Main/Manager/Cases/DoneCases/DoneCases";
import MainOngoingCases from "./Components/Main/Manager/Cases/OngoingCases/OngoingCases";
import MainCanceledCases from "./Components/Main/Manager/Cases/CancelledCases/CancelledCases";
import MainNewCases from "./Components/Main/Manager/Cases/NewCases/NewCases";


import MainDetectivesForManager from "./Components/Main/Manager/DetectivesForManager/DetectivesForManager";
import { useSelector } from 'react-redux';
function App(props) {
    const roles = useSelector(state =>state.rolesPage.roles);
  console.log(roles)
    const roleRoutesAboutUs = roles.map(role => (
        <Route key={role} path={`/${role}/about_us`} element={<MainAboutUs />} />
    ));
    const roleRoutesServices = roles.map(role => (
        <Route key={role} path={`/${role}/services/*`} element={<MainServices />} />
    ));
    const roleRoutesComments = roles.map(role => (
        <Route key={role} path={`/${role}/comments`} element={<Comments />} />
    ));
    const roleRoutesLogin = roles.map(role => (
        <Route key={role} path={`/${role}/login`} element={<MainAlreadyAuthorized />} />
    ));

  return (
    <div className="App">
        <Routes>
            <Route path='/*' element={<Header/>}/>
            <Route path='/detective/*' element={<HeaderDetective/>}/>
            <Route path='/client/*' element={<HeaderClient/>}/>
            <Route path="/manager/*" element={<HeaderManager />} />
        </Routes>
      <Main>
        <Routes>
            <Route path="/*" element={<MainHome/>}/>
            <Route path='/about_us' element={<MainAboutUs/>}/>
          <Route path='/services/*' element={<MainServices/>}/>
          <Route path='/detectives' element={<MainDetectives/>}/>
          <Route path='/comments' element={<Comments/>}/>
          <Route path='/login' element={<MainLogin/>}/>
            <Route path='/register' element={<MainRegister/>}/>
            {roleRoutesAboutUs}
            {roleRoutesServices}
            {roleRoutesComments}
            {roleRoutesLogin}
            <Route path='/client/detectives' element={<MainDetectives/>}/>
            <Route path='/client/my_cases' element={<MainMyCasesClient/>}/>
            <Route path='/detective/detectives' element={<MainDetectivesForManager/>}/>
            <Route path='/detective/my_cases' element={<MainMyCasesDetective/>}/>
            <Route path='/detective/my_clients' element={<MainMyClients/>}/>
            <Route path='/manager/all_clients' element={<MainAllClients/>}/>
            <Route path='/manager/cases' element={<MainCases/>}/>
            <Route path='/manager/new_cases' element={<MainNewCases />} />
            <Route path='/manager/done_cases' element={<MainDoneCases />} />
            <Route path='/manager/ongoing_cases' element={<MainOngoingCases />} />
            <Route path='/manager/canceled_cases' element={<MainCanceledCases />} />
            <Route path='/manager/detectives' element={<MainDetectivesForManager/>}/>
        </Routes>
      </Main>
      <Footer/>
    </div>
  );
}

export default App;
