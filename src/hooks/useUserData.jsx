import { useContext, useEffect, useState } from "react"
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from "../services/apiService";
import { toast } from "react-toastify";
import { JobContext } from "../context/jobContext";
import { useNavigate } from "react-router-dom";
import { imgToString } from "../services/cloudinaryServive";


export const useUserData = () => {
  // const [userData,setUserData] = useState({});

  const { user, setUser, favs_ar, setFavsAr, company, setCompany } = useContext(JobContext);

  const nav = useNavigate();
  
  useEffect(() => {
    console.log('user');
     if(!!!user){doApiUser();}
    // doApiUser();

  }, [])

  const doApiUser = async () => {
    try {
      console.log("doApiUser");
      const url = API_URL + "/users/userInfo";
      const data = await doApiGet(url)
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      if (data.role === "user"||data.role === "admin") {
        MatchDataUpdate(data.match_url);
        localStorage.setItem('favs_ar', JSON.stringify(data.favs_ar));
        console.log(data.favs_ar);
      }

      if (data.role === "company") {
        const companyUrl = API_URL + "/companies/companyInfo";
        const companyData = await doApiGet(companyUrl);
        localStorage.setItem('company', JSON.stringify(companyData));
        setCompany(companyData);
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const MatchDataUpdate = async (_url) => {
    try {
      const url = _url;
      const data = await doApiGet(url);
      if (data.jobsFive) {
        // setData(data);
        localStorage.setItem('match_data', JSON.stringify(data))
        console.log(data)
      }
    }
    catch (err) {
      console.log(err);
      // alert("value is wrong!");
    }
  }


  // מנקה את הדאטא במיוחד כאשר המתשמש עושה
  // LOG OUT 
  // כך שלא יהיו שיבושים כאשר כבר נמחק הטוקן מהלוקאל
  const userSignOut = async () => {
    const url = API_URL + "/users/logout";
    const data = await doApiMethod(url, "POST");
    console.log(data);
    if (data.logout) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('match_data');
      localStorage.removeItem('favs_ar');
      setUser({});
      setCompany({});
      nav("/");
      localStorage.removeItem('company');
      toast.info("You logged out, see you soon...");
    }
  }



  // מעדכן את המועדפים , גם בהחסרה וגם בהוספה
  // ואת המסד של המשתמש
  const updateFav = async (_newIdFav) => {
    const favs = JSON.parse(localStorage.getItem('favs_ar'))
    const temp_ar = [...favs];
    // בודק אם האיי די קיים במועדפים כבר או לא ופועל בהתאם
    if (!temp_ar.includes(_newIdFav)) {
      // מוסיף אותו למועדפים
      temp_ar.push(_newIdFav)
    }
    else {
      // מחסיר אותו מהמערך של המעודפים
      temp_ar.splice(temp_ar.indexOf(_newIdFav), 1)
    }
     setFavsAr(temp_ar)

    try {
      const url = API_URL + "/users/updateFav"
      const data = await doApiMethod(url, "PATCH", { favs_ar: temp_ar })
      if (data.modifiedCount) {
        toast.success("add/remove from favorite")
      }
      localStorage.setItem('favs_ar', JSON.stringify(temp_ar));
    }
    catch (err) {
      console.log(err)
      alert("There problem, try again later")
    }
  }

  const unApplay = async (_jobId) => {
    try {
      const url = API_URL + "/contenders/?job_id=" + _jobId; // Change this URL to the appropriate endpoint for your apply form
      // console.log(formData);
      const data = await doApiMethod(url, "DELETE");
      console.log(data);
      // Handle success or failure as per your API response
      // For example, assuming the response contains a success message
      if (data.deletedCount) {
        console.log("unApplied successfully!");
        toast.success("you unapplied!");
        // nav("/"); // Navigate to the desired page after form submission
      }
    } catch (err) {
      console.log(err);
      alert("Error submitting the application!");
    }
  }


  const doApiUpload = async (uploadRef) => {
    try {
      const myFile = uploadRef.current.files[0];
      // הופך את הקובץ למידע כסטרינג
      const imgData = await imgToString(myFile);
      const url = API_URL + "/upload/cloud";
      const resp = await doApiMethod(url, "POST", { image: imgData })
      console.log(resp);
      console.log(resp.data.secure_url)
      // imgUrl = resp.data.secure_url;
    }
    catch (err) {
      console.log(err);
      alert("There problem , come back later")
    }
  }

  // פונקציה שתעדכן את המועדפים גם בזכרון
  // וגם בשרת

  //  doApiUser -> נצטרך את הפונקציה כאשר משתמש
  // מתחבר 
  return { doApiUser, user, userSignOut, favs_ar, updateFav, company, doApiUpload, unApplay };

}