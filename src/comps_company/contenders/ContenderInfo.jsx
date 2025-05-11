import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import Loading from '../../comp_general/loading';
import { useParams } from 'react-router-dom';
import { GoDownload } from 'react-icons/go';
import LinkedInContender from '../linkedIn/LinkedInContender';

const ContenderInfo = () => {
    const [contenderInfo, setContenderInfo] = useState([]);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        doApi();
    }, [])

    const doApi = async () => {
        try {
            setLoading(true);
            const url = API_URL + "/users/single/" + params["id"];
            const data = await doApiGet(url);
            console.log(data);
            setContenderInfo(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert("There is a problem, come back later")
        }
    }

    const downloadFile = (
        filePath
    ) => {
        fetch(filePath, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            },
        })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]));

                const link = document.createElement('a');
                link.href = url;
                link.download = "my_CV.pdf";

                document.body.appendChild(link);

                link.click();

                link.parentNode.removeChild(link);
            });
    }


    return (
        <div style={{ marginTop: '70px', minHeight: '100vh' }}>
            <div className='container d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
                <h1 className='display-6 text-white m-0'>CONTENDER INFO</h1>
            </div>
            {loading ? <div className='container text-center'>
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
            </div> :
                <div className='container d-flex justify-content-center '>

                    <div className='container-fluid col-md-8'>
                        <div className="container col-md-6 mx-auto py-4">
                            {contenderInfo.full_name ?
                                <>
                                    <h4 className='h3'><strong>Account name:</strong> {contenderInfo.full_name}</h4>
                                    <h4 className='h3'><strong>Email:</strong> {contenderInfo.email}</h4>
                                    {contenderInfo.CV_link&&contenderInfo.CV_link.includes('http') &&
                                        <h4 className='h3'>
                                            <strong>Resume: </strong>
                                            <button onClick={() => downloadFile(contenderInfo.CV_link)} className='rounded-3 btn-download'><GoDownload /> Download</button>
                                        </h4>
                                    }
                                    {contenderInfo.linkedIn_url !== "" &&
                                        <div className='container'>
                                            <LinkedInContender contenderInfo={contenderInfo} />
                                        </div>
                                    }
                                </> : <Loading />}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


export default ContenderInfo