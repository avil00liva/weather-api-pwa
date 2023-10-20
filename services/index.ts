import axios from 'axios'
import { env } from 'process'

type WeatherApiResponse = {
  data: any
  error: any
};


export const getWeatherApiData = async (location: string): Promise<WeatherApiResponse> => {
    try {
        const key = process.env.NEXT_PUBLIC_API_KEY;
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=1&aqi=no&alerts=no`
        )
        return {data: response.data, error: null};
      } catch (error) {
        return {data: null, error}
      }
    }

export const getGeoLocalization = async (lat: number, long: number) => {
  const key = process.env.NEXT_PUBLIC_GEO_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${key}`;
  try {
    const response = await axios.get(url)
    console.log(response.data.results[0].components.city)
    return response.data.results[0].components.city;
  } catch (error) {
    console.error('Error en la solicitud de datos de geolocalización:', error);
    throw error;
  }
}
    
    
    
    
    
    