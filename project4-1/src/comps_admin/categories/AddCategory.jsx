import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../../services/apiService';

export default function AddCategory() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiPost(_bodyData);
  }

  const doApiPost = async (_bodyData) => {
    try {
      setLoading(true);
      const url = API_URL + "/categories";
      console.log(_bodyData)
      const data = await doApiMethod(url, "POST", _bodyData);
      if (data._id) {
        toast.success("category added");
        setLoading(false);
        nav("/admin/categories");
      }
    } catch (error) {
      console.log(error);
      alert("there problem");
    }
  }

  return (
    <div className='container my-5' style={{ minHeight: '100vh' }}>
      <h1 className='display-4 mx-auto text-center pt-5'>Add new category</h1>
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
        <form onSubmit={handleSubmit(onSubForm)} className="col-md-6 p-2 mx-auto">
          <label className='h5'>Category name:</label>
          <input {...register("category_name", { required: true, minLength: 2 })} className="form-control" type="text" />
          {errors.name && <div className="text-danger">* Enter valid name</div>}
          <br />
          <label className='h5'>Info:</label>
          <textarea {...register("info", { required: true, minLength: 2 })} className="form-control" type="textarea"></textarea>
          {errors.info && <div className="text-danger">* Enter valid info</div>}
          <div className='text-center'>
            <button className='btn text-white my-4' style={{ backgroundColor: '#5C2018' }}><h5 className='m-0'>Add new</h5></button>
          </div>
        </form>
      }
    </div >
  )
}