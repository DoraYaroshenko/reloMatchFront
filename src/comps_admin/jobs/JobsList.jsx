import React from 'react'
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import PagesBtns from '../../comp_general/PagesBtns';
import { useEffect } from 'react';
import SearchComp from '../../comp_general/SearchComp';

const JobsList = () => {
    const [query] = useSearchParams();
    const [ar, setAr] = useState([]);
    const page = query.get("page") || 1;
    const [url, setUrl] = useState(API_URL + "/jobs?");
    const [pagesUrl, setPagesUrl] = useState(API_URL + "/jobs/count?");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        doApi();
    }, [page, url])

    const doApi = async () => {
        try {
            setLoading(true);
            console.log(url)
            const data = await doApiGet(url + (page == 1 ? "" : "&page=" + page));
            const dataWithCompanies = await Promise.all(
                data.map(async (item) => {
                    try {
                        const company = await doApiGet(API_URL + "/companies/companiesList?id=" + item.company_id);
                        console.log(company)
                        return { ...item, company: company[0].company_name }
                    } catch (error) {
                        console.log(error)
                    }
                })
            )
            console.log(dataWithCompanies);
            setAr(dataWithCompanies);
            setLoading(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    const changeApproval = async (job) => {
        const approved = job.approved == true ? false : true;
        try {
            const url = `${API_URL}/jobs/changeApproval/${job._id}/${approved}`;
            const data = await doApiMethod(url, "PATCH");
            if (data.modifiedCount) {
                console.log(approved)
                doApi();
            }
        } catch (error) {

        }
    }

    const deleteItem = async (id) => {
        try {
            if (window.confirm("Delete item?")) {
                const url = API_URL + "/jobs/" + id;
                const data = await doApiMethod(url, "DELETE");
                if (data.deletedCount) {
                    doApi();
                }
            }
        } catch (error) {
            console.log(error);
            alert("there problem");
        }
    }

    return (
        <>
            {loading ? <div className='container mt-5' style={{ minHeight: '100vh' }}>
                <h1 className='display-4 mx-auto text-center'>List of jobs in system</h1>
                <SearchComp setUrl={setUrl} setPagesUrl={setPagesUrl} />
                <div className='container text-center'>
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
                </div>
            </div>
                :
                <div className='container mt-5' style={{ minHeight: '100vh' }}>
                    <h1 className='display-4 mx-auto text-center'>List of jobs in system</h1>
                    <SearchComp setUrl={setUrl} setPagesUrl={setPagesUrl} />
                    <PagesBtns apiUrl={pagesUrl} linkTo={"/admin/jobs?page="} cssClass="btn btn-primary ms-2" />
                    <div className='scroll-container'>
                        <table className='table table-striped table-hover table-info'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Job title</th>
                                    <th>Category</th>
                                    <th>Company</th>
                                    <th>Info</th>
                                    <th>Salary</th>
                                    <th>Location</th>
                                    <th>Continent</th>
                                    <th>Visa</th>
                                    <th>Approved</th>
                                    <th>Del</th>
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
                                            <td>{item.company}</td>
                                            <td title={item.info}>{item.info && item.info.substring(0, 15)}</td>
                                            <td>{item.salary}</td>
                                            <td>{item.location}</td>
                                            <td>{item.continent}</td>
                                            <td>{item.visa == "true" ? "required" : "not required"}</td>
                                            <td><button onClick={() => changeApproval(item)} style={{ background: item.approved ? "green" : "red" }}>{item.approved ? "approved" : "approve"}</button></td>
                                            <td><button className='bg-danger' onClick={() => deleteItem(item._id)}>X</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </>
    )
}

export default JobsList