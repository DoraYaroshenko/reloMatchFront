import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { imgToString } from '../../services/cloudinaryServive';

const EditJob = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [item, setItem] = useState({});
    const params = useParams();
    const nav = useNavigate();
    const [categoriesAr, setCategoriesAr] = useState([]);
    const uploadRef = useRef();
    const [loading, setLoading] = useState(false);
    let imgUrl;

    useEffect(() => {
        doApiInit();
        getCategories();
    }, [])

    // אוסף את המידע של הפריט שנרצה לערוך כדי להציג באינפוטים
    const doApiInit = async () => {
        try {
            setLoading(true);
            const url = API_URL + "/jobs/single/" + params["id"];
            const data = await doApiGet(url);
            console.log(data);
            setItem(data);
            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    const doApiUpload = async () => {
        try {
            const myFile = uploadRef.current.files[0];
            // הופך את הקובץ למידע כסטרינג
            const imgData = await imgToString(myFile);
            const url = "http://localhost:3001/upload/cloud";
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

    const onSubForm = async (_bodyData) => {
        console.log(_bodyData);
        await doApiUpload();
        doApiEdit(_bodyData);
    }

    const doApiEdit = async (_bodyData) => {
        try {
            setLoading(true);
            const url = API_URL + "/jobs/" + params["id"];
            _bodyData.img_url = imgUrl;
            const data = await doApiMethod(url, "PUT", _bodyData);
            console.log(data);
            if (data.modifiedCount) {
                toast.success("job updated");
                nav("/company/myJobs");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert("there problem");
        }
    }

    return (
        <div className='container mt-5'>
            <h1 className='display-4 mx-auto text-center pt-5'>Edit job</h1>
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
            </div> : <>
                {item.job_title ?
                    <form onSubmit={handleSubmit(onSubForm)} className="col-md-6 p-2 mx-auto" >
                        <label className='h5'>Job title:</label>
                        <input defaultValue={item.job_title} {...register("job_title", { minLength: 2 })} className="form-control" type="text" />
                        {errors.job_title && <div className="text-danger">* Enter valid name</div>}
                        <br />
                        <label className='h5'>Info:</label>
                        <textarea defaultValue={item.info} {...register("info", { minLength: 2 })} className="form-control" type="textarea"></textarea>
                        {errors.info && <div className="text-danger">* Enter valid info</div>}
                        <br />
                        <label className='h5'>Category:</label>
                        <br />
                        <select {...register("category", { minLength: 2 })}>
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
                        <input defaultValue={item.salary} {...register("salary")} className="form-control" type="number"></input>
                        {errors.salary && <div className="text-danger">* Enter valid salary</div>}
                        <br />
                        <label className='h5'>Location:</label>
                        <input defaultValue={item.location} {...register("location", { minLength: 2 })} className="form-control" type="text" />
                        {errors.location && <div className="text-danger">* Enter valid location</div>}
                        <br />
                        <label className='h5'>Visa:</label>
                        <br />
                        <select className='form-select' {...register("visa")}>
                            <option value={true}>required</option>
                            <option value={false}>not required</option>
                        </select>
                        <br />
                        {errors.visa && <div className="text-danger">* Enter valid visa info</div>}
                        <br />
                        <label className='h5'>Job Image:</label>
                        <input ref={uploadRef} type="file" className='form-control' />
                        {errors.img_url && <div className="text-danger">* Enter valid img_url</div>}
                        <br />
                        <label className='h5'>Continent</label>
                        <input defaultValue={item.continent} {...register("continent", { minLength: 2 })} className="form-control" type="text" />
                        {errors.continent && <div className="text-danger">* Enter valid continent</div>}
                        <div className='text-center'>
                            <button className='btn text-white my-4' style={{ backgroundColor: '#5C2018' }}><h5 className='m-0'>Update</h5></button>
                        </div>
                    </form> : <h2>Loading...</h2>}
            </>
            }
        </div >
    )
}

export default EditJob