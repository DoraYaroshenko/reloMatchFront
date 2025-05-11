import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from '../../services/apiService';
import { JobContext } from '../../context/jobContext';
import { imgToString } from '../../services/cloudinaryServive';

export default function EditCompany() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [item, setItem] = useState({});
    const params = useParams();
    const nav = useNavigate();
    const { setCompany } = useContext(JobContext);
    const uploadRef = useRef();
    const [loading, setLoading] = useState(false);
    let imgUrl;

    useEffect(() => {
        doApiInit();
    }, []);

    const doApiUpload = async () => {
        try {
            const myFile = uploadRef.current.files[0];
            // הופך את הקובץ למידע כסטרינג
            const imgData = await imgToString(myFile);
            const url = TOKEN_KEY+"/upload/cloud";
            const resp = await doApiMethod(url, "POST", { image: imgData })
            console.log(resp);
            console.log(resp.data.secure_url)
            imgUrl = resp.data.secure_url;
        }
        catch (err) {
            console.log(err);
            // alert("There problem , come back later")
        }
    }

    // אוסף את המידע של הפריט שנרצה לערוך כדי להציג באינפוטים
    const doApiInit = async () => {
        try {
            setLoading(true);
            const url = API_URL + "/companies/companiesList?id=" + params["id"];
            const data = await doApiGet(url);
            console.log(data)
            setItem(data[0]);
            setLoading(false);
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
            setLoading(true);
            const url = API_URL + "/companies/" + params["id"];
            _bodyData.logo_url = imgUrl;
            const data = await doApiMethod(url, "PUT", _bodyData);
            if (data.modifiedCount) {
                _bodyData._id = params["id"];
                setCompany(_bodyData);
                localStorage.setItem("company", JSON.stringify(_bodyData));
                toast.success("company updated");
                nav("/admin/companies");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            // alert("there problem");
        }
    }


    return (
        <div className='container-fluid pt-5' style={{ minHeight: '100vh' }}>
            <div className='container'>
                <h1 className='display-4 mx-auto text-center pt-5'>Edit company info</h1>
                {loading ? <div className='container text-center'>
                    <div className="lds-roller ">
                        <div>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                    :
                   <form onSubmit={handleSubmit(onSubForm)} className="col-md-6 p-2 mx-auto" >
                    { item._id&&<div>
                        <label className='h5'>Company Name:</label>
                        <input defaultValue={item.company_name} {...register("company_name", { required: true, minLength: 2 })} className="form-control" type="text" />
                        {errors.company_name && <div className="text-danger">* Enter valid name</div>}
                        <br />
                        <label className='h5'>Contact phone:</label>
                        <textarea defaultValue={item.contactPhone} {...register("contactPhone", { required: true, minLength: 2 })} className="form-control" type="textarea"></textarea>
                        {errors.contactPhone && <div className="text-danger">* Enter valid phone</div>}
                        <br />
                        <label className='h5'>State:</label>
                        <textarea defaultValue={item.state} {...register("state", { required: true, minLength: 2 })} className="form-control" type="textarea"></textarea>
                        {errors.state && <div className="text-danger">* Enter valid state</div>}
                        <br />
                        <label className='h5'>Logo:</label>
                        <input ref={uploadRef} type="file" className='form-control' />

                        {errors.logo_url && <div className="text-danger">* Enter valid phone</div>}
                        <div className='text-center'>
                            <button className='btn text-white mt-3' style={{ backgroundColor: '#5C2018' }}><h5 className='m-0'>Update</h5></button>
                        </div>
                        </div>
                        }
                    </form>
                }
                </div >
                </div> )
}
