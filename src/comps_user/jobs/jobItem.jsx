import React from 'react';
import { Link } from 'react-router-dom';
import { useUserData } from '../../hooks/useUserData';
import { TOKEN_KEY } from '../../services/apiService';
// import '../../App.css';


const JobItem = (props) => {
    const { user } = useUserData();
    const item = props.item;
    return (
        <div className='col-lg-3 mb-4'>
            <Link 
            to=
             {localStorage.getItem(TOKEN_KEY) !== null? ("/jobs/" + item._id) 
             :
             (`/login#top?nav=/jobs/${item._id}`)} 
             style={{ textDecoration: 'none' }}>
                <div className='job_item_box shadow rounded-3 h-100' style={{ backgroundColor: '#5C2018', color: 'white' }}>
                    <div className='job_img' style={{ minHeight: "140px", backgroundImage: `url(${item.img_url})`, backgroundSize: 'cover', position: 'relative' }}>
                        <div className='job-box' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                            <h4 className='display-6 p-2 text-center' style={{ fontSize: '2em', color: '#fff' }}>
                                {item.category}
                            </h4>
                            <h3 className='display-6 p-2 text-center' style={{ fontSize: '1.5em', color: '#fff' }}>
                                {item.job_title}
                            </h3>
                            <h2 className='display-6 mb-3 text-center' style={{ fontSize: '1em', color: '#fff' }}>
                                Salary: {item.salary.toLocaleString()}$
                            </h2>
                        </div>
                    </div>
                    <h4 className='display-6 p-1 text-center' style={{ fontSize: '1em', color: '#fff' }}>
                        {item.location}</h4>
                </div>
            </Link>
        </div>
    )
}

export default JobItem