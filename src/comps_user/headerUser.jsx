import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { JobContext } from '../context/jobContext';
import { toast } from 'react-toastify';
import { TOKEN_KEY, apiCheckToken } from '../services/apiService';
import { useUserData } from '../hooks/useUserData';
import { FaUser } from "react-icons/fa";
import { slide as Menu } from 'react-burger-menu';

const HeaderUser = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const { user, userSignOut } = useUserData();

    useEffect(() => {
        checkToken();
        // Update the screen width state when the window is resized
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
        }
        catch (err) {
            if (err) {
                userSignOut();
            }
        }

    }

    const onLogOut = () => {
        userSignOut();
    }

    const BurgerMenu = () => (

        <header className='py-1 px-5 d-flex justify-content-between' style={{ height: "70px" }}>
            <div className='h-100 logo col-auto' style={{ zIndex: '9999999999999' }}>
                <Link to="/">
                    <img className='logo-r' src="./design/logo1.png" alt="icon" width="70" />
                </Link>
            </div>
            <ul className='list-unstyled d-flex align-items-center gap-3'>
                
                {localStorage[TOKEN_KEY] ? (
                    <>
                        <li>
                            <button onClick={onLogOut} className="btn btn-danger log-out-btn">Log out</button>
                        </li>
                    </>
                ) : (
                    <li className="log_in">
                        <Link to="/login">Log in</Link> | <Link to="/signup">Sign up</Link>
                    </li>
                )}
            </ul>
            <Menu right className="burger-menu">
                <ul className='list-unstyled d-flex flex-column align-items-center gap-3'>
                {localStorage[TOKEN_KEY] && (
                    <li>
                        <button className='btn-publish rounded-3'>
                            <Link to="/signupCompany">Publish A Job</Link>
                        </button>
                    </li>
                )}
                    <li><Link to="/jobs" >Jobs</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/flights">Flights</Link></li>
                    {localStorage[TOKEN_KEY] ? (
                        <>
                            <li><Link to="/match">Match</Link></li>
                            <li><Link to="/userinfo"><FaUser className="user-icon" /></Link></li>
                        </>
                    ) : (
                        <li className="log_in">
                            <Link to="/login">Log in</Link> | <Link to="/signup">Sign up</Link>
                        </li>
                    )}
                </ul>
            </Menu>
        </header>
    );

    const RegularHeader = () => (
        <header className='py-1 px-5 d-flex justify-content-between' style={{ height: "70px" }}>
            <div className='h-100 logo col-auto' style={{ zIndex: '9999999999999' }}>
                <Link to="/">
                    <img src="./design/logo1.png" alt="icon" width="70" />
                </Link>
            </div>
            <nav className='d-flex justify-content-between align-items-center'>
                <ul className='list-unstyled d-flex justify-content-between align-items-center gap-5'>
                    {localStorage[TOKEN_KEY] &&
                        <li><button className='btn-publish rounded-3'><Link to="/signupCompany">Publish A Job</Link></button></li>
                    }

                    <li><Link to="/jobs">Jobs</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/flights">Flights</Link></li>

                    {localStorage[TOKEN_KEY] ?
                        <>
                            <li><Link to="/match">Match</Link></li>
                            <li className="log_out col-auto d-flex align-items-center ">
                                <button onClick={onLogOut} className="btn btn-danger">Log out</button>
                            </li>
                            <li><Link to="/userinfo"><FaUser style={{ border: '1px black solid', borderRadius: '25px', fontSize: '32px' }} /></Link></li>
                        </>
                        :
                        <li className="log_in col-auto">
                            <Link to="/login">
                                Log in </Link>|
                            <Link to="/signup"> Sign up</Link>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    );

    return (
        <div>
            {screenWidth <= 991 ? <BurgerMenu /> : <RegularHeader />}
        </div>

    )
}

export default HeaderUser
