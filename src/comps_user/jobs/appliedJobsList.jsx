import React, { useEffect, useState } from 'react'
import JobItem from './jobItem'
import { useUserData } from '../../hooks/useUserData';
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from '../../services/apiService';

const AppliedJobsList = () => {
    const [ar, setAr] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUserData();
    const [length, setLength] = useState(0);

    useEffect(() => {
        doApi();
    }, []);

    const doApi = async () => {
        try {

            setLoading(true);
            const url = API_URL + "/contenders/jobslist?user_id=" + (user._id);
            const data = await doApiGet(url)
            setAr(data);
            setLength(data.length);
            console.log("jobs ids", data);

            setLoading(false)
        }
        catch (err) {
            setLoading(false)
            console.log(err);
        }
        setLoading(false)
    }

    return (
        <>
            {localStorage.getItem(TOKEN_KEY) !== null ? (
                <div className='container-fluid py-3'>
                    {length > 0 &&
                        <div className='container d-flex justify-content-center align-item-center'>
                            <h2 className='display-5 m-2'>Applied Jobs</h2>
                        </div>
                    }
                    <div className="row justify-content-center align-item-center mt-3">
                        {ar.map(item => (
                            <JobItem key={item._id} item={item} />
                        ))}
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default AppliedJobsList