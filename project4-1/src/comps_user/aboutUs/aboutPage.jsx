import React from 'react'

const AboutPage = () => {
  return (
    <div className='about-us' style={{marginTop:'70px', minHeight:'100vh'}}>
      <div className='container d-flex justify-content-center col-7 mb-4' style={{ backgroundColor: '#5C2018', borderRadius: '70px' }}>
        <h1 className='display-6 text-white m-0'>ABOUT US</h1>
      </div>
      <div className='container text-center col-10 mb-4'>
        <p className='para-about'>Hello! Thank you for visiting our web site and using our services to make such an important decision in your life. We do our best to provide you all the tools to make it smooth and enjoyable.</p>
        <div>
          <img src="/design/noa.jpg" alt="img" width={185} style={{borderRadius:'20px' ,border:'2px black solid', margin:'16px'}}/>
          <img src="/design/dora1.jpg" alt="img" width={180} style={{borderRadius:'20px' ,border:'2px black solid'}}/>
        </div>


        <p className='para-about' >
          Let us introduce ourselves. Our names are Noa and Dora. We developed this company to help as many people as we can to achieve their goals and make the dream of a successful career come true. This website was created in 2023 to give our clients an opportunity to make a relocation in the most pleasant and calm way.
        </p>
      </div>
    </div>
  )
}

export default AboutPage