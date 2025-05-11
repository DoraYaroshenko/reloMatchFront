import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../services/apiService';
import { JobContext } from '../context/jobContext';
import { useUserData } from '../hooks/useUserData';
import { imgToString } from '../services/cloudinaryServive';

export default function EditUserInfo() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [item, setItem] = useState({});
    const params = useParams();
    const nav = useNavigate();
    const { setCompany } = useContext(JobContext);
    const uploadRef = useRef();
    const { user, doApiUser } = useUserData();
    let cvUrl;

    useEffect(() => {
        doApiInit();
    }, []);

    const doApiUpload = async () => {

        try {
            const myFile = uploadRef.current.files[0];
            // הופך את הקובץ למידע כסטרינג
            const file = await imgToString(myFile);
            const url = API_URL + '/upload/cloud';
            const resp = await doApiMethod(url, "POST", { image: file })
            console.log(resp);
            console.log(resp.data.secure_url)
            cvUrl = resp.data.secure_url;;
        }
        catch (err) {
            // console.log(err);
            // alert("There problem , come back later")
        }
    }

    // אוסף את המידע של הפריט שנרצה לערוך כדי להציג באינפוטים
    const doApiInit = async () => {
        try {
            setItem(JSON.parse(localStorage["user"]));
        } catch (error) {
            console.log(error);
        }
    }

    const onSubForm = async (_bodyData) => {
        console.log(_bodyData);
        await doApiUpload();
        doApiEdit(_bodyData);
    }

    const doApiEdit = async (_bodyData) => {
        try {
            const url = API_URL + "/users/" + params["id"];
            _bodyData.CV_link = cvUrl;
            const data = await doApiMethod(url, "PUT", _bodyData);
            if (data.modifiedCount) {
                _bodyData._id = params["id"];
                doApiUser();
                localStorage.setItem("user", JSON.stringify(_bodyData));
                toast.success("company updated");
                nav("/userinfo");
            }
        } catch (error) {
            console.log(error);
            alert("there problem");
        }
    }


    return (
        <div className='container-fluid pt-5' style={{ minHeight: '100vh' }}>
            <div className='container mt-5'>
                <div className='container d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
                    <h1 className='display-6 text-white m-0'>Edit My Info</h1>
                </div>
                {user.email ?
                    <form className='col-md-6 p-2 border mx-auto' onSubmit={handleSubmit(onSubForm)}  >

                        <label>Full name:</label>
                        <input defaultValue={user.full_name} {...register("full_name", { required: true, minLength: 2 })} className="form-control" type="text" />
                        {errors.full_name && <div className="text-danger">* Enter valid Name (min 2 chars)</div>}
                        <label>Email:</label>
                        <input defaultValue={user.email} {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} className="form-control" type="text" />
                        {errors.email && <div className="text-danger">* Enter valid email</div>}


                        <label>Your birth year:</label>
                        <input value={user.birth_date.substring(0, 10)} {...register("birth_date", { required: true, min: 1900, max: 2100 })} className="form-control" type="date" />
                        {errors.birth_date && <div className="text-danger">* Enter valid Year (1900 to 2030)</div>}

                        <label>Gender: </label>
                        <select defaultValue={user.gender} {...register("gender")} className='form-select' name="gender">
                            <option value="F">Female</option>
                            <option value="M">Male</option>
                        </select>

                        <label>Resume: </label>
                        {user.CV_link&& <>
                        <a className='text-decoration-none' href={user.CV_link} target='_blank'> My_CV</a>
                        <h6>Update your resume:</h6>
                        </>
                        }
                        <input ref={uploadRef} type="file" className='form-control' accept=".pdf"/>
                        {errors.CV_link && <div className="text-danger">* Enter valid file</div>}

                        <label>LinkedIn url:</label>
                        <input defaultValue={user.linkedIn_url} {...register("linkedIn_url", { minLength: 5  })} className="form-control" type="text" />
                        {errors.linkedIn_url && <div className="text-danger">* Enter valid url</div>}

                       

                        <div className='text-center'>
                            <button className='btn btn-warning mt-3'>Update</button>
                        </div>
                    </form> : <h2>Loading...</h2>}
            </div >
        </div>
    )
}
