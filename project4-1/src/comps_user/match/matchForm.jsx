import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { doApiMethod, API_URL, doApiGet, TOKEN_KEY } from '../../services/apiService';
import { toast } from 'react-toastify';
import { useUserData } from '../../hooks/useUserData';

const MatchForm = () => {
    const continentRef = useRef();
    const locationRef = useRef();
    const categoryRef = useRef();
    const salaryRef = useRef();
    const visaRef = useRef();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [categoriesAr, setCategoriesAr] = useState([]);
    const [locationsAr, setLocationsAr] = useState([]);

    const { user } = useUserData();
    const nav = useNavigate();

    useEffect(() => {
        getCategories();
        getLocations()
    }, [])

    const onSubForm = (_bodyData) => {
        doApi();
    }


    const doApi = async () => {
        try {
            const url = API_URL + "/jobs/match?continent=" + continentRef.current.value + "&location=" + locationRef.current.value + "&category=" + categoryRef.current.value + "&salary=" + salaryRef.current.value + "&visa=" + visaRef.current.value;
            const data = await doApiGet(url)
            console.log(data);
            if (data.jobsFive) {
                user.match_url = url;
                localStorage.setItem(TOKEN_KEY, JSON.stringify(user));
                localStorage.setItem('match_data', JSON.stringify(data));
                updateMatchUrl(url);
            }
            nav("/match");
        }
        catch (err) {
            console.log(err);
            alert("User or password is wrong!");
        }
    }

    const getCategories = async () => {
        try {
            const url = API_URL + "/categories?perPage=Infinity";
            const data = await doApiGet(url);
            setCategoriesAr(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getLocations = async () => {
        const url = API_URL + "/jobs/locations";
        try {
            const data = await doApiGet(url);
            setLocationsAr(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const updateMatchUrl = async (_newUrl) => {
        const newUrl=JSON.stringify(_newUrl);
        console.log(newUrl);
        try {
          const url = API_URL + "/users/updateMatch"
          const data = await doApiMethod(url, "PATCH", { match_url: _newUrl})
          if (data.modifiedCount) {
            toast.success("match changed")
          }
        }
        catch (err) {
          console.log(err)
          alert("There problem, try again later")
        }
      }


    return (
        <div style={{ marginTop: '70px', minHeight: '100vh' }}>
            <div className='container d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
                <h1 className='display-6 text-white'>Match</h1>
            </div>
            <div className='container'>
                <form className='col-md-6 p-2 border mx-auto' onSubmit={handleSubmit(onSubForm)}  >
                    <div className='container m-1'>
                        <label>Continent:</label>
                        <select ref={continentRef} className='form-select' name="continent">
                            {/* <option value={""}>All</option> */}
                            <option value="Asia">Asia</option>
                            <option value="Africa"> Africa</option>
                            <option value="Australia"> Australia</option>
                            <option value="Europe"> Europe</option>
                            <option value="North-America"> North-America</option>
                            <option value="South-America"> South-America</option>
                        </select>
                    </div>
                    <div className='container m-1'>
                        <label>Location: </label>
                        <select ref={locationRef} className='location form-select'>
                            {/* <option value={""}>All</option> */}
                            {locationsAr.map((item, i) => {
                                return (
                                    <option key={i} value={locationsAr[i]}>{locationsAr[i]}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='container m-1'>
                        <label>Category: </label>
                        <select ref={categoryRef} className='category form-select'>
                            {/* <option value={""}>All</option> */}
                            {categoriesAr.map((item, i) => {
                                return (
                                    <option key={i} value={item.category}>{item.category_name}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className='container m-1'>
                        <label>Visa: </label>
                        <select ref={visaRef} className='form-select' name="visa">
                            {/* <option value={JSON.stringify(null)}>All</option> */}
                            <option value={JSON.stringify(true)}>Needed</option>
                            <option value={JSON.stringify(false)}> Doesn't needed</option>
                        </select>
                    </div>

                    <div className='container m-1'>
                        <label>Salary Expectation: </label>
                        <input ref={salaryRef} placeholder='Exemple: 20000' className="form-control" type="number" />
                        {errors.salary && <div className="text-danger">* Enter valid category (min 1 number)</div>}
                    </div>

                    <div className='text-center'>
                        <button className='btn btn-dark mt-3 '>Find My Match</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MatchForm