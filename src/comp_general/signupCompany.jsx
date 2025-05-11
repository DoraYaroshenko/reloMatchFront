import React, { useRef } from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { API_URL, doApiMethod, TOKEN_KEY } from '../services/apiService';
import { useUserData } from '../hooks/useUserData';


const SignupCompany = () => {
    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const uploadRef = useRef();
    const {doApiUser,userSignOut,user}=useUserData();

    const onSubForm = async (_bodyData) => {
        console.log(_bodyData);
        //let data=await doApiUpload(uploadRef);
        //console.log(data+"here");
        doApiPost(_bodyData);
    }

    const doApiPost = async (_bodyData) => {
        try {
            const url = API_URL + "/companies/";
            const data = await doApiMethod(url, "POST", _bodyData)
            console.log(data);
            if (data._id) {
                // מציג הודעת טוסט
                await changeRole();
                toast.success("You are now a company! please login again");
                userSignOut();
                // nav("/login")
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

    const changeRole = async(userInfo) => {
        try {
          const url = API_URL +`/users/changeRoleToCompany`;
          const data = await doApiMethod(url, "PATCH");
          console.log(data);
        //   JSON.parse(localStorage["user"]).role = data.newRole;
          if(data.modifiedCount){
            // doApiPost();
          }
        } catch (error) {
          
        }
      }
    return (
        <div className='container py-4' style={{ marginTop: '70px', minHeight: '100vh' }} >
            <div className='container d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
                <h1 className='display-6 text-white'>Create A Company</h1>
            </div>
            <div className='container text-center'>
                <p className='text-danger' style={{fontSize:'20px', fontWeight:'bold'}}>* from the moment of submission you become a company and not a regular user.</p>
            </div>
            <form className='col-md-6 p-2 border mx-auto' onSubmit={handleSubmit(onSubForm)}  >
                <label>Company name:</label>
                <input {...register("company_name", { required: true, minLength: 2 })} className="form-control" type="text" />
                {errors.company_name && <div className="text-danger">* Enter valid Name (min 2 chars)</div>}
                <label>Contact Phone Number:</label>
                <input {...register("contactPhone", { required: true, minLength: 5 })} className="form-control" type="tel" />
                {errors.contactPhone && <div className="text-danger">* Enter valid phone</div>}
                <label>state:</label>
                <input {...register("state", { required: true, minLength: 2 })} className="form-control" type="text" />
                {errors.state && <div className="text-danger">* Enter valid state (min 2 chars)</div>}

                <div className='text-center'>
                    <button className='btn btn-success mt-3 '>Sign up as company</button>
                </div>
            </form>
        </div>
    )
}

export default SignupCompany