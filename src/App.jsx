import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
//library used:=> see in dependencies
//npm i @reduxjs/toolkit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form
//environment varaibles => create new file
//conf folder and file
//appwrite folder
//store=>reduxtoolkit
//main.jsx d wraper store with provider

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  //while fecting the data there maybe some delay so we tracking it using usestate and useeffect to check whter the user is logged iin or not
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          //disptach it store and update the store
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      }) //fianlly runs very time
      .finally(() => setLoading(false));
  }, []);

  //loading screen
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null; //()
}

export default App;
