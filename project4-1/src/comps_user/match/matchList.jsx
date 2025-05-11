import React, { useEffect, useState } from 'react'
import { useUserData } from '../../hooks/useUserData';
import JobItem from '../jobs/jobItem';
import Loading from '../../comp_general/loading';
import { doApiGet } from '../../services/apiService';

const MatchList = () => {

    const data = JSON.parse(localStorage.getItem('match_data') || '{}')
    console.log("this is the lists:", data);
    const [loading, setLoading] = useState(false);
    // const [data,setData]= useState({})
    const fullMatchAr = data.jobsFive || [];
    const fourMatchAr = data.jobsFour || [];
    const threeMatchAr = data.jobsThree || [];


    // useEffect(() => {
    //     doApiPost();
    // }, [])


    return (
        <>
            <div className='container-fluid py-3'>
                <div className='container text-center justify-content-center'>
                    {fullMatchAr.length > 0 &&
                        <div className="container">
                            <h1>100% Match</h1>
                            <div className="row justify-content-center align-item-center mt-3">
                                {fullMatchAr.map(item => {
                                    return (
                                        <JobItem key={item._id} item={item} />

                                    )
                                })}
                            </div>
                        </div>
                    }
                    {fourMatchAr.length > 0 &&
                        <div className="container">
                            <h1>80% Match</h1>
                            <div className="row justify-content-center align-item-center mt-3">
                                {fourMatchAr.map(item => {
                                    return (
                                        <JobItem key={item._id} item={item} />

                                    )
                                })}
                            </div>
                        </div>
                    }
                    {threeMatchAr.length > 0 &&
                        <div className="container">
                            <h1>60% Match</h1>
                            <div className="row justify-content-center align-item-center mt-3">
                                {threeMatchAr.map(item => {
                                    return (
                                        <JobItem key={item._id} item={item} />

                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
                {loading && <Loading />}
            </div>
        </>
    )
}

export default MatchList