import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import PagesBtns from '../../comp_general/PagesBtns';

export default function CategoriesList() {
    const nav = useNavigate();
    const [query] = useSearchParams();
    const [ar, setAr] = useState([]);
    const page = query.get("page") || 1;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        doApi();
    }, [query])

    const doApi = async () => {
        setLoading(true);
        const url = API_URL + "/categories?page=" + page;
        try {
            const data = await doApiGet(url);
            // console.log(data);
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
                const url = API_URL + "/categories/" + id;
                const data = await doApiMethod(url, "DELETE");
                if (data.deletedCount) {
                    doApi();
                }
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            alert("there problem");
        }
    }

    return (
        <div className='container mt-5' style={{ minHeight: '100vh' }}>
            <h1 className='display-4 text-center'>List of categories in system</h1>
            <div className='text-center'>
                <Link to="/admin/categories/add" className='btn text-white my-3' style={{ backgroundColor: '#5C2018' }}>Add category</Link>
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
            </div> : <>
                <PagesBtns apiUrl={API_URL + "/categories/count"} linkTo={"/admin/categories?page="} cssClass="btn btn-primary ms-2" />
                <div className='scroll-container'>
                    <table className='table table-striped table-hover table-info'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>info</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ar.map((item, i) => {
                                return (
                                    <tr key={item._id}>
                                        <td>{(page - 1) * 5 + i + 1}</td>
                                        <td>{item.category_name}</td>
                                        <td title={item.info}>{item.info && item.info.substring(0, 15)}</td>
                                        <td><button onClick={() => {
                                            deleteItem(item._id)
                                        }} className='bg-danger'>X</button></td>
                                        <td><button onClick={() => {
                                            nav(`/admin/categories/edit/` + item._id)
                                        }} className='bg-info' >Edit</button></td>
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