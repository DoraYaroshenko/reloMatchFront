import React, { useEffect } from 'react'
import { useUserData } from '../hooks/useUserData';
import { apiCheckToken } from '../services/apiService';

const AuthUser = () => {
    const { userSignOut } = useUserData();

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {
        try {
            const data = await apiCheckToken();
            console.log(data);
        }
        catch (err) {
            if(err){
                userSignOut();
            }
        }

    }

    return (
        <>

        </>
    )
}

export default AuthUser