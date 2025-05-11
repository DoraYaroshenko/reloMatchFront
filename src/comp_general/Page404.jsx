import React from 'react'

const Page404 = () => {
    return (
        <div className='container-fluid vh-100 d-flex flex-column justify-content-center' style={{backgroundImage:"url(./design/pexels-nur-andi-ravsanjani-gusma-1465904.jpg)", backgroundPosition:'center', backgroundSize:'cover'}}>
            <div className='container text-center'>
                <h1 className='display-1 py-5'>404</h1>
                <h2 className='display-2 py-5'>Oops, this page does not exist...</h2>
            </div>
        </div>
    )
}

export default Page404