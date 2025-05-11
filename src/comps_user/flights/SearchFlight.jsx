import React, { useRef } from 'react'

const SearchFlight = ({ ar, setResults }) => {
    const destinationCityRef = useRef();
    const destinationCountryRef = useRef();
    const dateRef = useRef();

    const onSub = async (e) => {
        e && e.preventDefault();
        console.log(ar)
        console.log(destinationCountryRef.current.value);
        let flightsAr;
        if (destinationCountryRef.current.value && destinationCityRef.current.value && dateRef.current.value) {
            flightsAr = ar.filter(item => item.CHLOCCT.toLowerCase() == destinationCountryRef.current.value.toLowerCase() && item.CHLOC1D.toLowerCase().includes(destinationCityRef.current.value.toLowerCase()) && item.CHSTOL.toString().substring(0, 10) === dateRef.current.value.toString().substring(0, 10)
            );
            setResults(flightsAr);
        }
        else if (destinationCountryRef.current.value && destinationCityRef.current.value) {
            flightsAr = ar.filter(item => item.CHLOCCT.toLowerCase() == destinationCountryRef.current.value.toLowerCase() && item.CHLOC1D.toLowerCase().includes(destinationCityRef.current.value.toLowerCase()));
            setResults(flightsAr);
        }
        else if (destinationCountryRef.current.value && dateRef.current.value) {
            flightsAr = ar.filter(item => item.CHLOCCT.toLowerCase() == destinationCountryRef.current.value.toLowerCase() && item.CHSTOL.toString().substring(0, 10) === dateRef.current.value.toString().substring(0, 10));
            setResults(flightsAr);
        }
        else if (destinationCityRef.current.value && dateRef.current.value) {
            flightsAr = ar.filter(item => item.CHLOC1D.toLowerCase().includes(destinationCityRef.current.value.toLowerCase()) && item.CHSTOL.toString().substring(0, 10) === dateRef.current.value.toString().substring(0, 10));
            setResults(flightsAr);
        }
        else if (destinationCityRef.current.value) {
            flightsAr = ar.filter(item => item.CHLOC1D.toLowerCase().includes(destinationCityRef.current.value.toLowerCase()));
            setResults(flightsAr);
        }
        else if (destinationCountryRef.current.value) {
            flightsAr = ar.filter(item => item.CHLOCCT.toLowerCase() == destinationCountryRef.current.value.toLowerCase());
            setResults(flightsAr);
        }
        else if (dateRef.current.value) {
            flightsAr = ar.filter(item => item.CHSTOL.toString().substring(0, 10) === dateRef.current.value.toString().substring(0, 10));
            setResults(flightsAr);
        }
        else setResults(ar);
    }

    const resetFilter = () => {
        destinationCityRef.current.value = "";
        destinationCountryRef.current.value = "";
        dateRef.current.value = "";
        onSub();
    }

    return (
        <div>
            <form onSubmit={onSub} className='my-4 d-flex text-center justify-content-around flex-wrap align-items-center text-white rounded-4 mx-auto p-2' style={{ backgroundColor: '#5C2018' }}>
                <div>
                    <label>Destination city</label>
                    <br />
                    <input type='text' className='form-control' ref={destinationCityRef}></input>
                </div>
                <div>
                    <label>Destination Country</label>
                    <br />
                    <input type='text' className='form-control' ref={destinationCountryRef}></input>
                </div>
                <div>
                    <label>Date</label>
                    <br />
                    <input type='date' className='form-control' ref={dateRef}></input>
                </div>
                <button type="submit" className='btn btn-light my-3 col-10 col-md-2' ><h5 className='m-0' style={{ color: '#5C2018' }} >Find!</h5></button>
            </form>
            <div className='col-12 my-3 d-flex justify-content-end'>
                <button className='btn btn-light text-info' onClick={resetFilter}>Reset filter</button>
            </div>
        </div>
    )
}

export default SearchFlight