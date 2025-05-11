import React, { useState } from 'react';
import AuthUser from '../comps_user/authUser';
import { useUserData } from '../hooks/useUserData';
import Loading from '../comp_general/loading';
import { Link } from 'react-router-dom';
import { BsPencil } from "react-icons/bs";

const CompanyInfo = () => {
    const { user, company } = useUserData();

    return (
        <div style={{ marginTop: '70px', minHeight: '100vh' }}>
            <AuthUser />
            <div className='container d-flex justify-content-center col-8 mb-4 py-1' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
                <h1 className='display-6 text-white text-center m-0'>COMPANY INFO</h1>
            </div>
            <div className='container-fluid'>
                <div className='container d-flex justify-content-between rounded-3 user-profile company-info p-2'>
                    <div className="container user-profile-in row">
                        <div className="container col-auto ">
                            {user.full_name ?
                                <div className='mt-4'>
                                    <h4 className='h3'><strong>Email:</strong> {user.email}</h4>
                                    <h4 className='h3'><strong>Signup date:</strong> {user.date_created ? user.date_created.substring(0, 10) : user.createdAt.substring(0, 10)}</h4>
                                </div> : <Loading />}
                            {company.company_name ?
                                <>
                                    <h4 className='h3'><strong>Company name:</strong> {company.company_name}</h4>
                                    <h4 className='h3'><strong>Contact phone:</strong> {company.contactPhone} </h4>
                                    <h4 className='h3'><strong>State:</strong> {company.state}</h4>
                                    <h4 className='h3'><strong>Logo:</strong> <div style={{ backgroundImage: "url(" + company.logo_url + ")", height: "200px", width: "200px", backgroundPosition: "center", backgroundSize: "cover" }} /></h4>
                                </> : <Loading />
                            }
                        </div>

                        <div className='container col-auto ' style={{ maxHeight: '50px' }}>
                            {localStorage["company"] &&
                                <button className='btn text-center' style={{ backgroundColor: '#d1cf60' }}><Link className='text-black text-decoration-none' to={"/company/editInfo/" + JSON.parse(localStorage["company"])._id}> <BsPencil /> </Link></button>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyInfo

