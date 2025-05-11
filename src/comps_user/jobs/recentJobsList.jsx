import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import JobItem from './jobItem';
import JobItemLod from '../loading/jobItemLod';

const RecentJobsList = () => {
  const [ar, setAr] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    try {
      setLoading(true)
      const url = API_URL + "/jobs?perPage=4&approved=true";
      const data = await doApiGet(url);
      console.log(data);
      setAr(data);
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
        <div className='container-fluid my-3'>
          <div className="row">
            <JobItemLod/>
            <JobItemLod/>
            <JobItemLod/>
            <JobItemLod/>
          </div>
        </div>
        :
        <div className='container-fluid my-3'>
          <div className="row">
            {ar.map(item => {
              return (
                <JobItem key={item._id} item={item} />
              )
            })}
          </div>
        </div>
      }
    </>
  )
}

export default RecentJobsList