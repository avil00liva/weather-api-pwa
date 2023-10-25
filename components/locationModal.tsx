import { resetError } from '@/store/weatherSlice';
import React from 'react'

type Props = {
    activate: () => void
}

const LocationModal = ({activate}: Props) => {

    
  return (
    <main className='w-full min-h-screen bg-[#00000099] absolute top-0 left-0 z-[20000]'>
        <section className='bg-white rounded-md mx-auto mt-[40%] w-[80%] min-h-[320px] text-center flex items-center justify-evenly flex-col showModal'>
            <h1 className='font-bold text-lg md:text-2xl'>You need to activate or grant location permission to get the data in your current location</h1>
            <button className='px-8 py-2 bg-[#3b97d3] text-center font-bold text-white rounded-sm text-xl' onClick={activate}>
                Activate
            </button>
        </section>
    </main>
  )
}

export default LocationModal