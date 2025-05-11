import React, { useEffect, useState } from 'react';
import { useUserData } from '../../hooks/useUserData';

function LinkedInBadge() {
    const { user } = useUserData();
    const userCode = user.linkedIn_url.slice(user.linkedIn_url.lastIndexOf('/in/') + 4);

    const indexOfSlash = userCode.indexOf('/');
    const finalUserCode = indexOfSlash !== -1 ? userCode.slice(0, indexOfSlash) : userCode;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        try {
            setLoading(true)
            const script = document.createElement('script');
            script.src = 'https://platform.linkedin.com/badges/js/profile.js';
            script.async = true;
            script.defer = true;
            script.type = 'text/javascript';
            document.head.appendChild(script);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error('Error loading LinkedIn badge script:', error);
        }
        setLoading(false)
    }, []);

    return (
        <>
        {loading ?<div className="lds-roller ">
                  <div>
                  </div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>:
        <div className="badge-base LI-profile-badge " data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity={finalUserCode} data-version="v1">
            <a className="badge-base__link LI-simple-link" href={`https://il.linkedin.com/in/${finalUserCode}?trk=profile-badge`}></a>
        </div>

        
}
        </>
    );
}

export default LinkedInBadge;
