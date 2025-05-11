import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import PagesBtns from '../../comp_general/PagesBtns';
import ContendersSearch from './ContendersSearch';
import { GoDownload } from 'react-icons/go';

const ContendersList = () => {
    const [query] = useSearchParams();
    const [ar, setAr] = useState([]);
    const page = query.get("page") || 1;
    const [url, setUrl] = useState(API_URL + "/contenders/myContenders?");
    const [pagesUrl, setPagesUrl] = useState(API_URL + "/contenders/count?");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        doApi();
    }, [page, url]);

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

    const doApi = async () => {
        try {
            setLoading(true);
            console.log(url)
            const data = await doApiGet(url + (page == 1 ? "" : "&page=" + page));
            console.log(data);
            setAr(data);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    const deleteItem = async (id) => {
        try {
            setLoading(true);
            if (window.confirm("Delete item?")) {
                const url = API_URL + "/contenders?id=" + id;
                const data = await doApiMethod(url, "DELETE");
                console.log(data);
                if (data.deletedCount) {
                    doApi();
                }
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert("There is problem");
        }
    }

    return (
        <div className='container mt-5' style={{ minHeight: '100vh' }}>
            <h1 className='display-4 text-center pt-5'>My contenders</h1>
            <ContendersSearch setUrl={setUrl} setPagesUrl={setPagesUrl} />
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
            </div> : <>
                <PagesBtns apiUrl={pagesUrl} linkTo={"/company/myContenders?page="} cssClass="btn btn-primary ms-2" />
                <div className='scroll-container'>
                    <table className='table table-striped table-hover table-info'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Job ID</th>
                                <th>Job title</th>
                                <th>Notes</th>
                                <th>Starting</th>
                                <th>CV link</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ar.map((item, i) => {
                                const page = query.get("page") || 1;
                                return (
                                    <tr key={item._id}>
                                        <td>{(page - 1) * 5 + i + 1}</td>
                                        <td><Link to={"/company/contenderInfo/" + item.user_id._id}>{item.user_id.full_name}</Link></td>
                                        <td>{item.job_id._id}</td>
                                        <td>{item.job_id.job_title}</td>
                                        <td title={item.notes}>{item.notes && item.notes.substring(0, 100)}</td>
                                        <td>{item.starting.substring(0, 10)}</td>
                                        {item.user_id.CV_link && item.user_id.CV_link.includes('http') ?
                                            <td><button onClick={() => downloadFile(item.user_id.CV_link)} className='btn btn-dark'><GoDownload /> Download</button></td>
                                            : <td>No CV</td>}

                                        <td><button className='bg-danger' onClick={() => deleteItem(item._id)}>X</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
            }
        </div>
    )
}

export default ContendersList