import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from "./components/Login";
import AppToast from "./components/Toast";
import {AppDispatch} from "./redux/store";
import {useDispatch} from "react-redux";
import {standardUserInformation} from "./redux/slices/UserSlice";
import Subscription from "./components/Subscription";
import Profile from "./components/Profile";
import AppLoader from "./components/Loader";
import AppModal from "./components/Modal";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(standardUserInformation());
  return (
      <div className="App">
        <AppLoader />
        <AppModal />
        <Router>
          <Header/>
          <div className="pb-5">
            <AppToast />
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/signin" element={<Login />}/>
              <Route path="/subscription" element={<Subscription />}/>
              <Route path="/profile" element={<Profile />}/>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer/>
        </Router>
      </div>
  );
}

export default App;
