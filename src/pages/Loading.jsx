import React from 'react'
import mamoth from '../assets/images/loading-mamoth.png'
import title from '../assets/images/mamoth-title.png'

export default function Loading() {
  return (
    <div className='bg-bgLoading h-full bg-cover overflow-hidden bg-center flex flex-col items-center justify-center gap-[50px]'>
        <img className='w-full' src={mamoth}/>
        <img className='w-4/5' src={title}/>
    </div>
  )
}
