import React from 'react'
import Image from 'next/image'
const Header = () => {
  return (
    <div className='w-full h-[70px] bg-slate-400 text-center 
     font-semibold p-3sticky top-0 flex justify-center items-center'>
         <Image
        src='/form.png'
        alt='Description of the image'
        width={50}
        height={50} 
      />
      <h1 className='text-[30px]  text-white '>FORM BUILDER</h1>
        </div>
  )
}

export default Header