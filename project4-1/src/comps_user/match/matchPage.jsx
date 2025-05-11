import React, { useState } from 'react'
import { useUserData } from '../../hooks/useUserData';
import MatchForm from './matchForm';
import { Link } from 'react-router-dom';
import MatchList from './matchList';

const MatchPage = () => {

  const { user } = useUserData();
  
  // const nav = 



  return (
    <>


      {user.match_url !== "" ?

        <div style={{ marginTop: '70px', minHeight: '100vh' }}>
          <div className='container d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
            <h1 className='display-6 text-white m-0'>Match</h1>
          </div>
          <div className='container text-center'>
            <button className='btn btn-dark text-center'><Link className='text-white text-decoration-none' to={"/match/matchform"}>Make A New Match</Link></button>
          </div>
          <div>
            <MatchList />
          </div>
        </div>
        :

        <MatchForm />
      }

    </>
  )
}

export default MatchPage