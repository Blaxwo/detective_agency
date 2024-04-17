
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
import MainNewCases from "./Components/Main/Manager/NewCases/NewCases";
import MainDetectivesForManager from "./Components/Main/Manager/DetectivesForManager/DetectivesForManager";
import { useSelector } from 'react-redux';
function App(props) {
  // console.log(props)
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
            {/*<Route element={<RequireAuth allowedRoles={[ROLES.Manager]} />}>*/}
            {/*    <Route path="/manager/*" element={<HeaderManager />} />*/}
            {/*</Route>*/}
            {/*<Route element={<RequireAuth allowedRoles={[ROLES.Detective]} />}>*/}
            {/*    <Route path="/detective/*" element={<HeaderDetective />} />*/}
            {/*</Route>*/}
            {/*<Route element={<RequireAuth allowedRoles={[ROLES.Client]} />}>*/}
            {/*    <Route path="/client/*" element={<HeaderClient />} />*/}
            {/*</Route>*/}
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
            {/* we want to protect these routes */}
            {roleRoutesLogin}
            <Route path='/client/detectives' element={<MainDetectives/>}/>
            <Route path='/client/my_cases' element={<MainMyCasesClient/>}/>
            {/*need to be changed*/}
            <Route path='/detective/detectives' element={<MainDetectivesForManager/>}/>
            <Route path='/detective/my_cases' element={<MainMyCasesDetective/>}/>
            <Route path='/detective/my_clients' element={<MainMyClients/>}/>
            <Route path='/manager/all_clients' element={<MainAllClients/>}/>
            <Route path='/manager/new_cases' element={<MainNewCases/>}/>
            <Route path='/manager/detectives' element={<MainDetectivesForManager/>}/>
        </Routes>
      </Main>
      <Footer/>
    </div>
  );
}

export default App;
