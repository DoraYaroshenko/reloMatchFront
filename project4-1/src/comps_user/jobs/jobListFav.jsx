import React, { useEffect, useState } from 'react';
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from '../../services/apiService';
import JobItem from './jobItem';
import Loading from '../../comp_general/loading';
import { useUserData } from '../../hooks/useUserData';
import JobItemLod from '../loading/jobItemLod';

const JobListFav = () => {
    const [ar, setAr] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUserData();
    const [length, setLength] = useState(0);
    const favs_ar = JSON.parse(localStorage.getItem('favs_ar'));

    useEffect(() => {
        doApi();
    }, [user]);

    const doApi = async () => {
        try {
            setLoading(true);
            

            if (favs_ar) {
                const url = API_URL + "/jobs/group_in"
                const data = await doApiMethod(url, "POST", { favs_ar:favs_ar })
                console.log(favs_ar)
                setAr(data);
                setLength(favs_ar.length);
                console.log("fav exist");
            }
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
            {loading ?
                <div className='container-fluid'>

                    <div className="row justify-content-center align-item-center mt-3">
                        <JobItemLod />
                        <JobItemLod />
                        <JobItemLod />
                        <JobItemLod />
                    </div>
                </div>
                :
                <>
                    {favs_ar !== null ? (
                        <div className='container-fluid'>
                            {length > 0 &&
                                <div className='container d-flex justify-content-center align-item-center'>
                                    <h2 className='display-5 m-1'>Favorite Jobs</h2>
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
            }
        </>
    )
}

export default JobListFav;




