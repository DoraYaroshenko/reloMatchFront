import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doApiMethod, API_URL } from '../../services/apiService';
import { useUserData } from '../../hooks/useUserData';

const ApplyPage = () => {
    const nav = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const params = useParams();
    const { user } = useUserData();

    const onSubmit = async (formData) => {
        console.log(formData);
        formData.job_id = params["id"];
        formData.user_id = user._id;
        doApiPost(formData);
    };

    const doApiPost = async (formData) => {
        try {
            const url = API_URL + "/contenders"; // Change this URL to the appropriate endpoint for your apply form
            console.log(formData);
            const data = await doApiMethod(url, "POST", formData);
            console.log(data);
            // Handle success or failure as per your API response
            // For example, assuming the response contains a success message
            if (data._id) {
                console.log("Form submission successful!");
                toast.success("Application submitted successfully!");
                nav("/"); // Navigate to the desired page after form submission
            }
        } catch (err) {
            console.log(err);
            alert("Error submitting the application!");
        }
    };

    return (
        <div className='container' style={{ marginTop: '70px' ,minHeight:'100vh'}}>
            <div className='container mb-5 d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
                <h1 className='display-6 text-white'>Apply- {params["job_title"]}</h1>
            </div>

            <form className='col-md-7 p-4 border mx-auto' onSubmit={handleSubmit(onSubmit)}>
                <label>Starting Date</label>
                <input {...register("starting")} type="date" className="form-control" />
                <br />
                {/* <label>Upload Resume</label>
                <br />
                <input {...register("cv_link")} type="text" className="form-control-file" />
                <br /> <br /> */}
                {/* <label>Upload Resume</label>
                <input {...register("cv_link")} type="file" accept=".pdf,.doc,.docx" className="form-control-file" />
                <br /> */}
                <label>Notes</label>
                <textarea {...register("notes")} className="form-control" rows="4" />


                <div className='text-center'>
                    <button className='btn btn-dark mt-3' type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ApplyPage;
