import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import JobItem from './jobItem';
import { useUserData } from '../../hooks/useUserData';
import SearchCompJobs from '../SearchCompJobs';
import JobItemLod from '../loading/jobItemLod';

const JobPage = () => {
  const [ar, setAr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(API_URL + "/jobs?perPage=Infinity&approved=true");
  const [pagesUrl, setPagesUrl] = useState(API_URL + "/jobs/count?");



  const { user } = useUserData();

  useEffect(() => {
    doApi();
    console.log(user);
  }, [url]);

  const doApi = async () => {
    try {
      setLoading(true)
      console.log(url)
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
      {loading ? <div style={{ marginTop: '70px', minHeight: '100vh' }}>
        <div className='container ' >
          <h1 className='display-4 mx-auto text-center'>JOB OPTIONS</h1>
        </div>
        <div className='container' >
          <SearchCompJobs setUrl={setUrl} setPagesUrl={setPagesUrl} />
        </div>

        <div className='container-fluid py-3'>
          <div className="container">
            <div className="row g-4">
            <JobItemLod/>
            <JobItemLod/>
            <JobItemLod/>
            <JobItemLod/>
            </div>
          </div>
        </div>
      </div>
        :

        <div style={{ marginTop: '70px', minHeight: '100vh' }}>
          <div className='container ' >
            <h1 className='display-4 mx-auto text-center'>JOB OPTIONS</h1>
          </div>
          <div className='container' >
            <SearchCompJobs setUrl={setUrl} setPagesUrl={setPagesUrl} />
          </div>

          <div className='container-fluid py-3'>
            <div className="container">
              <div className="row g-4">
                {ar.map(item => {
                  return (
                    <JobItem key={item._id} item={item} />

                  )
                })}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default JobPage