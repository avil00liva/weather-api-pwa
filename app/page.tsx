'use client'
import ErrorModal from '@/components/ErrorModal'
import ForecastWeather from '@/components/ForecastWeather'
import InputSearch from '@/components/InputSearch'
import LoadingDefault from '@/components/LoadingDefault'
import LocationModal from '@/components/locationModal'
import { getGeoLocalization, getWeatherApiData } from '@/services'
import { fetchWeatherData } from '@/store/weatherSlice'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type RootState = {
  weather: {
    weather: any;
    error: any; 
  };

};

export default function Home() {
  const [search, setSearch] = useState(false)
  const [locationChange, setLocationChange] = useState('')
  const [errorInput, setErrorInput] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleModalSearch = () => {
    setSearch(prevState => !prevState)
    setErrorInput(false)
  }

  const store = useSelector((state: RootState) => state.weather.weather)
  const storeKeyLength = Object.keys(store || {}).length

  const error = useSelector((state: RootState) => state.weather.error);

  const dispatch = useDispatch()


  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocationChange(e.target.value)
  }

  const handlerSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    const inputValue = locationChange;
    if(locationChange.length !== 0){
      dispatch(fetchWeatherData(inputValue) as any)
      setLocationChange('')
      setSearch(false)
      setErrorInput(false)
    } else {
      console.log("Mustn't be empty")
      setErrorInput(true)
    }
  }

/*   useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
  
        try {
          const city = await getGeoLocalization(lat, long);
  
          const weatherData = dispatch(fetchWeatherData(city) as any);
  
        } catch (error) {
          console.error('Error al obtener la ubicación o datos del clima:', error);
        }
      });
    } else {
      console.log('La geolocalización no está disponible en este navegador.');
    }
  }, []) */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
  
          try {
            const city = await getGeoLocalization(lat, long);
            const weatherData = dispatch(fetchWeatherData(city) as any);
          } catch (error) {
            console.error('Error al obtener la ubicación o datos del clima:', error);
          }
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.log('El usuario denegó el acceso a la ubicación.');
            setShowLocationModal(true)
          } else {
            console.error('Error de geolocalización: ' + error.message);
          }
        }
      );
    } else {
      console.log('La geolocalización no está disponible en este navegador.');
    }
  }, []);

  const handleRetryLocationPermission = () => {
    setShowLocationModal(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          try {
            const city = await getGeoLocalization(lat, long);
            const weatherData = dispatch(fetchWeatherData(city) as any);
          } catch (error) {
            console.error('Error al obtener la ubicación o datos del clima:', error);
          }
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.log('El usuario denegó el acceso a la ubicación.');
          } else {
            console.error('Error de geolocalización: ' + error.message);
          }
        }
      );
    }
  };
  

  return (
    <main className="container md:max-w-[500px] md:mx-auto bg-[#f4f4f4]">
      {showLocationModal && <LocationModal activate={handleRetryLocationPermission} />}
      {error && <ErrorModal error={error} />}
      <section>
       <div className="weatherContainer">
          {storeKeyLength > 0 && <>
              <span className='text-lg'>{store?.data?.location?.name}</span>
              <div className='flex items-center text-[35px] mt-4 justify-evenly w-full'>
                {store?.data?.current?.temp_c}º 
                <div className='flex flex-col-reverse items-center ml-4'>
                  <img 
                    className='w-[70px] h-[70px]'
                    src={store?.data?.current?.condition.icon} 
                    alt="Weather icon picture" 
                  />
                  <span className='text-xl'>{store?.data?.current?.condition.text}</span>
                </div>
              </div> 
          </>}
          {storeKeyLength === 0 && <LoadingDefault />}
        </div>
        <div className="reload md:left-[42%]">
          <div className="svgContainer" onClick={handleModalSearch}>
          {search ? 
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" fill='#fff' viewBox="0 0 64 64">
              <path d="M51.092 15.737L48.263 12.908 32 29.172 15.737 12.908 12.908 15.737 29.172 32 12.908 48.263 15.737 51.092 32 34.828 48.263 51.092 51.092 48.263 34.828 32z"></path>
            </svg>  : 
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" fill='#fff' viewBox="0 0 50 50">
              <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
            </svg>
          } 
          </div>
        </div>
      </section>
      {search && <InputSearch error={errorInput} handlerSearch={handlerSearch} handleChangeInput={handleChangeInput} location={locationChange} />}
      <ForecastWeather />
    </main>
  )
}
