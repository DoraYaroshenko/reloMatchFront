import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TOKEN_KEY, apiCheckToken } from '../services/apiService';
import { useUserData } from '../hooks/useUserData';
import { FaUser } from "react-icons/fa";
import { slide as Menu } from 'react-burger-menu';

const HeaderCompany = () => {
    const { userSignOut } = useUserData();
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
    }, [])

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
            <div className='col-2 h-100 logo' style={{ zIndex: '99999999' }}>
                <Link to="/company">
                    <img className='logo-r' src="./design/logo1.png" alt="icon" width="70" />
                </Link>
            </div>
            {localStorage[TOKEN_KEY] &&
                <li className="log_out col-auto d-flex align-items-center ">
                    <button onClick={onLogOut} className="btn btn-danger">Log out</button>
                </li>
            }
            <Menu right className="burger-menu">
                <ul className='list-unstyled d-flex flex-column align-items-center gap-3'>
                    <li><Link to="/company/myJobs">My jobs</Link></li>
                    <li><Link to="/company/myContenders">My contenders</Link></li>
                    {localStorage[TOKEN_KEY] ?
                        <>


                            <li><Link to="/company"><FaUser style={{ border: '1px black solid', borderRadius: '25px', fontSize: '32px' }} /></Link></li>
                        </>
                        :
                        <li className="log_in col-auto">
                            <Link to="/login">
                                Log in </Link>|
                            <Link to="/signup"> Sign up</Link>
                        </li>
                    }
                </ul>
            </Menu>
        </header>
    );

    const RegularHeader = () => (
        <header className='py-1 px-5 d-flex justify-content-between' style={{ height: "70px" }}>
            <div className='col-2 h-100 logo' style={{ zIndex: '99999999' }}>
                <Link to="/company">
                    <img className='logo-r' src="./design/logo1.png" alt="icon" width="70" />
                </Link>
            </div>
            <nav className='d-flex justify-content-between align-items-center'>
                <ul className='list-unstyled d-flex justify-content-between align-items-center gap-5'>
                    <li><Link to="/company/myJobs">My jobs</Link></li>
                    <li><Link to="/company/myContenders">My contenders</Link></li>
                    {localStorage[TOKEN_KEY] ?
                        <>

                            <li className="log_out col-auto d-flex align-items-center ">
                                <button onClick={onLogOut} className="btn btn-danger">Log out</button>
                            </li>
                            <li><Link to="/company"><FaUser style={{ border: '1px black solid', borderRadius: '25px', fontSize: '32px' }} /></Link></li>
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

export default HeaderCompany
