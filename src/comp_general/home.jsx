import React, { useEffect } from 'react';
import RecentJobsList from '../comps_user/jobs/recentJobsList';
import JobListFav from '../comps_user/jobs/jobListFav';
import { useUserData } from '../hooks/useUserData';
import CommentsComp from './CommentsComp';
import { TOKEN_KEY } from '../services/apiService';
import { Link } from 'react-router-dom';
// import '../App.css';

const Home = () => {
    const { user } = useUserData();
    // useEffect(() => {
    //     // doApiUser();

    // }, [user])

    return (
        // <main className='container-fluid'>
        <div style={{ minHeight: '100vh' }}>
            <main className="container-fluid background-video">
                <video autoPlay muted loop className="video-element">
                    <source src="/design/homeMainB.mp4" type="video/mp4" />
                </video>
                <div className='content'>
                    <h1 className='display-2 ' style={{ color: '#5C2018', fontWeight: 'bolder' }}>ReloMatch</h1>
                </div>
            </main>
            <div className='container d-flex justify-content-center align-item-center'>
                <h2 className='display-5 m-2'>Recent Jobs</h2>
            </div>

            <div className='container-fluid '>
                <div className='container my-4'>
                    <RecentJobsList />
                </div>
                {localStorage[TOKEN_KEY] ?
                    <div className='container my-4'>
                        <JobListFav />
                    </div>
                    :
                    <Link to='/login#top?nav=/match'>
                        <div className='container match-add rounded-3 mb-3 col-11 '>
                            <div className='ad-box rounded'>
                                <div className='container center-box'>
                                    <h1 className='title-F '>Find Your Match</h1>
                                    <p className='text-center'>
                                        Discover your ideal job effortlessly with our Match option.
                                        <br/>
                                        Simplify your job search.
                                        <br/>
                                        Transition smoothly to your new life.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                }
            </div>
            <CommentsComp />
        </div>

    )
}

export default Home