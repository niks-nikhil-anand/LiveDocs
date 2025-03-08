import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = ({children}:HeaderProps) => {
  return (
    <div>
        <div className='min-h-[92px] min-w-full flex-nowrap bg-dark-100 flex w-full items-center justify-between gap-2 px-4;'>
            <Link href={"/"}>
            <Image
            src={"/assets/icons/logo.svg"}
            alt='logo with name'
            width={120}
            height={32}
            className='hidden md:block'
            />
            <Image
            src={"/assests/icons/logo-icon.svg"}
            alt='logo without name'
            width={32}
            height={32}
            className=' md:hidden mr-2'
            />
            </Link>
            {children}
        </div>
    </div>
  )
}

export default Header