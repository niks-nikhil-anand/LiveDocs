import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='h-screen flex justify-center items-center'>
        <Image
        alt='loader'
        src={"/assets/icons/loader.svg"}
        height={32}
        width={32}
        className='animate-spin'
        />
        Loading....
    </div>
  )
}

export default Loader