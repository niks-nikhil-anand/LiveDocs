import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("min-h-[92px] min-w-full flex-nowrap bg-dark-100 flex w-full items-center justify-between gap-2 px-4", className)}>
      <Link href='/' className="flex items-center">
        <Image 
          src="/assets/icons/logo.svg"
          alt="Logo with name"
          width={120}
          height={32}
          className="hidden md:block"
        />
        <Image 
          src="/assets/icons/logo-icon.svg"
          alt="Logo"
          width={32}
          height={32}
          className="mr-2 block md:hidden"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;