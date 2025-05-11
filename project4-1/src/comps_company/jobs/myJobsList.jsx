import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import PagesBtns from '../../comp_general/PagesBtns';
import CompanySearchComp from './CompanySearchComp';
import SearchComp from '../../comp_general/SearchComp';

const MyJobsList = () => {
    const nav = useNavigate();
    const [query] = useSearchParams();
    const [ar, setAr] = useState([]);
    const page = query.get("page") || 1;
    const [url, setUrl] = useState(API_URL + "/jobs/myJobs");
    const [pagesUrl, setPagesUrl] = useState(API_URL + "/jobs/count?company_id=" + (localStorage["company"] && JSON.parse(localStorage["company"])._id));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        doApi();
    }, [page, url])

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
                const url = API_URL + "/jobs/" + id;
                const data = await doApiMethod(url, "DELETE");
                console.log(data)
                if (data.deletedCount) {
                    doApi();
                }
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert("there problem");
        }
    }

    return (
        <div className='container mt-5' style={{ minHeight: '100vh' }}>
            <h1 className='display-4 text-center pt-5'>My jobs</h1>
            <div className='text-center'>
                <Link to="/company/addJob" className='btn text-white my-2' style={{ background: '#5C2018' }}>Add job</Link>
            </div>
            <CompanySearchComp setUrl={setUrl} setPagesUrl={setPagesUrl} />
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
                <PagesBtns apiUrl={pagesUrl} linkTo={"/company/myJobs?page="} cssClass="btn btn-primary ms-2" />
                <div className='scroll-container'>
                    <table className='table table-striped table-hover table-info'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Job title</th>
                                <th>Category</th>
                                <th>Info</th>
                                <th>Salary</th>
                                <th>Location</th>
                                <th>Continent</th>
                                <th>Visa</th>
                                <th>Approved</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ar.map((item, i) => {
                                const page = query.get("page") || 1;
                                return (
                                    <tr key={item._id}>
                                        <td>{(page - 1) * 5 + i + 1}</td>
                                        <td>{item._id}</td>
                                        <td>{item.job_title}</td>
                                        <td>{item.category}</td>
                                        <td title={item.info}>{item.info && item.info.substring(0, 15)}</td>
                                        <td>{item.salary}</td>
                                        <td>{item.location}</td>
                                        <td>{item.continent}</td>
                                        <td>{item.visa == "true" ? "required" : "not required"}</td>
                                        <td><div className="text-center" style={{ background: item.approved ? "green" : "red" }}>{item.approved ? "approved" : "not approved"}</div></td>
                                        <td><button className='bg-info' onClick={() => nav("/company/editJob/" + item._id)}>Edit</button></td>
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

export default MyJobsList