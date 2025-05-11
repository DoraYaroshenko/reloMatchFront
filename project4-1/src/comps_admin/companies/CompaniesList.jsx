import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import PagesBtns from '../../comp_general/PagesBtns';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CompaniesList = () => {
  const nav = useNavigate();
  const [query] = useSearchParams();
  const [ar, setAr] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    doApi();
  }, [query])

  const doApi = async () => {
    const page = query.get("page") || 1;
    const url = API_URL + "/companies/companiesList?page=" + page;
    try {
      setLoading(true);
      const data = await doApiGet(url);
      setAr(data);
      setLoading(false);
    }
    catch (error) {
      console.log(error);
    }
  }

  const deleteItem = async (id) => {
    try {
      if (window.confirm("Delete item?")) {
        const url = API_URL + "/companies/" + id;
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
        <h1 className='display-4 mx-auto text-center'>List of companies in system</h1>
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
          <h1 className='display-4 mx-auto text-center'>List of companies in system</h1>
          <PagesBtns apiUrl={API_URL + "/companies/count"} linkTo={"/admin/companies?page="} cssClass="btn btn-primary ms-2" />
          <div className='scroll-container'>
            <table className='table table-striped table-hover table-info'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>User_ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>State</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {ar.map((item, i) => {
                  const page = query.get("page") || 1;
                  return (
                    <tr key={item._id}>
                      <td>{(page - 1) * 5 + i + 1}</td>
                      <td>{item.user_id}</td>
                      <td>{item.company_name}</td>
                      <td>{item.contactPhone}</td>
                      <td>{item.state}</td>
                      <td><button onClick={() => {
                        deleteItem(item._id)
                      }} className='bg-danger'>X</button></td>
                      <td><button onClick={() => {
                        nav('/admin/companies/edit/' + item._id)
                      }} className='bg-info' >Edit</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
}
</>)
}

      export default CompaniesList