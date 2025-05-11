import React, { useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from '../../services/apiService';
import { imgToString } from '../../services/cloudinaryServive';

export default function AddJob() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();
    const [categoriesAr, setCategoriesAr] = useState([]);
    const [loading, setLoading] = useState(false);
    const uploadRef = useRef();
    let imgUrl;

    useEffect(() => {
        getCategories();
    }, [])

    const onSubForm = async (_bodyData) => {
        console.log(_bodyData);
        await doApiUpload();
        doApiPost(_bodyData);
    }

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
        }
    }

    const getCategories = async () => {
        const url = API_URL + "/categories?perPage=Infinity";
        try {
            const data = await doApiGet(url);
            setCategoriesAr(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const doApiPost = async (_bodyData) => {
        try {
            setLoading(true);
            const url = API_URL + "/jobs";
            console.log(_bodyData)
            console.log(imgUrl)
            _bodyData.img_url = imgUrl;
            const data = await doApiMethod(url, "POST", _bodyData);
            if (data._id) {
                toast.success("job added");
                nav("/company/myJobs");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert("there problem");
        }
    }

    return (
        <div className='container mt-5' style={{ minHeight: '100vh' }}>
            <h1 className='display-4 mx-auto text-center pt-5'>Add new job</h1>
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
            </div> :
                <form onSubmit={handleSubmit(onSubForm)} className="col-md-6 p-2 mx-auto" >
                    <label className='h5'>Job title:</label>
                    <input {...register("job_title", { required: true, minLength: 2 })} className="form-control h5" type="text" />
                    {errors.name && <div className="text-danger">* Enter valid job title</div>}
                    <label className='h5'>Info:</label>
                    <textarea {...register("info", { required: true, minLength: 2 })} className="form-control" type="textarea"></textarea>
                    {errors.info && <div className="text-danger">* Enter valid info</div>}
                    <br />
                    <label className='h5'>Category:</label>
                    <br />
                    <select className='form-select' {...register("category", { required: true, minLength: 2 })}>
                        {
                            categoriesAr.map((item, i) => {
                                return (
                                    <option key={i} value={item.category_name}>{item.category_name}</option>
                                )
                            })
                        }
                    </select>
                    {errors.category && <div className="text-danger">* Enter valid category</div>}
                    <br />
                    <br />
                    <label className='h5'>Salary:</label>
                    <input {...register("salary", { required: true })} className="form-control" type="number"></input>
                    {errors.salary && <div className="text-danger">* Enter valid salary</div>}
                    <br />
                    <label className='h5'>Location:</label>
                    <input {...register("location", { required: true, minLength: 2 })} className="form-control" type="text" />
                    {errors.location && <div className="text-danger">* Enter valid location</div>}
                    <br />
                    <label className='h5'>Continent:</label>
                    <select {...register("continent", { required: true })} className="form-select">
                        <option value={""}>All</option>
                        <option>Europe</option>
                        <option>Asia</option>
                        <option>North-America</option>
                        <option>South-America</option>
                        <option>Australia</option>
                    </select>
                    {errors.continent && <div className="text-danger">* Enter valid continent</div>}
                    <br />
                    <label className='h5'>Visa:</label>
                    <br />
                    <select className='form-select' {...register("visa", { required: true })}>
                        <option value={true}>required</option>
                        <option value={false}>not required</option>
                    </select>
                    <br />
                    {errors.visa && <div className="text-danger">* Enter valid visa info</div>}
                    <br />
                    <label className='h5'>Job Image:</label>
                    <input ref={uploadRef} type="file" className='form-control' />
                    <br />
                    <div className='text-center'>
                        <button className='btn text-white my-4' style={{ backgroundColor: '#5C2018' }}><h5 className='m-0'>Add new</h5></button>
                    </div>
                </form>
            }
        </div >
    )
}