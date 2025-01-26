import React from 'react'

const SectionHeaders = ({mainheader,subheader,sideheader}) => {
    return (
        <div>
          <section className=''>
            <div className='text-center'>
                <h3 className='uppercase text-dark mt-3 mb-3 font-semibold leading-4'>{mainheader}</h3>
                <h2 className='text-blue-700 mt-3 mb-3 font-bold text-4xl italic'>{subheader}</h2>
                <h1 className='uppercase mt-4 mb-4 text-blue-700 font-bold text-xl leading-4'>{sideheader}</h1>
            </div>
           
          </section>
          
        </div>
      )
}

export default SectionHeaders
