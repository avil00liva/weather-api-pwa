import { useDisableBodyScroll } from '@/hooks/useDisableBodyScroll';
import { resetError } from '@/store/weatherSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    error: string
}

const ErrorModal = ({error}: Props) => {
    const dispatch = useDispatch()
    useDisableBodyScroll(error)

    const closeModalError = () => {
        dispatch(resetError())
        document.body.style.overflow = 'unset'
    }
    
  return (
    <main className='w-full min-h-screen bg-[#00000099] absolute top-0 left-0 z-[20000]'>
        <section className='bg-white rounded-md mx-auto mt-[40%] w-[80%] min-h-[320px] flex items-center justify-evenly flex-col showModal'>
            <h1 className='font-bold text-lg md:text-2xl'>{error}</h1>
            <button className='px-8 py-2 bg-[#3b97d3] text-center font-bold text-white rounded-sm text-xl' onClick={closeModalError}>
                Close
            </button>
        </section>
    </main>
  )
}

export default ErrorModal