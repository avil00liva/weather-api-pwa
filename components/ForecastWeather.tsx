import React from 'react'
import LoadingForecastWeather from './LoadingForecastWeather'
import { useSelector } from 'react-redux'

type RootState = {
    weather: {
      weather: any;
      error: any; 
    };

  };

const ForecastWeather = () => {
  const store = useSelector((state: RootState) => state.weather.weather)
  const storeKeyLength = Object.keys(store || {}).length


  return (
    <section className='mt-16 border-t py-2 w-full '>
        <h1 className='text-center mb-6'>Forecast</h1>
        {storeKeyLength > 0 ? store?.data?.forecast.forecastday[0].hour.map((fc: any) => {
            return (
                <div key={fc.time_epoch} className='w-full min-h-[60px] rounded-sm shadow-md p-2 flex items-center justify-between'>
                    <div className='flex flex-col gap-4 justify-between h-full text-xl'>
                        <span>Hour</span>
                        <span>{fc.time.slice(10, )}</span>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <img src={fc.condition.icon} alt="Weather picture" />
                        <span>{fc.condition.text}</span>
                    </div>
                    <span className='text-3x text-center'>{fc.temp_c}°</span>
                </div>
            )
        }) :
        <>
            <LoadingForecastWeather />
            <LoadingForecastWeather />
            <LoadingForecastWeather />
        </>
        }
    </section>
  )
}

export default ForecastWeather