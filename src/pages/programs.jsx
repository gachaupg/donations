import React from 'react'
import { data } from '../utils/data'


const Programs = () => {
  return (
    <div className='flex items-center flex-col justify-center w small ml-20 mr-20 small'>
        <h2 className="text">Our Programs</h2>
       <div className='flex flex-row gap-6 small wrap flex-wrap mt-4 mb-3'>
       {
            data.map((i)=>{
                return(
                    <>
                    <div className='bg-white small  w-64 rounded-lg text-black '>
                        <img src={i.image} className='w-full object-cover h-48 rounded-lg' alt={i.title} />
                      <div className='p-2'>
                      <h3 className='text-2xl font-bold'>{i.title}</h3>
                      <p>{i.description}</p>
                      </div>
                    </div>
                    </>
                )
            })
        }
       </div>
    </div>
  )
}

export default Programs