import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { doApiMethod, API_URL } from '../services/apiService';
import { toast } from 'react-toastify';
import { JobContext } from '../context/jobContext';
import { useUserData } from '../hooks/useUserData';

const LoginAdmin = () => {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setAuthorized } = useContext(JobContext);
  const { doApiUser, user } = useUserData();

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiPost(_bodyData);
  }

  const doApiPost = async (_bodyData) => {
    try {
      const url = API_URL + "/users/login";
      const data = await doApiMethod(url, "POST", _bodyData)
      console.log(data);
      if (data.login) {
        await doApiUser();
        if ((JSON.parse(localStorage["user"])).role == "admin") {
          toast.success("Welcome, you logged in");
          setAuthorized(true);
          nav("/admin/users")
        }
        else {
          alert("You are not allowed in this area")
        }
      }
    }
    catch (err) {
      console.log(err);
      alert("User or password is wrong!");
    }
  }

  return (
    <div className='container mt-4 col-11' style={{ minHeight: '100vh' }}>
      <h1 className='display-2 text-center'>Login to admin</h1>
      <form className='col-md-6 p-2 mx-auto' onSubmit={handleSubmit(onSubForm)}  >
        <label className='h4'>Email:</label>
        <input {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} className="form-control" type="text" />
        {errors.email && <div className="text-danger">* Enter valid email</div>}
        <br />
        <label className='h4'>Password:</label>
        <input {...register("password", { required: true, minLength: 3 })} className="form-control" type="password" />
        {errors.password && <div className="text-danger">* Enter valid password (min 3 chars)</div>}
        <div className='text-center'>
          <br />
          <button style={{backgroundColor: '#5C2018'}} className='btn btn-dark mt-3 px-5 py-2 rounded-4'><h3 className='m-0'>Log in</h3></button>
        </div>
      </form>
    </div>
  )
}

export default LoginAdmin