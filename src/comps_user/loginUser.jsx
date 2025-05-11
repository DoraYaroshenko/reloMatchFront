import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { doApiMethod, API_URL, TOKEN_KEY } from '../services/apiService';
import { toast } from 'react-toastify';
import { useUserData } from '../hooks/useUserData';
import { useQuery } from 'react-query';

const LoginUser = () => {

    const url = window.location.href;
    const queryString = url.split('?')[1]; // Get the part after the '?'

    const location = useLocation();

    const [query] = useSearchParams(queryString);

    const navQ = query.get('nav');

    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { doApiUser, updateFav } = useUserData();


    useEffect(() => {
        if (location.hash === '#top') {
            const targetElement = document.getElementById('top');
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }


    }, [location.hash]);

    const onSubForm = (_bodyData) => {
        console.log(_bodyData);
        doApiPost(_bodyData);
    }

    const doApiPost = async (_bodyData) => {
        try {

            const url = API_URL + "/users/login";
            const data = await doApiMethod(url, "POST", _bodyData)
            console.log(data);

            // if (data.token) {
            //     toast.success("Welcome, you logged in")
            //     nav("/")
            // }
            if (data.login) {
                console.log("works");
                await doApiUser();
                toast.success("Welcome, you logged in")
                JSON.parse(localStorage["user"]).role == "company" ?
                    nav("/company") :
                    <>
                    {navQ? 
                    nav(navQ) :
                    nav("/") }
                    </>;
            }
        }
        catch (err) {
            console.log(err);
            alert("User or password is wrong!");
        }
    }



    return (
        <div className='container' id='top' style={{ marginTop: '70px', minHeight: '100vh' }}>
            <h1 className='display-4 text-center'>Login</h1>
            <form className='col-md-6 p-2 border mx-auto' onSubmit={handleSubmit(onSubForm)}  >
                <label>email</label>
                <input {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} className="form-control" type="text" />
                {errors.email && <div className="text-danger">* Enter valid email</div>}
                <label>password</label>
                <input {...register("password", { required: true, minLength: 3 })} className="form-control" type="password" />
                {errors.password && <div className="text-danger">* Enter valid password (min 3 chars)</div>}
                <div className='text-center'>

                    <button className='btn btn-dark mt-3 '>Log in</button>
                    <div className='container mt-3'>
                        <h6>New User? <Link to="/signup">Sign Up</Link></h6>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginUser


