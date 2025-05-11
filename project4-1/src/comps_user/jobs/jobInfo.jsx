import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
// import RecommendVideosList from '../comps_client/videoInfo/recommendVideosList';
import { toast } from 'react-toastify';
import { JobContext } from '../../context/jobContext';
import JobItem from './jobItem';
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from '../../services/apiService';
import { useUserData } from '../../hooks/useUserData';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import JobsListByCategory from './jobsListByCategory';

const JobInfo = () => {
  // const { favs_ar, updateFav } = useContext(JobContext)
  const [itemJob, setItemJob] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [countApplied, setCountApplied] = useState(0);
  const [applied, setApplied] = useState(false);
  const [companyInfo, setCompanyInfo] = useState(false);

  const { favs_ar, updateFav, user, unApplay } = useUserData();

  // let category = itemJob.category;

  useEffect(() => {
    doApi();
  }, [params]);

  useEffect(() => {
    if (itemJob && itemJob.company_id) {
      getCompany();
    }
  }, [itemJob]);

  const doApi = async () => {
    try {
      setLoading(true)
      if (!loading) {
        setLoading(true);
        const url = API_URL + "/jobs/single/" + params["id"];
        const data = await doApiGet(url)
        setItemJob(data);
        setLoading(false);
        getAppliedCount();
        // getCompany();


        const urlApp = API_URL + "/contenders/exists?job_id=" + params["id"];
        const dataApp = await doApiGet(urlApp)
        if (dataApp) {
          setApplied(true);

        }
        else {
          setApplied(false);
        }
        setLoading(false)
      }


    }
    catch (err) {
      setLoading(false)
      console.log(err);
    }
    setLoading(false)

  }

  const getCompany = async () => {
    try {
      console.log(itemJob.company_id)
      const companyUrl = API_URL + "/companies/companiesList?id=" + itemJob.company_id;
      const companyData = await doApiGet(companyUrl);
      setCompanyInfo(companyData[0])

      console.log("company data", companyData);

    }
    catch (err) {
      console.log(err);
    }
  }

  const getAppliedCount = async () => {
    try {

      const url = API_URL + "/contenders/countApplied?job_id=" + (params["id"]);
      const data = await doApiGet(url)
      setCountApplied(data);

      // console.log("applied count", data);

    }
    catch (err) {
      console.log(err);
    }
  }

  const handleUnapplay = async () => {
    await unApplay(params["id"]);
    setApplied(false);
    getAppliedCount();
  };

  return (
    <>

      {loading ?
        <div style={{ minHeight: '100vh' }}>
          <div style={{ marginTop: '70px' }}>
            <div className='container d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
              <h1 className='display-6 text-white m-0'>JOB INFO</h1>
            </div>
            <div className='container-fluid py-4'>
              <div className="container text-center">
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
              </div>
            </div>
          </div>
        </div>

        :

        <div style={{ minHeight: '100vh' }}>
          {localStorage.getItem(TOKEN_KEY) !== null ?
            <div style={{ marginTop: '70px' }}>
              <div className='container d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
                <h1 className='display-6 text-white m-0'>JOB INFO</h1>
              </div>

              <div className='container-fluid py-4'>
                <div className="container">
                  {itemJob.img_url &&
                    <div className="row justify-content-center">
                      <div className="col-auto job-info-img mb-2">
                        <img src={itemJob.img_url} alt="img" width={400} />
                      </div>
                      <article className="col-auto">
                        <div>
                          <h2>{itemJob.job_title}</h2>
                          <div>Category:
                            {itemJob.category}
                          </div>
                          <div>Info: {itemJob.info} </div>
                          <div>Location:
                            {itemJob.location}
                          </div>
                          <div>Visa:
                            {itemJob.visa === true ? " Needed" : " Doesn't needed"}
                          </div>
                          <div>Salary:
                            {itemJob.salary.toLocaleString()}$
                          </div>
                          <br />
                          <div><h5>Applicants : {countApplied}</h5>

                          </div>
                          {user &&
                            <div className='row'>
                              <div className='mt-2 col-auto'>

                                {(favs_ar.includes(itemJob._id)) ?
                                  <button className='btn btn-danger' onClick={() => {
                                    localStorage[TOKEN_KEY] ? updateFav(itemJob._id) : toast.info("You need to login to add to favorite ")
                                  }}><AiFillHeart /></button>
                                  :
                                  <button className='btn btn-dark' onClick={() => {
                                    localStorage[TOKEN_KEY] ? updateFav(itemJob._id) : toast.info("You need to login to add to favorite ")
                                  }}><AiOutlineHeart /></button>
                                }

                              </div>
                              <div className='mt-2 col-1'>
                                {applied ?
                                  <button onClick={() => {
                                    handleUnapplay()
                                  }} className='btn btn-info' style={{ textDecoration: 'none' }}>UNAPPLY</button>
                                  :
                                  <Link to={"/jobs/apply/" + itemJob._id + "/" + itemJob.job_title} style={{ textDecoration: 'none' }}>
                                    <button className='btn btn-dark'>APPLY</button>
                                  </Link>
                                }

                              </div>
                            </div>
                          }
                        </div>

                      </article>
                      <div className='text-center d-flex align-items-center justify-content-center m-1'>
                        {companyInfo.img_url &&
                          <div className="me-2">
                            <img className='rounded-3' src={companyInfo.logo_url} alt="img" width={80} />
                          </div>
                        }
                        <h2 >{companyInfo.company_name}</h2>
                      </div>

                      <div className='container text-center m-4'>
                        {/* <div className='container d-flex justify-content-center col-5 mb-4' style={{ borderRadius: '5px' }}>
                      <h2 className='display-6' style={{ fontSize: '35px', color: '#5c2018', fontWeight: 'bold' }}>
                        Other Jobs In The Same Category:
                      </h2>
                    </div> */}
                        <JobsListByCategory currentJobId={itemJob._id} category={itemJob.category} />

                      </div>
                    </div>
                  }
                  {/* {loading && <Loading />} */}
                </div>
              </div>
            </div>
            : null
          }
        </div>
      }
    </>
  )
}

export default JobInfo