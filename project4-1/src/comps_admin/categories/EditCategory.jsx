import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';

export default function EditCategory() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [item, setItem] = useState({});
  const params = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    doApiInit();
  }, [])

  // אוסף את המידע של הפריט שנרצה לערוך כדי להציג באינפוטים
  const doApiInit = async () => {
    try {
      setLoading(true);
      const url = API_URL + "/categories/single/" + params["id"];
      const data = await doApiGet(url);
      console.log(data);
      setItem(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiEdit(_bodyData);
  }

  const doApiEdit = async (_bodyData) => {
    try {
      setLoading(true);
      const url = API_URL + "/categories/" + params["id"];
      const data = await doApiMethod(url, "PUT", _bodyData);
      if (data.modifiedCount) {
        setLoading(false);
        toast.success("category updated");
        nav("/admin/categories");
      }
    } catch (error) {
      console.log(error);
      alert("there problem");
    }
  }


  return (
    <div className='container my-5' style={{ minHeight: '100vh' }}>
      <h1 className='display-4 mx-auto text-center pt-5'>Edit category form</h1>
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
        {item.category_name ?
          <form onSubmit={handleSubmit(onSubForm)} className="col-md-6 p-2 mx-auto" >
            <label className='h5'>Name:</label>
            <input defaultValue={item.category_name} {...register("category_name", { minLength: 2 })} className="form-control" type="text" />
            {errors.name && <div className="text-danger">* Enter valid name</div>}
            <br />
            <label className='h5'>Info:</label>
            <textarea defaultValue={item.info} {...register("info", { minLength: 2 })} className="form-control" type="textarea"></textarea>
            {errors.info && <div className="text-danger">* Enter valid info</div>}
            <div className='text-center'>
              <button className='btn text-white my-4' style={{ backgroundColor: '#5C2018' }}><h5 className='m-0'>Update</h5></button>
            </div>
          </form> : <h2>Loading...</h2>}
      </>
      }
    </div >
  )
}
