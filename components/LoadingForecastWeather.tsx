import React from 'react'

const LoadingForecastWeather = () => {
  return (
    <div className='w-full min-h-[80px] rounded-sm shadow-md p-2 flex items-center justify-between'>
        <div className='flex flex-col flex-1 gap-4 justify-between h-full text-xl'>
            <div className=' w-full h-[15px] rounded-md loading-skeleton'></div>
            <div className=' w-full h-[15px] rounded-md loading-skeleton'></div>
        </div>
        <div className='flex flex-col items-center flex-1'>
            <div className=' w-[50px] h-[50px] rounded-md loading-skeleton'></div>
        </div>
        <div className='w-full h-[15px] rounded-md loading-skeleton flex-1'></div>
    </div>
  )
}

export default LoadingForecastWeather