'use client'
import React, { useState } from 'react'

type Props = {
  handlerSearch: (value: string) => void
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  location: string
  error: boolean
}

const InputSearch = ({handlerSearch, handleChangeInput, location, error}: Props) => {


  return (
    <>
        {error && <p className='text-red-700 mt-12 z-[1000] relative font-semibold text-center'>You need to write a location</p>}
    <div className={`h-fit ${error ? 'mt-8' : 'mt-20'} z-50 flex items-center mx-auto modalSearch max-h-[30px] w-[300px] md:w-[90%] md:left-[5%] absolute left-[9%] showModal`}>
        <input
          onChange={handleChangeInput}
          value={location}
          type="text" 
          placeholder='Search..' 
          className='my-0 py-4 px-2 outline-none border-0 border-transparent flex-[.8]' 
        />
        <button onClick={handlerSearch} className='h-full flex-[.2] py-4 rounded-r-lg outline-none border-0 border-transparent bg-black flex justify-center items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" fill='#f4f4f4' viewBox="0 0 50 50">
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
        </button>
    </div>
    </>
  )
}

export default InputSearch