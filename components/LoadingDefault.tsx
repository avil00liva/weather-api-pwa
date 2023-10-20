import React from 'react'
import logo from '@/assets/loading-img.png'
import Image from 'next/image'

type Props = {}

const LoadingDefault = (props: Props) => {
  return (
    <div className='w-[120px] h-[120px] mt-[-50px] relative flex items-center justify-center'>
      <div className='w-[120px] h-[120px] border-[7px] absolute spin border-[#3B97D3] border-l-transparent rounded-full ' />
      <Image 
          src={logo} 
          alt="PWA Logo Weather The Sun with clouds"
          className='w-[60px] h-[60px]'
        />
    </div>
  )
}

export default LoadingDefault