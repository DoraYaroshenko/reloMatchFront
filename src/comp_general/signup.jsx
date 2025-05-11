import React, { useRef } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { API_URL, doApiMethod, TOKEN_KEY } from '../services/apiService';
//import { useUserData } from '../hooks/useUserData';


const Signup = () => {
    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const uploadRef = useRef();
    // const { doApiUpload } = useUserData();

    const onSubForm = async (_bodyData) => {
        console.log(_bodyData);
        //let data=await doApiUpload(uploadRef);
        //console.log(data+"here");
        doApiPost(_bodyData);
    }

    const doApiPost = async (_bodyData) => {
        try {
            _bodyData.CV_link="";
            _bodyData.linkedIn_url="";
            _bodyData.match_url="";
            const url = API_URL + "/users/";
            const data = await doApiMethod(url, "POST", _bodyData)
            console.log(data);
            if (data._id) {
                // מציג הודעת טוסט
                toast.success("Welcome to our site! Please log in");
                nav("/")
            }
        }
        catch (err) {
            console.log(err.response.data.code);
            if (err.response.data.code == 11000) {
                return toast.error("Email already in system please log in")
            }
            console.log(err);
            alert("There problem, come back later");
        }
    }
    return (
        <div className='container py-4' style={{ marginTop: '70px', minHeight: '100vh' }} >

            <div className='container d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
                <h1 className='display-6 text-white'>Sign up</h1>
            </div>
            <form className='col-md-6 p-2 border mx-auto' onSubmit={handleSubmit(onSubForm)}  >
                <label>Full name:</label>
                <input {...register("full_name", { required: true, minLength: 2 })} className="form-control" type="text" />
                {errors.full_name && <div className="text-danger">* Enter valid Name (min 2 chars)</div>}
                <label>Email:</label>
                <input {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} className="form-control" type="text" />
                {errors.email && <div className="text-danger">* Enter valid email</div>}
                <label>Password:</label>
                <input {...register("password", { required: true, minLength: 3 })} className="form-control" type="password" />
                {errors.password && <div className="text-danger">* Enter valid password (min 3 chars)</div>}


                <label>Your birth year:</label>
                <input {...register("birth_date", { required: true, min: 1900, max: 2100 })} className="form-control" type="date" defaultValue={1990} />
                {errors.birth_date && <div className="text-danger">* Enter valid Year (1900 to 2030)</div>}

                <label>Gender: </label>
                <select {...register("gender")} className='m-2' name="gender">
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                </select>
                {/* <br />
                <label>Resume: </label>
                <input ref={uploadRef} type="file" className='form-control' />
                {errors.logo_url && <div className="text-danger">* Enter valid file</div>} */}

                <div className='text-center'>
                    <button className='btn btn-success mt-3 '>Sign up</button>
                </div>
            </form>
        </div>
    )
}

export default Signup