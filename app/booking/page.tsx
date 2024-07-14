import dynamic from 'next/dynamic';

const BookingForm = dynamic(() => import('@/components/Form-Booking'), {
  ssr: false
});

export default function Page () {
  return (
    <main className='h-[90vh] flex flex-col justify-center items-center w-full'>
      <BookingForm />
    </main>
  )
}