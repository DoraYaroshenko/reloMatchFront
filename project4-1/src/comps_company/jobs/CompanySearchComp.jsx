import React, { useEffect, useRef, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService';

const CompanySearchComp = ({ setUrl, setPagesUrl }) => {
    const idRef = useRef();
    const titleRef = useRef();
    const categoryRef = useRef();
    const maxRef = useRef();
    const minRef = useRef();
    const locationRef = useRef();
    const visaRef = useRef();
    const approvedRef = useRef();
    const continentRef = useRef();
    const [categoriesAr, setCategoriesAr] = useState([]);

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        const url = API_URL + "/categories?perPage=Infinity";
        try {
            const data = await doApiGet(url);
            setCategoriesAr(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const resetFilter = () => {
        titleRef.current.value = "";
        categoryRef.current.value = "";
        maxRef.current.value = "";
        minRef.current.value = "";
        locationRef.current.value = "";
        continentRef.current.value = "";
        visaRef.current.value = "";
        idRef.current.value = "";
        approvedRef.current.value = "";
        onSub();
    }

    const onSub = (e) => {
        e && e.preventDefault();
        console.log(approvedRef.current.value)
        const address = API_URL + "/jobs/myJobs?" + (titleRef.current.value && "s=" + titleRef.current.value) + (idRef.current.value && "&id=" + idRef.current.value) + (categoryRef.current.value && "&category=" + categoryRef.current.value) + (minRef.current.value && "&minSalary=" + minRef.current.value) + (maxRef.current.value && "&maxSalary=" + maxRef.current.value) + (locationRef.current.value && "&location=" + locationRef.current.value) + (visaRef.current.value && "&visa=" + visaRef.current.value) + (approvedRef.current.value && "&approved=" + approvedRef.current.value) + (continentRef.current.value && "&continent=" + continentRef.current.value);
        console.log(address);
        setUrl(address);
        setPagesUrl(API_URL + "/jobs/count?" + (titleRef.current.value && "s=" + titleRef.current.value) + (idRef.current.value && "&id=" + idRef.current.value) + (categoryRef.current.value && "&category=" + categoryRef.current.value) + (minRef.current.value && "&minSalary=" + minRef.current.value) + (maxRef.current.value && "&maxSalary=" + maxRef.current.value) + (locationRef.current.value && "&location=" + locationRef.current.value) + (visaRef.current.value && "&visa=" + visaRef.current.value) + (approvedRef.current.value && "&approved=" + approvedRef.current.value) + (continentRef.current.value && "&continent=" + continentRef.current.value));
    }
    return (
        <div>
            <form onSubmit={onSub} className='my-4 p-2 d-flex flex-wrap gap-3 text-center justify-content-center align-items-center text-white rounded-4 col-12 mx-auto' style={{ backgroundColor: '#5C2018' }}>
                <div>
                    <label>ID</label>
                    <br />
                    <input type='text' className='form-control' ref={idRef}></input>
                </div>
                <div>
                    <label>Job title/info</label>
                    <br />
                    <input type='text' className='form-control' ref={titleRef}></input>
                </div>
                <div>
                    <label>Category</label>
                    <br />
                    <select className='form-select' ref={categoryRef}>
                        <option value={""}>All</option>
                        {categoriesAr.map((item, i) => {
                            return (
                                <option key={i} value={item.category_name}>{item.category_name}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label>Min salary</label>
                    <br />
                    <input type='number' className='form-control' ref={minRef} defaultValue={0}></input>
                </div>
                <div>
                    <label>Max salary</label>
                    <br />
                    <input defaultValue={100000000} type='number' className='form-control' ref={maxRef}></input>
                </div>
                <div>
                    <label>Location</label>
                    <br />
                    <input type='text' className='form-control' ref={locationRef}></input>
                </div>
                <div>
                    <label>Continent</label>
                    <br />
                    <select ref={continentRef} className='form-select'>
                        <option value={""}>All</option>
                        <option>Europe</option>
                        <option>Asia</option>
                        <option>North-America</option>
                        <option>South-America</option>
                        <option>Australia</option>
                    </select>
                </div>
                <div>
                    <label>Visa</label>
                    <br />
                    <input type='text' className='form-control' ref={visaRef}></input>
                </div>
                <div>
                    <label>Approved</label>
                    <br />
                    <select className='form-select' ref={approvedRef}>
                        <option value={""}>All</option>
                        <option value={"true"}>Approved</option>
                        <option value={"false"}>Not approved</option>
                    </select>
                </div>
                <div className='col-12'>
                    <button type="submit" className='btn btn-light my-3'><h5 className='m-0' style={{ color: '#5C2018' }} >Find!</h5></button>
                </div>
            </form>
            <div className='col-12 my-3 d-flex justify-content-end'>
                <button className='btn btn-light text-info' onClick={resetFilter}>Reset filter</button>
            </div>
        </div>
    )
}


export default CompanySearchComp