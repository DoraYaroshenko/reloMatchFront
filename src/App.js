// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import AppRouters from './appRouters';
import { JobContext } from './context/jobContext';
import { ToastContainer } from 'react-toastify';
// import { useUserData } from './hooks/useUserData';
import 'react-toastify/dist/ReactToastify.css';
import { TOKEN_KEY } from './services/apiService';

// import './fonts.css';


function App() {
  // const { favs_ar, userData, doApiUser, userSignOut, updateFav } = useUserData();
  const [user,setUser]= useState(JSON.parse(localStorage.getItem(TOKEN_KEY)) || null);
  const [company,setCompany]= useState(JSON.parse(localStorage.getItem("company")) || null);
  const [favs_ar,setFavsAr] = useState([]);
  // const [request_jobs,setRequestJobs] = useState([]);
  const [authorized, setAuthorized] = useState(false);

  useEffect(()=>{
      if(user){
        setFavsAr(user.favs_ar);
      }
  },[user])

  return (
    <JobContext.Provider value={{
      // doApiUser, userSignOut,
      user,setUser,
      company, setCompany,
      favs_ar,setFavsAr,authorized, setAuthorized,
    // request_jobs,setRequestJobs

      // updateFav
    }}>
      <AppRouters />
      {/* קומפנינטה שתציג את ההודעות טוסט */}
      <ToastContainer theme="colored" />

    </JobContext.Provider>
    
  );
}

export default App;
