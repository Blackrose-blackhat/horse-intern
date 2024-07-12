import { BookingForm } from '@/components/Form-Booking'
import React from 'react'

const page = () => {
  return (
    <main className='h-[90vh]flex flex-col justify-center items-center w-full'>
      <BookingForm />
    </main>
  )
}

export default page