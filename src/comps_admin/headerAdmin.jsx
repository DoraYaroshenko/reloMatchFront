import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserData } from '../hooks/useUserData';
import { apiCheckToken } from '../services/apiService';
import { JobContext } from '../context/jobContext';
import { slide as Menu } from 'react-burger-menu';

const HeaderAdmin = () => {
    const nav = useNavigate();
    const { userSignOut } = useUserData();
    const { authorized, setAuthorized } = useContext(JobContext);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);


    useEffect(() => {
        checkToken();
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const checkToken = async () => {
        try {
            const data = await apiCheckToken();
            console.log(data);
            if (data.role == "admin") {
                nav("/admin/users");
                setAuthorized(true);
            }
        }
        catch (err) {
            console.log(err);
        }
    }


    const onLogOut = () => {
        userSignOut();
    }

    const BurgerMenu = () => (

        <header className='admin py-1 px-4 d-flex justify-content-between' style={{ height: "70px" }}>
            <div className='h-100 logo col-auto' style={{ zIndex: '9999999999999' }}>
                <Link to="/admin/users">
                    <img className='logo-r' src="./design/logo1.png" alt="icon" width="70" />
                </Link>
            </div>

            <>

                <li className="log_out col-auto d-flex align-items-center ">
                    <button onClick={onLogOut} className="btn btn-danger">Log out</button>
                </li>
            </>

            {authorized &&
                <Menu right className="burger-menu">
                    <ul className='list-unstyled d-flex flex-column align-items-center gap-3'>
                        <li><Link to="/admin/users">Users</Link></li>
                        <li><Link to="/admin/jobs">Jobs</Link></li>
                        <li><Link to="/admin/companies">Companies</Link></li>
                        <li><Link to="/admin/categories">Categories</Link></li>


                    </ul>
                </Menu>
            }
        </header>
    );

    const RegularHeader = () => (
        <header className='admin py-1 px-4 d-flex justify-content-between' style={{ height: "70px" }}>
            <div className='h-100 logo col-md-4 col-8 col-sm-6 col-lg-2' style={{ zIndex: '99999999' }}>
                <Link to="/admin/users">
                    <div className='h-100 col-3' style={{ backgroundImage: `url("./design/logo1.png")`, backgroundPosition: "center", backgroundSize: "cover" }}></div>
                </Link>
            </div>
            {authorized &&
                <nav className='d-flex justify-content-between align-items-center'>
                    <ul className='list-unstyled d-flex justify-content-between align-items-center gap-5'>
                        <li><Link to="/admin/users">Users</Link></li>
                        <li><Link to="/admin/jobs">Jobs</Link></li>
                        <li><Link to="/admin/companies">Companies</Link></li>
                        <li><Link to="/admin/categories">Categories</Link></li>
                        <>

                            <li className="log_out col-auto d-flex align-items-center ">
                                <button onClick={onLogOut} className="btn btn-danger">Log out</button>
                            </li>
                        </>

                    </ul>
                </nav>
            }
        </header>
    );



    return (
        <div>
            {screenWidth <= 991 ? <BurgerMenu /> : <RegularHeader />}
        </div>
    )
}

export default HeaderAdmin