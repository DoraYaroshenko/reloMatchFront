import React, { useEffect, useState } from 'react'
import SearchFlight from './SearchFlight';

const FlightsPage = () => {
  const [ar, setAr] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    try {
      setLoading(true)
      const url = "https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5";
      const resp = await fetch(url);
      const data = await resp.json();
      console.log(data.result.records);
      setAr(data.result.records);
      setResults(data.result.records);
      setLoading(false)
    }
    catch (error) {
      setLoading(false)
      console.log(error);
      alert("there problem");
    }
    setLoading(false)
  }

  return (
    <>
      {loading ?
        <div className='container pt-5' style={{ marginTop: '70px', minHeight: '100vh' }}>
          <h1 className='text-center display-4'>Search flight by destination</h1>
          <SearchFlight setResults={setResults} ar={ar} />
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
        </div >
        :
        <div className='container pt-5' style={{ marginTop: '70px', minHeight: '100vh' }}>
          <h1 className='text-center display-4'>Search flight by destination</h1>
          <SearchFlight setResults={setResults} ar={ar} />
          <div className='scroll-container'>
            <table className='table table-stripped table-hover table-dark text-warning mt-5'>
              <thead>
                <tr>
                  <th className='h4'>Flight Number</th>
                  <th className='h4'>Destination city</th>
                  <th className='h4'>Destination country</th>
                  <th className='h4'>Airline</th>
                  <th className='h4'>Departure</th>
                  <th className='h4'>Arrival</th>
                </tr>
              </thead>
              <tbody>
                {results.map(item => {
                  return (
                    <tr key={item._id}>
                      <td>{item.CHFLTN}</td>
                      <td>{item.CHLOC1D}</td>
                      <td>{item.CHLOCCT}</td>
                      <td>{item.CHOPERD}</td>
                      <td>{item.CHSTOL.substring(0, 10)}</td>
                      <td>{item.CHPTOL.substring(0, 10)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div >
      }
    </>
  )
}

export default FlightsPage