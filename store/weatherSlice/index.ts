import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getWeatherApiData } from '@/services'

type WeatherApiResponse = {
  data: any
  error: {
    response: {
      data: {
        error: {
          message: string;
        }
      }
    }
  } | null
};

export const fetchWeatherData = createAsyncThunk('weatherData', async (location: string, { rejectWithValue }) => {
    try {
      const responseData = await getWeatherApiData(location);
      if (responseData.error) {
        return rejectWithValue(responseData.error.response.data.error.message);
      }
      return responseData;
    } catch (error) {
      return rejectWithValue(error);
    }
  });

const initialState: any = {
    weather: [],
    error: null
}

const weatherSlice = createSlice({
    name: 'weatherSlice',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchWeatherData.fulfilled, (state, action) => {
            state.weather = action.payload
            state.error = null
        })
        .addCase(fetchWeatherData.rejected, (state, action) => {
            state.error = action.payload;
        })
    }
})

export const { resetError } = weatherSlice.actions

export default weatherSlice.reducer